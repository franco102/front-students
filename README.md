React 18 Project: Students

Este proyecto es una aplicación desarrollada con React 18 y otras tecnologías modernas. Su propósito es gestionar estudiantes mediante un sistema que incluye funcionalidades como creación, edición, eliminación y visualización de registros.

Tecnologías utilizadas

React 18: Biblioteca para construir interfaces de usuario.

Vite: Herramienta de desarrollo rápida y optimizada para aplicaciones modernas.

Zustand: Librería para la gestión del estado global.

Axios: Cliente HTTP para realizar solicitudes a APIs.

Valibot: Librería para validaciones de datos.

Material UI: Componentes de interfaz de usuario estilizados y accesibles.

Tailwind CSS: Framework de diseño utilitario para estilizar la aplicación.

Instalación y configuración

Sigue estos pasos para clonar el repositorio, instalar las dependencias y ejecutar la aplicación en tu entorno local:

Clona el repositorio:

git clone https://github.com/franco102/front-students.git

Accede al directorio del proyecto:

cd front-students

Instala las dependencias necesarias:

npm install

Crea un archivo .env basado en el ejemplo proporcionado:

cp .env.example .env

Configura las variables de entorno necesarias en el archivo .env.

Inicia el servidor de desarrollo:

npm run dev

Abre tu navegador y accede a:

http://localhost:5173

Configuración de ESLint

Para mantener un código limpio y consistente, el proyecto incluye una configuración básica de ESLint. Si estás desarrollando una aplicación para producción, se recomienda expandir esta configuración para habilitar reglas específicas de tipo:

Configura la propiedad parserOptions en el archivo .eslintrc:

{
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}

Instala las dependencias necesarias para soporte de TypeScript:

npm install eslint-plugin-typescript @typescript-eslint/parser --save-dev

Características principales

Listado de estudiantes con opciones de búsqueda y paginación.

Formulario para agregar y editar estudiantes, validaciones incluidas.

Gestión de estado global con Zustand para un manejo eficiente de datos.

Estilizado moderno con Tailwind CSS y Material UI.

Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una rama para tu característica o corrección de errores:

git checkout -b mi-nueva-funcionalidad

Realiza tus cambios y commitea:

git commit -m "Agregada nueva funcionalidad"

Sube los cambios a tu repositorio:

git push origin mi-nueva-funcionalidad

Abre un pull request en GitHub.

Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por revisar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contribuir directamente.