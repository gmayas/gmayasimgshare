# JSONPlaceholderCrud

Este proyecto fue creado con Node versión 20.12.2.
Al momento de descargar este proyecto, instale las dependencias con npm install, para ejecutar npm run dev, la aplicación corre en: http://localhost:3000/
## FrontEnd Web API

FrontEnd Web API es una aplicación web que fue creada como resultado a la prueba técnica que Grupo Salinas solicita a un postulante para una vacante de desarrollo de software.

FrontEnd Web API esta creado en Node con Bootstrap y Bootswatch como framewoks de controles y estilos, EJS como generador de vistas y fetch para conectarse via URL https://jsonplaceholder.typicode.com/users

![](/images/01.png)

En base a la prueba asignada, decidí crear un solo FrontEnd para mostrar todos los puntos que requerian programación.

## Evaluación practica

Si desea ver el contenido de la evaluación practica requerida, lo puede ver dando click en el siguiente link:

https://docs.google.com/document/d/1DC9QvW1knUgAafS7RenTvutoJG0yQYmK/edit?usp=sharing&ouid=107360318909706824581&rtpof=true&sd=true

## Detalles técnicos

En base a la url que indica la prueba técnica, https://jsonplaceholder.typicode.com/users, revisando la API de jsonplaceholder para la ruta /users, solo maneja el método Get, por consiguiente para hacer nuestro get a la url, utilizo el método fetch para extraer el listado de los usuarios que maneja la url, que en este caso solo envía un listado de 10 elementos y dicha informacion se guarda en el localstorage del navegador para el manejo del despliegue en la tabla de la vista Usuarios, como asi para realizar lo solicitado como “see more”, eliminar y agregar usuario.

## Vista de usuarios:

Para tener acceso a la vista de usuario solo de click en la opción de “Usuarios” en la NavBar.

![](/images/02.png)

## See more.

Para ejecutar “see more”, solo de click en el botón azul de la línea del usuario que desea ver.

![](/images/03.png)

Se sesplegará el siguiente cuadro de dialogo.

![](/images/04.png)

## Eliminar usuario:

Para eliminar un usuario, solo de click en el botón rojo de la línea del usuario que desea eliminar.

![](/images/05.png)

Se desplegará el siguiente cuadro de dialogo.

![](/images/06.png)

Si da click en Ok, vera como el usuario seleccionado desaparece de la lista.

![](/images/07.png)

## Agregar un usuario:

Para agregar un usuario, solo de click en el botón azul Add new.

![](/images/08.png)

Se desplegará el siguiente cuadro de dialogo.

![](/images/09.png)

Escriba en los campos y de click en el botón validar, escriba en los campos requeridos para que se pueda habilitar el botón Ok.

![](/images/10.png)


Y asi vera que el usuario fue agregado a la lista.

![](/images/11.png)

`© 2024 Copyright: GMayaS C:\>Desarrollo en Sistemas.`


