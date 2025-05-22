<?php
// analytics_viewer.php

$dbFile = __DIR__ . '/analytics.sqlite';
$error_message = '';
$logs = [];
$daily_access_data = [];

// Set timezone to JST for displaying timestamps consistently if needed
date_default_timezone_set('Asia/Tokyo');

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch last 100 logs, newest first
    $stmt_logs = $pdo->query("SELECT id, page_path, pokemon_id, area, access_timestamp FROM access_logs ORDER BY access_timestamp DESC LIMIT 100");
    $logs = $stmt_logs->fetchAll(PDO::FETCH_ASSOC);

    // Fetch daily access counts for the last 30 days
    $stmt_daily_counts = $pdo->query("
        SELECT 
            DATE(access_timestamp) as access_date, 
            COUNT(*) as count
        FROM access_logs 
        WHERE access_timestamp >= DATE('now', '-30 days')
        GROUP BY access_date 
        ORDER BY access_date ASC
    ");
    $daily_access_data = $stmt_daily_counts->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    $error_message = "Database error: " . $e->getMessage();
} catch (Exception $e) {
    $error_message = "General error: " . $e->getMessage();
}

// Prepare data for Chart.js
$chart_labels = [];
$chart_data = [];
if (!empty($daily_access_data)) {
    foreach ($daily_access_data as $row) {
        $chart_labels[] = $row['access_date'];
        $chart_data[] = (int)$row['count'];
    }
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Log Viewer</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
        h1, h2 { text-align: center; color: #333; }
        .chart-container { width: 80%; margin: 20px auto; background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #e9e9e9; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .error { color: red; font-weight: bold; text-align: center; margin-bottom: 20px; }
        .no-logs { text-align: center; margin-top: 20px; color: #777; }
    </style>
</head>
<body>
    <h1>Access Log Viewer</h1>

    <?php if ($error_message): ?>
        <p class="error"><?php echo htmlspecialchars($error_message); ?></p>
    <?php endif; ?>

    <h2>Daily Access Counts (Last 30 Days)</h2>
    <div class="chart-container">
        <canvas id="dailyAccessChart"></canvas>
    </div>

    <h2>Access Logs (Last 100 Entries)</h2>
    <?php if (!$error_message && empty($logs)): ?>
        <p class="no-logs">No logs found.</p>
    <?php elseif (!empty($logs)): ?>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Page Path</th>
                    <th>Pokemon ID</th>
                    <th>Area</th>
                    <th>Access Timestamp (JST)</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($logs as $log): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($log['id']); ?></td>
                        <td><?php echo htmlspecialchars($log['page_path']); ?></td>
                        <td><?php echo htmlspecialchars($log['pokemon_id'] ?? 'N/A'); ?></td>
                        <td><?php echo htmlspecialchars($log['area'] ?? 'N/A'); ?></td>
                        <td><?php echo htmlspecialchars($log['access_timestamp']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>

    <script>
        const ctx = document.getElementById('dailyAccessChart');
        if (ctx) {
            const chartLabels = <?php echo json_encode($chart_labels); ?>;
            const chartData = <?php echo json_encode($chart_data); ?>;

            if (chartLabels.length > 0) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: chartLabels,
                        datasets: [{
                            label: 'Daily Accesses',
                            data: chartData,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1 // 整数で目盛りを表示
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: true
                    }
                });
            } else {
                // データがない場合はキャンバスにメッセージを表示するなどの代替処理も可能
                const chartContainer = document.querySelector('.chart-container');
                if(chartContainer) chartContainer.innerHTML = '<p class="no-logs">No access data available for the chart in the last 30 days.</p>';
            }
        } else {
            console.error('Canvas element for chart not found.');
        }
    </script>

</body>
</html>
