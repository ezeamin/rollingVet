# Rolling Vet

Rolling Vet es un sitio web de veterinaria que ofrece planes para tus mascotas. Posee panel de admin y de usuarios.

### Aclaracion importante

Si bien este es el repositorio del front end, y está subido en Netlify, esa aplicacion no funciona como corresponde. Por un conflicto de librerias (Passport) con el navegador y las cookies (que no se establecen por venir de un sitio externo, que ni con "sameSite: none" funcionaba), la conexion al servidor hosteado en Heroku falla al realizar la autenticacion. Por ello mismo, el repositorio del back end, cuyo enlace esta debajo, incluye front y back end, ambos hosteados en Heroku.

## Librerias utilizadas

Para el proyecto, se utilizaron los siguientes recursos:

**Front-End (Este repo)**

- React
- React-Bootstrap
- Bootstrap
- React-Router & React-Router-dom
- Material UI (implementacion de MUI)
- SweetAlert

Repositorio back-end: [Back-end](https://github.com/ezeamin/rollingVetServer)

## Instalación

Deberás contar con las siguientes dependencias del proyecto:

- Node Package Manager

Tras clonar el repositorio, ejecutar el siguiente comando en la carpeta en una terminal de Node:

```bash
npm install
```

Las dependencias se instalarán automáticamente.

## Demo
[Rolling Vet](https://rollingvet.netlify.app)

Como aclarado, no funciona correctamente. Ingresar al sitio de Back End ([Rolling Vet Server]https://rollingvet.herokuapp.com/)

### Administrador

- Usuario: admin@admin.com
- Contraseña: admin