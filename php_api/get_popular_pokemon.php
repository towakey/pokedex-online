<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = ['status' => 'error', 'message' => 'Failed to retrieve popular Pokemon.'];
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5; // デフォルトは上位5件

try {
    $dbPath = __DIR__ . '/analytics.sqlite';
    if (!file_exists($dbPath)) {
        $response['message'] = 'Analytics database not found.';
        http_response_code(404);
        echo json_encode($response);
        exit();
    }

    $db = new SQLite3($dbPath, SQLITE3_OPEN_READONLY);
    if (!$db) {
        throw new Exception("Failed to open database.");
    }

    $query = "
        SELECT pokemon_id, area, COUNT(*) as access_count
        FROM access_logs
        WHERE pokemon_id IS NOT NULL AND area IS NOT NULL
        GROUP BY pokemon_id, area
        ORDER BY access_count DESC
        LIMIT :limit
    ";

    $stmt = $db->prepare($query);
    if (!$stmt) {
        throw new Exception($db->lastErrorMsg());
    }

    $stmt->bindValue(':limit', $limit, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $popularPokemon = [];
    if ($result) {
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $popularPokemon[] = $row;
        }
        $response['status'] = 'success';
        $response['message'] = 'Popular Pokemon retrieved successfully.';
        $response['data'] = $popularPokemon;
        http_response_code(200);
    } else {
        $response['message'] = 'Failed to execute query: ' . $db->lastErrorMsg();
        http_response_code(500);
    }

    $stmt->close();
    $db->close();

} catch (Exception $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
    error_log('Get Popular Pokemon DB Error: ' . $e->getMessage());
    http_response_code(500);
}

echo json_encode($response);
?>
