-- TABLA DE CATEGORÍAS
CREATE TABLE categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    parent_id BIGINT UNSIGNED NULL,
    level TINYINT UNSIGNED NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    UNIQUE KEY uk_categories_slug (slug),
    INDEX idx_categories_parent_active (parent_id, is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLA PRINCIPAL: PRODUCTOS HÍBRIDOS
-- Un registro puede ser producto simple o producto padre o variante
CREATE TABLE products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    
    -- ARQUITECTURA HÍBRIDA CLAVE
    parent_id BIGINT UNSIGNED NULL, -- NULL = producto simple o padre, NOT NULL = es variante
    product_type ENUM('simple', 'parent', 'variant') NOT NULL DEFAULT 'simple',
    
    -- Información básica (aplica a todos los tipos)
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Relación con categoría
    category_id BIGINT UNSIGNED NOT NULL,
    
    -- Info comercial
    brand VARCHAR(100),
    model VARCHAR(100),
    
    -- IDENTIFICACIÓN UNIFICADA
    sku VARCHAR(100) NOT NULL, -- Único para simples y variantes, prefijo para padres
    barcode VARCHAR(50),
    
    -- PRECIOS (aplica a simples y variantes)
    price DECIMAL(10,2) UNSIGNED,
    compare_price DECIMAL(10,2) UNSIGNED,
    cost_price DECIMAL(10,2) UNSIGNED,
    
    -- INVENTARIO UNIFICADO (solo para simples y variantes)
    stock_quantity INT DEFAULT 0,
    manage_stock BOOLEAN DEFAULT TRUE,
    stock_status ENUM('instock', 'outofstock', 'backorder') DEFAULT 'instock',
    
    -- Configuración de producto
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Imágenes unificadas
    featured_image VARCHAR(255),
    image_gallery JSON, -- ["url1.jpg", "url2.jpg", "url3.jpg"]
    
    -- Auditoría
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    
    -- Clave foránea auto-referencial para variantes
    FOREIGN KEY (parent_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    
    -- RESTRICCIONES DE INTEGRIDAD ARQUITECTÓNICA
    UNIQUE KEY uk_products_slug (slug),
    UNIQUE KEY uk_products_sku (sku),
    
    -- ÍNDICES OPTIMIZADOS PARA QUERIES HÍBRIDAS
    INDEX idx_products_type_active (product_type, is_active),
    INDEX idx_products_parent_active (parent_id, is_active), -- Para variantes
    INDEX idx_products_category_type (category_id, product_type),
    INDEX idx_products_stock_simple (product_type, stock_quantity), -- Solo simples y variantes
    INDEX idx_products_featured (is_featured, is_active),
    
    -- VALIDACIONES ARQUITECTÓNICAS
    CONSTRAINT chk_parent_logic CHECK (
        (product_type = 'simple' AND parent_id IS NULL) OR
        (product_type = 'parent' AND parent_id IS NULL) OR  
        (product_type = 'variant' AND parent_id IS NOT NULL)
    ),
    CONSTRAINT chk_stock_logic CHECK (
        (product_type = 'parent' AND stock_quantity = 0) OR
        (product_type IN ('simple', 'variant'))
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLA DE ATRIBUTOS
CREATE TABLE attributes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL, -- Color, Talla, Material
    slug VARCHAR(100) NOT NULL, -- color, talla, material
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_attributes_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLA DE TÉRMINOS/VALORES
CREATE TABLE attribute_values (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    attribute_id BIGINT UNSIGNED NOT NULL,
    value VARCHAR(100) NOT NULL, -- Rojo, M, Algodón
    slug VARCHAR(100) NOT NULL, -- rojo, m, algodon
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
    UNIQUE KEY uk_terms_attribute_slug (attribute_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLA DE RELACIÓN PRODUCTO-ATRIBUTOS
-- Solo para productos tipo 'variant' y opcionalmente 'simple'
CREATE TABLE product_attributes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id BIGINT UNSIGNED NOT NULL,
    attribute_id BIGINT UNSIGNED NOT NULL,
    attribute_value_id BIGINT UNSIGNED NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_value_id) REFERENCES attribute_values(id) ON DELETE CASCADE,
    
    UNIQUE KEY uk_product_attribute (product_id, attribute_id),
    INDEX idx_product_attributes_product (product_id),
    INDEX idx_product_attributes_term (attribute_value_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- INSERTAR CATEGORÍAS PRINCIPALES (LEVEL 0)
INSERT INTO categories (name, slug, description, level, is_active) VALUES
('Ropa y Accesorios', 'ropa-y-accesorios', 'Toda la moda para hombres, mujeres y niños', 0, TRUE),
('Electrónicos', 'electronicos', 'Tecnología, gadgets y electrodomésticos', 0, TRUE),
('Hogar y Jardín', 'hogar-y-jardin', 'Muebles, decoración y artículos para el hogar', 0, TRUE),
('Deportes', 'deportes', 'Equipos deportivos y artículos de fitness', 0, TRUE),
('Belleza y Cuidado', 'belleza-y-cuidado', 'Cosméticos y productos de cuidado personal', 0, TRUE);

-- INSERTAR SUBCATEGORÍAS (LEVEL 1)
-- Ropa y Accesorios (ID: 1)
INSERT INTO categories (name, slug, description, parent_id, level, is_active) VALUES
('Ropa Hombre', 'ropa-hombre', 'Vestimenta masculina', 1, 1, TRUE),
('Ropa Mujer', 'ropa-mujer', 'Vestimenta femenina', 1, 1, TRUE),
('Zapatos', 'zapatos', 'Calzado para toda la familia', 1, 1, TRUE),
('Accesorios', 'accesorios', 'Complementos y accesorios de moda', 1, 1, TRUE);

-- Electrónicos (ID: 2)
INSERT INTO categories (name, slug, description, parent_id, level, is_active) VALUES
('Smartphones', 'smartphones', 'Teléfonos móviles y accesorios', 2, 1, TRUE),
('Computadoras', 'computadoras', 'Laptops, PCs y componentes', 2, 1, TRUE),
('Audio y Video', 'audio-y-video', 'Equipos de sonido y entretenimiento', 2, 1, TRUE),
('Gaming', 'gaming', 'Consolas y videojuegos', 2, 1, TRUE);

-- Hogar y Jardín (ID: 3)
INSERT INTO categories (name, slug, description, parent_id, level, is_active) VALUES
('Muebles', 'muebles', 'Mobiliario para el hogar', 3, 1, TRUE),
('Decoración', 'decoracion', 'Artículos decorativos', 3, 1, TRUE),
('Electrodomésticos', 'electrodomesticos', 'Aparatos para el hogar', 3, 1, TRUE);

-- Deportes (ID: 4)
INSERT INTO categories (name, slug, description, parent_id, level, is_active) VALUES
('Fitness', 'fitness', 'Equipos de ejercicio y gimnasio', 4, 1, TRUE),
('Fútbol', 'futbol', 'Equipamiento para fútbol', 4, 1, TRUE),
('Running', 'running', 'Artículos para corredores', 4, 1, TRUE);

-- INSERTAR ATRIBUTOS
INSERT INTO attributes (name, slug) VALUES
('Color', 'color'),
('Talla', 'talla'),
('Capacidad', 'capacidad'),
('Talla Zapatilla', 'talla-zapatilla');

-- INSERTAR VALORES DE ATRIBUTOS
-- Color
INSERT INTO attribute_values (attribute_id, value, slug) VALUES
(1, 'Negro', 'negro'),
(1, 'Blanco', 'blanco'),
(1, 'Azul', 'azul'),
(1, 'Rojo', 'rojo'),
(1, 'Verde', 'verde'),
(1, 'Gris', 'gris');

-- Talla
INSERT INTO attribute_values (attribute_id, value, slug) VALUES
(2, 'XS', 'xs'),
(2, 'S', 's'),
(2, 'M', 'm'),
(2, 'L', 'l'),
(2, 'XL', 'xl'),
(2, 'XXL', 'xxl');

-- Capacidad
INSERT INTO attribute_values (attribute_id, value, slug) VALUES
(3, '64GB', '64gb'),
(3, '128GB', '128gb'),
(3, '256GB', '256gb'),
(3, '512GB', '512gb'),
(3, '1TB', '1tb');

-- Material
INSERT INTO attribute_values (attribute_id, value, slug) VALUES
(4, 'Talla 41', '41'),
(4, 'Talla 42', '42'),
(4, 'Talla 43', '43'),
(4, 'Talla 44', '44');

-- Productos simples en diferentes categorías
INSERT INTO products (name, slug, description, category_id, brand, sku, price, compare_price, cost_price, stock_quantity, product_type, is_active, is_featured, featured_image) VALUES
('Auriculares Bluetooth Premium', 'auriculares-bluetooth-premium', 'Auriculares inalámbricos con cancelación de ruido y 30 horas de batería', 12, 'AudioTech', 'AUD-BT-001', 89.99, 119.99, 45.00, 50, 'simple', TRUE, TRUE, 'auriculares-premium.jpg'),

('Lámpara de Mesa Moderna', 'lampara-mesa-moderna', 'Lámpara de diseño minimalista con luz LED regulable', 15, 'HomeStyle', 'LAMP-001', 45.50, 65.00, 22.75, 25, 'simple', TRUE, FALSE, 'lampara-moderna.jpg'),

('Mochila Deportiva', 'mochila-deportiva', 'Mochila resistente al agua con múltiples compartimentos', 17, 'SportGear', 'MOCH-001', 35.00, 0.00, 18.00, 75, 'simple', TRUE, FALSE, 'mochila-deportiva.jpg'),

('Crema Facial Hidratante', 'crema-facial-hidratante', 'Crema hidratante con ácido hialurónico para todo tipo de piel', 5, 'BeautyLab', 'CREAM-001', 28.99, 35.99, 12.50, 100, 'simple', TRUE, TRUE, 'crema-facial.jpg');

-- CAMISETA BÁSICA (Producto Padre)
INSERT INTO products (name, slug, description, category_id, brand, sku, stock_quantity, product_type, is_active, is_featured, featured_image) VALUES
('Camiseta Básica Unisex', 'camiseta-basica-unisex', 'Camiseta de algodón 100% con corte unisex. Disponible en múltiples colores y tallas', 6, 'BasicWear', 'CAM-BASIC', 0, 'parent', TRUE, TRUE, 'camiseta-basica.jpg');

-- Variantes de Camiseta - Negro S, M, L
INSERT INTO products (parent_id, name, slug, category_id, brand, sku, price, cost_price, stock_quantity, product_type, is_active, featured_image) VALUES
(5, 'Camiseta Básica Unisex - Negro S', 'camiseta-basica-unisex-negro-s', 6, 'BasicWear', 'CAM-BASIC-NEG-S', 19.99, 8.50, 15, 'variant', TRUE, 'camiseta-negro-s.jpg'),
(5, 'Camiseta Básica Unisex - Negro M', 'camiseta-basica-unisex-negro-m', 6, 'BasicWear', 'CAM-BASIC-NEG-M', 19.99, 8.50, 25, 'variant', TRUE, 'camiseta-negro-m.jpg'),
(5, 'Camiseta Básica Unisex - Negro L', 'camiseta-basica-unisex-negro-l', 6, 'BasicWear', 'CAM-BASIC-NEG-L', 19.99, 8.50, 30, 'variant', TRUE, 'camiseta-negro-l.jpg'),

-- Variantes de Camiseta - Blanco S, M, L
(5, 'Camiseta Básica Unisex - Blanco S', 'camiseta-basica-unisex-blanco-s', 6, 'BasicWear', 'CAM-BASIC-BLA-S', 19.99, 8.50, 20, 'variant', TRUE, 'camiseta-blanco-s.jpg'),
(5, 'Camiseta Básica Unisex - Blanco M', 'camiseta-basica-unisex-blanco-m', 6, 'BasicWear', 'CAM-BASIC-BLA-M', 19.99, 8.50, 35, 'variant', TRUE, 'camiseta-blanco-m.jpg'),
(5, 'Camiseta Básica Unisex - Blanco L', 'camiseta-basica-unisex-blanco-l', 6, 'BasicWear', 'CAM-BASIC-BLA-L', 19.99, 8.50, 28, 'variant', TRUE, 'camiseta-blanco-l.jpg'),

-- Variantes de Camiseta - Azul S, M, L
(5, 'Camiseta Básica Unisex - Azul S', 'camiseta-basica-unisex-azul-s', 6, 'BasicWear', 'CAM-BASIC-AZU-S', 19.99, 8.50, 18, 'variant', TRUE, 'camiseta-azul-s.jpg'),
(5, 'Camiseta Básica Unisex - Azul M', 'camiseta-basica-unisex-azul-m', 6, 'BasicWear', 'CAM-BASIC-AZU-M', 19.99, 8.50, 22, 'variant', TRUE, 'camiseta-azul-m.jpg'),
(5, 'Camiseta Básica Unisex - Azul L', 'camiseta-basica-unisex-azul-l', 6, 'BasicWear', 'CAM-BASIC-AZU-L', 19.99, 8.50, 25, 'variant', TRUE, 'camiseta-azul-l.jpg');

-- SMARTPHONE (Producto Padre)
INSERT INTO products (name, slug, description, category_id, brand, sku, stock_quantity, product_type, is_active, is_featured, featured_image) VALUES
('Smartphone Galaxy Pro', 'smartphone-galaxy-pro', 'Smartphone de última generación con cámara de 108MP y pantalla AMOLED', 10, 'TechMobile', 'SMART-GP', 0, 'parent', TRUE, TRUE, 'smartphone-galaxy.jpg');

-- Variantes de Smartphone por capacidad
INSERT INTO products (parent_id, name, slug, category_id, brand, sku, price, cost_price, stock_quantity, product_type, is_active, featured_image) VALUES
(15, 'Smartphone Galaxy Pro 128GB', 'smartphone-galaxy-pro-128gb', 10, 'TechMobile', 'SMART-GP-128', 699.99, 420.00, 12, 'variant', TRUE, 'smartphone-128gb.jpg'),
(15, 'Smartphone Galaxy Pro 256GB', 'smartphone-galaxy-pro-256gb', 10, 'TechMobile', 'SMART-GP-256', 799.99, 480.00, 8, 'variant', TRUE, 'smartphone-256gb.jpg'),
(15, 'Smartphone Galaxy Pro 512GB', 'smartphone-galaxy-pro-512gb', 10, 'TechMobile', 'SMART-GP-512', 999.99, 600.00, 5, 'variant', TRUE, 'smartphone-512gb.jpg');

-- ZAPATILLAS DEPORTIVAS (Producto Padre)
INSERT INTO products (name, slug, description, category_id, brand, sku, stock_quantity, product_type, is_active, is_featured, featured_image) VALUES
('Zapatillas Running Elite', 'zapatillas-running-elite', 'Zapatillas de running profesionales con tecnología de amortiguación avanzada', 18, 'RunPro', 'ZAP-RUN-ELITE', 0, 'parent', TRUE, TRUE, 'zapatillas-running.jpg');

-- Variantes de Zapatillas por color y talla (solo algunas combinaciones)
INSERT INTO products (parent_id, name, slug, category_id, brand, sku, price, cost_price, stock_quantity, product_type, is_active, featured_image) VALUES
-- Negro
(19, 'Zapatillas Running Elite Negro 42', 'zapatillas-running-elite-negro-42', 18, 'RunPro', 'ZAP-RUN-NEG-42', 129.99, 65.00, 6, 'variant', TRUE, 'zapatillas-negro-42.jpg'),
(19, 'Zapatillas Running Elite Negro 43', 'zapatillas-running-elite-negro-43', 18, 'RunPro', 'ZAP-RUN-NEG-43', 129.99, 65.00, 8, 'variant', TRUE, 'zapatillas-negro-43.jpg'),
(19, 'Zapatillas Running Elite Negro 44', 'zapatillas-running-elite-negro-44', 18, 'RunPro', 'ZAP-RUN-NEG-44', 129.99, 65.00, 10, 'variant', TRUE, 'zapatillas-negro-44.jpg'),

-- Blanco
(19, 'Zapatillas Running Elite Blanco 42', 'zapatillas-running-elite-blanco-42', 18, 'RunPro', 'ZAP-RUN-BLA-42', 129.99, 65.00, 5, 'variant', TRUE, 'zapatillas-blanco-42.jpg'),
(19, 'Zapatillas Running Elite Blanco 43', 'zapatillas-running-elite-blanco-43', 18, 'RunPro', 'ZAP-RUN-BLA-43', 129.99, 65.00, 7, 'variant', TRUE, 'zapatillas-blanco-43.jpg'),
(19, 'Zapatillas Running Elite Blanco 44', 'zapatillas-running-elite-blanco-44', 18, 'RunPro', 'ZAP-RUN-BLA-44', 129.99, 65.00, 9, 'variant', TRUE, 'zapatillas-blanco-44.jpg');

-- Negro S (ID: 6)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(6, 1, 1), -- Color: Negro (ID: 1)
(6, 2, 8); -- Talla: S (ID: 8)

-- Negro M (ID: 7)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(7, 1, 1), -- Color: Negro (ID: 1)
(7, 2, 9); -- Talla: M (ID: 8)

-- Negro L (ID: 8)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(8, 1, 1), -- Color: Negro (ID: 1)
(8, 2, 10); -- Talla: L (ID: 9)

-- Blanco S (ID: 9)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(9, 1, 2), -- Color: Blanco (ID: 2)
(9, 2, 8); -- Talla: S (ID: 7)

-- Blanco M (ID: 10)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(10, 1, 2), -- Color: Blanco (ID: 2)
(10, 2, 9); -- Talla: M (ID: 8)

-- Blanco L (ID: 11)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(11, 1, 2), -- Color: Blanco (ID: 2)
(11, 2, 10); -- Talla: L (ID: 9)

-- Azul S (ID: 12)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(12, 1, 3), -- Color: Azul (ID: 3)
(12, 2, 8); -- Talla: S (ID: 7)

-- Azul M (ID: 13)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(13, 1, 3), -- Color: Azul (ID: 3)
(13, 2, 9); -- Talla: M (ID: 8)

-- Azul L (ID: 14)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(14, 1, 3), -- Color: Azul (ID: 3)
(14, 2, 10); -- Talla: L (ID: 9)

-- 128GB (ID: 16)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(16, 3, 14); -- Capacidad: 128GB (ID: 13)

-- 256GB (ID: 17)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(17, 3, 15); -- Capacidad: 256GB (ID: 14)

-- 512GB (ID: 18)
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(18, 3, 16); -- Capacidad: 512GB (ID: 15)

-- zapatilla Negro 42
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(20, 1, 1), -- Color: Negro
(20, 4, 19); -- Talla: 42
-- zapatilla Negro 43
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(21, 1, 1), -- Color: Negro
(21, 4, 20); -- Talla: 43
-- zapatilla Negro 44
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(22, 1, 1), -- Color: Negro
(22, 4, 21); -- Talla: 44

-- zapatilla Blanco 42
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(23, 1, 2), -- Color: Blanco
(23, 4, 19); -- Talla: 42
-- zapatilla Blanco 43
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(24, 1, 2), -- Color: Blanco
(24, 4, 20); -- Talla: 43
-- zapatilla Blanco 44
INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id) VALUES
(25, 1, 2), -- Color: Blanco
(25, 4, 21); -- Talla: 44
