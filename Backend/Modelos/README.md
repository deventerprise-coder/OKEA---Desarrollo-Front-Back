# Documentación de Modelos (Marketing)

Este documento describe los modelos implementados para el módulo de Marketing:

## Newsletter
- Propiedades: id, email, fecha_suscripcion, estado, usuario_id.
- Representa una suscripción al newsletter.

## Coupon
- Propiedades: id, codigo, descripcion, fecha_inicio, fecha_fin, limite_uso, usos_actuales, usuario_id, producto_id, estado.
- Métodos:
  - esVigente(): verifica si el cupón está vigente por fecha.
  - puedeUsarse(): verifica si el cupón no ha alcanzado el límite de uso.
  - registrarUso(): incrementa el uso si está vigente y no ha alcanzado el límite.

## Favorite
- Propiedades: id, usuario_id, producto_id, fecha_agregado, estado.
- Representa un producto favorito de un usuario.

## Buenas prácticas
- Los modelos encapsulan la lógica de negocio y validaciones básicas.
- Listos para integrarse con ORM o consultas SQL reales.

