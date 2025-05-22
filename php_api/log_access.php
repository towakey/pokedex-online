<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // 本番環境では適切にオリジンを指定してください
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Set timezone to JST
date_default_timezone_set('Asia/Tokyo');

// OPTIONSリクエストへの対応 (プリフライトリクエスト)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbFile = __DIR__ . '/analytics.sqlite';
$response = ['status' => 'error', 'message' => 'An unknown error occurred.'];

try {
    // データベース接続 (なければ作成)
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // テーブル作成 (なければ)
    // access_timestamp will now be explicitly inserted by PHP, but DEFAULT is kept for safety/other access methods
    $pdo->exec("CREATE TABLE IF NOT EXISTS access_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_path TEXT NOT NULL,
        pokemon_id INTEGER,
        area TEXT,
        access_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // POSTデータ取得
    $input = json_decode(file_get_contents('php://input'), true);

    $pagePath = isset($input['pagePath']) ? filter_var($input['pagePath'], FILTER_SANITIZE_STRING) : null;
    $pokemonId = isset($input['pokemonId']) ? filter_var($input['pokemonId'], FILTER_VALIDATE_INT) : null;
    $area = isset($input['area']) ? filter_var($input['area'], FILTER_SANITIZE_STRING) : null;

    if ($pagePath === null) {
        http_response_code(400);
        $response['message'] = 'pagePath is required.';
    } else {
        // pokemonIdがfalseの場合（バリデーション失敗）、nullに設定
        if ($pokemonId === false) {
            $pokemonId = null;
        }

        // Get current JST timestamp
        $current_jst_timestamp = date('Y-m-d H:i:s');

        // データ挿入
        $stmt = $pdo->prepare("INSERT INTO access_logs (page_path, pokemon_id, area, access_timestamp) VALUES (:page_path, :pokemon_id, :area, :access_timestamp)");
        $stmt->bindParam(':page_path', $pagePath);
        $stmt->bindParam(':pokemon_id', $pokemonId);
        $stmt->bindParam(':area', $area);
        $stmt->bindParam(':access_timestamp', $current_jst_timestamp);
        
        if ($stmt->execute()) {
            http_response_code(200);
            $response = ['status' => 'success', 'message' => 'Access logged successfully.'];
        } else {
            http_response_code(500);
            $response['message'] = 'Failed to log access.';
        }
    }
} catch (PDOException $e) {
    http_response_code(500);
    $response['message'] = 'Database error: ' . $e->getMessage();
    error_log('PDOException in log_access.php: ' . $e->getMessage()); // サーバーログに記録
} catch (Exception $e) {
    http_response_code(500);
    $response['message'] = 'Server error: ' . $e->getMessage();
    error_log('Exception in log_access.php: ' . $e->getMessage()); // サーバーログに記録
}

echo json_encode($response);
?>
