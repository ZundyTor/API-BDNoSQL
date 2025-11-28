-- ============================================
-- 			CREACIÓN DE LAS TABLAS
-- ============================================

CREATE TABLE IF NOT EXISTS countries (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  continent VARCHAR(50) NOT NULL,
  capital VARCHAR(255) NOT NULL,
  population BIGINT NOT NULL CHECK (population >= 0),
  language VARCHAR(100) NOT NULL,
  flag VARCHAR(10),
  area NUMERIC(12,2),
  currency VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Restricción para continentes válidos
  CONSTRAINT valid_continent CHECK (
    continent IN ('África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida')
  )
);


CREATE TABLE IF NOT EXISTS cities (
  id VARCHAR(100) PRIMARY KEY,
  country_id VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  population BIGINT NOT NULL CHECK (population >= 0),
  is_capital BOOLEAN DEFAULT FALSE,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_country
    FOREIGN KEY (country_id)
    REFERENCES countries(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);