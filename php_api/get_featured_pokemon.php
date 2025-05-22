<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // CORS対応

$dbPath = __DIR__ . '/../pokedex.db'; // スラッシュを追加してパスを修正
$response = ['error' => 'Failed to fetch featured pokemon'];

try {
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // LOCAL_POKEDEX からランダムに1件取得
    // POKEMON_ID, NAME, AREA, DESCRIPTION_1 を取得する
    // 画像パスも生成できるように pokemon_id も含める
    $stmt = $db->query("
        SELECT
            LP.globalNo AS id,
            LP.no AS no,
            PN.name AS name,
            LPD.description AS description,
            COALESCE(NULLIF(LP.region, ''), 'global') AS area
        FROM
            LOCAL_POKEDEX LP
        JOIN
            POKEDEX_NAME PN ON LP.globalNo = PN.globalNo AND PN.language = 'jpn'
        JOIN
            LOCAL_POKEDEX_DESCRIPTION LPD ON LP.globalNo = LPD.globalNo AND LPD.language = 'jpn'
        ORDER BY RANDOM()
        LIMIT 1
    ");
    $pokemon = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($pokemon) {
        // 画像パスを生成 (例: /img/0001.png) - id (globalNo) を使用
        $pokemon['image_path'] = '/img/' . str_pad($pokemon['id'], 4, '0', STR_PAD_LEFT) . '.png';
        $response = [
            'id' => $pokemon['id'], // 全国図鑑番号 (globalNo)
            'no' => $pokemon['no'], // 地方図鑑番号
            'name' => $pokemon['name'],
            'area' => $pokemon['area'],
            'description' => $pokemon['description'],
            'image_path' => $pokemon['image_path']
        ];
    } else {
        $response = ['error' => 'No pokemon found'];
    }

} catch (PDOException $e) {
    $response = ['error' => 'Database error: ' . $e->getMessage()];
    http_response_code(500);
} catch (Exception $e) {
    $response = ['error' => 'An unexpected error occurred: ' . $e->getMessage()];
    http_response_code(500);
}

echo json_encode($response);
?>