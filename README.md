# KinalSport Admin API

API REST para la administración de campos deportivos, equipos y reservas de KinalSport.

## 1) ¿Qué ofrece el programa?

- Gestión de **campos deportivos** (listar y crear).
- Gestión de **equipos** (listar y crear).
- Gestión de **reservas** (listar y crear).
- Carga de imágenes a **Cloudinary** para campos y equipos.
- Validación de datos con **express-validator**.
- Conexión a MongoDB con **Mongoose**.
- Endpoint de salud del servicio.

---

## 2) Requerimientos

### Software

- Node.js **22.x** o superior.
- npm o pnpm.
- MongoDB accesible (local o remoto).

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con valores como estos:

```env
PORT=3001
URI_MONGODB=mongodb://localhost:27017/kinalSports

JWT_SECRET=your_jwt_secret
JWT_ISSUER=your_issuer
JWT_AUDIENCE=your_audience

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=kinalSports/fields
CLOUDINARY_TEAMS_FOLDER=kinalSports/teams
```

---

## 3) Tecnologías

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **express-validator**
- **Multer** + **Cloudinary**
- **CORS**, **Morgan**, **dotenv**, **JWT**

---

## 4) Instalación y ejecución

1. Clonar el repositorio.
2. Instalar dependencias.
3. Crear y configurar `.env`.
4. Ejecutar el servidor.

### Comandos

```bash
npm install
npm run dev
```

O en producción:

```bash
npm start
```

Base URL:

```text
http://localhost:3001/kinalSportAdmin/v1
```

Health check:

```text
GET /kinalSportAdmin/v1/health
```

---

## 5) Estructura de carpetas

```text
server-admin/
├── .env
├── .gitignore
├── configs/
│   ├── app.js
│   ├── cors-configuration.js
│   ├── db.js
│   └── helmet-configuration.js
├── middlewares/
│   ├── check-validators.js
│   ├── fields-validators.js
│   ├── file-uploader.js
│   ├── handle-errors.js
│   ├── request-limit.js
│   ├── reservation-conflic.js
│   ├── reservation-time-validation.js
│   ├── reservation-validator.js
│   ├── reservation-validators.js
│   ├── team-validators.js
│   ├── validate-JWT.js
│   ├── validate-role.js
│   └── teams-validators.js
├── src/
│   ├── fields/
│   │   ├── field.controller.js
│   │   ├── field.model.js
│   │   └── field.router.js
│   ├── reservations/
│   │   ├── reservation.controller.js
│   │   ├── reservation.model.js
│   │   ├── reservation.router.js
│   │   └── reservation.routes.js
│   ├── teams/
│   │   ├── team.controller.js
│   │   ├── team.model.js
│   │   ├── team.routes.js
│   │   ├── teams.controller.js
│   │   ├── teams.model.js
│   │   └── teams.router.js
│   └── tournaments/
│       ├── tournaments.controller.js
│       ├── tournaments.model.js
│       └── tournaments.routes.js
├── index.js
├── LICENSE
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
└── README.md
```

---

## 6) Endpoints principales

> Todos los endpoints usan como prefijo: `/kinalSportAdmin/v1`

| Método | Endpoint | Content-Type | Query Params | Body esperado | Respuesta OK | Errores comunes | Middlewares |
|---|---|---|---|---|---|---|---|
| GET | `/health` | application/json | No | No | `200` `{ status, service, version }` | `500` | Globales (`express.json`, `cors`, `morgan`) |
| GET | `/fields` | application/json | `page?`, `limit?`, `isActive?` | No | `200` `{ succes, data, pagination }` | `500` db | Globales |
| POST | `/fields` | multipart/form-data | No | `image?`, `fieldName`, `fieldType`, `capacity`, `pricePerHour`, `description?`, `photo?` | `201` `{ succes, message, data }` | `400` validación, `500` cloud/db | `uploadFieldImage.single('image')`, `validateCreateField` |
| GET | `/teams` | application/json | `page?`, `limit?`, `isActive?` | No | `200` `{ succes, data, pagination }` | `500` db | Globales |
| POST | `/teams` | multipart/form-data | No | `image?`, `teamName`, `category`, `captainName`, `captainPhone`, `captainEmail`, `playerName`, `playerNumber?`, `playerPosition` | `201` `{ succes, message, data }` | `400` validación, `500` cloud/db | `uploadTeamImage.single('image')`, `validateCreateTeams` |
| GET | `/reservations` | application/json | `page?`, `limit?`, `status?`, `fieldId?`, `date?`, `userId?` | No | `200` `{ success, data, pagination }` | `500` db | Globales |
| POST | `/reservations` | application/json | No | `userId`, `fieldId`, `startTime`, `endTime`, `status?`, `reservationDate?`, `lastModifiedBy?` | `201` `{ success, message, data }` | `400` formato/validación, `500` db | `validateCreateReservation` |

