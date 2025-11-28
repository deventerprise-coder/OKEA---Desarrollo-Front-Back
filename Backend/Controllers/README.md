# Documentación de Controllers (Marketing)

Este documento describe la lógica y funcionalidades implementadas en los controladores de Marketing del backend:

## NewsletterController
- CRUD completo (crear, leer, actualizar, eliminar) con validaciones de email, estado y longitud.
- Soft delete: las suscripciones se marcan como 'eliminado' y pueden reactivarse.
- Métodos para buscar por email y reactivar suscripciones eliminadas.
- Integración opcional con usuario (usuario_id).

## CouponController
- CRUD completo para cupones, con validación de datos y longitud de código.
- Soft delete: los cupones se marcan como 'eliminado' y pueden reactivarse.
- Métodos para validar vigencia y límite de uso, registrar uso, buscar por código y reactivar cupones eliminados.
- Integración opcional con usuario y producto.
- Manejo de estados permitidos ('activo', 'inactivo', 'eliminado').

## FavoriteController
- CRUD completo para favoritos, con validación de duplicados y estados.
- Soft delete: los favoritos se marcan como 'eliminado' y pueden reactivarse.
- Métodos para buscar por usuario y producto, y reactivar favoritos eliminados.
- Manejo de estados permitidos ('activo', 'inactivo', 'eliminado').

## Buenas prácticas
- Todos los controladores manejan errores con excepciones y validaciones robustas.
- La lógica de negocio está centralizada y lista para integrarse con base de datos real.

