### Instalacion
Ejecutar en la carpeta de eleccion la consola
Escribir el siguiente comando 
`npx create-react-app my-app`
Posteriormente a su creacion de la carpeta sustituir la carpeta con `Whiteboard`
Y ejecutar el comando de `npm start`

!["Como se puede ver en la Imagen"](/src/Imagenes/Whiteboard.PNG)

### Inicio
Al hacer correr la APP esta le permitira dibujar sobre el lienzo en blanco
### Boton Dibujar
En caso de que la APP no le permita dinujar de manera automatica, presionar el Boton `Dibujar`
### Input Color 
Si desea cambiar el color con el que se esta dibujando, presionar el input color y seleccionar el color que usted desee
### Boton Borrar 
Al presionar este boton podra borrar elementos que se encuentren en el Lienzo
### Boton Limpiar
Cuando se presione el boton `Limpiar` se borrara todo lo que se encuentre en el Lienzo
### Boton Refrescar
Al presionar este boton se restablecera todas las herramientas a su forma base
### Input Pos X
Por defecto se iniciara en 0, este input sirve para agregar la imagen en esa posicion como el texto y algunas
figuras que se tienen
### Input Pos Y
Por defecto se iniciara en 0, este input sirve para agregar la imagen en esa posicion como el texto y algunas
figuras que se tienen
### Input Ingrese Texto
Se debe agregar el texto que se desee ingresar al lienzo, ademas debe elegir el grosor de las letras y tambien el color de las mismas,este texto tomara como referencia las Posiciones de los inputs X y Y.
### Boton Texto 
Este boton tomara todos los datos del Input Ingrese Texto para plantearlo en el lienzo
### Input Elegir Archivos
Este input de tipo File le permitira añadir una imagen al Lienzo con las coordenadas de Pos X y Y
### Boton Insertar Imagen 
Este boton tomara todos los datos del Input Elegir Archivos para plasmarlo en el Lienzo
### Select Figuras
Este le permitira selecionar la figura que desee realizar
### Boton Insertar Figura 
Este boton tomara todos los datos del Select Figuras para plasmarlo en el Lienzo
### Boton Guardar Imagen
Este boton le permitira descargar el lienzo en una imagen
### Boton Guardar Imagen Png
Este boton le permitira descargar el lienzo en una imagen.png

`******************************----PROBLEMAS-----------***********************************`
# 1
Uno de los problemas que se tuvo al realizar el Whiteboard fueron los Componentes
se puedieron dividir en componente algunas funciones de las Opciones del Lienzo pero 
algunas de ellas siguen sin ser Componente
# 2 
Otro problema fueron la de insertar una figura de manera de dinamica,por ahora insertar
una figura se realiza de manera estatica en una posicion exepto por algunas como es la recta
# 3 
El problema de IndexedDb para su posterior implementacion fue la de versiones ya que a la hora de realizar
la insersion botaba algunos errores.
`Solucion`
Se planteo crear una base de datos de indexeedDB con los atributos de una imagen en base 64 ya que atreavez 
de esta se puede guardar de forma de texto

`*********************************************************************************************`

Para su Implementacion de realizo usar UseState y los Hooks de react con este ultimo se hizo la recuperacion
de todos los datos para aplicar algunas propiedades que tiene react.
Cada Boton o cada input tiene un Hook y tambien cuna funcion que realiza que se puede hacer con este,
la implementaciones de la funciones usan un ctx o Contexto de canvas que se realiza en los HOOKs para 
su posterior uso.
Los componente creados estan en forma de funcion para que se devuelva un jsx del mismo,estas funciones de 
igual forma estan comùestas por Hooks.
