<?php

use Okea\Backend\Controllers\CategoryController;

$controller = new CategoryController($db);

// Obtener categorias
$routes[] = ['GET', '/categories', function() use ($controller) {
    // Si se proporciona un ID, obtener categoría por ID
    if (isset($_GET['id'])) {
        return $controller->getById($_GET['id']);
    // Si se proporciona parent_id, obtener categorías hijas    
    } elseif (isset($_GET['parent_id'])) {
        return $controller->getByParent($_GET['parent_id']);
    }
    // Si no, obtener todas las categorías
    return $controller->getAll();
}];
// Crear Categoria
$routes[] = ['POST', '/categories', function() use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true); // para crear categoria hijo especificar parent_id y level 
    return $controller->create($data);
}];
// Actualizar categoría
$routes[] = ['PUT', '/categories', function($id) use ($controller) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $controller->update($_GET['id'], $data);
}];
// Eliminar categoría
$routes[] = ['DELETE', '/categories', function($id) use ($controller) {
    return $controller->delete($_GET['id']);
}];

