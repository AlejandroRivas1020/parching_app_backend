parchingApp-backend/
│
├── dist/                            # Carpeta de salida de compilación de TypeScript
│
├── node_modules/                    # Dependencias instaladas
│
├── src/                             # Carpeta principal del código fuente
│   ├── common/                      # Archivos compartidos como decoradores, pipes, y filtros
│   │   └── decorators/
│   │   └── filters/
│   │   └── pipes/
│   │
│   ├── config/                      # Configuración de la base de datos y otras variables globales
│   │   └── database.config.ts
│   │   └── websocket.config.ts
│   │
│   ├── modules/                     # Módulos principales de la aplicación
│   │   ├── auth/                     # Módulo de autenticación
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   ├── users/                   # Módulo de Usuarios
│   │   │   ├── user.controller.ts   # Controlador de usuarios
│   │   │   ├── user.entity.ts       # Entidad User para la base de datos
│   │   │   ├── user.service.ts      # Lógica de negocio para usuarios
│   │   │   ├── user.module.ts       # Módulo de usuario
│   │   │   └── user.repository.ts   # Repositorio para operaciones de usuarios
│   │   │
│   │   ├── clients/                 # Módulo de Clientes
│   │   │   ├── client.controller.ts # Controlador de clientes
│   │   │   ├── client.entity.ts     # Entidad Client para la base de datos
│   │   │   ├── client.service.ts    # Lógica de negocio para clientes
│   │   │   ├── client.module.ts     # Módulo de cliente
│   │   │   └── client.repository.ts # Repositorio para operaciones de clientes
│   │   │
│   │   ├── roles/                   # Módulo de Roles
│   │   │   ├── role.controller.ts   # Controlador de roles
│   │   │   ├── role.entity.ts       # Entidad Role para la base de datos
│   │   │   ├── role.service.ts      # Lógica de negocio para roles
│   │   │   ├── role.module.ts       # Módulo de roles
│   │   │   └── role.repository.ts   # Repositorio para operaciones de roles
│   │   │
│   │   ├── permissions/             # Módulo de Permisos
│   │   │   ├── permission.controller.ts  # Controlador de permisos
│   │   │   ├── permission.entity.ts      # Entidad Permission para la base de datos
│   │   │   ├── permission.service.ts     # Lógica de negocio para permisos
│   │   │   ├── permission.module.ts      # Módulo de permisos
│   │   │   └── permission.repository.ts  # Repositorio para operaciones de permisos
│   │   │
│   │   ├── events/                  # Módulo de Eventos
│   │   │   ├── event.controller.ts  # Controlador de eventos
│   │   │   ├── event.entity.ts      # Entidad Event para la base de datos
│   │   │   ├── event.service.ts     # Lógica de negocio para eventos
│   │   │   ├── event.module.ts      # Módulo de eventos
│   │   │   └── event.repository.ts  # Repositorio para operaciones de eventos
│   │   │
│   │   ├── comments/                # Módulo de Comentarios
│   │   │   ├── comment.controller.ts # Controlador de comentarios
│   │   │   ├── comment.entity.ts     # Entidad Comment para la base de datos
│   │   │   ├── comment.service.ts    # Lógica de negocio para comentarios
│   │   │   ├── comment.module.ts     # Módulo de comentarios
│   │   │   └── comment.repository.ts # Repositorio para operaciones de comentarios
│   │   │
│   │   ├── categories/              # Módulo de Categorías
│   │   │   ├── category.controller.ts # Controlador de categorías
│   │   │   ├── category.entity.ts     # Entidad Category para la base de datos
│   │   │   ├── category.service.ts    # Lógica de negocio para categorías
│   │   │   ├── category.module.ts     # Módulo de categorías
│   │   │   └── category.repository.ts # Repositorio para operaciones de categorías
│   │   │
│   │   ├── images/                  # Módulo de Imágenes de Eventos
│   │       ├── image.controller.ts   # Controlador de imágenes
│   │       ├── image.entity.ts       # Entidad EventImage para la base de datos
│   │       ├── image.service.ts      # Lógica de negocio para imágenes
│   │       ├── image.module.ts       # Módulo de imágenes
│   │       └── image.repository.ts   # Repositorio para operaciones de imágenes
│   │
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts                # Módulo principal de la aplicación
│   └── main.ts                      # Punto de entrada de la aplicación
│
├── test/                            # Pruebas unitarias y de integración
│
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── folders-tree.md
├── nest-cli.json
├── ormconfig.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