| Endpoint | Campo body/query | Tipo | Requerido | Valores / formato esperado |
|---|---|---|---|---|
| POST `/fields` | `fieldName` | string | Sí | 2-100 caracteres |
| POST `/fields` | `fieldType` | string | Sí | `CÉSPED_NATURAL`, `CÉSPED_ARTIFICIAL`, `CONCRETO`, `ARENA` |
| POST `/fields` | `capacity` | string | Sí | `FUTBOL_5`, `FUTBOL_7`, `FUTBOL_11`, `BASQUETBOL`, `VOLEIBOL`, `TENIS` |
| POST `/fields` | `pricePerHour` | number | Sí | >= 0 |
| POST `/fields` | `description` | string | No | Máx 500 |
| POST `/fields` | `image` | file | No | jpeg/jpg/png/webp/avif, máx 10MB |
| POST `/teams` | `teamName` | string | Sí | Máx 100 |
| POST `/teams` | `category` | string | Sí | `INFANTIL`, `JUVENIL`, `ADULTO`, `MIXTO` |
| POST `/teams` | `captainName` | string | Sí | Máx 100 |
| POST `/teams` | `captainPhone` | string | Sí | Texto (teléfono) |
| POST `/teams` | `captainEmail` | string | Sí | Email válido |
| POST `/teams` | `playerName` | string | Sí | No vacío |
| POST `/teams` | `playerNumber` | number | No | >= 1 |
| POST `/teams` | `playerPosition` | string | Sí | `PORTERO`, `DEFENSA`, `MEDIO`, `DELANTERO` |
| POST `/teams` | `image` | file | No | jpeg/jpg/png/webp/avif, máx 10MB |
| POST `/reservations` | `userId` | string | Sí | ID de usuario |
| POST `/reservations` | `fieldId` | string | Sí | ObjectId de MongoDB |
| POST `/reservations` | `startTime` | date/string | Sí | ISO (`2026-03-20T15:00:00.000Z`) o `HH:mm` + `reservationDate` |
| POST `/reservations` | `endTime` | date/string | Sí | ISO o `HH:mm` + `reservationDate` |
| POST `/reservations` | `status` | string | No | `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`, `NO_SHOW` |
| POST `/reservations` | `reservationDate` | string | No | Fecha (`YYYY-MM-DD`) si usas hora `HH:mm` |

| Endpoint | Ejemplo request | Ejemplo respuesta |
|---|---|---|
| POST `/reservations` | `{ "userId": "65f8a9...", "fieldId": "65f8a9...", "startTime": "2026-03-20T15:00:00.000Z", "endTime": "2026-03-20T16:00:00.000Z", "status": "PENDING" }` | `{ "success": true, "message": "Reserva creada exitosamente", "data": { "_id": "..." } }` |

---

## 7) Middlewares disponibles (activables)

Actualmente el servidor usa middlewares globales en `configs/app.js`:

- `express.urlencoded`
- `express.json`
- `cors`
- `morgan`

Middlewares por módulo ya integrados:

- `validateCreateField`
- `validateCreateTeams`
- `validateCreateReservation`
- `uploadFieldImage`
- `uploadTeamImage`

Middlewares listos para rutas protegidas (si deseas habilitarlas):

- `validateJWT`
- `requireRole(...)`
- Validadores avanzados de reservas (`reservation-validators.js`)

---

## 8) Errores comunes y cómo resolverlos

1. **`URI_MONGODB` no configurada**  
	- Síntoma: falla al iniciar conexión con MongoDB.  
	- Solución: revisar `.env` y acceso a la base de datos.

2. **Credenciales de Cloudinary inválidas**  
	- Síntoma: error al crear campo/equipo con imagen.  
	- Solución: validar `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

3. **Errores de validación (400)**  
	- Síntoma: respuesta con `Errores de validación`.  
	- Solución: enviar el body con el formato esperado según la tabla.

4. **Token JWT faltante o inválido** (si habilitas rutas protegidas)  
	- Síntoma: `401 MISSING_TOKEN`, `INVALID_TOKEN` o `TOKEN_EXPIRED`.  
	- Solución: enviar `Authorization: Bearer <token>` o `x-token` válido.

---

## 9) Recomendaciones técnicas

- Agregar documentación OpenAPI/Swagger.
- Activar rate limiting en producción.
- Estandarizar respuestas (`success` vs `succes`).
- Centralizar manejo de errores en un middleware global.
- Unificar la capa de rutas de reservas (`reservation.router.js` y `reservation.routes.js`).

---

## 10) Scripts disponibles

```bash
npm start   # Ejecuta index.js
npm run dev # Ejecuta con nodemon
```

---

## 11) Estado del proyecto

Proyecto funcional para operaciones base de administración. Puede ampliarse fácilmente con autenticación obligatoria en todos los módulos, eliminación/edición de recursos y pruebas automatizadas.