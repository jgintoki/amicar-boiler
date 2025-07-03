# 🚀 Amicar NestJS Boilerplate 🚀

¡Bienvenido! Este es un template de backend robusto y listo para usar, construido con [NestJS](https://nestjs.com/), que te permitirá arrancar tus proyectos rápidamente.

[![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io)

---

## 📋 Tabla de Contenidos

1.  [Primeros Pasos](#-primeros-pasos)
    *   [Requisitos Previos](#-requisitos-previos)
    *   [Instalación](#️-instalación)
    *   [Variables de Entorno (.env)](#-variables-de-entorno-env)
2.  [Uso](#-uso)
    *   [Ejecutar la Aplicación](#️-ejecutar-la-aplicación)
3.  [Características Principales](#-características-principales)
    *   [Autenticación (Login)](#-autenticación-login)
    *   [Prisma ORM](#-prisma-orm)
4.  [Estructura del Proyecto](#-estructura-del-proyecto)
    *   [Módulos Compartidos (Shared)](#-módulos-compartidos-shared)
5.  [Scripts Disponibles](#-scripts-disponibles)
6.  [Licencia](#-licencia)

---

## 🏁 Primeros Pasos

### ✅ Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

*   [Node.js](https://nodejs.org/) (v18 o superior)
*   [NPM](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/) o [PNPM](https://pnpm.io/)
*   [Docker](https://www.docker.com/) (Recomendado para gestionar la base de datos)

### ⚙️ Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/amicar-labs/amicar-backend-template.git
    cd amicar-backend-template
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

### 🔑 Variables de Entorno (.env)

Este proyecto utiliza variables de entorno para la configuración. Para empezar, copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Ahora, abre el archivo `.env` y configúralo. Aquí tienes una explicación de las variables más importantes:

*   `DATABASE_URL`: **¡Esencial!** Esta es la cadena de conexión para tu base de datos PostgreSQL, usada por Prisma.
    *   Formato: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
*   `JWT_SECRET`: **¡Crítico para la seguridad!** Es la clave secreta que se usa para firmar los JSON Web Tokens (JWT). Debe ser una cadena larga y aleatoria.
*   `JWT_EXPIRES_IN`: Define el tiempo de vida de los tokens JWT (ej. `60s`, `1h`, `7d`).
*   `SSO_API_URL` y `SSO_API_KEY`: Si te integras con un servicio de Single Sign-On (SSO), aquí van la URL de la API y la clave de autorización.

---

## 🚀 Uso

### ▶️ Ejecutar la Aplicación

*   **Modo Desarrollo (con hot-reload):**
    ```bash
    npm run dev
    ```
    Este comando vigila los cambios en los archivos y reinicia la aplicación automáticamente. ¡Ideal para desarrollar!

*   **Modo Producción:**
    ```bash
    npm run start
    ```
    Este comando primero se asegura de que las migraciones de la base de datos estén aplicadas y luego inicia el servidor de forma optimizada para producción.

---

## ✨ Características Principales

### 🔒 Autenticación (Login)

El flujo de autenticación está diseñado para integrarse con un servicio de **Single Sign-On (SSO)**.

1.  **Petición del Cliente**: El frontend envía una petición `POST` al endpoint `/auth/login`. En el cuerpo de la petición, debe incluir un `code` de autorización obtenido del SSO.

2.  **Validación con el SSO**: El `AuthSignInService` toma ese `code` y lo envía al servicio de SSO para validarlo.

3.  **Búsqueda o Creación de Usuario**: Si el `code` es válido, el SSO devuelve los datos del usuario (nombre, email, RUT). El servicio `UserFindOrCreateService` busca si ya existe un usuario con ese email y RUT en la base de datos. Si no existe, lo crea.

4.  **Generación de JWT**: Con los datos del usuario, se genera un **JSON Web Token (JWT)**. Este token contiene información clave como el ID del usuario, su nombre, email y roles, y está firmado digitalmente con el `JWT_SECRET`.

5.  **Respuesta al Cliente**: El servidor responde con el `access_token` (el JWT). El cliente debe guardar este token y enviarlo en la cabecera `Authorization` de las peticiones a rutas protegidas (ej. `Authorization: Bearer <token>`).

El `AuthGuard` es un guardián que protege las rutas que requieren autenticación, verificando la validez del JWT en cada petición.

### 🗃️ Prisma ORM

Usamos [Prisma](https://www.prisma.io/) para interactuar con la base de datos de una forma moderna y segura.

*   **Schema de Prisma**: El modelo de datos está definido en `src/shared/services/prisma/schema.prisma`. Cada vez que modifiques este archivo, necesitas generar una nueva migración.

*   **Crear una Migración**: Para reflejar los cambios de tu `schema.prisma` en la base de datos, crea una nueva migración:
    ```bash
    # Reemplaza <nombre-descriptivo> con algo como 'add-product-table'
    npx prisma migrate dev --name <nombre-descriptivo>
    ```
    Este comando también ejecuta `npx prisma generate` para actualizar el Cliente de Prisma con los nuevos modelos.

*   **Aplicar Migraciones**: Para aplicar las migraciones pendientes en un entorno (como producción), usa:
    ```bash
    npx prisma migrate deploy
    ```

---

## 📂 Estructura del Proyecto

La carpeta `src/shared` contiene lógica reutilizable en toda la aplicación.

### 🛠️ Módulos Compartidos (Shared)

*   **Services**:
    *   `PrismaService`: Gestiona la conexión con la base de datos y proporciona una instancia del cliente de Prisma.
    *   `SsoService`: Encapsula la lógica para comunicarse con la API del SSO.
    *   `FetcherService`: Un servicio **global** para realizar peticiones HTTP a otras APIs. Al ser global, puedes inyectarlo en cualquier servicio sin necesidad de importar su módulo.

*   **Helpers**:
    *   `default-logger.helper.ts`: Un logger simple y personalizable.
    *   `get-time-duration.helper.ts`: Utilidad para medir tiempos de ejecución.
    *   `http-responses.helper.ts`: Funciones para estandarizar las respuestas HTTP (éxito, error, etc.).

*   **Decorators**:
    *   `is-chilean-rut.decorator.ts`: Un decorador de validación personalizado (`class-validator`) que comprueba si un string es un RUT chileno válido.

*   **Interceptors**:
    *   `logger.interceptor.ts`: Intercepta todas las peticiones entrantes para registrar información útil como la URL, el método y el tiempo de respuesta.

---

## 📜 Scripts Disponibles

Puedes ver todos los scripts en `package.json`. Aquí están los más importantes:

*   `npm run dev`: Inicia la app en modo desarrollo.
*   `npm run start`: Inicia la app en modo producción.
*   `npm run build`: Compila el código TypeScript a JavaScript.
*   `npm run format`: Formatea todo el código con Prettier.
*   `npm run lint`: Revisa el código en busca de errores de estilo con ESLint.
*   `npm run test`: Ejecuta las pruebas unitarias.
*   `npm run test:e2e`: Ejecuta las pruebas end-to-end.

---

## 📄 Licencia

Este proyecto está bajo la Licencia UNLICENSED.