# 🌍 API de Países y Ciudades - Arquitectura Hexagonal

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img. shields.io/badge/Express. js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields. io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Supabase](https://img. shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

API REST completa para gestión de países y ciudades, implementada con **Arquitectura Hexagonal (Puertos y Adaptadores)** y desplegada en la nube. 

**🔗 API en Producción:** https://api-bdnosql. onrender.com

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Uso](#-uso)
- [Endpoints](#-endpoints)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Deployment](#-deployment)
- [Autor](#-autor)

---

## ✨ Características

✅ **Arquitectura Hexagonal** (Puertos y Adaptadores)  
✅ **Doble persistencia**: PostgreSQL + MongoDB  
✅ **CRUD completo** para Countries y Cities  
✅ **Relación 1:N** entre Countries y Cities  
✅ **API RESTful** con Express. js  
✅ **Validación de datos** con entidades de dominio  
✅ **Manejo de errores** centralizado  
✅ **Logging** de peticiones  
✅ **Health Check** para monitoreo  
✅ **Desplegado en producción** (Render + Supabase)  
✅ **Documentación completa** de endpoints  

---

## 🏗️ Arquitectura

Este proyecto implementa **Arquitectura Hexagonal** (también conocida como Puertos y Adaptadores), separando claramente las capas:

```
┌─────────────────────────────────────────────────────────┐
│                    INTERFACES                            │
│  (Controllers, Routes, Middlewares)                      │
│  ↓ Adaptadores de entrada (HTTP REST)                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  APPLICATION                             │
│  (Use Cases - Lógica de Negocio)                        │
│  • CreateCountry    • CreateCity                         │
│  • GetAllCountries  • GetAllCities                       │
│  • UpdateCountry    • UpdateCity                         │
│  • DeleteCountry    • DeleteCity                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     DOMAIN                               │
│  (Entidades, Reglas de Negocio)                         │
│  • Country Entity   • City Entity                        │
│  • Validaciones de dominio                               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE                           │
│  (Repositories, Database Connections)                    │
│  ↓ Adaptadores de salida                                │
│  • PostgreSQL (Supabase)                                 │
│  • MongoDB (Atlas)                                       │
└─────────────────────────────────────────────────────────┘
```

### **Ventajas de esta Arquitectura:**

- 🔌 **Desacoplamiento**: La lógica de negocio no depende de frameworks o bases de datos
- 🔄 **Intercambiabilidad**: Fácil cambiar de PostgreSQL a MySQL sin afectar la lógica
- 🧪 **Testeable**: Fácil de testear cada capa independientemente
- 📦 **Mantenible**: Código organizado y fácil de entender
- 🚀 **Escalable**: Fácil agregar nuevas funcionalidades

---

## 🛠️ Tecnologías

### **Backend:**
- **Node.js** v16+ - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **dotenv** - Gestión de variables de entorno
- **cors** - Manejo de CORS
- **nodemon** - Auto-reload en desarrollo

### **Bases de Datos:**
- **PostgreSQL** (Supabase) - Base de datos relacional
- **MongoDB** (opcional) - Base de datos NoSQL
- **pg** - Cliente de PostgreSQL para Node.js
- **mongoose** - ODM para MongoDB

### **Deployment:**
- **Render** - Hosting de la API
- **Supabase** - PostgreSQL en la nube
- **GitHub** - Control de versiones

---

## 📁 Estructura del Proyecto

```
API-BDNoSQL/
├── src/
│   ├── domain/
│   │   └── entities/
│   │       ├── Country.js          # Entidad Country
│   │       └── City.js              # Entidad City
│   │
│   ├── application/
│   │   └── useCases/
│   │       ├── CreateCountry.js     # Caso de uso: Crear país
│   │       ├── GetAllCountries. js   # Caso de uso: Listar países
│   │       ├── UpdateCountry.js     # Caso de uso: Actualizar país
│   │       ├── DeleteCountry.js     # Caso de uso: Eliminar país
│   │       └── cities/
│   │           ├── CreateCity.js    # Caso de uso: Crear ciudad
│   │           ├── GetAllCities.js  # Caso de uso: Listar ciudades
│   │           ├── GetCityById.js   # Caso de uso: Obtener ciudad
│   │           ├── UpdateCity.js    # Caso de uso: Actualizar ciudad
│   │           └── DeleteCity.js    # Caso de uso: Eliminar ciudad
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── postgresql/
│   │   │   │   └── connection.js    # Conexión PostgreSQL
│   │   │   └── mongodb/
│   │   │       └── connection.js    # Conexión MongoDB
│   │   │
│   │   └── repositories/
│   │       ├── CountryPostgreSQLRepository.js
│   │       ├── CountryMongoDBRepository.js
│   │       └── CityPostgreSQLRepository.js
│   │
│   └── interfaces/
│       ├── controllers/
│       │   ├── CountryController.js  # Controlador de países
│       │   └── CityController.js     # Controlador de ciudades
│       │
│       ├── routes/
│       │   ├── countryRoutes.js      # Rutas de países
│       │   └── cityRoutes.js         # Rutas de ciudades
│       │
│       └── middlewares/
│           └── errorHandler.js        # Middleware de errores
│
├── scripts/
│   └── seed.js                        # Script para poblar BD
│
├── server.js                          # Punto de entrada
├── package.json
├── . env. example                       # Ejemplo de variables
├── .gitignore
└── README.md
```

---

## 📦 Instalación

### **Prerrequisitos:**

- Node.js v16 o superior
- PostgreSQL (local o Supabase)
- MongoDB (opcional)
- Git

### **Pasos:**

1. **Clonar el repositorio:**

```bash
git clone https://github.com/ZundyTor/API-BDNoSQL. git
cd API-BDNoSQL
```

2. **Instalar dependencias:**

```bash
npm install
```

3.  **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `. env` con tus credenciales (ver sección siguiente).

4. **Poblar la base de datos con datos de prueba:**

```bash
node scripts/seed.js
```

5. **Iniciar el servidor en modo desarrollo:**

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

---

## 🔐 Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
# Servidor
PORT=3000
NODE_ENV=development

# PostgreSQL (Local)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=countries_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña

# Supabase (Producción)
SUPABASE_HOST=aws-1-sa-east-1.pooler.supabase.com
SUPABASE_PORT=5432
SUPABASE_DB=postgres
SUPABASE_USER=postgres. xxxxxxxxxx
SUPABASE_PASSWORD=tu_contraseña_supabase

# MongoDB (Opcional)
MONGODB_URI=mongodb://localhost:27017/countries_db
```

---

## 🚀 Uso

### **Iniciar en Desarrollo:**

```bash
npm run dev
```

### **Iniciar en Producción:**

```bash
npm start
```

### **Poblar Base de Datos:**

```bash
node scripts/seed.js
```

---

## 📡 Endpoints

### **🏠 General**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información de la API |
| GET | `/health` | Health check |
| GET | `/api/v1/docs` | Documentación |

### **🌍 Countries**

| Método | Endpoint | Descripción | Query Params |
|--------|----------|-------------|--------------|
| POST | `/api/v1/countries` | Crear país | `? database=both\|postgresql\|mongodb` |
| GET | `/api/v1/countries` | Listar todos | `?database=postgresql\|mongodb&limit=100&offset=0` |
| GET | `/api/v1/countries/:id` | Obtener por ID | `?database=postgresql\|mongodb` |
| GET | `/api/v1/countries/continent/:continent` | Por continente | `?database=postgresql\|mongodb` |
| GET | `/api/v1/countries/stats/summary` | Estadísticas | `?database=postgresql\|mongodb` |
| PUT | `/api/v1/countries/:id` | Actualizar | `?database=both\|postgresql\|mongodb` |
| DELETE | `/api/v1/countries/:id` | Eliminar | `?database=both\|postgresql\|mongodb` |

### **🏙️ Cities**

| Método | Endpoint | Descripción | Query Params |
|--------|----------|-------------|--------------|
| POST | `/api/v1/cities` | Crear ciudad | - |
| GET | `/api/v1/cities` | Listar todas | `?limit=100&offset=0&countryId=...&capitalsOnly=true` |
| GET | `/api/v1/cities/:id` | Obtener por ID | - |
| GET | `/api/v1/countries/:countryId/cities` | Ciudades de un país | `?limit=50&offset=0` |
| PUT | `/api/v1/cities/:id` | Actualizar | - |
| DELETE | `/api/v1/cities/:id` | Eliminar | - |

---

## 💡 Ejemplos de Uso

### **1. Crear un País**

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

**Respuesta:**

```json
{
  "success": true,
  "message": "País creado exitosamente en postgresql",
  "data": {
    "id": "country_1764332757512_ndeau1y33",
    "name": "Colombia",
    "continent": "América",
    "capital": "Bogotá",
    "population": 52000000,
    "language": "Español",
    "flag": "🇨🇴",
    "area": 1141748,
    "currency": "Peso Colombiano",
    "createdAt": "2025-11-28T.. .",
    "updatedAt": "2025-11-28T..."
  }
}
```

---

### **2. Listar Países**

```bash
GET https://api-bdnosql. onrender.com/api/v1/countries?database=postgresql&limit=5
```

**Respuesta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "country_1764332757512_ndeau1y33",
      "name": "Colombia",
      "continent": "América",
      "capital": "Bogotá",
      "population": 52000000,
      "language": "Español",
      "flag": "🇨🇴"
    },
    ... 
  ],
  "metadata": {
    "total": 10,
    "limit": 5,
    "offset": 0,
    "returned": 5
  }
}
```

---

### **3. Crear una Ciudad**

```bash
POST https://api-bdnosql. onrender.com/api/v1/cities
Content-Type: application/json

{
  "countryId": "country_1764332757512_ndeau1y33",
  "name": "Medellín",
  "population": 2500000,
  "isCapital": false,
  "latitude": 6.2476,
  "longitude": -75.5658
}
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Ciudad creada exitosamente",
  "data": {
    "id": "city_1764450123456_abc123",
    "countryId": "country_1764332757512_ndeau1y33",
    "name": "Medellín",
    "population": 2500000,
    "isCapital": false,
    "latitude": 6.2476,
    "longitude": -75.5658,
    "createdAt": "2025-11-28T...",
    "updatedAt": "2025-11-28T..."
  }
}
```

---

### **4. Obtener Ciudades de un País (Relación 1:N)**

```bash
GET https://api-bdnosql.onrender.com/api/v1/cities?countryId=country_1764332757512_ndeau1y33
```

**Respuesta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "city_bogota",
      "name": "Bogotá",
      "population": 8000000,
      "isCapital": true
    },
    {
      "id": "city_medellin",
      "name": "Medellín",
      "population": 2500000,
      "isCapital": false
    },
    {
      "id": "city_cali",
      "name": "Cali",
      "population": 2250000,
      "isCapital": false
    }
  ],
  "metadata": {
    "total": 3,
    "returned": 3
  }
}
```

---

## 🌐 Deployment

### **Desplegar en Render:**

1. **Crear cuenta en Render:** https://render.com
2. **Conectar con GitHub**
3. **Crear nuevo Web Service**
4. **Configurar:**
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Agregar variables de entorno** (ver sección anterior)
6. **Deploy automático** al hacer push a GitHub

### **URL de Producción:**
👉 https://api-bdnosql.onrender.com

---

## 📸 Capturas de Pantalla

### **Health Check en Producción:**

![Health Check](docs/screenshots/health-check.png)

### **Listar Países:**

![Get Countries](docs/screenshots/get-countries.png)

### **Crear Ciudad:**

![Create City](docs/screenshots/create-city.png)

### **Relación 1:N (Ciudades de un País):**

![Cities by Country](docs/screenshots/cities-by-country.png)

---

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm test
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3.  Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

---

## 👨‍💻 Autor

**ZundyTor**

- GitHub: [@ZundyTor](https://github.com/ZundyTor)
- Proyecto: [API-BDNoSQL](https://github.com/ZundyTor/API-BDNoSQL)
- API: [https://api-bdnosql.onrender.com](https://api-bdnosql.onrender.com)

---

## 🙏 Agradecimientos

- Arquitectura Hexagonal inspirada en los principios de Domain-Driven Design
- Express.js por su simplicidad y flexibilidad
- Supabase por el hosting gratuito de PostgreSQL
- Render por el deployment gratuito

---

## 📚 Recursos Adicionales

- [Documentación de Express](https://expressjs.com/)
- [Arquitectura Hexagonal](https://alistair.cockburn.us/hexagonal-architecture/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Docs](https://supabase. com/docs)
- [Render Docs](https://render.com/docs)

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub! **
