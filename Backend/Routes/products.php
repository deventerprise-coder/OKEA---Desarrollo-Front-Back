<?php

use Okea\Backend\Controllers\ProductController;

$controller = new ProductController($db);

// Obtener productos
$routes[] = ['GET', '/products', function() use ($controller) {
    // Si se especifica ?type=simple_parent
    if (isset($_GET['type']) && $_GET['type'] === 'simple_parent') {
        return $controller->getSimpleYParentProducts();
    }
    // Si se proporciona un ID, obtener producto por ID
    if (isset($_GET['id'])) {
        return $controller->getById($_GET['id']);
    // Si se proporciona parent_id, obtener productos variantes, de un producto padre    
    } elseif (isset($_GET['parent_id'])) {
        return $controller->getByParent($_GET['parent_id']);
    }
    // Si no, obtener todas los productos (solo variantes y simples)
    return $controller->getAll();
}];
// Crear producto
$routes[] = ['POST', '/products', function() use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->create($data);
}];
// Actualizar producto
$routes[] = ['PUT', '/products', function($id) use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->update($_GET['id'], $data);
}];
// Eliminar producto
$routes[] = ['DELETE', '/products', function($id) use ($controller) {
    return $controller->delete($_GET['id']);
}];