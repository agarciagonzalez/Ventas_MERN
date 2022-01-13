Proyecto ventas Lambda - Especialización programación aplicada

Integrante
Andrés García (1116238326); 


Funcionamiento general del proyecto Lambda
Después de que el usuario ingrese a la aplicación a través de la interfaz de LOGIN, podrá visualizar la interfaz de PANEL BÁSICO que, dependiendo del tipo de usuario (vendedor o administrador) tendrá algunas áreas restringidas a través de permisos, es decir, los vendedores sólo podrán acceder a parte del módulo de ventas (REGISTRAR VENTA y LISTAR VENTAS) y parte del módulo de productos (LISTAR PRODUCTOS); mientras que los administradores podrán acceder a los 4 módulos: ventas (REGISTRAR VENTA, EDITAR VENTA, LISTAR VENTAS), usuarios (CREAR USUARIO, EDITAR USUARIO, LISTAR USUARIOS), productos (CREAR PRODUCTO, EDITAR PRODUCTO, LISTAR PRODUCTOS) y roles (CREAR ROL, EDITAR ROL, LISTAR ROLES).

Tal y como se tiene el proyecto actualmente, la creación de usuarios tendría que realizarse por un administrador tras haber ingresado al aplicativo; sin embargo, podría adicionarse un enlace desde el LOGIN para que lleve al usuario a CREAR USUARIO y él mismo pueda crear su cuenta quedando pendiente de autorización posterior por parte de un administrador.

Descripción de interfaces finales en React
-Interfaz de Login (React)

Se crea la interfaz del login inicialmente en Angula utilizando HTML, CSS y JS, esta interfaz se utilizara para darle entrada a la aplicacion dependiendo la autenticacion con su respectivo rol.

-Interfaz del Panel básico

Descripción: Diseño en React, con Css en Html, basado en una plantilla que ofrece un menú desplegable, modificaciones en labels y habilitación de nuevos botones para rutas futuras. se ajustan parámetros para facilitar el ensamble futuro de las demás interfaces del proyecto, se busca una experiencia de navegación sencilla y que reduzca tiempos de búsqueda por parte del usuario, se plantea un enfoque estético basado en ambiente antiguo y sobrio para que funcione con temas laborales tradicionales.

-Interfaz de Crear Usuario

Se crea la interfaz para crear un nuevo usuario teniendo en cuenta los requerimientos del Sprint 2. Las interfaces contienen toda la información necesaria en cuanto a atributos obligatorios. Aún queda la posibilidad de ocultar algunos atributos como las contraseñas de la creación de usuario en caso de que se decida realizar la autenticación únicamente con Gmail como se plantea en el proyecto; de igual manera, en cuanto al funcionamiento interno del estado del usuario, se podría dejar la opción de asignarla durante la creación del usuario en caso de que la realice un administrador o de ocultar esta parte y dejarla por defecto como "pendiente de autorización".

-Interfaz de Editar Usuario

Esta interfaz se creo segun requesitos del sprint 2 , basandose en la descripcion de historias de usuario, esta interfaz es muy similar a la anterior, Crear Usario, manteniendo los datos requeridos por esto anadiendo las funciones de edicion y seleccion de tipo de usuario. 

-Interfaz de Listar Usuarios

Se crea la interfaz listar usuarios paa que el administrador pueda tener un panorama general de los usuarios creados y en que estado se encuentran.

-Interfaz de Crear Producto

Se crea la interfaz para crear un nuevo producto teniendo en cuenta los requerimientos del Sprint 2. Las interfaces contienen toda la información necesaria en cuanto a atributos obligatorios. Aún queda la posibilidad de ocultar algunos atributos como el ID del producto en caso de que se decida asignarlo automáticamente durante la creación y que no se tenga que ingresar manualmente. 

-Interfaz de Editar Producto

Se crea Interfaz para editar los productos deseados, dependiendo del ID del producto seleccionado.

-Interfaz de Listar Productos

Se crea la interfaz listar usuarios para que cualquiera de los dos roles (vendedor o administrador) pueda tener un panorama general de los productos creados y en que estado se encuentran. 

-Interfaz de Crear Venta

Se crea la interfaz para registrar ventas teniendo en cuenta los requerimientos del Sprint 2. La interfaz contiene toda la información necesaria del vendedor, el cliente y atributos de la venta como la fecha y el ID, este último lo más probable es que se asigne automáticamente pero se decidió dejarlo visible por ahora para demostrar que se tuvo en cuenta como lo requiere el Sprint. También se incluye una tabla para registrar los productos requeridos por el cliente de manera que a través del precio unitario y la cantidad de unidades se calcule el total por producto. Al final, se incluye un campo para mostrar el total de la venta y un botón para terminar el registro de la venta. 

-Interfaz de Editar Venta

Se crea la interfaz para editar ventas tomando como base la que se realizó para crear ventas. Lo único que se debe destacar es que existen campos que no se pueden editar como la fecha o el ID de la venta.

-Interfaz de Listar Ventas

Se crea la interfaz listar ventas para que cualquiera de los dos roles (vendedor o administrador) pueda tener un panorama general de las ventas realizadas y el valor total

-Interfaz de Crear Rol

Se crea la interfaz rol teniendo en cuenta los requerimientos del Sprint 2. Las interfaz contienen toda la información necesaria en cuanto a atributos para ingresar un nuevo rol y su respectiva descripción. 

-Interfaz de Editar Rol

Se crea esta interfaz segun requerimentos del sprint 2 , basandose en historias de usuario, esta interfaz se basa en la interfaz crear rol anterior con las funcionaliades anadidas de editar usuario, label de estado, campo de descripcion del rol y el boton de cancelar. 

-Interfaz de Listar Roles

Se crea el listar roles para verificar el nombre y su estado para relacionarlo a los usuarios.

Descripción general del Sprint 3:
-Conexión interfaces graficas de usuario

Se realiza conexión entre las interfaces graficas de usuario con el panel principal y realizando el CRUD de usuario, quedando integrado el usuario con las acciones para Listar, Crear, Editar y Eliminar y se establece conexión con el panel de control

-Integracion interfaces graficas de productos 

Previamente a la realizacion del proceso de integracion del crud productos al panel basico, se desarrollo el codigo necesario para conectar las vistas Crear,Editar y Listar productos utilizando etiquetas modales a manera de pop up, para luego integrarlo al panel basico que ya poseia desarrollo de routes.