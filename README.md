# Social Wires 

## Desarrollado por Roberto Cuellar V 1.0

### Metodología de Gitflow

>En este orden de ideas, se tendrá una rama principal de desarrollo, la cual 
será **develop**. De esta se desprenderan las ramas de features con su respectiva
descripciòn (ejemplo: una rama para configurar los modales (**feature/Modales**). 
Una vez finalizado el feature este se integra a la rama **develop**. 

### Back 

> Se utilizará Express, JWT para la autenticación y el manejo del estado del usuario. Se utilizará mongoDB como motor de base de datos. Se tendrá una carpeta para este, llamada **back**, en la carpeta raiz del proyecto. La arquitectura sera una mvn simple. Se generaron dos controladores diferentes, uno para todo el proceso de autenticacion y otro para el lógica propia del negocio. Se utilizó solo un modelo para la bd Usuario, el cual posee toda la info personal y los mensajes por usuario. 

### Front

> Para el front se utilizar ángular enfocado a modulos y componentes. Estilos con scss. Se tendrá una carpeta llamada **front** para este, en la raiz del proyecto.  Se utilizaron algunos componentes de material, se agregaron algunos comportamientos no descritos en el mockup para que la ux fuera más amena. Se agrega un interceptor para las peticiones, este se encarga de agregar el token de autenticación a todas las peticiones que salgan del aplicativo en caso de que el usuario ya posea uno. Se crean dos servicios, uno para el proceso de autenticación y revalidación del token, y otro servicio para la lógica de negocio. Se agregó un guard, para la protección de las rutas hijas que solo se pueden acceder con el usuario autenticado.Se finaliza con un PMV totalmente funcional.

### Instalación y Despliegue 

> Para su instalación por medio de Docker, si tuarse en la carpeta mean-docker

> En una terminal bash, lanzar **docker-compose up --build** para que se generen las imagenes y se levante la aplicacion.

>En caso de tener mongo instalado en su máquina, y se quiera probar el local, recuerde configurar el puerto de la bd en el archivo **.env** , y la semilla para la generación de los **JWT**. 

### Mejoras a futuro
> Completar la funcionalidad de notificaciones, utilizando sockets.

> Tras la implementación de sockets para las notificaciones, se abre un abanico de posibilidades de nuevas funcionalidades para el aplicativo:
    - Chat online, simple o grupal
    - Gráficas en tiempo real
    - Streaming
    - Juegos interactivos simples
    - Entro otros


### Conclusiones

Una app realmente interesante para desarrollar, con muchos témas retadores para devs MEAN que están iniciando en témas de desarrollo web.



