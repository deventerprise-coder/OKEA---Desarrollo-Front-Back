<?php

use Okea\Backend\Controllers\ProductAttributeController;

$controller = new ProductAttributeController($db);

// Obtener relacion producto-atributo
$routes[] = ['GET', '/product-attributes', function() use ($controller) {
    // Si se proporciona un ID, obtener relaciones producto-atributo por ID  
    if (isset($_GET['id'])) {
        return $controller->getById($_GET['id']);  
    // obtener relaciones producto-atributo por product_id   
    } elseif (isset($_GET['product_id'])) {
        return $controller->getByProduct($_GET['product_id']);
    }
    return $controller->getAll();
}];
// Crear relacion producto-atributo
$routes[] = ['POST', '/product-attributes', function() use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->create($data);
}];
// Actualizar relacion producto-atributo
$routes[] = ['PUT', '/product-attributes', function($id) use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->update($_GET['id'], $data);
}];
// Eliminar relacion producto-atributo
$routes[] = ['DELETE', '/product-attributes', function($id) use ($controller) {
    return $controller->delete($_GET['id']);
}];