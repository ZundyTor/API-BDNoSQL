# 🌍 API de Países - PostgreSQL, MongoDB & Supabase ☁️

API RESTful completa para gestionar información de países utilizando **arquitectura limpia**, **DDD (Domain-Driven Design)** y **POO (Programación Orientada a Objetos)**, con soporte para bases de datos relacionales (PostgreSQL local y **Supabase en la nube**) y no relacionales (MongoDB).

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs. com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www. postgresql.org/)
[![Supabase](https://img. shields.io/badge/Supabase-Cloud-green.svg)](https://supabase.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📚 Tabla de Contenidos

- [Características](#-características)
- [Modelo de Datos Relacional](#️-modelo-de-datos-relacional)
- [Arquitectura](#️-arquitectura)
- [Tecnologías](#️-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Implementación en la Nube (Supabase)](#️-implementación-en-la-nube-supabase)
- [Scripts SQL](#-scripts-sql)
- [Consultas JOIN](#-consultas-join)
- [Uso](#-uso)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Principios Aplicados](#-principios-aplicados)
- [Pruebas](#-pruebas)
- [Instrucciones de Acceso para Evaluación](#-instrucciones-de-acceso-para-evaluación)
- [Autor](#-autor)

---

## ✨ Características

- ✅ **Arquitectura Limpia** (Clean Architecture)
- ✅ **DDD** (Domain-Driven Design)
- ✅ **POO** (Programación Orientada a Objetos)
- ✅ **Tres bases de datos**: PostgreSQL local, **Supabase (PostgreSQL en la nube)** y MongoDB
- ✅ **API RESTful** completa con operaciones CRUD
- ✅ **Modelo relacional** con tablas `countries` y `cities` (relación 1:N)
- ✅ **Validaciones** robustas de datos
- ✅ **Manejo de errores** centralizado
- ✅ **Patrón Repository** para abstracción de datos
- ✅ **Casos de Uso** para lógica de negocio
- ✅ **Separación de responsabilidades** en capas
- ✅ **Documentación** completa de endpoints
- ✅ **Implementación en la nube** con Supabase

---

## 🗄️ Modelo de Datos Relacional

### Proveedor Cloud: **Supabase**

Este proyecto utiliza **Supabase** como proveedor de base de datos PostgreSQL en la nube. 

**¿Por qué Supabase?**
- ✅ PostgreSQL real (100% compatible)
- ✅ Tier gratuito generoso (500 MB)
- ✅ Región South America (São Paulo) disponible
- ✅ Interfaz SQL Editor integrada
- ✅ APIs REST automáticas generadas

---

### Diagrama Entidad-Relación (ER)

```
┌─────────────────────────────────────────┐
│            COUNTRIES                    │
├─────────────────────────────────────────┤
│ 🔑 id                VARCHAR(100) PK    │
│    name              VARCHAR(255)       │
│    continent         VARCHAR(50)        │
│    capital           VARCHAR(255)       │
│    population        BIGINT             │
│    language          VARCHAR(100)       │
│    flag              VARCHAR(10)        │
│    area              NUMERIC(12,2)      │
│    currency          VARCHAR(100)       │
│    created_at        TIMESTAMP          │
│    updated_at        TIMESTAMP          │
└──────────────┬──────────────────────────┘
               │
               │ 1:N (Uno a Muchos)
               │
               ▼
┌─────────────────────────────────────────┐
│             CITIES                      │
├─────────────────────────────────────────┤
│ 🔑 id                VARCHAR(100) PK    │
│ 🔗 country_id        VARCHAR(100) FK ───┘
│    name              VARCHAR(255)       │
│    population        BIGINT             │
│    is_capital        BOOLEAN            │
│    latitude          NUMERIC(10,7)      │
│    longitude         NUMERIC(10,7)      │
│    created_at        TIMESTAMP          │
│    updated_at        TIMESTAMP          │
└─────────────────────────────────────────┘

Relación: Un país puede tener muchas ciudades
Integridad Referencial: ON DELETE CASCADE, ON UPDATE CASCADE
```

---

### Descripción de Tablas

#### 📋 Tabla: `countries`

**Propósito:** Almacenar información demográfica y geográfica de países.

| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| `id` | `VARCHAR(100)` | **PRIMARY KEY** | Identificador único generado por la aplicación |
| `name` | `VARCHAR(255)` | `NOT NULL` | Nombre oficial del país |
| `continent` | `VARCHAR(50)` | `NOT NULL`, `CHECK` | Continente (África, América, Asia, Europa, Oceanía, Antártida) |
| `capital` | `VARCHAR(255)` | `NOT NULL` | Ciudad capital del país |
| `population` | `BIGINT` | `NOT NULL`, `CHECK >= 0` | Población total del país |
| `language` | `VARCHAR(100)` | `NOT NULL` | Idioma principal |
| `flag` | `VARCHAR(10)` | | Emoji de la bandera (ej: 🇨🇴) |
| `area` | `NUMERIC(12,2)` | | Área territorial en km² |
| `currency` | `VARCHAR(100)` | | Moneda oficial |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Fecha de última actualización |

**Índices:**
- `idx_countries_name` - Búsquedas por nombre
- `idx_countries_continent` - Filtros por continente
- `idx_countries_population` - Ordenamiento por población

---

#### 🏙️ Tabla: `cities`

**Propósito:** Almacenar ciudades asociadas a países.

| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| `id` | `VARCHAR(100)` | **PRIMARY KEY** | Identificador único |
| `country_id` | `VARCHAR(100)` | **FOREIGN KEY**, `NOT NULL` | Referencia a `countries(id)` |
| `name` | `VARCHAR(255)` | `NOT NULL` | Nombre de la ciudad |
| `population` | `BIGINT` | `NOT NULL`, `CHECK >= 0` | Población de la ciudad |
| `is_capital` | `BOOLEAN` | `DEFAULT FALSE` | Indica si es capital del país |
| `latitude` | `NUMERIC(10,7)` | | Latitud geográfica |
| `longitude` | `NUMERIC(10,7)` | | Longitud geográfica |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Fecha de creación |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Fecha de actualización |

**Clave Foránea:**
```sql
CONSTRAINT fk_country
  FOREIGN KEY (country_id)
  REFERENCES countries(id)
  ON DELETE CASCADE    -- Si se elimina un país, se eliminan sus ciudades
  ON UPDATE CASCADE    -- Si se actualiza el ID del país, se actualiza en ciudades
```

**Índices:**
- `idx_cities_country_id` - Optimiza JOIN con `countries`
- `idx_cities_name` - Búsquedas por nombre
- `idx_cities_capital` - Filtrar capitales
- `idx_cities_population` - Ordenamiento por población
- `idx_cities_location` - Búsquedas geográficas (latitude, longitude)

---

### Relación entre Tablas

**Tipo:** 1:N (Uno a Muchos)

- ✅ Un **país** puede tener **muchas ciudades**
- ✅ Una **ciudad** pertenece a **un solo país**
- ✅ La relación se establece mediante la clave foránea `country_id` en `cities`
- ✅ Se garantiza integridad referencial con `CASCADE`

**Ejemplo:**
```
Colombia (país)
  ├── Bogotá (ciudad capital)
  ├── Medellín (ciudad)
  └── Cali (ciudad)
```

---

## 🏗️ Arquitectura

El proyecto sigue los principios de **Clean Architecture** organizando el código en capas independientes:

```
┌─────────────────────────────────────────────────────┐
│              INTERFACES (Controllers)               │
│                  (HTTP Handlers)                    │
├─────────────────────────────────────────────────────┤
│             APPLICATION (Use Cases)                 │
│              (Business Logic)                       │
├─────────────────────────────────────────────────────┤
│          INFRASTRUCTURE (Repositories)              │
│         (Database & External Services)              │
├─────────────────────────────────────────────────────┤
│              DOMAIN (Entities)                      │
│            (Business Rules & Models)                │
└─────────────────────────────────────────────────────┘
```

### Flujo de una petición:

```
Cliente HTTP → Route → Controller → Use Case → Repository → Database
                                                               ├── PostgreSQL (local)
                                                               ├── Supabase (cloud)
                                                               └── MongoDB
```

---

## 🛠️ Tecnologías

### Backend
- **Node.js** v22.20.0 - Entorno de ejecución
- **Express** 4.18 - Framework web
- **dotenv** - Variables de entorno

### Bases de Datos
- **PostgreSQL** 14+ - Base de datos relacional local
- **Supabase** - PostgreSQL en la nube (South America region)
- **MongoDB** 6.0+ - Base de datos no relacional
- **pg** - Cliente PostgreSQL para Node.js
- **mongodb** - Driver oficial de MongoDB

### Herramientas de Desarrollo
- **nodemon** - Recarga automática en desarrollo
- **Postman** - Testing de API
- **Git** - Control de versiones

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16 o superior ([Descargar](https://nodejs.org/))
- **PostgreSQL** 14 o superior ([Descargar](https://www.postgresql. org/download/)) - Para desarrollo local
- **MongoDB** 6.0 o superior ([Descargar](https://www.mongodb.com/try/download/community))
- **Git** ([Descargar](https://git-scm.com/))
- **Cuenta en Supabase** (gratuita) - Para la nube ([Registrarse](https://supabase. com/))
- **Postman** (opcional, para testing) ([Descargar](https://www.postman.com/downloads/))

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ZundyTor/API-BDNoSQL.git
cd API-BDNoSQL
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar bases de datos

#### PostgreSQL Local:

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE countries_db;

# Salir
\q
```

#### MongoDB Local:

Si usas MongoDB local, asegúrate de que el servicio esté corriendo:

```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
# Configuración del Servidor
PORT=3000

# PostgreSQL Local
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=countries_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña_aqui

# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/countries_db

# SUPABASE (PostgreSQL en la Nube)
SUPABASE_CONNECTION_STRING=postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-1-sa-east-1.pooler. supabase.com:5432/postgres
SUPABASE_HOST=aws-1-sa-east-1.pooler.supabase.com
SUPABASE_PORT=5432
SUPABASE_DB=postgres
SUPABASE_USER=postgres.[PROJECT-ID]
SUPABASE_PASSWORD=tu_password_de_supabase
USE_SUPABASE=false
```

### 5. Iniciar el servidor

**Modo desarrollo (con recarga automática):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

Si todo está correcto, verás:

```
╔════════════════════════════════════════════════════════╗
║          🚀 SERVIDOR INICIADO CORRECTAMENTE            ║
╚════════════════════════════════════════════════════════╝
  
  📡 Puerto:        3000
  🌐 URL:           http://localhost:3000
  📚 Documentación: http://localhost:3000/api/v1/docs
  🏥 Health Check:  http://localhost:3000/health
```

---

## ☁️ Implementación en la Nube (Supabase)

### Paso 1: Crear Cuenta en Supabase

1.  Ve a [https://supabase.com/](https://supabase.com/)
2. Haz clic en **"Start your project"**
3. Regístrate con GitHub, Google o email

### Paso 2: Crear Proyecto

1. En el dashboard, haz clic en **"New project"**
2. Completa la información:
   - **Name:** `countries-api` (o el nombre que prefieras)
   - **Database Password:** Genera una contraseña segura (guárdala)
   - **Region:** **South America (São Paulo)** ⬅️ Importante
   - **Plan:** Free
3. Haz clic en **"Create new project"**
4. Espera 1-2 minutos mientras se provisiona

### Paso 3: Crear las Tablas

1. En el menú lateral, ve a **SQL Editor**
2. Haz clic en **"+ New query"**
3. Ejecuta el script de creación de `countries`:

```sql
-- Ver archivo completo: sql_scripts/countries_complete.sql
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
  CONSTRAINT valid_continent CHECK (
    continent IN ('África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida')
  )
);
```

4. Ejecuta el script de creación de `cities` con su relación:

```sql
-- Ver archivo completo: sql_scripts/cities_complete.sql
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
```

### Paso 4: Insertar Datos de Prueba

Ejecuta los scripts de inserción (disponibles en `sql_scripts/`):
- **7 países:** Brasil, Chile, Colombia, México, Japón, España, Argentina
- **12 ciudades:** 3 de Colombia, 3 de México, 2 de Japón, 2 de España, 2 de Argentina

### Paso 5: Obtener Credenciales de Conexión

1. Ve a **Project Settings** (⚙️ icono en el menú lateral)
2. Haz clic en **Database**
3. En **"Connection string"**, selecciona **"Session mode"**
4. Copia la cadena de conexión
5. Actualiza tu archivo `.env` con las credenciales

### 🔗 Formato de la Cadena de Conexión

```
postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
```

**Componentes:**
- `postgres.[PROJECT-ID]` - Usuario (incluye identificador del proyecto)
- `[PASSWORD]` - La contraseña que creaste al inicio
- `aws-1-sa-east-1.pooler. supabase.com` - Host del pooler (South America)
- `5432` - Puerto estándar de PostgreSQL
- `postgres` - Nombre de la base de datos

**Ejemplo en `.env`:**
```env
SUPABASE_CONNECTION_STRING=postgresql://postgres. abcdefghijk:Mi_Password_123@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
```

⚠️ **IMPORTANTE:** Si tu contraseña tiene caracteres especiales (`*`, `@`, `#`, etc.), debes URL-encodearlos:
- `*` → `%2A`
- `@` → `%40`
- `#` → `%23`

### Paso 6: Probar Conexión desde Node.js

```bash
node tests/test-supabase-connection.js
```

**⚠️ Nota sobre Conectividad:**

Si la prueba falla con error `ENOTFOUND` o `timeout`, puede deberse a:
- Firewall local bloqueando conexiones salientes al puerto 5432
- Red universitaria/corporativa con restricciones
- ISP bloqueando conexiones a AWS

**Solución:** La base de datos está funcional en Supabase.  Las consultas se pueden ejecutar directamente en el **SQL Editor de Supabase** sin problemas.

---

## 📊 Scripts SQL

Todos los scripts SQL están organizados en la carpeta `sql_scripts/`:

### 1.  Creación de Tablas

#### `countries_complete.sql`
```sql
-- Crear tabla countries con restricciones
CREATE TABLE IF NOT EXISTS countries (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  continent VARCHAR(50) NOT NULL CHECK (
    continent IN ('África', 'América', 'Asia', 'Europa', 'Oceanía', 'Antártida')
  ),
  capital VARCHAR(255) NOT NULL,
  population BIGINT NOT NULL CHECK (population >= 0),
  language VARCHAR(100) NOT NULL,
  flag VARCHAR(10),
  area NUMERIC(12,2),
  currency VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices
CREATE INDEX idx_countries_name ON countries(name);
CREATE INDEX idx_countries_continent ON countries(continent);
CREATE INDEX idx_countries_population ON countries(population DESC);
```

#### `cities_complete. sql`
```sql
-- Crear tabla cities con relación a countries
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
  
  -- Clave foránea con integridad referencial
  CONSTRAINT fk_country
    FOREIGN KEY (country_id)
    REFERENCES countries(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Crear índices
CREATE INDEX idx_cities_country_id ON cities(country_id);
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_cities_capital ON cities(is_capital);
CREATE INDEX idx_cities_population ON cities(population DESC);
CREATE INDEX idx_cities_location ON cities(latitude, longitude);
```

### 2. Datos de Prueba

#### Países Insertados (7)

| País | Continente | Capital | Población | Bandera |
|------|-----------|---------|-----------|---------|
| Brasil | América | Brasilia | 214,000,000 | 🇧🇷 |
| Chile | América | Santiago de Chile | 19,000,000 | 🇨🇱 |
| Colombia | América | Bogotá | 51,000,000 | 🇨🇴 |
| México | América | Ciudad de México | 128,000,000 | 🇲🇽 |
| Japón | Asia | Tokio | 125,000,000 | 🇯🇵 |
| España | Europa | Madrid | 47,000,000 | 🇪🇸 |
| Argentina | América | Buenos Aires | 45,000,000 | 🇦🇷 |

#### Ciudades Insertadas (12)

| Ciudad | País | Población | ¿Capital? |
|--------|------|-----------|-----------|
| Bogotá | Colombia | 8,000,000 | ✅ |
| Medellín | Colombia | 2,500,000 | ❌ |
| Cali | Colombia | 2,250,000 | ❌ |
| Ciudad de México | México | 9,200,000 | ✅ |
| Guadalajara | México | 1,500,000 | ❌ |
| Monterrey | México | 1,135,000 | ❌ |
| Tokio | Japón | 14,000,000 | ✅ |
| Osaka | Japón | 2,750,000 | ❌ |
| Madrid | España | 3,300,000 | ✅ |
| Barcelona | España | 1,620,000 | ❌ |
| Buenos Aires | Argentina | 3,075,000 | ✅ |
| Córdoba | Argentina | 1,330,000 | ❌ |

---

## 🔗 Consultas JOIN

### Consulta 1: Listar Ciudades con su País

**Propósito:** Mostrar todas las ciudades con información de su país asociado.

```sql
SELECT 
  c.name AS ciudad,
  c.population AS poblacion_ciudad,
  c.is_capital AS es_capital,
  co.name AS pais,
  co.continent AS continente,
  co.flag AS bandera
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
ORDER BY c.population DESC;
```

**Resultado esperado:** 12 ciudades con datos del país (nombre, continente, bandera)

---

### Consulta 2: Solo Capitales

**Propósito:** Listar únicamente las ciudades que son capitales de países.

```sql
SELECT 
  c.name AS capital,
  c.population AS poblacion_capital,
  co.name AS pais,
  co.continent AS continente,
  co.flag AS bandera
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
WHERE c.is_capital = TRUE
ORDER BY c.population DESC;
```

**Resultado esperado:**
1. Tokio (Japón) - 14,000,000
2. Ciudad de México (México) - 9,200,000
3.  Bogotá (Colombia) - 8,000,000
4. Madrid (España) - 3,300,000
5. Buenos Aires (Argentina) - 3,075,000

---

### Consulta 3: Agregación por Continente

**Propósito:** Calcular estadísticas de ciudades agrupadas por continente.

```sql
SELECT 
  co.continent AS continente,
  COUNT(c.id) AS total_ciudades,
  SUM(c.population) AS poblacion_urbana_total,
  AVG(c.population)::BIGINT AS poblacion_promedio,
  MAX(c.population) AS ciudad_mas_poblada
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
GROUP BY co. continent
ORDER BY total_ciudades DESC;
```

**Resultado esperado:**
- **América:** 9 ciudades, ~28M habitantes
- **Asia:** 2 ciudades, ~16. 7M habitantes
- **Europa:** 2 ciudades, ~4.9M habitantes

---

### Consulta 4: Países con Número de Ciudades

**Propósito:** Mostrar cuántas ciudades tiene cada país en la base de datos.

```sql
SELECT 
  co.name AS pais,
  co.flag AS bandera,
  COUNT(c.id) AS total_ciudades,
  SUM(c.population) AS poblacion_total_ciudades,
  co.population AS poblacion_pais,
  ROUND((SUM(c.population)::NUMERIC / co.population * 100), 2) AS porcentaje_urbanizacion
FROM countries co
LEFT JOIN cities c ON co.id = c.country_id
GROUP BY co.id, co.name, co.flag, co.population
HAVING COUNT(c.id) > 0
ORDER BY total_ciudades DESC, co.name;
```

**Resultado esperado:**
- Colombia: 3 ciudades
- México: 3 ciudades
- Japón: 2 ciudades
- España: 2 ciudades
- Argentina: 2 ciudades

---

### Consulta 5: Ciudades de América (Top 5)

**Propósito:** Listar las 5 ciudades más pobladas del continente americano.

```sql
SELECT 
  c.name AS ciudad,
  c.population AS poblacion,
  co.name AS pais,
  co.flag AS bandera,
  ROUND((c.population::NUMERIC / co.population * 100), 2) AS porcentaje_poblacion_pais
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
WHERE co.continent = 'América'
ORDER BY c.population DESC
LIMIT 5;
```

**Resultado esperado:**
1. Ciudad de México (México) - 9,200,000 (~7% de México)
2. Bogotá (Colombia) - 8,000,000 (~15% de Colombia)
3. Buenos Aires (Argentina) - 3,075,000 (~6% de Argentina)
4. Medellín (Colombia) - 2,500,000 (~4% de Colombia)
5.  Cali (Colombia) - 2,250,000 (~4% de Colombia)

---

## 🎮 Uso

### Verificar que la API está funcionando

Abre tu navegador y ve a:

```
http://localhost:3000/
```

O usa cURL:

```bash
curl http://localhost:3000/
```

### Ver la documentación completa

```
http://localhost:3000/api/v1/docs
```

### Health Check (verificar estado de las bases de datos)

```
http://localhost:3000/health
```

---

## 📡 Endpoints de la API

### Base URL
```
http://localhost:3000/api/v1
```

### Parámetro de Query: `database`

Todos los endpoints aceptan el parámetro `database` para especificar qué base de datos usar:

- `postgresql` - Solo PostgreSQL local
- `mongodb` - Solo MongoDB
- `both` - Ambas bases de datos (default para POST, PUT, DELETE)

---

### 📍 Endpoints Disponibles

| Método | Endpoint | Descripción | Database Query |
|--------|----------|-------------|----------------|
| `GET` | `/` | Página de inicio | - |
| `GET` | `/health` | Estado de las BD | - |
| `GET` | `/api/v1/docs` | Documentación | - |
| `POST` | `/api/v1/countries` | Crear país | `? database=both` |
| `GET` | `/api/v1/countries` | Listar países | `? database=postgresql` |
| `GET` | `/api/v1/countries/:id` | Obtener país por ID | `?database=postgresql` |
| `GET` | `/api/v1/countries/continent/:continent` | Filtrar por continente | `?database=postgresql` |
| `GET` | `/api/v1/countries/stats/summary` | Estadísticas | `?database=postgresql` |
| `PUT` | `/api/v1/countries/:id` | Actualizar país | `?database=both` |
| `DELETE` | `/api/v1/countries/:id` | Eliminar país | `?database=both` |

---

## 💡 Ejemplos de Uso

### Crear un país (en ambas bases de datos)

**Request:**
```http
POST http://localhost:3000/api/v1/countries? database=both
Content-Type: application/json

{
  "name": "Colombia",
  "continent": "América",
  "capital": "Bogotá",
  "population": 51000000,
  "language": "Español",
  "flag": "🇨🇴",
  "area": 1141748,
  "currency": "Peso colombiano"
}
```

**Response:**
```json
{
  "success": true,
  "message": "País creado exitosamente",
  "data": {
    "success": true,
    "country": {
      "id": "country_1731709855123_xyz789",
      "name": "Colombia",
      "continent": "América",
      "capital": "Bogotá",
      "population": 51000000,
      "language": "Español",
      "flag": "🇨🇴",
      "area": 1141748,
      "currency": "Peso colombiano",
      "createdAt": "2025-11-16T00:17:35.123Z",
      "updatedAt": "2025-11-16T00:17:35.123Z"
    },
    "databases": {
      "postgresql": { "success": true },
      "mongodb": { "success": true }
    }
  },
  "timestamp": "2025-11-16T00:17:35.456Z"
}
```

---

### Obtener todos los países (con paginación)

**Request:**
```http
GET http://localhost:3000/api/v1/countries?database=postgresql&limit=10&offset=0
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "country_.. .",
      "name": "Argentina",
      "continent": "América",
      "capital": "Buenos Aires",
      "population": 45000000,
      "language": "Español",
      "flag": "🇦🇷",
      "area": 2780400,
      "currency": "Peso argentino",
      "createdAt": "2025-11-16T00:15:00.000Z",
      "updatedAt": "2025-11-16T00:15:00.000Z"
    },
    // ... más países
  ],
  "metadata": {
    "total": 5,
    "limit": 10,
    "offset": 0,
    "returned": 5,
    "database": "postgresql"
  },
  "timestamp": "2025-11-16T00:17:35.000Z"
}
```

---

### Filtrar países por continente

**Request:**
```http
GET http://localhost:3000/api/v1/countries/continent/América?database=postgresql
```

**Response:**
```json
{
  "success": true,
  "data": {
    "continent": "América",
    "count": 3,
    "countries": [
      { "name": "Argentina", "flag": "🇦🇷", ...  },
      { "name": "Colombia", "flag": "🇨🇴", ... },
      { "name": "México", "flag": "🇲🇽", ... }
    ],
    "database": "postgresql"
  },
  "timestamp": "2025-11-16T00:17:35.000Z"
}
```

---

### Obtener estadísticas

**Request:**
```http
GET http://localhost:3000/api/v1/countries/stats/summary?database=postgresql
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "database": "postgresql",
    "byContinent": {
      "América": {
        "count": 3,
        "population": 224000000
      },
      "Asia": {
        "count": 1,
        "population": 125000000
      },
      "Europa": {
        "count": 1,
        "population": 47000000
      }
    },
    "totalPopulation": 396000000
  },
  "timestamp": "2025-11-16T00:17:35. 000Z"
}
```

---

### Actualizar un país

**Request:**
```http
PUT http://localhost:3000/api/v1/countries/country_123?database=both
Content-Type: application/json

{
  "population": 52000000
}
```

**Response:**
```json
{
  "success": true,
  "message": "País actualizado exitosamente",
  "data": {
    "success": true,
    "country": {
      "id": "country_123",
      "name": "Colombia",
      "population": 52000000,
      ... 
    },
    "databases": {
      "postgresql": { "success": true },
      "mongodb": { "success": true }
    }
  },
  "timestamp": "2025-11-16T00:17:35. 000Z"
}
```

---

### Eliminar un país

**Request:**
```http
DELETE http://localhost:3000/api/v1/countries/country_123?database=both
```

**Response:**
```json
{
  "success": true,
  "message": "País eliminado exitosamente",
  "data": {
    "success": true,
    "databases": {
      "postgresql": { "success": true },
      "mongodb": { "success": true }
    }
  },
  "timestamp": "2025-11-16T00:17:35.000Z"
}
```

---

## 📂 Estructura del Proyecto

```
API-BDNoSQL/
├── src/
│   ├── domain/                      # Capa de Dominio (Entidades)
│   │   └── entities/
│   │       └── Country.js           # Entidad País con validaciones
│   │
│   ├── application/                 # Capa de Aplicación (Casos de Uso)
│   │   └── useCases/
│   │       ├── CreateCountry.js
│   │       ├── GetCountryById.js
│   │       ├── GetAllCountries.js
│   │       ├── GetCountriesByContinent.js
│   │       ├── UpdateCountry.js
│   │       └── DeleteCountry.js
│   │
│   ├── infrastructure/              # Capa de Infraestructura (Detalles técnicos)
│   │   ├── database/
│   │   │   ├── postgresql/
│   │   │   │   └── connection.js    # Conexión a PostgreSQL local
│   │   │   ├── mongodb/
│   │   │   │   └── connection.js    # Conexión a MongoDB
│   │   │   └── supabase/            # 🆕 Supabase (cloud)
│   │   │       └── connection.js    # Conexión a Supabase
│   │   └── repositories/
│   │       ├── CountryPostgreSQLRepository.js
│   │       └── CountryMongoDBRepository.js
│   │
│   └── interfaces/                  # Capa de Interfaces (Entrada/Salida)
│       ├── controllers/
│       │   └── CountryController.js # Controlador HTTP
│       ├── routes/
│       │   └── countryRoutes.js     # Rutas de la API
│       └── middlewares/
│           └── errorHandler.js      # Manejo de errores
│
├── sql_scripts/                     # 🆕 Scripts SQL para el taller
│   ├── countries_complete.sql       # Creación e inserción de países
│   ├── cities_complete.sql          # Creación e inserción de ciudades
│   └── queries_join.sql             # Consultas JOIN de ejemplo
│
├── config/                          # Configuraciones
├── tests/                           # Archivos de prueba
│   ├── test-country. js
│   ├── test-postgresql.js
│   ├── test-mongodb.js
│   ├── test-repository.js
│   ├── test-repository-mongodb.js
│   ├── test-usecases.js
│   └── test-supabase-connection.js  # 🆕 Test de conexión a Supabase
│
├── .env                             # Variables de entorno (NO subir a Git)
├── .env.example                     # Ejemplo de variables de entorno
├── . gitignore                       # Archivos ignorados por Git
├── package.json                     # Dependencias del proyecto
├── server.js                        # Punto de entrada de la aplicación
└── README.md                        # Documentación (este archivo)
```

---

## 🎓 Principios Aplicados

### 1. **Arquitectura Limpia (Clean Architecture)**

- **Independencia de frameworks**: La lógica de negocio no depende de Express
- **Testeable**: Cada capa puede probarse independientemente
- **Independencia de la UI**: Fácilmente adaptable a GraphQL, CLI, etc. 
- **Independencia de la BD**: Se puede cambiar de PostgreSQL a MySQL sin afectar el dominio

### 2. **DDD (Domain-Driven Design)**

- **Entidades**: `Country` representa un concepto del negocio
- **Casos de Uso**: Encapsulan reglas de negocio específicas
- **Repositories**: Abstraen el acceso a datos
- **Separación de responsabilidades**: Cada capa tiene un propósito claro

### 3. **POO (Programación Orientada a Objetos)**

- **Encapsulamiento**: Datos y métodos agrupados en clases
- **Abstracción**: Las interfaces ocultan la complejidad
- **Herencia**: (Potencial para extender entidades)
- **Polimorfismo**: Mismo método, diferentes implementaciones (PostgreSQL vs MongoDB vs Supabase)

### 4. **Principios SOLID**

- **S** - Single Responsibility: Cada clase tiene una única responsabilidad
- **O** - Open/Closed: Abierto para extensión, cerrado para modificación
- **L** - Liskov Substitution: Los repositories son intercambiables
- **I** - Interface Segregation: Interfaces específicas
- **D** - Dependency Inversion: Las capas superiores no dependen de las inferiores

### 5. **Patrón Repository**

- Abstrae el acceso a datos
- Permite cambiar la implementación sin afectar la lógica
- Facilita el testing con mocks

### 6. **Patrón Singleton**

- Una única instancia de conexión a cada base de datos
- Optimiza el uso de recursos

---

## 🧪 Pruebas

El proyecto incluye archivos de prueba para cada capa:

### Ejecutar pruebas de la entidad:
```bash
node tests/test-country.js
```

### Ejecutar pruebas de PostgreSQL:
```bash
node tests/test-postgresql.js
```

### Ejecutar pruebas de MongoDB:
```bash
node tests/test-mongodb.js
```

### Ejecutar pruebas de Repositories:
```bash
node tests/test-repository.js
node tests/test-repository-mongodb. js
```

### Ejecutar pruebas de Casos de Uso:
```bash
node tests/test-usecases.js
```

### 🆕 Ejecutar pruebas de Supabase:
```bash
node tests/test-supabase-connection.js
```

**Resultado esperado:**
```
🧪 PROBANDO CONEXIÓN A SUPABASE
==================================================

1️⃣ Probando conexión básica... 
✅ Conexión a Supabase exitosa
   Base de datos: postgres
   Hora del servidor: 2025-11-28T... 

2️⃣ Contando países en Supabase...
   ✅ Total de países: 7

3️⃣ Contando ciudades en Supabase...
   ✅ Total de ciudades: 12

4️⃣ Probando consulta JOIN...
   ✅ Top 3 países con más ciudades:
      - Colombia: 3 ciudades
      - México: 3 ciudades
      - Japón: 2 ciudades

5️⃣ Listando ciudades más pobladas...
   ✅ Top 5 ciudades por población:
      1. Tokio (Japón): 14,000,000 habitantes
      2. Ciudad de México (México): 9,200,000 habitantes
      3.  Bogotá (Colombia): 8,000,000 habitantes
      4. Madrid (España): 3,300,000 habitantes
      5. Buenos Aires (Argentina): 3,075,000 habitantes

==================================================
✅ TODAS LAS PRUEBAS EXITOSAS
```

---

## 📊 Diferencias: PostgreSQL vs MongoDB

| Aspecto | PostgreSQL | MongoDB |
|---------|-----------|----------|
| **Tipo** | Relacional (SQL) | No relacional (NoSQL) |
| **Estructura** | Tablas, filas, columnas | Colecciones, documentos JSON |
| **Esquema** | Rígido, definido previamente | Flexible, sin esquema fijo |
| **Consultas** | SQL estándar | JavaScript / operadores |
| **Relaciones** | JOINs entre tablas | Referencias o embebidos |
| **Transacciones** | ACID completo | ACID (desde v4. 0) |
| **Escalabilidad** | Vertical principalmente | Horizontal (sharding) |
| **Mejor para** | Datos estructurados, reportes | Datos variables, alta escritura |

---

## 🌟 Conceptos Clave Aprendidos

### 1. **APIs RESTful**
- Métodos HTTP (GET, POST, PUT, DELETE)
- Códigos de estado (200, 201, 400, 404, 500)
- Headers y Body en peticiones
- Query parameters

### 2. **Bases de Datos**
- Diseño de esquemas relacionales (PostgreSQL)
- Relaciones 1:N con claves foráneas
- Integridad referencial (CASCADE)
- Documentos flexibles (MongoDB)
- Índices para optimización
- Consultas JOIN
- Bases de datos en la nube (Supabase)

### 3. **Arquitectura de Software**
- Separación en capas
- Inyección de dependencias
- Patrones de diseño
- Clean Architecture

### 4. **Node.js y Express**
- Middlewares
- Routing
- Manejo de errores
- Variables de entorno

### 5. **Herramientas de Desarrollo**
- Git y GitHub
- Postman para testing
- npm y gestión de paquetes
- Debugging
- Servicios cloud (Supabase)

---

## 🎓 Instrucciones de Acceso para Evaluación

### Para Evaluadores

Este proyecto incluye una implementación completa de base de datos relacional en la nube (Supabase) como parte del taller académico. 

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/ZundyTor/API-BDNoSQL. git
cd API-BDNoSQL
```

#### 2.  Instalar Dependencias

```bash
npm install
```

#### 3. Revisar Scripts SQL

Los scripts SQL completos están en la carpeta `sql_scripts/`:

- **`countries_complete.sql`** - Creación de tabla de países con datos de prueba
- **`cities_complete.sql`** - Creación de tabla de ciudades con relación 1:N
- **`queries_join.sql`** - Ejemplos de consultas JOIN (opcional)

Puedes ejecutarlos en cualquier instancia de PostgreSQL o en Supabase. 

#### 4. Verificar Base de Datos en Supabase

**La base de datos ya está desplegada y funcional en Supabase.**

Para verificar las tablas y datos:

1. Las consultas SQL pueden ejecutarse en cualquier cliente PostgreSQL
2. Los scripts de verificación están incluidos al final de cada archivo SQL
3. El diagrama ER está documentado en este README

**Consultas de Verificación:**

```sql
-- Ver todos los países
SELECT id, name, continent, population FROM countries ORDER BY name;

-- Ver todas las ciudades con su país (JOIN)
SELECT 
  c.name AS ciudad,
  c.population AS poblacion,
  co.name AS pais
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
ORDER BY c.population DESC;

-- Verificar integridad referencial
SELECT 
  co.name AS pais,
  COUNT(c.id) AS total_ciudades
FROM countries co
LEFT JOIN cities c ON co.id = c.country_id
GROUP BY co.name
ORDER BY total_ciudades DESC;
```

#### 5. Estructura del Modelo de Datos

- **Tabla `countries`**: 7 registros (Brasil, Chile, Colombia, México, Japón, España, Argentina)
- **Tabla `cities`**: 12 registros distribuidos en 5 países
- **Relación**: 1:N (Un país → Muchas ciudades)
- **Integridad Referencial**: `ON DELETE CASCADE`, `ON UPDATE CASCADE`

#### 6. Consultas JOIN Implementadas

Se incluyen 5 consultas JOIN diferentes que demuestran:
1.  Combinación básica de tablas
2. Filtrado con WHERE
3. Agregaciones (COUNT, SUM, AVG)
4. Ordenamiento
5. Subconsultas

Ver sección [Consultas JOIN](#-consultas-join) en este README.

#### 7.  Evidencia del Taller

- ✅ **Diagrama ER**: Documentado en sección [Modelo de Datos Relacional](#️-modelo-de-datos-relacional)
- ✅ **Descripción de tablas**: Campos, tipos de datos, restricciones
- ✅ **Scripts SQL**: Disponibles en `sql_scripts/`
- ✅ **Consultas JOIN**: 5 ejemplos funcionales
- ✅ **Cadena de conexión**: Formato documentado (sin credenciales reales)
- ✅ **Proveedor cloud**: Supabase (PostgreSQL en región South America)

#### 8.  Ejecución Local (Opcional)

Si deseas ejecutar el proyecto localmente:

```bash
# Configurar . env con tus credenciales de PostgreSQL/MongoDB
cp .env.example .env

# Iniciar servidor
npm run dev

# Probar endpoints
curl http://localhost:3000/api/v1/countries? database=postgresql
```

#### 9. Contacto

Para cualquier duda sobre el proyecto o acceso a recursos:

- **GitHub:** [@ZundyTor](https://github.com/ZundyTor)
- **Repositorio:** [API-BDNoSQL](https://github.com/ZundyTor/API-BDNoSQL)

---

## 📖 Recursos Adicionales

- [Documentación de Express](https://expressjs.com/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [MongoDB University](https://university.mongodb.com/)
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture. html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

## 👨‍💻 Autor

**ZundyTor**

- GitHub: [@ZundyTor](https://github.com/ZundyTor)
- Proyecto: [API-BDNoSQL](https://github.com/ZundyTor/API-BDNoSQL)

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT.  Consulta el archivo [LICENSE](LICENSE) para más detalles.

---


<div align="center">

**¡Gracias por revisar este proyecto!** ⭐

Si te ha sido útil, considera darle una estrella en GitHub. 

</div>
