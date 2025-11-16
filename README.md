# 🌍 API de Países - PostgreSQL & MongoDB

API RESTful completa para gestionar información de países utilizando **arquitectura limpia**, **DDD (Domain-Driven Design)** y **POO (Programación Orientada a Objetos)**, con soporte para bases de datos relacionales (PostgreSQL) y no relacionales (MongoDB).

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📚 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Principios Aplicados](#-principios-aplicados)
- [Pruebas](#-pruebas)
- [Autor](#-autor)

---

## ✨ Características

- ✅ **Arquitectura Limpia** (Clean Architecture)
- ✅ **DDD** (Domain-Driven Design)
- ✅ **POO** (Programación Orientada a Objetos)
- ✅ **Dos bases de datos**: PostgreSQL (relacional) y MongoDB (no relacional)
- ✅ **API RESTful** completa con operaciones CRUD
- ✅ **Validaciones** robustas de datos
- ✅ **Manejo de errores** centralizado
- ✅ **Patrón Repository** para abstracción de datos
- ✅ **Casos de Uso** para lógica de negocio
- ✅ **Separación de responsabilidades** en capas
- ✅ **Documentación** completa de endpoints

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
- **PostgreSQL** 14+ - Base de datos relacional
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
│   │   │   │   └── connection.js    # Conexión a PostgreSQL
│   │   │   └── mongodb/
│   │   │       └── connection.js    # Conexión a MongoDB
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
├── config/                          # Configuraciones
├── tests/                           # Archivos de prueba
│   ├── test-country.js
│   ├── test-postgresql.js
│   ├── test-mongodb.js
│   ├── test-repository.js
│   ├── test-repository-mongodb.js
│   └── test-usecases.js
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
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

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