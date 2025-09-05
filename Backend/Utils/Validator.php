<?php

namespace Okea\Backend\Utils;

class Validator {
    public static function required($value, $field_name) {
        if (empty($value)) {
            throw new \Exception("El campo {$field_name} es requerido");
        }
    }

    public static function maxLength($value, $length, $field_name) {
        if (strlen($value) > $length) {
            throw new \Exception("El campo {$field_name} no puede exceder {$length} caracteres");
        }
    }

    public static function isPositive($value, $field_name) {
        if ($value < 0) {
            throw new \Exception("El campo {$field_name} debe ser un número positivo");
        }
    }

    public static function inArray($value, $array, $field_name) {
        if (!in_array($value, $array)) {
            throw new \Exception("El campo {$field_name} contiene un valor inválido");
        }
    }
}