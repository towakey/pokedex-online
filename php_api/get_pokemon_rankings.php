<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For development, allow all origins

$analyticsDbFile = __DIR__ . '/analytics.sqlite';
$pokedexDbFile = __DIR__ . '/../pokedex.db'; // スラッシュを追加してパスを修正

$period = $_GET['period'] ?? 'daily'; // daily, weekly, monthly

$results = [];
$error_message = null;

try {
    // analytics.sqlite へのパス
    $realAnalyticsDbPath = realpath($analyticsDbFile);
    if (!$realAnalyticsDbPath) {
        throw new Exception("Analytics DB path not found: " . $analyticsDbFile);
    }

    // pokedex.db への接続をメインにする
    $pdo_pokedex = new PDO('sqlite:' . $pokedexDbFile);
    $pdo_pokedex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // analytics.sqlite を 'db_analytics' という名前で pokedex の接続にアタッチ
    $pdo_pokedex->exec("ATTACH DATABASE '" . $realAnalyticsDbPath . "' AS db_analytics");

    $date_condition = "";
    switch ($period) {
        case 'weekly':
            // Last 7 full days, ending yesterday
            $date_condition = "DATE(access_timestamp) >= DATE('now', '-7 days') AND DATE(access_timestamp) < DATE('now')";
            break;
        case 'monthly':
            // Last 30 full days, ending yesterday
            $date_condition = "DATE(access_timestamp) >= DATE('now', '-30 days') AND DATE(access_timestamp) < DATE('now')";
            break;
        case 'daily':
        default:
            // Yesterday
            $date_condition = "DATE(access_timestamp) = DATE('now', '-1 day')";
            break;
    }

    $sql_ranking = "
        WITH RankedPokemonGlobal AS (
            SELECT
                al.pokemon_id AS id, -- This is globalNo
                COUNT(al.pokemon_id) AS access_count
            FROM db_analytics.access_logs al
            WHERE
                {$date_condition}
                AND al.pokemon_id IS NOT NULL AND al.pokemon_id != '' AND al.pokemon_id != 'undefined' AND al.pokemon_id != 'null'
                AND al.page_path LIKE '/pokedex/%/%' -- Ensure it's a Pokémon page access
            GROUP BY al.pokemon_id -- Group by global Pokemon ID
        ),
        RankedPokemonWithDetails AS (
            SELECT
                rpg.id,
                rpg.access_count,
                PN.name,
                LP.no,
                COALESCE(NULLIF(LP.region, ''), 'global') AS area,
                '/img/' || printf('%04d', rpg.id) || '.png' AS image_path,
                ROW_NUMBER() OVER (PARTITION BY rpg.id ORDER BY CASE WHEN LP.region = '' OR LP.region = 'global' THEN 0 ELSE 1 END, LP.no ASC) as rn
            FROM RankedPokemonGlobal rpg
            JOIN POKEDEX_NAME PN ON rpg.id = PN.globalNo AND PN.language = 'jpn'
            LEFT JOIN LOCAL_POKEDEX LP ON rpg.id = LP.globalNo -- Join to get all local versions for this global ID
        )
        SELECT
            id,
            name,
            area,
            no,
            image_path,
            access_count
        FROM RankedPokemonWithDetails
        WHERE rn = 1 -- Pick the top-ranked local entry for each global ID
        ORDER BY access_count DESC
        LIMIT 3
    ";

    // ランキングクエリは $pdo_pokedex で実行
    $stmt_ranking = $pdo_pokedex->query($sql_ranking);
    $top_pokemon_access = $stmt_ranking->fetchAll(PDO::FETCH_ASSOC);

    // ポケモン詳細取得は引き続き $pdo_pokedex を使用 (変更なし)
    $stmt_pokemon_details = $pdo_pokedex->prepare("
        SELECT 
            PN.name AS name, 
            LP.region AS area 
        FROM LOCAL_POKEDEX LP
        JOIN POKEDEX_NAME PN ON LP.globalNo = PN.globalNo AND PN.language = 'jpn' 
        WHERE LP.globalNo = :pokemon_id
    ");

    foreach ($top_pokemon_access as $access_data) {
        // $access_data['id'] は access_logs.pokemon_id から来ており、globalNo と仮定
        $stmt_pokemon_details->bindParam(':pokemon_id', $access_data['id']);
        $stmt_pokemon_details->execute();
        $pokemon_detail = $stmt_pokemon_details->fetch(PDO::FETCH_ASSOC);

        if ($pokemon_detail) {
            $image_path = '/img/' . str_pad($access_data['id'], 4, '0', STR_PAD_LEFT) . '.png';

            $results[] = [
                'pokemon_id' => $access_data['id'], // 全国図鑑番号 (globalNo)
                'no' => $access_data['no'],         // 地方図鑑番号
                'name' => $pokemon_detail['name'],
                'area' => $pokemon_detail['area'],
                'image' => $image_path,
                'access_count' => (int)$access_data['access_count']
            ];
        }
    }

} catch (PDOException $e) {
    $error_message = "Database error: " . $e->getMessage();
} catch (Exception $e) {
    $error_message = "General error: " . $e->getMessage();
}

if ($error_message) {
    http_response_code(500);
    echo json_encode(['error' => $error_message, 'details' => $results]); // Include results for debugging if any partial success
} else {
    echo json_encode($results);
}

?>
