
# Amicar Boilerplate

## Descripción

Este es un boilerplate para aplicaciones NestJS que utiliza Prisma como ORM, JWT para autenticación y se integra con un servicio de SSO (Single Sign-On) para el login.

## Requisitos

- Node.js (v18 o superior)
- npm, pnpm o yarn
- Docker (opcional, para la base de datos)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jjcm-dev/amicar-boiler.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia el archivo de variables de entorno y configúralo:
   ```bash
   cp .env.example .env
   ```
   Asegúrate de configurar la variable `DATABASE_URL` y las variables de JWT en el archivo `.env`.

## Uso

### Iniciar la aplicación en modo de desarrollo

```bash
npm run dev
```

### Iniciar la aplicación en modo de producción

```bash
npm run start
```

## Prisma

### Crear una migración

Para crear una nueva migración, utiliza el siguiente comando:

```bash
npx prisma migrate dev --name <nombre-de-la-migracion> && npx prisma generate
```

### Correr una migración

Para aplicar las migraciones a la base de datos, utiliza el siguiente comando:

```bash
npx prisma migrate deploy
```

## Autenticación (Login)

El proceso de autenticación funciona de la siguiente manera:

1.  **Endpoint de Login**: El cliente envía una petición `POST` al endpoint `/auth/login` con un `code` de autorización en el cuerpo de la solicitud.

2.  **Servicio de SSO**: El `AuthSignInService` utiliza este `code` para autenticarse contra un servicio de SSO (Single Sign-On).

3.  **Creación o Búsqueda de Usuario**: Si la autenticación con el SSO es exitosa, el servicio busca un usuario en la base de datos con el email y rut devueltos por el SSO. Si el usuario no existe, se crea uno nuevo.

4.  **Generación de JWT**: Una vez que se tiene el usuario, se genera un JSON Web Token (JWT) con la información del usuario (ID, nombre de usuario, email y roles).

5.  **Respuesta**: El servicio devuelve el `access_token` (JWT) al cliente, que deberá ser utilizado en las cabeceras de las solicitudes posteriores para acceder a rutas protegidas.

El `AuthGuard` es el encargado de proteger las rutas, verificando que el JWT sea válido en cada solicitud.
