# ParchingApp

<p align="center">
  <a href="https://parching-app-backend.onrender.com/api/docs#/" target="blank"><img src="./src/common/assets/ParchingLogo.png" width="120" alt="ParchingApp Logo" /></a>
</p>

## Descripción del Proyecto

ParchingApp es una plataforma innovadora, versátil y dinámica diseñada para conectar a personas con intereses compartidos en una amplia variedad de actividades, desde aventuras al aire libre hasta eventos culturales y sociales en entornos urbanos. Permite a los usuarios organizar y participar en eventos de una manera fácil y segura, fomentando un sentido de comunidad y conexión con el entorno físico.

### ¿Por qué?

En un mundo donde las interacciones sociales se ven cada vez más limitadas a entornos digitales, ParchingApp busca reavivar el sentido de comunidad y la conexión con el entorno físico. La plataforma facilita encuentros significativos entre personas interesadas en actividades al aire libre, culturales y sociales.

### ¿Para qué?

El objetivo de ParchingApp es crear un ecosistema inclusivo y seguro donde los usuarios puedan descubrir y unirse a eventos de su interés, garantizando experiencias personales y significativas.

### ¿Para quién?

ParchingApp está dirigida a todos aquellos que buscan vivir experiencias enriquecedoras en compañía de otros, desde amantes de la naturaleza hasta entusiastas de eventos culturales o sociales.

## Temática Elegida: Turismo

ParchingApp se enfoca en el turismo, permitiendo que los usuarios descubran y participen en actividades locales o eventos turísticos, facilitando la exploración del entorno natural y cultural.

## Integrantes del Proyecto

- Nombre: Harold Medrano Emiliani

  - Email: harold_medranoe@hotmail.com
  - LinkedIn: [Harold-Linkedin](www.linkedin.com/in/hmemiliani)
  - GitHub: [hmemiliani](https://github.com/hmemiliani)

- Nombre: Jorge Sebastián Muñoz García

  - Email: xxxxxxxxx@gmail.com
  - LinkedIn: [Jorge Sebastián-Linkedin](https://linkedin.com/in/xxxxxxx)
  - GitHub: [GitHub](https://github.com/xxxxxxx)

- Nombre: Isabela Ortega

  - Email: isabela2603ov@gmail.com
  - LinkedIn: [Isabela-Linkedin](https://www.linkedin.com/in/isabela-ortega-593320234)
  - GitHub: [Isabelaov](https://github.com/Isabelaov)

- Nombre: Alejandro Rivas López

  - Email: a.rivaslopez020@gmail.com
  - LinkedIn: [Alejandro Rivas-Linkedin](https://www.linkedin.com/in/alejandro-rivas-lópez-16384148)
  - GitHub: [AlejandroRivas1020](https://github.com/AlejandroRivas1020)

- Nombre: María Isabel Vanegas Casas
  - Email: mariac20160@gmail.com
  - LinkedIn: [María Isabel-Linkedin](https://www.linkedin.com/in/maria-isabel-vanegas-casas-748269275/)
  - GitHub: [mariaisva2](https://github.com/mariaisva2)

Nombre:  
email:  
LinkedIn: [Isabela Ortega](https://www.linkedin.com/in/isabela-ortega-593320234)
GitHub: https://github.com/Isabelaov

## Diagrama ER

![ER Diagram](./src/common/assets/diagramER%20Parching.png)

## Modelo o Diseño del Proyecto

### Database

- **Users**:
  - id (UUID, PK)
  - name (VARCHAR(255), NOT NULL)
  - email (VARCHAR(255), NOT NULL)
  - password (VARCHAR(255), NOT NULL)
  - phone (VARCHAR(20), NOT NULL)
  - email_confirmed (BOOLEAN, DEFAULT FALSE)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)
  - role_id (UUID, FK, NOT NULL)

- **Events**:
  - id (UUID, PK)
  - categories_id (UUID, FK, NOT NULL)
  - start_date (TIMESTAMP WITH TIME ZONE)
  - end_date (TIMESTAMP WITH TIME ZONE)
  - capacity (INT)
  - location (VARCHAR(250))
  - information (JSON)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)
  - host (UUID, FK, NOT NULL)

- **Comments**:
  - id (UUID, PK)
  - events_id (UUID, FK, NOT NULL)
  - comments_id (UUID, FK)
  - created_by (UUID, FK)
  - content (VARCHAR(250))
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)

- **Event Images**:
  - id (UUID, PK)
  - image (VARCHAR(250), NOT NULL)
  - events_id (UUID, FK, NOT NULL)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)

- **Forms Templates**:
  - id (UUID, PK)
  - is_active (BOOLEAN)
  - form (JSON)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)
  - categories_id (UUID, FK, NOT NULL)

- **Categories**:
  - id (UUID, PK)
  - name (VARCHAR(255), NOT NULL)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)

- **Clients**:
  - id (UUID, PK)
  - birth_date (DATE, NOT NULL)
  - gender (VARCHAR(50), NOT NULL)
  - location (VARCHAR(255), NOT NULL)
  - score (NUMERIC)
  - profile_picture (VARCHAR(255))
  - users_id (UUID, FK, NOT NULL)

- **Permissions**:
  - id (UUID, PK)
  - roles_id (UUID, FK, NOT NULL)
  - can_create (BOOLEAN)
  - can_update (BOOLEAN)
  - can_delete (BOOLEAN)
  - can_read (BOOLEAN)
  - paths_id (UUID, FK, NOT NULL)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)

- **Roles**:
  - id (UUID, PK)
  - name (VARCHAR(255), NOT NULL)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)

- **Paths**:
  - id (UUID, PK)
  - pathname (VARCHAR(255), NOT NULL)
  - created_by (UUID, FK)
  - updated_by (UUID, FK)
  - created_at (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP)

### Casos de Uso

1. **Registro de Usuarios**: Los usuarios pueden registrarse con su correo electrónico y contraseña.
2. **Creación de Eventos**: Los usuarios autenticados pueden crear eventos detallando su nombre, ubicación y otros aspectos relevantes.
3. **Calificación de Eventos**: Después de participar en un evento, los usuarios pueden dejar una reseña.

## Requerimientos Funcionales

1. **Registro de Usuarios**:

   - Descripción: Los usuarios pueden crear una cuenta proporcionando nombre, correo y contraseña.
   - Criterio: Validación de formato de correo y contraseña.

2. **Creación de Eventos**:

   - Descripción: Los usuarios pueden crear eventos definiendo nombre, fecha, descripción, y cupo.
   - Criterio: Los eventos deben permitir un máximo de participantes y actualizarse automáticamente.

3. **Calificación de Eventos**:
   - Descripción: Los usuarios pueden calificar los eventos después de participar.

## Requerimientos No Funcionales

1. **Escalabilidad**: El sistema debe ser capaz de soportar un número creciente de usuarios y eventos.
2. **Seguridad**: Implementación de cifrado de datos y un sistema robusto de manejo de reportes.
3. **Rendimiento**: La plataforma debe responder eficientemente, optimizando la carga de las páginas.
4. **Usabilidad**: Interfaces intuitivas para usuarios de cualquier nivel tecnológico.
5. **Disponibilidad**: Debe estar operativa 24/7 con mecanismos de recuperación ante fallos.

## Enlace al Tablero del Proyecto

Enlace a la gestión de tareas en Azure DevOps: [ParchingApp Azure Board](https://dev.azure.com/parchingappteam/parching-app)
