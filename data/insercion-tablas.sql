-- ============================================
--    INSERCIÓN DE DATOS DE PRUEBA
-- ============================================

INSERT INTO countries (id, name, continent, capital, population, language, flag, area, currency, created_at, updated_at) VALUES 
-- País 1: Brasil
('country_1763249633982_k9wpo768s', 'Brasil', 'América', 'Brasilia', 214000000, 'Portugués', '🇧🇷', 8515767. 00, 'Real brasileño', '2025-11-15 18:33:53. 982', '2025-11-15 18:33:53. 982'),

-- País 2: Chile
('country_1763845557866_kl7udc0lx', 'Chile', 'América', 'Santiago de Chile', 19000000, 'Español', '🇨🇱', 756102.00, 'Peso chileno', '2025-11-22 16:05:57.866', '2025-11-22 16:05:57.866'),

-- País 3: Colombia
('country_1764332757512_ndeau1y33', 'Colombia', 'América', 'Bogotá', 51000000, 'Español', '🇨🇴', 1141748.00, 'Peso colombiano', '2025-11-28 07:25:57.512', '2025-11-28 07:25:57.512'),

-- País 4: México
('country_1764332828297_b95b5uvky', 'México', 'América', 'Ciudad de México', 128000000, 'Español', '🇲🇽', 1964375.00, 'Peso mexicano', '2025-11-28 07:27:08.297', '2025-11-28 07:27:08.297'),

-- País 5: Japón
('country_1764332905567_x029nbi4l', 'Japón', 'Asia', 'Tokio', 125000000, 'Japonés', '🇯🇵', 377975.00, 'Yen', '2025-11-28 07:28:25.567', '2025-11-28 07:28:25.567'),

-- País 6: España
('country_1764332951996_vpw307sjf', 'España', 'Europa', 'Madrid', 47000000, 'Español', '🇪🇸', 505990.00, 'Euro', '2025-11-28 07:29:11.996', '2025-11-28 07:29:11.996'),

-- País 7: Argentina
('country_1764332981397_5993vew4t', 'Argentina', 'América', 'Buenos Aires', 45000000, 'Español', '🇦🇷', 2780400.00, 'Peso argentino', '2025-11-28 07:29:41.397', '2025-11-28 07:29:41.397');


INSERT INTO cities (id, country_id, name, population, is_capital, latitude, longitude) VALUES

-- ============================================
-- CIUDADES DE COLOMBIA (3 ciudades)
-- ============================================

INSERT INTO cities (id, country_id, name, population, is_capital, latitude, longitude) VALUES

-- ============================================
-- CIUDADES DE COLOMBIA (3 ciudades)
-- ============================================

-- Ciudad 1: Bogotá (Capital)
('city_bogota', 'country_1764332757512_ndeau1y33', 'Bogotá', 8000000, TRUE, 4.7109886, -74.0721455),

-- Ciudad 2: Medellín
('city_medellin', 'country_1764332757512_ndeau1y33', 'Medellín', 2500000, FALSE, 6.2442472, -75.5812119),

-- Ciudad 3: Cali
('city_cali', 'country_1764332757512_ndeau1y33', 'Cali', 2250000, FALSE, 3.4516467, -76.5319854),

-- ============================================
-- CIUDADES DE MÉXICO (3 ciudades)
-- ============================================

-- Ciudad 4: Ciudad de México (Capital)
('city_cdmx', 'country_1764332828297_b95b5uvky', 'Ciudad de México', 9200000, TRUE, 19.4326077, -99.133208),

-- Ciudad 5: Guadalajara
('city_guadalajara', 'country_1764332828297_b95b5uvky', 'Guadalajara', 1500000, FALSE, 20.6596988, -103.3496092),

-- Ciudad 6: Monterrey
('city_monterrey', 'country_1764332828297_b95b5uvky', 'Monterrey', 1135000, FALSE, 25.6866142, -100.3161126),

-- ============================================
-- CIUDADES DE JAPÓN (2 ciudades)
-- ============================================

-- Ciudad 7: Tokio (Capital)
('city_tokyo', 'country_1764332905567_x029nbi4l', 'Tokio', 14000000, TRUE, 35. 6761919, 139.6503106),

-- Ciudad 8: Osaka
('city_osaka', 'country_1764332905567_x029nbi4l', 'Osaka', 2750000, FALSE, 34.6937249, 135.5022535),

-- ============================================
-- CIUDADES DE ESPAÑA (2 ciudades)
-- ============================================

-- Ciudad 9: Madrid (Capital)
('city_madrid', 'country_1764332951996_vpw307sjf', 'Madrid', 3300000, TRUE, 40.4167754, -3.7037902),

-- Ciudad 10: Barcelona
('city_barcelona', 'country_1764332951996_vpw307sjf', 'Barcelona', 1620000, FALSE, 41.3873974, 2.168568),

-- ============================================
-- CIUDADES DE ARGENTINA (2 ciudades)
-- ============================================

-- Ciudad 11: Buenos Aires (Capital)
('city_buenosaires', 'country_1764332981397_5993vew4t', 'Buenos Aires', 3075000, TRUE, -34.6036844, -58.3815591),

-- Ciudad 12: Córdoba
('city_cordoba', 'country_1764332981397_5993vew4t', 'Córdoba', 1330000, FALSE, -31.4200833, -64.1887761);
