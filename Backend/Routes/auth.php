<?php
use Okea\Backend\Controllers\AuthController;

$routes[] = ['POST', '/auth/register', function($db, $body) {
    $ctrl = new AuthController($db);
    return $ctrl->register($body);
}];

$routes[] = ['POST', '/auth/login', function($db, $body) {
    $ctrl = new AuthController($db);
    return $ctrl->login($body);
}];
$routes[] = ['POST', '/auth/refresh', function($db, $body) {
    $ctrl = new AuthController($db);
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_replace('Bearer ', '', $authHeader);
    return $ctrl->refresh($token);
}];

$routes[] = ['POST', '/auth/logout', function($db, $body) {
    $ctrl = new AuthController($db);
    return $ctrl->logout();
}];
