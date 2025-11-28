# Documentación de Routes (Marketing)

Este documento describe los endpoints REST implementados para el módulo de Marketing:

## Endpoints de Cupones
- POST   /api/coupons           → Crear cupón
- GET    /api/coupons/{id}      → Leer cupón por ID
- PUT    /api/coupons/{id}      → Actualizar cupón
- DELETE /api/coupons/{id}      → Eliminar cupón (soft delete)
- GET    /api/coupons           → Listar cupones
- GET    /api/coupons/{id}/validar → Validar vigencia y límite de uso

## Endpoints de Newsletter
- POST   /api/newsletter        → Crear suscripción
- GET    /api/newsletter/{id}   → Leer suscripción por ID
- PUT    /api/newsletter/{id}   → Actualizar suscripción
- DELETE /api/newsletter/{id}   → Eliminar suscripción (soft delete)
- GET    /api/newsletter        → Listar suscripciones

## Endpoints de Favoritos
- POST   /api/favorites         → Crear favorito
- GET    /api/favorites/{id}    → Leer favorito por ID
- PUT    /api/favorites/{id}    → Actualizar favorito
- DELETE /api/favorites/{id}    → Eliminar favorito (soft delete)
- GET    /api/favorites         → Listar favoritos

## Buenas prácticas
- Todas las rutas devuelven respuestas en formato JSON y manejan errores con códigos HTTP adecuados.
- Listas para integrarse con frontend y pruebas automatizadas.

