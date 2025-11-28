<?php
// Rutas REST para Marketing y Experiencia
require_once __DIR__ . '/../Controllers/Marketing/CouponController.php';
require_once __DIR__ . '/../Controllers/Marketing/NewsletterController.php';
require_once __DIR__ . '/../Controllers/Marketing/FavoriteController.php';

$couponController = new CouponController();
$newsletterController = new NewsletterController();
$favoriteController = new FavoriteController();



// Lógica de enrutamiento REST simulada
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Quitar parámetros de query string
$uri = strtok($uri, '?');

// Función para obtener datos JSON en PUT y DELETE
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? [];
}

try {
    // Cupones
    if ($uri === '/api/coupons' && $method === 'POST') {
        $data = $_POST ?: getJsonInput();
        $coupon = $couponController->create($data);
        echo json_encode($coupon);
        exit;
    }
    if (preg_match('#^/api/coupons/(\d+)$#', $uri, $matches)) {
        $id = (int)$matches[1];
        if ($method === 'GET') {
            $coupon = $couponController->read($id);
            echo json_encode($coupon);
            exit;
        }
        if ($method === 'PUT') {
            $data = getJsonInput();
            $coupon = $couponController->update($id, $data);
            echo json_encode($coupon);
            exit;
        }
        if ($method === 'DELETE') {
            $couponController->delete($id);
            echo json_encode(['success' => true]);
            exit;
        }
    }
    if (preg_match('#^/api/coupons/(\d+)/validar$#', $uri, $matches) && $method === 'GET') {
        $id = (int)$matches[1];
        $valido = $couponController->validarVigenciaYLimite($id);
        echo json_encode(['valido' => $valido]);
        exit;
    }
    if ($uri === '/api/coupons' && $method === 'GET') {
        $list = $couponController->list();
        echo json_encode($list);
        exit;
    }

    // Newsletter
    if ($uri === '/api/newsletter' && $method === 'POST') {
        $data = $_POST ?: getJsonInput();
        $newsletter = $newsletterController->create($data);
        echo json_encode($newsletter);
        exit;
    }
    if (preg_match('#^/api/newsletter/(\d+)$#', $uri, $matches)) {
        $id = (int)$matches[1];
        if ($method === 'GET') {
            $newsletter = $newsletterController->read($id);
            echo json_encode($newsletter);
            exit;
        }
        if ($method === 'PUT') {
            $data = getJsonInput();
            $newsletter = $newsletterController->update($id, $data);
            echo json_encode($newsletter);
            exit;
        }
        if ($method === 'DELETE') {
            $newsletterController->delete($id);
            echo json_encode(['success' => true]);
            exit;
        }
    }
    if ($uri === '/api/newsletter' && $method === 'GET') {
        $list = $newsletterController->list();
        echo json_encode($list);
        exit;
    }

    // Favoritos
    if ($uri === '/api/favorites' && $method === 'POST') {
        $data = $_POST ?: getJsonInput();
        $favorite = $favoriteController->create($data);
        echo json_encode($favorite);
        exit;
    }
    if (preg_match('#^/api/favorites/(\d+)$#', $uri, $matches)) {
        $id = (int)$matches[1];
        if ($method === 'GET') {
            $favorite = $favoriteController->read($id);
            echo json_encode($favorite);
            exit;
        }
        if ($method === 'PUT') {
            $data = getJsonInput();
            $favorite = $favoriteController->update($id, $data);
            echo json_encode($favorite);
            exit;
        }
        if ($method === 'DELETE') {
            $favoriteController->delete($id);
            echo json_encode(['success' => true]);
            exit;
        }
    }
    if ($uri === '/api/favorites' && $method === 'GET') {
        $list = $favoriteController->list();
        echo json_encode($list);
        exit;
    }

    // Ruta no encontrada
    http_response_code(404);
    echo json_encode(['error' => 'Ruta no encontrada']);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
