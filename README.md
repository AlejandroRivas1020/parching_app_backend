<p align="center">
  <a href="https://parching-app-backend.onrender.com/api/docs#/" target="blank"><img src="./src/common/assets/ParchingLogo.png" width="120" alt="ParchingApp Logo" /></a>
</p>

## Description Back-end Repository

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.



## Project setup

1. **Variables de entorno**:
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```bash

    //DB info
    DB_HOST=
    DB_NAME=
    DB_USERNAME=
    DB_PASSWORD=
    DB_PORT=

    //Notifications
    EMAIL_HOST=
    EMAIL_PORT=
    EMAIL_USER=
    EMAIL_PASS=
    EMAIL_FROM=

    //Cloudinary
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_URL=

    ```

2. **Swagger Desplegado en Render**:

   - [Documentacion Swagger](https://parching-app-backend.onrender.com/api/docs#/)

3. **Instrucciones para levantar el proyecto**:

   - Ejecuta los siguientes comandos para iniciar el proyecto:


```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
