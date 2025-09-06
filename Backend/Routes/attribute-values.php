<?php

use Okea\Backend\Controllers\AttributeValueController;

$controller = new AttributeValueController($db);

// Obtener valores de atributos
$routes[] = ['GET', '/attribute-values', function() use ($controller) {
    if (isset($_GET['id'])) {
        return $controller->getById($_GET['id']);
    }
    if (isset($_GET['attribute_id'])) {
        return $controller->getAll($_GET['attribute_id']);
    }
    return $controller->getAll();
}];
// Crear valor
$routes[] = ['POST', '/attribute-values', function() use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->create($data);
}];
// Actualizar valor
$routes[] = ['PUT', '/attribute-values', function() use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->update($_GET['id'], $data);
}];
// Eliminar valor
$routes[] = ['DELETE', '/attribute-values', function() use ($controller) {
    return $controller->delete($_GET['id']);
}];
