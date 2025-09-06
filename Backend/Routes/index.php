<?php
use Okea\Backend\Config\Database;

$routes = [];
require __DIR__ . '/auth.php';

$matched = false;

foreach ($routes as $route) {
    [$routeMethod, $routeUri, $handler] = $route;

    if ($uri === $routeUri && $method === $routeMethod) {
        $matched = true;
        echo json_encode($handler($db, $body));
        break;
    }
}
if (!$matched) {
    if ($uri === '/' && $method === 'GET') {
        echo json_encode([
            "status" => "ok",
            "backend" => "running 🚀",
            "db" => $db ? "connected ✅" : "not connected ❌"
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "error" => "Ruta no encontrada",
            "method" => $method,
            "uri" => $uri
        ]);
    }
}