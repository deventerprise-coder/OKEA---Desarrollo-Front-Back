<?php
namespace Okea\Backend\Config;

use PDO;
use PDOException;

class Database {
    private ?PDO $conn = null;

    public function connect(): PDO {
        $host = $_ENV['DB_HOST'] ?? '127.0.0.1';
        $port = $_ENV['DB_PORT'] ?? '3999';
        $db   = $_ENV['DB_NAME'] ?? '';
        $user = $_ENV['DB_USER'] ?? 'root';
        $pass = $_ENV['DB_PASS'] ?? '';

        try {
            $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
            $this->conn = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            if ($_ENV['APP_DEBUG'] === 'true') {
                error_log("✅ DB Connected: $db on $host:$port");
            }
            return $this->conn;
        } catch (PDOException $e) {
            if ($_ENV['APP_DEBUG'] === 'true') {
                error_log(" ❌ DB Connection failed: $db on $host:$port");
            }
            http_response_code(500);
            die(json_encode(["error" => "DB connection failed"]));
        }
    }
}