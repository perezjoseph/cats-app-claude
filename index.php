<?php
// Load environment variables
if (file_exists('.env')) {
    $env_lines = file('.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($env_lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Define cat API constants
define('CAT_API_URL', 'https://api.thecatapi.com/v1/images/search');
define('CAT_API_KEY', getenv('CAT_API_KEY') ?: '');

// Route handling
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Remove trailing slash if present
$path = rtrim($path, '/');

// Basic routing
switch ($path) {
    case '':
    case '/':
        // Serve the main page
        include 'templates/index.php';
        break;
    
    case '/api/cats':
        // Serve the cats API
        header('Content-Type: application/json');
        // Set cache control headers to prevent caching
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');
        
        // Get cat images
        $headers = [];
        if (CAT_API_KEY) {
            $headers[] = 'x-api-key: ' . CAT_API_KEY;
        }
        
        try {
            // Add a random parameter to prevent caching
            $timestamp = time();
            $url = CAT_API_URL . "?limit=9&timestamp=$timestamp";
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            if (!empty($headers)) {
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            }
            
            $response = curl_exec($ch);
            $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($status_code == 200) {
                echo $response;
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to fetch cat images"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
    
    default:
        // Handle static files
        $file_path = __DIR__ . $path;
        if (file_exists($file_path) && is_file($file_path)) {
            // Determine content type
            $ext = pathinfo($file_path, PATHINFO_EXTENSION);
            $content_types = [
                'css' => 'text/css',
                'js' => 'application/javascript',
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif'
            ];
            
            $content_type = $content_types[$ext] ?? 'text/plain';
            header("Content-Type: $content_type");
            readfile($file_path);
        } else {
            // 404 Not Found
            http_response_code(404);
            echo '404 Not Found';
        }
        break;
}
?>