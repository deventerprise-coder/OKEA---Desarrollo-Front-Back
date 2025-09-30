# 📊 OKEA E-COMMERCE - BASE DE DATOS MARKETING

**Desarrollador:** Luis  
**Fecha:** 2025-09-26  
**Módulo:** Backend 3 - Marketing y Experiencia de Usuario con Seguridad Reforzada

---

## 📋 ÍNDICE

1. [Descripción General](#descripción-general)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Sistema de Seguridad](#sistema-de-seguridad)
5. [Esquema de Base de Datos](#esquema-de-base-de-datos)
6. [Triggers y Stored Procedures](#triggers-y-stored-procedures)
7. [Testing y Validaciones](#testing-y-validaciones)
8. [Guía de Uso](#guía-de-uso)

---

## 🎯 DESCRIPCIÓN GENERAL

Este módulo implementa el sistema de **Marketing y Experiencia de Usuario** para OKEA E-commerce con **seguridad reforzada**, incluyendo:

- ✅ **Gestión de Ofertas y Promociones con Validaciones**
- ✅ **Sistema de Banners Dinámicos con Auditoría**
- ✅ **Lista de Favoritos de Usuarios**
- ✅ **Sistema de Cupones de Descuento Seguro**
- ✅ **Newsletter y Suscripciones con Protección GDPR**
- ✅ **Triggers de Seguridad y Auditoría**
- ✅ **Stored Procedures con Validaciones**
- ✅ **Testing Completo con +25 Consultas**

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
Database/
├── README.md                                        # 📖 Documentación completa
├── 01_estructura_tablas_marketing_luis.sql          # 🏗️ Creación de todas las tablas
├── 02_seguridad_triggers_procedures_marketing_luis.sql # 🔒 Seguridad, triggers y procedimientos
├── 03_datos_reales_testeo_luis.sql                  # 🧪 Testing avanzado con datos reales
└── Backups/                                         # 💾 Respaldos de la base de datos
```

### 📄 **Descripción Detallada de Archivos:**

#### **1. `01_estructura_tablas_marketing_luis.sql`**
- **Propósito:** Creación limpia de la estructura completa de la base de datos
- **Contenido:**
  - Creación de la base de datos `okea_marketing`
  - 7 tablas principales con campos de seguridad
  - Constraints avanzados y validaciones
  - Índices optimizados para rendimiento
  - Configuración de seguridad inicial

#### **2. `02_seguridad_triggers_procedures_marketing_luis.sql`**
- **Propósito:** Sistema completo de seguridad y funcionalidades avanzadas
- **Contenido:**
  - 8+ triggers de auditoría automática
  - 3 stored procedures seguros con validaciones
  - 2 funciones de utilidad y validación
  - 2 vistas de monitoreo de seguridad
  - Sistema integral de testing básico
  - Datos de prueba con validaciones

#### **3. `03_datos_reales_testeo_luis.sql`**
- **Propósito:** Testing exhaustivo con datos reales y consultas avanzadas
- **Contenido:**
  - Datos masivos reales (50+ registros de prueba)
  - 15+ consultas de búsqueda avanzadas
  - 7 consultas adicionales de análisis temporal
  - 4 test cases de casos extremos (edge cases)
  - 2 performance tests complejos
  - 3 integrity tests de verificación
  - Reporte ejecutivo con KPIs financieros

---

## 🚀 INSTALACIÓN Y CONFIGURACIÓN

### Prerrequisitos
- **MySQL 8.0+** o **MariaDB 10.5+**
- **MySQL Workbench** (recomendado para ejecución de scripts)
- **Permisos de administrador** en la base de datos
- **Mínimo 1GB RAM** libre para procesamiento de datos masivos

### Pasos de Instalación (ORDEN OBLIGATORIO)

#### **Paso 1: Estructura Base**
```sql
-- En MySQL Workbench, abrir y ejecutar:
01_estructura_tablas_marketing_luis.sql

-- Verificación:
USE okea_marketing;
SHOW TABLES;
-- Debe mostrar: auditoria_seguridad, banners, cupones, newsletter, ofertas, favoritos, cupones_uso
```

#### **Paso 2: Sistema de Seguridad**
```sql
-- En MySQL Workbench, abrir y ejecutar:
02_seguridad_triggers_procedures_marketing_luis.sql

-- Verificación:
SHOW TRIGGERS;
SHOW PROCEDURE STATUS WHERE db = 'okea_marketing';
```

#### **Paso 3: Datos de Prueba y Testing**
```sql
-- En MySQL Workbench, abrir y ejecutar:
03_datos_reales_testeo_luis.sql

-- Verificación automática incluida en el script
-- El script ejecuta más de 25 consultas de validación
```

### ⚡ **Script de Instalación Rápida**
```sql
-- Ejecutar en orden:
SOURCE 01_estructura_tablas_marketing_luis.sql;
SOURCE 02_seguridad_triggers_procedures_marketing_luis.sql;
SOURCE 03_datos_reales_testeo_luis.sql;
```

---

## 🔒 SISTEMA DE SEGURIDAD

### Características de Seguridad Implementadas

#### 1. **Auditoría Completa**
- **Tabla de auditoría:** `auditoria_seguridad`
- **Registro automático** de todas las operaciones críticas (INSERT, UPDATE, DELETE)
- **Almacenamiento de datos** anteriores y nuevos en formato JSON
- **Rastreo completo** de usuario, IP y timestamp para cada operación
- **Retención configurable** de logs con limpieza automática GDPR

#### 2. **Triggers de Seguridad Implementados**
- **`tr_banners_insert/update/delete`:** Auditoría completa de banners
- **`tr_cupones_insert/update`:** Seguimiento de cambios en cupones
- **`tr_cupones_uso_insert`:** Validación y auditoría de uso de cupones
- **`tr_cupones_uso_update_contador`:** Actualización automática de contadores
- **`tr_newsletter_insert`:** Registro de nuevas suscripciones

#### 3. **Stored Procedures Seguros**
- **`sp_aplicar_cupon_seguro`:** Aplicación segura de cupones con múltiples validaciones
- **`sp_crear_oferta_segura`:** Creación de ofertas con controles de integridad
- **`sp_limpiar_datos_sensibles`:** Cumplimiento GDPR para limpieza de datos

#### 4. **Constraints y Validaciones**
- **Validación de porcentajes** de descuento (1-100%)
- **Validación de precios** positivos obligatorios
- **Validación de fechas** de vigencia coherentes
- **Constraints personalizados** para integridad de datos
- **Prevención de fraudes** en sistema de cupones

---

## 📊 ESQUEMA DE BASE DE DATOS

### Tablas Principales Implementadas

#### **`auditoria_seguridad`** - Sistema de Auditoría
```sql
- id_auditoria (PK AUTO_INCREMENT)
- tabla_afectada VARCHAR(50) - Tabla que fue modificada
- operacion ENUM('INSERT', 'UPDATE', 'DELETE') - Tipo de operación
- id_registro INT - ID del registro afectado
- usuario VARCHAR(100) - Usuario que realizó la operación
- ip_address VARCHAR(45) - Dirección IP del usuario
- datos_anteriores JSON - Estado previo del registro
- datos_nuevos JSON - Estado posterior del registro
- fecha_operacion TIMESTAMP - Momento exacto de la operación
- observaciones TEXT - Notas adicionales
```

#### **`banners`** - Gestión de Banners Promocionales
```sql
- id_banner (PK AUTO_INCREMENT)
- titulo VARCHAR(255) NOT NULL - Título del banner
- subtitulo VARCHAR(255) - Subtítulo opcional
- imagen_url VARCHAR(500) NOT NULL - URL de la imagen
- enlace_url VARCHAR(500) - URL de destino
- seccion ENUM('home_principal', 'home_secundario', 'categoria', 'producto', 'ofertas', 'footer')
- orden INT DEFAULT 0 - Orden de visualización
- activo TINYINT(1) DEFAULT 1 - Estado activo/inactivo
- fecha_inicio/fecha_fin DATETIME - Período de vigencia
- usuario_creacion/modificacion VARCHAR(100) - Trazabilidad de usuarios
- fechas de auditoría automáticas
```

#### **`cupones`** - Sistema de Cupones con Seguridad Reforzada
```sql
- id_cupon (PK AUTO_INCREMENT)
- codigo VARCHAR(50) NOT NULL UNIQUE - Código único del cupón
- descripcion TEXT - Descripción del cupón
- tipo_descuento ENUM('porcentaje', 'monto_fijo') - Tipo de descuento
- valor_descuento DECIMAL(10,2) NOT NULL - Valor del descuento
- monto_minimo DECIMAL(10,2) DEFAULT 0 - Monto mínimo requerido
- usos_maximos INT DEFAULT NULL - Límite de usos (NULL = ilimitado)
- usos_actuales INT DEFAULT 0 - Contador automático de usos
- fecha_inicio/fecha_fin DATETIME - Período de vigencia
- activo TINYINT(1) DEFAULT 1 - Estado del cupón
- usuario_creacion/modificacion VARCHAR(100) - Trazabilidad
- Constraints: CHK valor_descuento > 0, CHK porcentaje <= 100
```

#### **`ofertas`** - Ofertas de Productos con Validaciones
```sql
- id_oferta (PK AUTO_INCREMENT)
- id_producto INT NOT NULL - Referencia al producto
- nombre_producto VARCHAR(255) - Nombre del producto
- descuento_porcentaje DECIMAL(5,2) NOT NULL - Porcentaje de descuento (1-100%)
- precio_original/precio_oferta DECIMAL(10,2) - Precios
- fecha_inicio/fecha_fin DATETIME - Período de vigencia
- activo TINYINT(1) DEFAULT 1 - Estado de la oferta
- usuario_creacion/modificacion VARCHAR(100) - Trazabilidad
- Constraints: CHK descuento 1-100%, CHK precio > 0, CHK fecha_fin > fecha_inicio
```

#### **`newsletter`** - Suscripciones con Protección GDPR
```sql
- id_suscripcion (PK AUTO_INCREMENT)
- email VARCHAR(255) NOT NULL UNIQUE - Email único validado
- nombre VARCHAR(100) - Nombre del suscriptor
- estado ENUM('activo', 'inactivo', 'bloqueado') DEFAULT 'activo'
- fecha_suscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- fecha_confirmacion TIMESTAMP NULL - Confirmación de email
- token_confirmacion VARCHAR(100) - Token de verificación
- fecha_baja TIMESTAMP NULL - Fecha de baja
- motivo_baja TEXT - Razón de la baja
- ip_suscripcion VARCHAR(45) - IP de registro para auditoría
```

#### **`favoritos`** - Lista de Favoritos de Usuarios
```sql
- id_favorito (PK AUTO_INCREMENT)
- id_usuario INT NOT NULL - ID del usuario
- id_producto INT NOT NULL - ID del producto
- email_usuario VARCHAR(255) - Email del usuario (redundante para consultas)
- nombre_producto VARCHAR(255) - Nombre del producto (redundante)
- creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- ip_usuario VARCHAR(45) - IP para auditoría
- UNIQUE KEY unique_favorito_temp (id_usuario, id_producto) - Previene duplicados
```

#### **`cupones_uso`** - Registro de Uso de Cupones
```sql
- id_uso (PK AUTO_INCREMENT)
- id_cupon INT NOT NULL REFERENCES cupones(id_cupon)
- id_usuario INT NOT NULL - Usuario que usó el cupón
- id_pedido INT - Referencia al pedido (opcional)
- email_usuario VARCHAR(255) - Email del usuario
- monto_pedido DECIMAL(10,2) - Monto del pedido
- fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- ip_usuario VARCHAR(45) - IP para auditoría
- detalles_uso JSON - Detalles adicionales en formato JSON
```

---

## ⚙️ TRIGGERS Y STORED PROCEDURES

### Triggers Implementados (8 triggers activos)

#### **Triggers de Auditoría Automática**
- **`tr_banners_insert`:** Registra creación de banners
- **`tr_banners_update`:** Registra modificaciones de banners
- **`tr_banners_delete`:** Registra eliminación de banners
- **`tr_cupones_insert`:** Registra creación de cupones
- **`tr_cupones_update`:** Registra modificaciones de cupones
- **`tr_newsletter_insert`:** Registra nuevas suscripciones

#### **Triggers de Validación y Control**
- **`tr_cupones_uso_insert`:** Valida uso de cupones antes de permitir la operación
  - Verifica estado activo del cupón
  - Valida fechas de vigencia
  - Controla límites de uso disponibles
  - Registra auditoría del uso
- **`tr_cupones_uso_update_contador`:** Actualiza automáticamente el contador de usos

### Stored Procedures Implementados (3 procedures)

#### **`sp_aplicar_cupon_seguro`** - Aplicación Segura de Cupones
**Parámetros de entrada:**
- `p_codigo_cupon VARCHAR(50)` - Código del cupón
- `p_id_usuario INT` - ID del usuario
- `p_email_usuario VARCHAR(255)` - Email del usuario
- `p_monto_pedido DECIMAL(10,2)` - Monto del pedido
- `p_ip_usuario VARCHAR(45)` - IP del usuario

**Parámetros de salida:**
- `p_descuento DECIMAL(10,2)` - Descuento calculado
- `p_mensaje VARCHAR(500)` - Mensaje de resultado

**Validaciones incluidas:**
- Verificación de existencia del cupón
- Validación de estado activo
- Control de vigencia temporal
- Verificación de usos disponibles
- Validación de monto mínimo
- Cálculo seguro de descuentos
- Registro automático del uso

#### **`sp_crear_oferta_segura`** - Creación Segura de Ofertas
**Parámetros:** ID producto, nombre, descuento%, precio original, fechas, usuario
**Validaciones:** Porcentajes 1-100%, precios positivos, fechas coherentes

#### **`sp_limpiar_datos_sensibles`** - Limpieza GDPR
**Parámetros:** Días de antigüedad
**Funcionalidad:** Limpia registros antiguos de auditoría y anonimiza datos

### Funciones de Utilidad (2 funciones)

#### **`fn_validar_email`** - Validación de Formato de Email
```sql
RETURN TINYINT (1 = válido, 0 = inválido)
Valida formato usando expresiones regulares
```

#### **`fn_calcular_descuento_seguro`** - Cálculo Seguro de Descuentos
```sql
Parámetros: monto, tipo_descuento, valor_descuento
RETURN DECIMAL(10,2) - Descuento calculado con validaciones
```

---

## 🧪 TESTING Y VALIDACIONES

### Sistema de Testing Implementado (25+ Consultas)

#### **Testing Básico (Archivo 2)**
- **6 fases** de testing integral
- **Verificación de triggers** de auditoría
- **Testing de stored procedures** con casos reales
- **Validación de funciones** de utilidad
- **Verificación de constraints** y validaciones

#### **Testing Avanzado (Archivo 3)**

##### **📊 Consultas de Búsqueda Reales (8 consultas)**
1. **Productos por rango de descuento** (20%-40%)
2. **Cupones por tipo y vigencia**
3. **Top 10 productos más favoritos**
4. **Análisis de efectividad de cupones**
5. **Ofertas por rango de precios**
6. **Newsletter por dominio de email**
7. **Productos con poca actividad**
8. **Búsqueda por texto en nombres**

##### **🔍 Consultas Avanzadas Adicionales (7 consultas)**
9. **Análisis temporal** - Ofertas por mes de vigencia
10. **Segmentación de usuarios** por comportamiento (VIP, Premium, Activo)
11. **Correlación precio-popularidad** por categorías
12. **Detección de patrones sospechosos** en cupones
13. **Análisis de rendimiento** de banners por sección
14. **Análisis de estacionalidad** en cupones
15. **Productos huérfanos** y optimización de inventario

##### **⚠️ Testing de Casos Extremos (4 test cases)**
- **TEST CASE 1:** Cupones con fechas límite (expiran hoy, futuros, expirados)
- **TEST CASE 2:** Ofertas con descuentos extremos (1%, 99%, precios altos)
- **TEST CASE 3:** Stress test - Usuario con 8+ favoritos
- **TEST CASE 4:** Newsletter con emails edge cases (muy cortos, muy largos, símbolos)

##### **⚡ Tests de Performance (2 tests)**
- **PERFORMANCE TEST 1:** Dashboard ejecutivo completo con múltiples JOINs
- **PERFORMANCE TEST 2:** Análisis de tendencias semanales

##### **🔒 Tests de Integridad (3 tests)**
- **INTEGRITY TEST 1:** Verificación de integridad referencial
- **INTEGRITY TEST 2:** Validación de cálculos matemáticos
- **INTEGRITY TEST 3:** Detección de duplicados

### **📈 KPIs y Métricas Incluidas**
- **Conversión de cupones** (tasa de uso)
- **Engagement de productos** (favoritos vs ofertas)
- **Análisis financiero** (ingresos, descuentos otorgados)
- **Métricas de usuarios** (segmentación, comportamiento)
- **Métricas de seguridad** (operaciones auditadas)

---

## 📖 GUÍA DE USO

### Para Desarrolladores

#### **Conexión y Verificación**
```sql
-- Seleccionar la base de datos
USE okea_marketing;

-- Verificar tablas creadas
SHOW TABLES;

-- Verificar triggers activos
SHOW TRIGGERS;

-- Verificar stored procedures
SHOW PROCEDURE STATUS WHERE db = 'okea_marketing';
```

#### **Consultas Comunes de Desarrollo**

**Obtener banners activos por sección:**
```sql
SELECT id_banner, titulo, subtitulo, imagen_url, enlace_url, orden
FROM banners 
WHERE activo = 1 AND seccion = 'home_principal'
  AND (fecha_inicio IS NULL OR fecha_inicio <= NOW())
  AND (fecha_fin IS NULL OR fecha_fin >= NOW())
ORDER BY orden ASC;
```

**Verificar cupones vigentes:**
```sql
SELECT codigo, descripcion, tipo_descuento, valor_descuento, monto_minimo,
       CASE WHEN NOW() BETWEEN fecha_inicio AND fecha_fin THEN 'VIGENTE' ELSE 'EXPIRADO' END as estado,
       COALESCE(usos_maximos, 'Ilimitado') as usos_maximos,
       usos_actuales
FROM cupones 
WHERE activo = 1;
```

**Aplicar cupón de forma segura:**
```sql
CALL sp_aplicar_cupon_seguro(
    'BIENVENIDO15',           -- Código del cupón
    1001,                     -- ID del usuario
    'usuario@email.com',      -- Email del usuario
    150.00,                   -- Monto del pedido
    '192.168.1.100',          -- IP del usuario
    @descuento,               -- OUT: Descuento calculado
    @mensaje                  -- OUT: Mensaje de resultado
);
SELECT @descuento as descuento_aplicado, @mensaje as resultado;
```

### Para Administradores

#### **Monitoreo de Seguridad**
```sql
-- Verificar operaciones sospechosas
SELECT * FROM v_cupones_sospechosos;

-- Revisar auditoría crítica de las últimas 24 horas
SELECT tabla_afectada, operacion, COUNT(*) as operaciones
FROM v_auditoria_critica 
WHERE fecha_operacion >= DATE_SUB(NOW(), INTERVAL 1 DAY)
  AND nivel_criticidad = 'CRÍTICO'
GROUP BY tabla_afectada, operacion;

-- Ver últimas operaciones de auditoría
SELECT tabla_afectada, operacion, usuario, fecha_operacion, observaciones
FROM auditoria_seguridad
ORDER BY fecha_operacion DESC
LIMIT 20;
```

#### **Mantenimiento GDPR y Limpieza**
```sql
-- Limpiar datos antiguos (ejecutar mensualmente)
CALL sp_limpiar_datos_sensibles(90, @registros_limpiados);
SELECT @registros_limpiados as 'Registros procesados';

-- Verificar estado de suscriptores newsletter
SELECT estado, COUNT(*) as total,
       COUNT(CASE WHEN fecha_confirmacion IS NOT NULL THEN 1 END) as confirmados
FROM newsletter
GROUP BY estado;
```

### Para Analistas de Datos

#### **Consultas de Análisis de Negocio**
```sql
-- Análisis de efectividad de cupones
SELECT c.codigo, c.descripcion, c.usos_actuales,
       COUNT(cu.id_uso) as usos_reales,
       COALESCE(SUM(cu.monto_pedido), 0) as ingresos_generados,
       CASE 
           WHEN COUNT(cu.id_uso) = 0 THEN 'SIN USO'
           WHEN COUNT(cu.id_uso) <= 5 THEN 'USO BAJO'
           ELSE 'USO ALTO'
       END as categoria_uso
FROM cupones c
LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
WHERE c.activo = 1
GROUP BY c.id_cupon
ORDER BY usos_reales DESC;

-- Top productos más favoritos
SELECT f.nombre_producto, COUNT(*) as total_favoritos,
       COUNT(DISTINCT f.id_usuario) as usuarios_unicos
FROM favoritos f
GROUP BY f.id_producto, f.nombre_producto
ORDER BY total_favoritos DESC
LIMIT 10;
```

---

## 📈 ESTADÍSTICAS DEL SISTEMA

### **Capacidad y Rendimiento**
- **Base de datos:** `okea_marketing` con charset UTF8MB4
- **Tablas:** 7 tablas principales optimizadas
- **Índices:** 15+ índices estratégicos para consultas frecuentes
- **Triggers:** 8 triggers activos de auditoría y validación
- **Procedures:** 3 stored procedures con validaciones complejas
- **Funciones:** 2 funciones de utilidad
- **Vistas:** 2 vistas de monitoreo de seguridad

### **Seguridad y Auditoría**
- **100% de operaciones críticas auditadas** automáticamente
- **Validaciones múltiples** antes de operaciones sensibles
- **Cumplimiento GDPR** con limpieza automática programable
- **Prevención de fraudes** en sistema de cupones
- **Trazabilidad completa** de usuarios y operaciones

### **Testing y Quality Assurance**
- **25+ consultas de testing** automatizadas
- **4 niveles de testing:** Básico, Avanzado, Casos Extremos, Performance
- **Cobertura completa** de funcionalidades críticas
- **Validación de edge cases** y situaciones de error
- **KPIs financieros** y métricas de negocio incluidas

---

## 🚨 NOTAS IMPORTANTES

### **Seguridad Crítica**
- ⚠️ **NUNCA deshabilitar** los triggers de auditoría en producción
- 🔍 **Revisar logs** de auditoría semanalmente
- 🧹 **Ejecutar limpieza GDPR** mensualmente (`sp_limpiar_datos_sensibles`)
- 🛡️ **Monitorear** la vista `v_cupones_sospechosos` diariamente

### **Respaldos y Recuperación**
- 💾 **Respaldar** antes de cualquier actualización de estructura
- 🧪 **Probar restauración** en ambiente de desarrollo mensualmente
- 📦 **Mantener** al menos 3 copias de seguridad (diaria, semanal, mensual)
- 🗂️ **Documentar** todos los cambios de esquema

### **Performance y Mantenimiento**
- 📊 **Ejecutar** `03_datos_reales_testeo_luis.sql` para verificar rendimiento
- 🔧 **Optimizar** índices basado en consultas más frecuentes
- 📈 **Monitorear** crecimiento de tabla `auditoria_seguridad`
- 🧽 **Limpiar** datos de testing después de ir a producción

### **Contacto y Soporte**
**Desarrollador:** Luis  
**Email:** luis@okea.com  
**Módulo:** Backend 3 - Marketing  
**Fecha última actualización:** 2025-09-26  
**Versión del sistema:** 3.0 (Producción Ready)

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### ✅ **Pre-Instalación**
- [ ] MySQL 8.0+ instalado y funcionando
- [ ] Usuario con permisos de administrador creado
- [ ] MySQL Workbench o cliente SQL configurado
- [ ] Respaldo de cualquier data existente realizado

### ✅ **Instalación**
- [ ] `01_estructura_tablas_marketing_luis.sql` ejecutado exitosamente
- [ ] `02_seguridad_triggers_procedures_marketing_luis.sql` ejecutado sin errores
- [ ] `03_datos_reales_testeo_luis.sql` ejecutado y validado
- [ ] Verificación de 7 tablas creadas
- [ ] Verificación de 8 triggers activos
- [ ] Verificación de 3 stored procedures

### ✅ **Post-Instalación**
- [ ] Testing básico ejecutado y aprobado
- [ ] Testing avanzado completado
- [ ] Datos de prueba cargados correctamente
- [ ] Sistema de auditoría funcionando
- [ ] Consultas de validación ejecutadas
- [ ] Documentación revisada y entendida

---

*Este sistema de base de datos ha sido diseñado con los más altos estándares de seguridad, performance y está completamente listo para producción en el e-commerce OKEA.*
