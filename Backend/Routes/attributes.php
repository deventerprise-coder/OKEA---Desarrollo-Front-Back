<?php

use Okea\Backend\Controllers\AttributeController;

$controller = new AttributeController($db);

// Obtener atributos
$routes[] = ['GET', '/attributes', function() use ($controller) {
    // Si se proporciona un ID, obtener atributo por ID
    if (isset($_GET['id'])) {
        return $controller->getById($_GET['id']); 
    }
    // Si no, obtener todas los atributos (solo variantes y simples)
    return $controller->getAll();
}];
// Crear atributo
$routes[] = ['POST', '/attributes', function() use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->create($data);
}];
// Actualizar atributo
$routes[] = ['PUT', '/attributes', function($id) use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->update($_GET['id'], $data);
}];
// Eliminar producto
$routes[] = ['DELETE', '/attributes', function($id) use ($controller) {
    return $controller->delete($_GET['id']);
}];