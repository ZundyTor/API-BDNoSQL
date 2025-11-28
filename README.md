# 🌍 API de Países - PostgreSQL, MongoDB & Supabase ☁️

API RESTful completa para gestionar información de países utilizando **arquitectura limpia**, **DDD (Domain-Driven Design)** y **POO (Programación Orientada a Objetos)**, con soporte para bases de datos relacionales (PostgreSQL), no relacionales (MongoDB) y **Supabase** (PostgreSQL en la nube). Incluye modelo relacional con tablas `countries` y `cities` (relación 1:N).

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_Cloud-3ECF8E.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📚 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Modelo de Datos Relacional](#️-modelo-de-datos-relacional)
- [Scripts SQL](#-scripts-sql)
- [Implementación en la Nube (Supabase)](#️-implementación-en-la-nube-supabase)
- [Cadena de Conexión](#-cadena-de-conexión)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
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
- ✅ **Tres bases de datos**: PostgreSQL (local), MongoDB (NoSQL) y Supabase (PostgreSQL en la nube)
- ✅ **Modelo Relacional**: Tablas `countries` y `cities` con relación 1:N
- ✅ **API RESTful** completa con operaciones CRUD
- ✅ **Validaciones** robustas de datos
- ✅ **Manejo de errores** centralizado
- ✅ **Patrón Repository** para abstracción de datos
- ✅ **Casos de Uso** para lógica de negocio
- ✅ **Separación de responsabilidades** en capas
- ✅ **Documentación** completa de endpoints
- ✅ **Consultas JOIN** para análisis de datos relacionales

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
```

---

## 🛠️ Tecnologías

### Backend
- **Node.js** v22.20.0 - Entorno de ejecución
- **Express** 4.18 - Framework web
- **dotenv** - Variables de entorno

### Bases de Datos
- **PostgreSQL** 14+ - Base de datos relacional (local)
- **MongoDB** 6.0+ - Base de datos no relacional
- **Supabase** - PostgreSQL en la nube (proveedor cloud)
- **pg** - Cliente PostgreSQL para Node.js
- **mongodb** - Driver oficial de MongoDB

### Herramientas de Desarrollo
- **nodemon** - Recarga automática en desarrollo
- **Postman** - Testing de API
- **Git** - Control de versiones

---

## 🗄️ Modelo de Datos Relacional

### Proveedor Cloud: Supabase

Este proyecto implementa un modelo de datos relacional utilizando **Supabase** como proveedor de base de datos PostgreSQL en la nube. Supabase ofrece una plataforma completa con PostgreSQL, autenticación, almacenamiento y APIs en tiempo real.

### Diagrama Entidad-Relación (ER)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DIAGRAMA ENTIDAD-RELACIÓN                             │
│                              Countries - Cities                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌─────────────────────────────┐         ┌─────────────────────────────┐      │
│   │         COUNTRIES           │         │           CITIES            │      │
│   ├─────────────────────────────┤         ├─────────────────────────────┤      │
│   │ PK id          VARCHAR(100) │         │ PK id          VARCHAR(100) │      │
│   │    name        VARCHAR(255) │         │ FK country_id  VARCHAR(100) │──────│
│   │    continent   VARCHAR(50)  │────┐    │    name        VARCHAR(255) │      │
│   │    capital     VARCHAR(255) │    │    │    population  BIGINT       │      │
│   │    population  BIGINT       │    │    │    is_capital  BOOLEAN      │      │
│   │    language    VARCHAR(100) │    │    │    latitude    NUMERIC(10,7)│      │
│   │    flag        VARCHAR(10)  │    │    │    longitude   NUMERIC(10,7)│      │
│   │    area        NUMERIC(12,2)│    │    │    created_at  TIMESTAMP    │      │
│   │    currency    VARCHAR(100) │    │    │    updated_at  TIMESTAMP    │      │
│   │    created_at  TIMESTAMP    │    │    └─────────────────────────────┘      │
│   │    updated_at  TIMESTAMP    │    │                                         │
│   └─────────────────────────────┘    │                                         │
│                                      │                                         │
│                                      │    ┌─────────────────────────────┐      │
│                                      └────│      RELACIÓN 1:N           │      │
│                                           │  Un país tiene MUCHAS       │      │
│                                           │  ciudades                   │      │
│                                           └─────────────────────────────┘      │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Tabla: `countries`

Almacena información de los países del mundo.

| Campo | Tipo de Dato | Restricciones | Descripción |
|-------|-------------|---------------|-------------|
| `id` | VARCHAR(100) | **PRIMARY KEY** | Identificador único del país |
| `name` | VARCHAR(255) | NOT NULL | Nombre del país |
| `continent` | VARCHAR(50) | NOT NULL, CHECK | Continente (África, América, Asia, Europa, Oceanía, Antártida) |
| `capital` | VARCHAR(255) | NOT NULL | Ciudad capital |
| `population` | BIGINT | NOT NULL, CHECK >= 0 | Población total |
| `language` | VARCHAR(100) | NOT NULL | Idioma oficial |
| `flag` | VARCHAR(10) | - | Emoji de la bandera |
| `area` | NUMERIC(12,2) | - | Área en km² |
| `currency` | VARCHAR(100) | - | Moneda oficial |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de actualización |

### Tabla: `cities`

Almacena información de las ciudades, relacionadas con los países.

| Campo | Tipo de Dato | Restricciones | Descripción |
|-------|-------------|---------------|-------------|
| `id` | VARCHAR(100) | **PRIMARY KEY** | Identificador único de la ciudad |
| `country_id` | VARCHAR(100) | **FOREIGN KEY**, NOT NULL | Referencia al país (countries.id) |
| `name` | VARCHAR(255) | NOT NULL | Nombre de la ciudad |
| `population` | BIGINT | NOT NULL, CHECK >= 0 | Población de la ciudad |
| `is_capital` | BOOLEAN | DEFAULT FALSE | Indica si es la capital |
| `latitude` | NUMERIC(10,7) | - | Coordenada de latitud |
| `longitude` | NUMERIC(10,7) | - | Coordenada de longitud |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de actualización |

### Relación entre Tablas

| Aspecto | Descripción |
|---------|-------------|
| **Tipo de relación** | 1:N (Uno a Muchos) |
| **Tabla padre** | `countries` |
| **Tabla hija** | `cities` |
| **Clave foránea** | `cities.country_id` → `countries.id` |
| **ON DELETE** | CASCADE (eliminar país elimina sus ciudades) |
| **ON UPDATE** | CASCADE (actualizar ID de país actualiza referencias) |

---

## 📊 Scripts SQL

Los scripts SQL completos están disponibles en el repositorio:

### Creación de Tablas

📁 **Ubicación**: [`schema/creacion-tablas.sql`](schema/creacion-tablas.sql)

```sql
-- Tabla de países
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

-- Tabla de ciudades con clave foránea
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

### Datos de Prueba

📁 **Ubicación**: [`data/insercion-tablas.sql`](data/insercion-tablas.sql)

| Tabla | Registros | Descripción |
|-------|-----------|-------------|
| `countries` | 7 países | Brasil, Chile, Colombia, México, Japón, España, Argentina |
| `cities` | 12 ciudades | Capitales y ciudades principales de los países |

### Consultas JOIN

A continuación se presentan 5 consultas JOIN de ejemplo para analizar los datos:

#### 1️⃣ Listar ciudades con su país

```sql
SELECT 
  c.name AS ciudad,
  c.population AS poblacion_ciudad,
  co.name AS pais,
  co.continent AS continente
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
ORDER BY c.population DESC;
```

#### 2️⃣ Mostrar solo las capitales

```sql
SELECT 
  c.name AS capital,
  c.population AS poblacion,
  co.name AS pais,
  co.flag AS bandera
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
WHERE c.is_capital = TRUE
ORDER BY c.population DESC;
```

#### 3️⃣ Agregación por continente

```sql
SELECT 
  co.continent AS continente,
  COUNT(DISTINCT co.id) AS total_paises,
  COUNT(c.id) AS total_ciudades,
  SUM(c.population) AS poblacion_total_ciudades
FROM countries co
LEFT JOIN cities c ON co.id = c.country_id
GROUP BY co.continent
ORDER BY total_ciudades DESC;
```

#### 4️⃣ Países con número de ciudades

```sql
SELECT 
  co.name AS pais,
  co.flag AS bandera,
  co.capital AS capital_oficial,
  COUNT(c.id) AS numero_ciudades
FROM countries co
LEFT JOIN cities c ON co.id = c.country_id
GROUP BY co.id, co.name, co.flag, co.capital
ORDER BY numero_ciudades DESC;
```

#### 5️⃣ Ciudades de América

```sql
SELECT 
  c.name AS ciudad,
  c.population AS poblacion,
  c.is_capital AS es_capital,
  co.name AS pais
FROM cities c
INNER JOIN countries co ON c.country_id = co.id
WHERE co.continent = 'América'
ORDER BY c.population DESC;
```

---

## ☁️ Implementación en la Nube (Supabase)

### ¿Qué es Supabase?

Supabase es una alternativa de código abierto a Firebase que proporciona una base de datos PostgreSQL en la nube, con características adicionales como autenticación, almacenamiento de archivos y funciones en tiempo real.

### Configuración Inicial

#### 1. Crear cuenta en Supabase
1. Ir a [https://supabase.com/](https://supabase.com/)
2. Registrarse con cuenta de GitHub o correo electrónico
3. Verificar correo electrónico

#### 2. Crear nuevo proyecto
1. Hacer clic en "New Project"
2. Seleccionar organización
3. Configurar:
   - **Nombre del proyecto**: `countries-api` (o el nombre deseado)
   - **Contraseña de base de datos**: Generar contraseña segura
   - **Región**: `South America (São Paulo)` - para menor latencia desde América Latina
4. Hacer clic en "Create new project"
5. Esperar ~2 minutos a que se aprovisione la base de datos

#### 3. Ejecutar scripts SQL
1. Ir a **SQL Editor** en el panel lateral
2. Crear nueva consulta
3. Copiar y ejecutar el contenido de `schema/creacion-tablas.sql`
4. Copiar y ejecutar el contenido de `data/insercion-tablas.sql`
5. Verificar que las tablas se hayan creado correctamente

#### 4. Obtener credenciales de conexión
1. Ir a **Project Settings** → **Database**
2. Copiar la **Connection String** (URI)
3. Reemplazar `[YOUR-PASSWORD]` con la contraseña del proyecto

### Configuración de Acceso

Configurar las variables de entorno en el archivo `.env`:

```env
# ============================================
# SUPABASE (PostgreSQL en la Nube)
# ============================================
SUPABASE_CONNECTION_STRING=postgresql://postgres.[PROJECT-ID]:[YOUR_PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres

SUPABASE_HOST=aws-0-sa-east-1.pooler.supabase.com
SUPABASE_PORT=5432
SUPABASE_DB=postgres
SUPABASE_USER=postgres.[PROJECT-ID]
SUPABASE_PASSWORD=[YOUR_PASSWORD]

# Alternar entre BD local y nube
USE_SUPABASE=false
```

> ⚠️ **IMPORTANTE**: Nunca subir credenciales reales al repositorio. Usar `.env` para variables sensibles.

### Nota sobre Limitaciones de Red

Algunas redes corporativas, universitarias o ISPs pueden bloquear conexiones salientes a ciertos puertos o dominios. Si experimenta problemas de conexión:

1. Verificar que el puerto 5432 no esté bloqueado
2. Probar desde una red diferente (datos móviles, VPN)
3. Contactar al administrador de red si es necesario
4. La base de datos sigue siendo accesible desde el SQL Editor de Supabase

---

## 🔗 Cadena de Conexión

### Formato de la Cadena de Conexión

```
postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

### Explicación de cada parte

| Componente | Descripción | Ejemplo |
|------------|-------------|---------|
| `postgresql://` | Protocolo de conexión | - |
| `postgres.[PROJECT-ID]` | Usuario con identificador del proyecto | `postgres.abcdefghijk` |
| `[PASSWORD]` | Contraseña de la base de datos | (definida al crear proyecto) |
| `aws-0-sa-east-1.pooler.supabase.com` | Host del servidor (región São Paulo) | - |
| `5432` | Puerto de PostgreSQL | - |
| `postgres` | Nombre de la base de datos | - |

### Ejemplo con Pooler (Recomendado)

```
postgresql://postgres.xxxxxxxxxxxx:MiPassword123@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

El uso del **Pooler** de Supabase optimiza las conexiones y es recomendado para aplicaciones en producción.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16 o superior ([Descargar](https://nodejs.org/))
- **PostgreSQL** 14 o superior ([Descargar](https://www.postgresql.org/download/))
- **MongoDB** 6.0 o superior ([Descargar](https://www.mongodb.com/try/download/community))
- **Git** ([Descargar](https://git-scm.com/))
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

#### PostgreSQL:

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE countries_db;

# Salir
\q
```

#### MongoDB:

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

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=countries_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña_aqui

# MongoDB
MONGODB_URI=mongodb://localhost:27017/countries_db
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

- `postgresql` - Solo PostgreSQL
- `mongodb` - Solo MongoDB
- `both` - Ambas bases de datos (default para POST, PUT, DELETE)

---

### 📍 Endpoints Disponibles

| Método | Endpoint | Descripción | Database Query |
|--------|----------|-------------|----------------|
| `GET` | `/` | Página de inicio | - |
| `GET` | `/health` | Estado de las BD | - |
| `GET` | `/api/v1/docs` | Documentación | - |
| `POST` | `/api/v1/countries` | Crear país | `?database=both` |
| `GET` | `/api/v1/countries` | Listar países | `?database=postgresql` |
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
POST http://localhost:3000/api/v1/countries?database=both
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
      "id": "country_...",
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
      { "name": "Argentina", "flag": "🇦🇷", ... },
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
  "timestamp": "2025-11-16T00:17:35.000Z"
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
  "timestamp": "2025-11-16T00:17:35.000Z"
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
│   │   │   └── supabase/            # ☁️ Nueva carpeta
│   │   │       └── connection.js    # Conexión a Supabase (PostgreSQL en la nube)
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
├── schema/                          # 📊 Scripts SQL de creación
│   └── creacion-tablas.sql          # Creación de tablas countries y cities
│
├── data/                            # 📊 Scripts SQL de datos
│   └── insercion-tablas.sql         # Inserción de datos de prueba
│
├── imgs/                            # 📷 Imágenes de documentación
│   ├── supabase1.png - supabase5.png  # Capturas de Supabase
│   └── consulta1.png - consulta5.png  # Resultados de consultas JOIN
│
├── tests/                           # Archivos de prueba
│   ├── test-country.js
│   ├── test-postgresql.js
│   ├── test-mongodb.js
│   ├── test-repository.js
│   ├── test-repository-mongodb.js
│   ├── test-usecases.js
│   └── test-supabase-connection.js  # ☁️ Test de conexión a Supabase
│
├── .env                             # Variables de entorno (NO subir a Git)
├── .env.example                     # Ejemplo de variables de entorno
├── .gitignore                       # Archivos ignorados por Git
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
- **Polimorfismo**: Mismo método, diferentes implementaciones (PostgreSQL vs MongoDB)

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
node test-country.js
```

### Ejecutar pruebas de PostgreSQL:
```bash
node test-postgresql.js
```

### Ejecutar pruebas de MongoDB:
```bash
node test-mongodb.js
```

### Ejecutar pruebas de Repositories:
```bash
node test-repository.js
node test-repository-mongodb.js
```

### Ejecutar pruebas de Casos de Uso:
```bash
node test-usecases.js
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
| **Transacciones** | ACID completo | ACID (desde v4.0) |
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
- Diseño de esquemas (PostgreSQL)
- Documentos flexibles (MongoDB)
- Índices para optimización
- Consultas y agregaciones

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

---

## 📖 Recursos Adicionales

- [Documentación de Express](https://expressjs.com/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

## 🎓 Instrucciones de Acceso para Evaluación

### 📋 Información del Proyecto

| Aspecto | Detalle |
|---------|---------|
| **Repositorio** | [https://github.com/ZundyTor/API-BDNoSQL](https://github.com/ZundyTor/API-BDNoSQL) |
| **Proveedor Cloud** | Supabase (PostgreSQL) |
| **Región del Servidor** | South America (São Paulo) |
| **Tablas Implementadas** | `countries` (7 registros), `cities` (12 registros) |
| **Tipo de Relación** | 1:N (Un país → Muchas ciudades) |

### 🚀 Cómo Clonar y Configurar el Proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/ZundyTor/API-BDNoSQL.git
cd API-BDNoSQL

# 2. Instalar dependencias
npm install

# 3. Copiar archivo de configuración
cp .env.example .env

# 4. Configurar variables de entorno (editar .env con credenciales)
```

### 📁 Ubicación de los Scripts SQL

| Script | Ubicación | Descripción |
|--------|-----------|-------------|
| Creación de tablas | [`schema/creacion-tablas.sql`](schema/creacion-tablas.sql) | DDL para `countries` y `cities` |
| Inserción de datos | [`data/insercion-tablas.sql`](data/insercion-tablas.sql) | Datos de prueba |

### ☁️ Verificación en Supabase

La base de datos está **funcional y desplegada** en Supabase. Para verificar las consultas:

1. Acceder al panel de Supabase del proyecto
2. Ir a **SQL Editor**
3. Ejecutar las consultas JOIN documentadas en este README
4. Verificar los resultados con las capturas en la carpeta `imgs/`

### 🧪 Ejecutar Pruebas de Conexión

```bash
# Probar conexión a Supabase (requiere credenciales configuradas)
node tests/test-supabase-connection.js

# Probar conexión a PostgreSQL local
node test-postgresql.js

# Probar conexión a MongoDB
node test-mongodb.js
```

### 📷 Evidencias Incluidas

La carpeta `imgs/` contiene capturas de pantalla de:
- Configuración de Supabase (`supabase1.png` - `supabase5.png`)
- Resultados de consultas JOIN (`consulta1.png` - `consulta5.png`)

### ✅ Lista de Verificación para Evaluación

- [x] Modelo relacional implementado (tablas `countries` y `cities`)
- [x] Relación 1:N con integridad referencial (ON DELETE/UPDATE CASCADE)
- [x] Diagrama ER documentado
- [x] Scripts SQL de creación de tablas
- [x] Datos de prueba insertados (7 países, 12 ciudades)
- [x] 5 consultas JOIN documentadas y funcionales
- [x] Base de datos desplegada en Supabase
- [x] Conexión configurada y probada
- [x] Documentación completa en README

> **Nota**: Las credenciales de acceso a Supabase no se incluyen en el repositorio por seguridad. La base de datos puede ser verificada directamente desde el SQL Editor de Supabase con las credenciales proporcionadas por el autor.

---

## 👨‍💻 Autor

**ZundyTor**

- GitHub: [@ZundyTor](https://github.com/ZundyTor)
- Proyecto: [API-BDNoSQL](https://github.com/ZundyTor/API-BDNoSQL)

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---


<div align="center">

**¡Gracias por revisar este proyecto!** ⭐

Si te ha sido útil, considera darle una estrella en GitHub.

</div> 