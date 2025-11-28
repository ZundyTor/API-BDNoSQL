# 🌍 API de Países y Ciudades - Full Stack Application

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express. js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Supabase](https://img.shields. io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Render](https://img. shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

Aplicación Full Stack completa para la gestión de países y ciudades, implementada con **Arquitectura Hexagonal** en el backend y una **interfaz web interactiva** en el frontend.  El proyecto incluye despliegue completo en la nube con bases de datos en Supabase, backend y frontend en Render. 

**🔗 Aplicación en Producción:** https://api-bdnosql. onrender.com  
**🔗 API REST Backend:** https://api-bdnosql.onrender.com/api/v1  
**📦 Repositorio GitHub:** https://github.com/ZundyTor/API-BDNoSQL

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [Instalación Local](#-instalación-local)
- [Deployment en la Nube](#-deployment-en-la-nube)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Guía de Uso](#-guía-de-uso)
- [Autor](#-autor)

---

## 📖 Descripción General

Este proyecto es una **aplicación Full Stack** que permite la gestión completa de países y ciudades a través de una API REST y una interfaz web interactiva. Fue desarrollado siguiendo las mejores prácticas de arquitectura de software, implementando el patrón de **Arquitectura Hexagonal** (Puertos y Adaptadores) en el backend. 

### **Componentes del Sistema:**

1. **Base de Datos Local:** PostgreSQL y MongoDB para desarrollo
2. **Base de Datos en la Nube:** PostgreSQL en Supabase para producción
3. **Backend API REST:** Node.js + Express con arquitectura hexagonal
4. **Backend en la Nube:** Desplegado en Render con conexión a Supabase
5. **Frontend Web:** HTML5 + CSS3 + JavaScript Vanilla
6. **Frontend en la Nube:** Servido desde Render junto con el backend

### **Relaciones de Datos:**

El sistema implementa una **relación 1:N** entre Countries (Países) y Cities (Ciudades):
- Un país puede tener múltiples ciudades
- Cada ciudad pertenece a un único país
- Se pueden consultar todas las ciudades de un país específico

---

## ✨ Características Principales

### **Backend (API REST):**

✅ **Arquitectura Hexagonal completa** - Separación en capas: Domain, Application, Infrastructure, Interfaces  
✅ **Doble persistencia opcional** - PostgreSQL (principal) + MongoDB (opcional)  
✅ **CRUD completo para Countries** - Crear, listar, obtener, actualizar, eliminar países  
✅ **CRUD completo para Cities** - Crear, listar, obtener, actualizar, eliminar ciudades  
✅ **Relación 1:N** - Ciudades asociadas a países  
✅ **Validación de datos** - Con entidades de dominio  
✅ **Manejo de errores centralizado** - Códigos HTTP apropiados  
✅ **Health Check** - Monitoreo del estado del servidor  
✅ **CORS configurado** - Acceso desde diferentes orígenes  

### **Frontend (Interfaz Web):**

✅ **Interfaz moderna y responsive** - Diseño adaptable a móviles y tablets  
✅ **CRUD visual completo** - Gestión de países y ciudades desde la interfaz  
✅ **Navegación por tabs** - Cambio entre Countries y Cities  
✅ **Formularios modales** - No recarga la página  
✅ **Validación de campos** - Campos obligatorios marcados  
✅ **Mensajes de éxito/error** - Toasts animados  
✅ **Confirmaciones** - Diálogos antes de eliminar  
✅ **Indicadores de carga** - Feedback visual en operaciones  
✅ **Selector de países** - Al crear ciudades (relación 1:N)  

### **Deployment en la Nube:**

✅ **Backend en Render** - Despliegue automático desde GitHub  
✅ **PostgreSQL en Supabase** - Connection pooling, backups automáticos  
✅ **Frontend en Render** - Servido por Express (mismo dominio que API)  
✅ **SSL/HTTPS** - Incluido automáticamente  
✅ **Variables de entorno seguras** - Configuración separada por entorno  

---

## 🏗️ Arquitectura del Sistema

### **Arquitectura Hexagonal (Backend)**

El backend implementa el patrón de Arquitectura Hexagonal, separando el sistema en capas concéntricas:

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND WEB                         │
│  (HTML + CSS + JavaScript)                               │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────┐
│                   INTERFACES LAYER                       │
│  (Controllers, Routes, Middlewares)                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                       │
│  (Use Cases - Casos de Uso)                             │
│  • CreateCountry  • CreateCity                           │
│  • GetAll         • Update                               │
│  • Delete         • GetById                              │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                         │
│  (Entities - Country, City)                              │
│  • Validaciones de negocio                               │
│  • Generación de IDs                                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE LAYER                     │
│  (Repositories, Database Connections)                    │
│  • PostgreSQL  • MongoDB                                 │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    DATABASES                             │
│  LOCAL: PostgreSQL + MongoDB                             │
│  CLOUD: Supabase (PostgreSQL)                            │
└─────────────────────────────────────────────────────────┘
```

**Ventajas:**
- 🔌 **Desacoplamiento** - Lógica de negocio independiente de frameworks
- 🔄 **Intercambiabilidad** - Fácil cambiar de base de datos
- 🧪 **Testeable** - Cada capa se testea independientemente
- 📦 **Mantenible** - Código organizado y claro
- 🚀 **Escalable** - Fácil agregar nuevas funcionalidades

---

## 🛠️ Tecnologías Utilizadas

### **Backend:**
- **Node.js** v16+ - Runtime de JavaScript
- **Express.js** ^4.18.2 - Framework web
- **PostgreSQL** 15+ - Base de datos relacional
- **MongoDB** 7+ - Base de datos NoSQL (opcional)
- **pg** ^8.11.0 - Cliente PostgreSQL
- **mongoose** ^8.8.4 - ODM para MongoDB
- **dotenv** ^16.0.3 - Variables de entorno
- **cors** ^2.8. 5 - Middleware CORS
- **nodemon** ^3.0.1 - Auto-reload en desarrollo

### **Frontend:**
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos (Flexbox, Grid, Variables, Animations)
- **JavaScript (Vanilla)** - Lógica (ES6+)
- **Fetch API** - Consumo de API REST

### **Infraestructura Cloud:**
- **Render** - Hosting del backend y frontend
- **Supabase** - PostgreSQL en la nube
- **GitHub** - Control de versiones y CI/CD

---

## 📁 Estructura del Proyecto

```
API-BDNoSQL/
│
├── public/                              # 🎨 FRONTEND
│   ├── index. html                       # Página principal
│   ├── css/
│   │   └── styles.css                   # Estilos completos
│   └── js/
│       ├── api.js                       # Configuración de API
│       ├── countries.js                 # Lógica de países
│       └── cities.js                    # Lógica de ciudades
│
├── src/                                 # 🔧 BACKEND
│   ├── domain/                          # Entidades y validaciones
│   │   └── entities/
│   │       ├── Country.js
│   │       └── City.js
│   │
│   ├── application/                     # Casos de uso
│   │   └── useCases/
│   │       ├── CreateCountry.js
│   │       ├── GetAllCountries.js
│   │       ├── UpdateCountry.js
│   │       ├── DeleteCountry.js
│   │       └── cities/
│   │           ├── CreateCity.js
│   │           ├── GetAllCities.js
│   │           ├── UpdateCity.js
│   │           └── DeleteCity.js
│   │
│   ├── infrastructure/                  # Persistencia
│   │   ├── database/
│   │   │   ├── postgresql/connection.js
│   │   │   └── mongodb/connection.js
│   │   └── repositories/
│   │       ├── CountryPostgreSQLRepository.js
│   │       ├── CountryMongoDBRepository.js
│   │       └── CityPostgreSQLRepository.js
│   │
│   └── interfaces/                      # Adaptadores HTTP
│       ├── controllers/
│       │   ├── CountryController.js
│       │   └── CityController.js
│       ├── routes/
│       │   ├── countryRoutes.js
│       │   └── cityRoutes. js
│       └── middlewares/
│           └── errorHandler.js
│
├── scripts/
│   └── seed.js                          # Poblar base de datos
│
├── server.js                            # Punto de entrada
├── package.json                         # Dependencias
├── . env                                 # Variables de entorno (local)
├── .env.example                         # Ejemplo de variables
├── . gitignore
└── README.md
```

---

## 💾 Base de Datos

### **Diseño de Tablas**

#### **Tabla: countries**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | VARCHAR(255) PRIMARY KEY | ID único (country_timestamp_random) |
| `name` | VARCHAR(255) NOT NULL | Nombre del país |
| `continent` | VARCHAR(100) NOT NULL | Continente (África, América, Asia, Europa, Oceanía) |
| `capital` | VARCHAR(255) NOT NULL | Ciudad capital |
| `population` | INTEGER NOT NULL | Número de habitantes |
| `language` | VARCHAR(100) NOT NULL | Idioma principal |
| `flag` | VARCHAR(10) | Emoji de la bandera |
| `area` | INTEGER | Área en km² |
| `currency` | VARCHAR(100) | Moneda oficial |
| `created_at` | TIMESTAMP DEFAULT NOW() | Fecha de creación |
| `updated_at` | TIMESTAMP DEFAULT NOW() | Fecha de actualización |

#### **Tabla: cities**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | VARCHAR(255) PRIMARY KEY | ID único (city_timestamp_random) |
| `country_id` | VARCHAR(255) FOREIGN KEY | Referencia al país |
| `name` | VARCHAR(255) NOT NULL | Nombre de la ciudad |
| `population` | INTEGER NOT NULL | Número de habitantes |
| `is_capital` | BOOLEAN DEFAULT FALSE | Indica si es capital |
| `latitude` | DECIMAL(10,6) | Coordenada latitud |
| `longitude` | DECIMAL(10,6) | Coordenada longitud |
| `created_at` | TIMESTAMP DEFAULT NOW() | Fecha de creación |
| `updated_at` | TIMESTAMP DEFAULT NOW() | Fecha de actualización |

**Relación:** `countries (1) ----< (N) cities`  
**Integridad:** `ON DELETE CASCADE` - Al eliminar un país, se eliminan sus ciudades

### **PostgreSQL Local (Desarrollo)**

```bash
# Crear base de datos
psql -U postgres
CREATE DATABASE countries_db;
\q
```

**Variables de entorno:**
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=countries_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña
```

### **PostgreSQL en Supabase (Producción)**

1.  Crear proyecto en https://supabase.com
2. Obtener credenciales de: Settings → Database → Connection String (Session Mode)
3. Extraer valores:
   ```
   Host: aws-1-sa-east-1.pooler.supabase.com
   Port: 5432
   Database: postgres
   User: postgres. xxxxxxxxxx
   Password: tu_contraseña
   ```

**Variables de entorno:**
```env
POSTGRES_HOST=aws-1-sa-east-1.pooler.supabase.com
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres.xxxxxxxxxx
POSTGRES_PASSWORD=tu_contraseña_supabase
```

**Nota:** Las tablas se crean automáticamente al iniciar el servidor.

### **Poblar Datos**

```bash
node scripts/seed.js
```

Esto crea 10 países y 12 ciudades de ejemplo. 

---

## 📦 Instalación Local

### **Requisitos:**
- Node.js v16+
- PostgreSQL 15+ (opcional)
- Git

### **Pasos:**

```bash
# 1. Clonar repositorio
git clone https://github. com/ZundyTor/API-BDNoSQL.git
cd API-BDNoSQL

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example . env
# Editar . env con tus credenciales

# 4. Poblar base de datos (opcional)
node scripts/seed. js

# 5. Iniciar servidor
npm run dev

# 6. Abrir en navegador
# http://localhost:3000
```

---

## 🚀 Deployment en la Nube

### **1. Backend y Frontend en Render**

#### **Paso 1: Preparar Repositorio**
```bash
git add .
git commit -m "Preparar para deployment"
git push origin main
```

#### **Paso 2: Crear Web Service en Render**

1. Ve a https://render.com y regístrate
2. Dashboard → New → Web Service
3.  Conectar repositorio: `ZundyTor/API-BDNoSQL`
4.  Configurar:
   ```
   Name: api-bdnosql
   Branch: main
   Build Command: npm install
   Start Command: npm start
   ```

#### **Paso 3: Configurar Variables de Entorno**

Agregar en "Environment Variables":

```
NODE_ENV=production
PORT=10000
POSTGRES_HOST=aws-1-sa-east-1.pooler.supabase.com
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres.xxxxxxxxxx
POSTGRES_PASSWORD=tu_contraseña_supabase
```

#### **Paso 4: Desplegar**

Click en "Create Web Service" y esperar 2-3 minutos. 

**URLs finales:**
- Frontend: https://api-bdnosql.onrender.com
- API: https://api-bdnosql.onrender.com/api/v1

### **2. Base de Datos en Supabase**

#### **Paso 1: Crear Proyecto**

1. Ve a https://supabase.com
2. New Project:
   - Name: countries-db
   - Database Password: (genera una segura)
   - Region: South America (São Paulo)
   - Plan: Free

#### **Paso 2: Obtener Credenciales**

1. Settings → Database
2. Connection String → Mode: **Session**
3. Copiar y extraer valores (host, port, user, password)

**Nota:** Las tablas se crean automáticamente cuando el backend se conecta por primera vez.

### **Auto-Deploy**

Cada `git push origin main` despliega automáticamente en Render. 

---

## 📡 Endpoints de la API

### **Formato de Respuestas**

**Éxito:**
```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": { ...  },
  "metadata": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

### **Endpoints Generales**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Frontend web o info de API |
| GET | `/health` | Estado del servidor |

### **Endpoints de Countries**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/countries` | Crear país |
| GET | `/api/v1/countries` | Listar países |
| GET | `/api/v1/countries/:id` | Obtener país por ID |
| GET | `/api/v1/countries/continent/:continent` | Filtrar por continente |
| GET | `/api/v1/countries/stats/summary` | Estadísticas |
| PUT | `/api/v1/countries/:id` | Actualizar país |
| DELETE | `/api/v1/countries/:id` | Eliminar país |

**Query params:**
- `database`: `postgresql`, `mongodb`, `both` (default: `postgresql`)
- `limit`: Número de resultados (default: `100`)
- `offset`: Saltar resultados (default: `0`)

### **Endpoints de Cities**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/cities` | Crear ciudad |
| GET | `/api/v1/cities` | Listar ciudades |
| GET | `/api/v1/cities/:id` | Obtener ciudad por ID |
| GET | `/api/v1/countries/:countryId/cities` | Ciudades de un país |
| PUT | `/api/v1/cities/:id` | Actualizar ciudad |
| DELETE | `/api/v1/cities/:id` | Eliminar ciudad |

**Query params:**
- `limit`: Número de resultados (default: `100`)
- `offset`: Saltar resultados (default: `0`)
- `countryId`: Filtrar por país
- `capitalsOnly`: `true` para solo capitales (default: `false`)

### **Ejemplos de Uso**

#### **Crear País:**
```bash
POST https://api-bdnosql.onrender.com/api/v1/countries? database=postgresql
Content-Type: application/json

{
  "name": "Colombia",
  "continent": "América",
  "capital": "Bogotá",
  "population": 52000000,
  "language": "Español",
  "flag": "🇨🇴",
  "area": 1141748,
  "currency": "Peso Colombiano"
}
```

#### **Listar Países:**
```bash
GET https://api-bdnosql.onrender.com/api/v1/countries?database=postgresql&limit=10
```

#### **Crear Ciudad:**
```bash
POST https://api-bdnosql.onrender.com/api/v1/cities
Content-Type: application/json

{
  "countryId": "country_1732822445123_abc123",
  "name": "Medellín",
  "population": 2500000,
  "isCapital": false,
  "latitude": 6.2476,
  "longitude": -75.5658
}
```

#### **Ciudades de un País:**
```bash
GET https://api-bdnosql.onrender.com/api/v1/countries/country_1732822445123_abc123/cities
```

---

## 🔐 Variables de Entorno

### **Archivo `. env. example`**

```env
# Servidor
PORT=3000
NODE_ENV=development

# PostgreSQL Local
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=countries_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña

# Supabase (Producción)
POSTGRES_HOST=aws-1-sa-east-1.pooler.supabase.com
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres.xxxxxxxxxx
POSTGRES_PASSWORD=tu_contraseña_supabase

# MongoDB (Opcional)
MONGODB_URI=mongodb://localhost:27017/countries_db
```

---

## 🔧 Scripts Disponibles

```bash
# Iniciar en desarrollo (con auto-reload)
npm run dev

# Iniciar en producción
npm start

# Poblar base de datos
node scripts/seed. js
```

---

## 📖 Guía de Uso

### **Frontend - Gestión de Países:**

1. **Crear:** Click en "➕ Crear Nuevo País" → Llenar formulario → Guardar
2. **Editar:** Click en "✏️ Editar" en un país → Modificar datos → Guardar
3. **Eliminar:** Click en "🗑️ Eliminar" en un país → Confirmar

### **Frontend - Gestión de Ciudades:**

1. **Crear:** Click en tab "🏙️ Ciudades" → "➕ Crear Nueva Ciudad" → Seleccionar país → Llenar formulario → Guardar
2. **Editar:** Click en "✏️ Editar" en una ciudad → Modificar datos → Guardar
3. **Eliminar:** Click en "🗑️ Eliminar" en una ciudad → Confirmar

### **API - Consumo desde Código:**

```javascript
// Configuración
const API_URL = 'https://api-bdnosql.onrender.com/api/v1';

// Obtener países
async function getCountries() {
  const response = await fetch(`${API_URL}/countries?database=postgresql&limit=50`);
  const data = await response.json();
  return data.data;
}

// Crear país
async function createCountry(countryData) {
  const response = await fetch(`${API_URL}/countries? database=postgresql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(countryData)
  });
  const data = await response.json();
  return data.data;
}

// Usar
getCountries().then(countries => console.log(countries));
createCountry({
  name: 'Chile',
  continent: 'América',
  capital: 'Santiago',
  population: 19500000,
  language: 'Español',
  flag: '🇨🇱'
});
```

---

## 👨‍💻 Autor

**ZundyTor**

- 🌐 GitHub: [@ZundyTor](https://github.com/ZundyTor)
- 📦 Repositorio: [API-BDNoSQL](https://github.com/ZundyTor/API-BDNoSQL)
- 🚀 Aplicación: [https://api-bdnosql.onrender.com](https://api-bdnosql.onrender.com)

---

## 📄 Licencia

Este proyecto está disponible bajo la **Licencia MIT**. 

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!**
