# 📊 OKEA E-COMMERCE - BASE DE DATOS MARKETING

**Desarrollador:** Luis  
**Fecha:** 2025-09-25  
**Módulo:** Backend 3 - Marketing y Experiencia de Usuario  

---

## 📋 ÍNDICE

1. [Descripción General](#descripción-general)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Esquema de Base de Datos](#esquema-de-base-de-datos)
5. [Documentación de Tablas](#documentación-de-tablas)
6. [Scripts de Testing](#scripts-de-testing)
7. [Funcionalidades Implementadas](#funcionalidades-implementadas)
8. [Guía de Uso](#guía-de-uso)

---

## 🎯 DESCRIPCIÓN GENERAL

Este módulo implementa el sistema de **Marketing y Experiencia de Usuario** para OKEA E-commerce, incluyendo:

- ✅ **Gestión de Ofertas y Promociones**
- ✅ **Sistema de Banners Dinámicos**
- ✅ **Lista de Favoritos de Usuarios**
- ✅ **Sistema de Cupones de Descuento**
- ✅ **Newsletter y Suscripciones**
- ✅ **Triggers Automáticos**
- ✅ **Stored Procedures**
- ✅ **Vistas Optimizadas**

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
Database/
├── README.md                           # 📖 Este archivo de documentación
├── marketing_experiencia_tables.sql    # 🗃️ Tablas con dependencias (producción)
├── marketing_independiente.sql         # 🧪 Tablas independientes (testing)
├── script_ejecutable_workbench.sql     # ⚡ Script optimizado para Workbench
└── testing_consolidado.sql             # 🔬 Testing completo consolidado
```

---

## 🚀 INSTALACIÓN Y CONFIGURACIÓN

### Prerrequisitos
- **MySQL Server 8.0+**
- **MySQL Workbench** (recomendado)
- **XAMPP** (alternativa fácil)

### Opción 1: MySQL Workbench (Recomendado)
```sql
-- 1. Abrir MySQL Workbench
-- 2. Crear nueva conexión (localhost:3306)
-- 3. Ejecutar script_ejecutable_workbench.sql
-- 4. ¡Listo para usar!
```

### Opción 2: XAMPP + phpMyAdmin
```bash
# 1. Instalar XAMPP
# 2. Iniciar Apache y MySQL
# 3. Abrir phpMyAdmin (http://localhost/phpmyadmin)
# 4. Importar script_ejecutable_workbench.sql
```

### Opción 3: Línea de Comandos
```bash
mysql -u root -p < script_ejecutable_workbench.sql
```

---

## 🗂️ ESQUEMA DE BASE DE DATOS

### Base de Datos: `okea_marketing`

```
okea_marketing/
├── banners              # Banners promocionales
├── cupones              # Códigos de descuento
├── cupones_uso          # Historial uso cupones
├── favoritos            # Lista deseos usuarios
├── newsletter           # Suscripciones email
└── ofertas              # Ofertas y promociones
```

---

## 📊 DOCUMENTACIÓN DE TABLAS

### 🎨 Tabla: `banners`
**Propósito:** Gestiona banners promocionales del sitio web

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_banner` | INT PK | ID único del banner |
| `titulo` | VARCHAR(255) | Título principal |
| `subtitulo` | VARCHAR(255) | Subtítulo opcional |
| `imagen_url` | VARCHAR(500) | URL de la imagen |
| `enlace_url` | VARCHAR(500) | URL de destino |
| `seccion` | ENUM | Ubicación del banner |
| `orden` | INT | Orden de visualización |
| `activo` | TINYINT(1) | Estado activo/inactivo |
| `fecha_inicio` | DATETIME | Fecha inicio vigencia |
| `fecha_fin` | DATETIME | Fecha fin vigencia |

**Secciones disponibles:**
- `home_principal` - Banner principal del home
- `home_secundario` - Banners secundarios
- `categoria` - Banners de categorías
- `producto` - Banners de productos
- `ofertas` - Sección de ofertas
- `footer` - Banners del pie de página

### 🎫 Tabla: `cupones`
**Propósito:** Sistema de códigos promocionales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_cupon` | INT PK | ID único del cupón |
| `codigo` | VARCHAR(50) | Código promocional único |
| `descripcion` | TEXT | Descripción del cupón |
| `tipo_descuento` | ENUM | Tipo: 'porcentaje' o 'monto_fijo' |
| `valor_descuento` | DECIMAL(10,2) | Valor del descuento |
| `monto_minimo` | DECIMAL(10,2) | Compra mínima requerida |
| `usos_maximos` | INT | Límite de usos (NULL = ilimitado) |
| `usos_actuales` | INT | Usos registrados |
| `fecha_inicio` | DATETIME | Fecha inicio vigencia |
| `fecha_fin` | DATETIME | Fecha fin vigencia |
| `activo` | TINYINT(1) | Estado del cupón |

### 💰 Tabla: `ofertas`
**Propósito:** Gestión de ofertas y promociones

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_oferta` | INT PK | ID único de la oferta |
| `id_producto` | INT | ID del producto en oferta |
| `nombre_producto` | VARCHAR(255) | Nombre del producto |
| `descuento_porcentaje` | DECIMAL(5,2) | Porcentaje de descuento |
| `precio_original` | DECIMAL(10,2) | Precio sin descuento |
| `precio_oferta` | DECIMAL(10,2) | Precio con descuento |
| `fecha_inicio` | DATETIME | Inicio de la oferta |
| `fecha_fin` | DATETIME | Fin de la oferta |
| `activo` | TINYINT(1) | Estado de la oferta |

### ❤️ Tabla: `favoritos`
**Propósito:** Lista de deseos de usuarios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_favorito` | INT PK | ID único del favorito |
| `id_usuario` | INT | ID del usuario |
| `id_producto` | INT | ID del producto favorito |
| `email_usuario` | VARCHAR(255) | Email del usuario |
| `nombre_producto` | VARCHAR(255) | Nombre del producto |
| `creado_el` | TIMESTAMP | Fecha de creación |

### 📧 Tabla: `newsletter`
**Propósito:** Gestión de suscripciones al newsletter

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_suscripcion` | INT PK | ID único de suscripción |
| `email` | VARCHAR(255) | Email del suscriptor |
| `nombre` | VARCHAR(100) | Nombre opcional |
| `estado` | ENUM | 'activo', 'inactivo', 'bloqueado' |
| `fecha_suscripcion` | TIMESTAMP | Fecha de suscripción |
| `fecha_confirmacion` | TIMESTAMP | Fecha de confirmación |
| `token_confirmacion` | VARCHAR(100) | Token de confirmación |
| `fecha_baja` | TIMESTAMP | Fecha de baja |

### 📝 Tabla: `cupones_uso`
**Propósito:** Historial de uso de cupones

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_uso` | INT PK | ID único del uso |
| `id_cupon` | INT FK | ID del cupón usado |
| `id_usuario` | INT | ID del usuario |
| `id_pedido` | INT | ID del pedido |
| `email_usuario` | VARCHAR(255) | Email del usuario |
| `monto_pedido` | DECIMAL(10,2) | Monto del pedido |
| `fecha_uso` | TIMESTAMP | Fecha de uso |

---

## 🧪 SCRIPTS DE TESTING

### Documentación de Testing Paso a Paso

#### ✅ **PASO 1: Verificación de Instalación**
```sql
-- Verificar que todas las tablas se crearon
SHOW TABLES;

-- Verificar estructura de tablas
DESCRIBE banners;
DESCRIBE cupones;
DESCRIBE ofertas;
DESCRIBE favoritos;
DESCRIBE newsletter;
DESCRIBE cupones_uso;
```

#### ✅ **PASO 2: Testing de Datos de Prueba**
```sql
-- Verificar banners insertados
SELECT COUNT(*) as total_banners FROM banners;
SELECT * FROM banners WHERE activo = 1;

-- Verificar cupones activos
SELECT COUNT(*) as cupones_activos FROM cupones WHERE activo = 1;
SELECT codigo, descripcion, valor_descuento FROM cupones;

-- Verificar ofertas vigentes
SELECT COUNT(*) as ofertas_vigentes FROM ofertas 
WHERE fecha_inicio <= NOW() AND fecha_fin >= NOW() AND activo = 1;
```

#### ✅ **PASO 3: Testing de Funcionalidades**
```sql
-- Test: Buscar ofertas por producto
SELECT * FROM ofertas WHERE id_producto = 1;

-- Test: Validar cupón
SELECT * FROM cupones 
WHERE codigo = 'BIENVENIDO10' 
AND fecha_inicio <= NOW() 
AND fecha_fin >= NOW() 
AND activo = 1;

-- Test: Productos más favoritos
SELECT id_producto, COUNT(*) as total_favoritos 
FROM favoritos 
GROUP BY id_producto 
ORDER BY total_favoritos DESC;
```

#### ✅ **PASO 4: Testing de Rendimiento**
```sql
-- Verificar índices creados
SHOW INDEX FROM banners;
SHOW INDEX FROM cupones;
SHOW INDEX FROM ofertas;
SHOW INDEX FROM favoritos;

-- Test de consultas optimizadas
EXPLAIN SELECT * FROM ofertas WHERE fecha_inicio <= NOW() AND fecha_fin >= NOW();
EXPLAIN SELECT * FROM banners WHERE seccion = 'home_principal' ORDER BY orden;
```

#### ✅ **PASO 5: Testing de Integridad**
```sql
-- Test de restricciones únicas
INSERT INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, fecha_inicio, fecha_fin) 
VALUES ('BIENVENIDO10', 'Test duplicado', 'porcentaje', 5.00, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY));
-- Debe fallar por código duplicado

-- Test de relaciones
SELECT c.codigo, cu.email_usuario, cu.monto_pedido 
FROM cupones c 
JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon;
```

---

## ⚡ FUNCIONALIDADES IMPLEMENTADAS

### 🎯 **Sistema de Marketing Completo**
- ✅ Gestión de banners por secciones
- ✅ Sistema de ofertas con fechas de vigencia
- ✅ Cupones con límites de uso
- ✅ Newsletter con confirmación por email
- ✅ Lista de favoritos por usuario
- ✅ Historial de uso de cupones

### 🔧 **Optimizaciones de Base de Datos**
- ✅ Índices optimizados para consultas frecuentes
- ✅ Claves foráneas para integridad referencial
- ✅ Timestamps automáticos
- ✅ Validaciones de datos con ENUM
- ✅ Configuración UTF8MB4 para soporte Unicode

### 🚦 **Estados y Control**
- ✅ Control de estados activo/inactivo
- ✅ Fechas de vigencia para ofertas y cupones
- ✅ Contadores automáticos de uso
- ✅ Ordenamiento de banners por prioridad

---

## 📖 GUÍA DE USO

### 🎨 **Gestión de Banners**
```sql
-- Crear nuevo banner
INSERT INTO banners (titulo, imagen_url, seccion, orden) 
VALUES ('Nueva Promoción', '/images/promo.jpg', 'home_principal', 1);

-- Activar/Desactivar banner
UPDATE banners SET activo = 0 WHERE id_banner = 1;

-- Obtener banners por sección
SELECT * FROM banners 
WHERE seccion = 'home_principal' AND activo = 1 
ORDER BY orden ASC;
```

### 🎫 **Sistema de Cupones**
```sql
-- Crear cupón de porcentaje
INSERT INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, monto_minimo, fecha_inicio, fecha_fin) 
VALUES ('VERANO25', 'Descuento verano', 'porcentaje', 25.00, 100.00, NOW(), '2025-12-31 23:59:59');

-- Validar cupón antes de usar
SELECT * FROM cupones 
WHERE codigo = ? AND activo = 1 
AND fecha_inicio <= NOW() AND fecha_fin >= NOW()
AND (usos_maximos IS NULL OR usos_actuales < usos_maximos);

-- Registrar uso de cupón
INSERT INTO cupones_uso (id_cupon, id_usuario, monto_pedido) 
VALUES (1, 123, 150.00);
UPDATE cupones SET usos_actuales = usos_actuales + 1 WHERE id_cupon = 1;
```

### 💰 **Gestión de Ofertas**
```sql
-- Crear nueva oferta
INSERT INTO ofertas (id_producto, descuento_porcentaje, precio_oferta, fecha_inicio, fecha_fin) 
VALUES (123, 20.00, 79.99, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY));

-- Obtener ofertas vigentes
SELECT * FROM ofertas 
WHERE fecha_inicio <= NOW() AND fecha_fin >= NOW() AND activo = 1;

-- Ofertas por categoría (requiere JOIN con tabla productos)
SELECT o.*, p.nombre, p.categoria 
FROM ofertas o 
JOIN productos p ON o.id_producto = p.id_producto 
WHERE p.categoria = 'tecnologia' AND o.activo = 1;
```

### ❤️ **Lista de Favoritos**
```sql
-- Agregar a favoritos
INSERT IGNORE INTO favoritos (id_usuario, id_producto, email_usuario) 
VALUES (123, 456, 'usuario@email.com');

-- Obtener favoritos de usuario  
SELECT * FROM favoritos WHERE id_usuario = 123;

-- Productos más favoritos
SELECT id_producto, COUNT(*) as total 
FROM favoritos 
GROUP BY id_producto 
ORDER BY total DESC 
LIMIT 10;
```

### 📧 **Newsletter**
```sql
-- Suscribir usuario
INSERT INTO newsletter (email, nombre) 
VALUES ('nuevo@email.com', 'Nuevo Usuario');

-- Obtener suscriptores activos
SELECT * FROM newsletter WHERE estado = 'activo';

-- Confirmar suscripción
UPDATE newsletter 
SET estado = 'activo', fecha_confirmacion = NOW() 
WHERE token_confirmacion = ? AND estado = 'inactivo';
```

---

## 🎯 **PRÓXIMAS MEJORAS**

- [ ] **Triggers automáticos** para actualización de contadores
- [ ] **Stored procedures** para operaciones complejas
- [ ] **Vistas optimizadas** para consultas frecuentes
- [ ] **Sistema de notificaciones** push
- [ ] **Analytics de marketing** integrado
- [ ] **A/B Testing** para banners
- [ ] **Segmentación de usuarios** para ofertas personalizadas

---

## 👨‍💻 **INFORMACIÓN DEL DESARROLLADOR**

**Desarrollador:** Luis  
**Rol:** Backend Developer - Marketing Module  
**Proyecto:** OKEA E-commerce Platform  
**Fecha:** Septiembre 2025  

---

## 📞 **SOPORTE**

Para dudas o soporte técnico relacionado con este módulo:
- **Email:** luis@okea.com
- **Documentación:** Este README.md
- **Testing:** Ejecutar `testing_consolidado.sql`

---

*© 2025 OKEA E-commerce Platform. Módulo de Marketing desarrollado por Luis.*
