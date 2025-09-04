<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Okea\Backend\Config\Database;

header('Content-Type: application/json');

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$db = (new Database())->connect();

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$body = json_decode(file_get_contents('php://input'), true) ?? [];

require __DIR__ . '/../Routes/index.php';