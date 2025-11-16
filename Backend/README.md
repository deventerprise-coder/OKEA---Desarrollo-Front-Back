# Módulo de Pagos y Dashboard - Documentación Técnica

## 📋 Tabla de Contenidos
1. [Estructura General](#estructura-general)
2. [Base de Datos](#base-de-datos)
3. [Modelos Eloquent](#modelos-eloquent)
4. [Controllers](#controllers)
5. [Endpoints API](#endpoints-api)
6. [Servicios](#servicios)
7. [Flujos de Negocio](#flujos-de-negocio)
8. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Estructura General

```
Backend/
├── Modelos/
│   ├── Pago.php                    # Modelo de Pagos
│   ├── HistorialPago.php           # Auditoría de cambios en pagos
│   ├── Reembolso.php               # Gestión de reembolsos
│   ├── MetricasDashboard.php       # Almacenamiento de métricas
│   └── AuditoriaTransaccion.php    # Auditoría de transacciones
├── Controllers/
│   ├── PagosController.php         # CRUD y gestión de pagos
│   ├── ReembolsosController.php    # Gestión de reembolsos
│   └── DashboardController.php     # Reportes y métricas
├── Services/
│   ├── PagoService.php             # Lógica de pagos
│   └── DashboardService.php        # Lógica de dashboard
├── Routes/
│   └── pagos_dashboard.php         # Definición de rutas API
```

---

## Base de Datos

### Tablas Principales

#### `pagos`
- Almacena todos los pagos procesados
- Relaciones: Pedido, Usuario
- Estados: pendiente, procesando, completado, fallido, reembolsado

```sql
CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_usuario INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('tarjeta_credito', 'tarjeta_debito', ...) NOT NULL,
    numero_transaccion VARCHAR(100) UNIQUE NOT NULL,
    estado ENUM('pendiente', 'procesando', 'completado', 'fallido', 'reembolsado'),
    ...
)
```

#### `historial_pagos`
- Registro de cambios de estado de pagos
- Auditoría completa de transiciones

#### `reembolsos`
- Solicitudes de devolución de dinero
- Estados: solicitado, aprobado, rechazado, procesado
- Razones: cliente_solicitud, producto_defectuoso, cambio_de_opinion, etc.

#### `metricas_dashboard`
- Almacenamiento diario de métricas
- Una entrada por día
- Contiene: ventas, ordenes, clientes, reembolsos, etc.

#### `auditoria_transacciones`
- Registro completo de eventos
- Trazabilidad de todas las operaciones

---

## Modelos Eloquent

### Pago Model

```php
// Estados
Pago::ESTADO_PENDIENTE      // 'pendiente'
Pago::ESTADO_PROCESANDO     // 'procesando'
Pago::ESTADO_COMPLETADO     // 'completado'
Pago::ESTADO_FALLIDO        // 'fallido'
Pago::ESTADO_REEMBOLSADO    // 'reembolsado'

// Métodos de pago
Pago::METODO_TARJETA_CREDITO
Pago::METODO_TRANSFERENCIA
Pago::METODO_MERCADO_PAGO
Pago::METODO_YAPE
Pago::METODO_PLIN
// ... más

// Relaciones
$pago->pedido()              // Relación con Pedido
$pago->usuario()             // Relación con Usuario
$pago->historial()           // Historial de cambios
$pago->reembolsos()          // Reembolsos asociados
$pago->auditoria()           // Auditoría

// Scopes útiles
Pago::completados()          // Solo pagos completados
Pago::pendientes()           // Solo pendientes
Pago::estado('completado')   // Filtrar por estado
Pago::metodoPago('mercado_pago')
Pago::fechas($desde, $hasta)
Pago::usuario($idUsuario)
```

### Reembolso Model

```php
// Estados
Reembolso::ESTADO_SOLICITADO   // 'solicitado'
Reembolso::ESTADO_APROBADO     // 'aprobado'
Reembolso::ESTADO_RECHAZADO    // 'rechazado'
Reembolso::ESTADO_PROCESADO    // 'procesado'

// Métodos importantes
$reembolso->aprobar($usuarioId)
$reembolso->rechazar()
$reembolso->procesar()
```

---

## Controllers

### PagosController

#### Endpoints CRUD

```php
// Listar pagos con filtros
GET /api/pagos
// Query parameters: estado, metodo_pago, id_usuario, desde, hasta

// Crear pago
POST /api/pagos
// Body: id_pedido, id_usuario, monto, metodo_pago, numero_transaccion

// Obtener pago
GET /api/pagos/{id}

// Actualizar pago
PUT /api/pagos/{id}

// Eliminar pago
DELETE /api/pagos/{id}
```

#### Gestión de Estado

```php
// Completar pago
POST /api/pagos/{id}/completar
// Body: comentario (opcional)

// Marcar como fallido
POST /api/pagos/{id}/fallido
// Body: comentario
```

#### Conexión Pagos-Pedidos

```php
// Pagos de un pedido
GET /api/pagos/pedido/{idPedido}

// Pagos de un usuario
GET /api/pagos/usuario/{idUsuario}
```

---

### DashboardController

#### Resumen General

```php
// Resumen del dashboard
GET /api/dashboard/resumen
// Query: desde, hasta (fechas opcionales)
// Retorna: total_ventas, ordenes, clientes, etc.
```

#### Métricas

```php
// Métricas del día
GET /api/dashboard/metricas/hoy

// Métricas por rango
GET /api/dashboard/metricas/rango
// Query: desde, hasta

// Recalcular métricas
POST /api/dashboard/metricas/recalcular
// Body: fecha
```

#### Reportes Detallados

```php
// Detalle de ventas
GET /api/dashboard/ventas/detalle
// Query: desde, hasta

// Ventas por método de pago
GET /api/dashboard/ventas/por-metodo
// Query: desde, hasta

// Tendencia de ventas
GET /api/dashboard/ventas/tendencia
// Query: dias (por defecto 30)

// Reporte de reembolsos
GET /api/dashboard/reportes/reembolsos
// Query: desde, hasta

// Estado de órdenes
GET /api/dashboard/reportes/ordenes

// Reporte de clientes
GET /api/dashboard/reportes/clientes
```

---

## Endpoints API

### Resumen Completo

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/pagos` | Listar todos los pagos |
| `POST` | `/api/pagos` | Crear nuevo pago |
| `GET` | `/api/pagos/{id}` | Obtener pago |
| `PUT` | `/api/pagos/{id}` | Actualizar pago |
| `DELETE` | `/api/pagos/{id}` | Eliminar pago |
| `POST` | `/api/pagos/{id}/completar` | Completar pago |
| `POST` | `/api/pagos/{id}/fallido` | Marcar como fallido |
| `GET` | `/api/pagos/pedido/{idPedido}` | Pagos del pedido |
| `GET` | `/api/pagos/usuario/{idUsuario}` | Pagos del usuario |
| `GET` | `/api/pagos/data/metodos` | Métodos disponibles |
| `GET` | `/api/pagos/data/estados` | Estados disponibles |

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/reembolsos` | Listar reembolsos |
| `POST` | `/api/reembolsos` | Solicitar reembolso |
| `GET` | `/api/reembolsos/{id}` | Obtener reembolso |
| `POST` | `/api/reembolsos/{id}/aprobar` | Aprobar reembolso |
| `POST` | `/api/reembolsos/{id}/rechazar` | Rechazar reembolso |
| `POST` | `/api/reembolsos/{id}/procesar` | Procesar reembolso |

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/dashboard/resumen` | Resumen general |
| `GET` | `/api/dashboard/metricas/hoy` | Métricas del día |
| `GET` | `/api/dashboard/metricas/rango` | Métricas por rango |
| `POST` | `/api/dashboard/metricas/recalcular` | Recalcular |
| `GET` | `/api/dashboard/ventas/detalle` | Detalle ventas |
| `GET` | `/api/dashboard/ventas/por-metodo` | Ventas por método |
| `GET` | `/api/dashboard/ventas/tendencia` | Tendencia |
| `GET` | `/api/dashboard/reportes/reembolsos` | Reporte reembolsos |
| `GET` | `/api/dashboard/reportes/ordenes` | Estado órdenes |
| `GET` | `/api/dashboard/reportes/clientes` | Reporte clientes |

---

## Servicios

### PagoService

```php
use App\Services\PagoService;

// Procesar pago completado
PagoService::procesarPagoCompletado($idPago);

// Procesar reembolso
PagoService::procesarReembolsoPago($idReembolso);

// Obtener estado de pago
$estado = PagoService::obtenerEstadoPago($idPedido);

// Validar si pago puede procesarse
$validacion = PagoService::validarPagoProcesable($idPago);

// Generar número de transacción
$numero = PagoService::generarNumeroTransaccion();

// Obtener historial
$historial = PagoService::obtenerHistorialPago($idPago);
```

### DashboardService

```php
use App\Services\DashboardService;

// Calcular métricas completas
$metricas = DashboardService::calcularMetricasCompletas($fecha);

// Tasa de conversión
$tasa = DashboardService::calcularTasaConversion($desde, $hasta);

// Tasa de devolución
$tasa = DashboardService::calcularTasaDevolucion($desde, $hasta);

// Resumen ejecutivo
$resumen = DashboardService::obtenerResumenEjecutivo($desde, $hasta);

// Productos más vendidos
$productos = DashboardService::obtenerProductosMasVendidos($limite, $desde, $hasta);

// Categorías con mejor desempeño
$categorias = DashboardService::obtenerCategoriasMejorDesempen~o($limite, $desde, $hasta);
```

---

## Flujos de Negocio

### 1. Crear Pago para Pedido Confirmado

```
1. Usuario confirma pedido
2. Sistema crea pago con estado 'pendiente'
3. Sistema genera número de transacción único
4. Sistema registra en auditoría
5. Usuario realiza pago externo
6. Validar pago en pasarela
7. PATCH /api/pagos/{id}/completar
8. Sistema actualiza estado de pedido a 'pagado'
9. Historial y auditoría se registran
```

### 2. Proceso de Reembolso

```
Solicitud:
1. Cliente solicita reembolso
2. POST /api/reembolsos (estado: 'solicitado')

Aprobación:
3. Admin revisa solicitud
4. POST /api/reembolsos/{id}/aprobar (estado: 'aprobado')

Procesamiento:
5. Sistema procesa reembolso
6. POST /api/reembolsos/{id}/procesar (estado: 'procesado')
7. Pago asociado se marca como 'reembolsado'
8. Auditoria registra todo
```

### 3. Generación de Métricas Diarias

```
1. Cada día (ej: cronjob a las 00:00)
2. Sistema ejecuta DashboardService::calcularMetricasCompletas()
3. Se guarda en tabla metricas_dashboard
4. Contiene: ventas, ordenes, clientes, reembolsos, etc.
5. Dashboard consulta este histórico
```

---

## Ejemplos de Uso

### Crear Pago

```bash
curl -X POST http://localhost/api/pagos \
  -H "Content-Type: application/json" \
  -d '{
    "id_pedido": 1,
    "id_usuario": 5,
    "monto": 299.99,
    "metodo_pago": "mercado_pago",
    "numero_transaccion": "TXN-20250116120000-ABC123XY",
    "descripcion": "Pago de pedido #1"
  }'
```

### Completar Pago

```bash
curl -X POST http://localhost/api/pagos/1/completar \
  -H "Content-Type: application/json" \
  -d '{
    "comentario": "Pago validado exitosamente"
  }'
```

### Solicitar Reembolso

```bash
curl -X POST http://localhost/api/reembolsos \
  -H "Content-Type: application/json" \
  -d '{
    "id_pago": 1,
    "id_pedido": 1,
    "monto_reembolso": 299.99,
    "razon": "cliente_solicitud",
    "descripcion": "Cliente cambió de opinión"
  }'
```

### Obtener Resumen Dashboard

```bash
curl -X GET "http://localhost/api/dashboard/resumen?desde=2025-01-01&hasta=2025-01-31"
```

### Obtener Tendencia de Ventas

```bash
curl -X GET "http://localhost/api/dashboard/ventas/tendencia?dias=30"
```

---

## Integración en Rutas

En tu archivo `routes/api.php`, incluye:

```php
// Importar rutas de pagos y dashboard
include_once base_path('Backend/Routes/pagos_dashboard.php');
```

---

## Notas de Seguridad

✅ Todos los endpoints deben estar protegidos con **autenticación JWT**
✅ Validar permisos según rol de usuario
✅ Registrar auditoría de todas las operaciones
✅ Encriptar datos sensibles (números de tarjeta, etc.)
✅ Usar transacciones DB para operaciones críticas
✅ Validar monto vs pedido antes de procesar

---

## Mantenimiento

### Tareas Cron Recomendadas

```php
// App/Console/Kernel.php

$schedule->call(function () {
    \App\Services\DashboardService::calcularMetricasCompletas();
})->dailyAt('00:00');

// Limpiar auditoría antigua (> 1 año)
$schedule->call(function () {
    AuditoriaTransaccion::where('fecha_evento', '<', now()->subYear())
        ->delete();
})->monthly();
```

---

**Documento Generado:** 16/01/2025  
**Versión:** 1.0  
**Estado:** Completo

