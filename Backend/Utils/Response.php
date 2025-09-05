<?php

namespace Okea\Backend\Utils;

class Response {
    public static function json($data, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function error($message, $status = 400) {
        self::json([
            'success' => false,
            'error' => $message
        ], $status);
    }

    public static function success($data, $message = 'Success') {
        self::json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }
}