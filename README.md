This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## INSTALACION Y EJECUCION


- Instalar Node y Typescript.
- Instalar dependencias con el comando “npm i” tanto para el directorio "backend" como el directorio "frontend".
- **BACKEND:** Ir al folder "backend" para compilar ejecutar “npx tsc” y para ejecutar "npm start" o “node dist/app.js”. Ejecuta en el puerto 3000.
- **FRONTEND:** Ir al folder "frontend" ejecutar "npm run dev". Ejecuta en el puerto 4000.
- La base de datos Mongo la cree con el nombre “sushi”.
- El seed de precarga de la base de datos se ejecuta con el comando “npm run seed”. Este crea y carga con datos la BD. Revisar la variable de entorno “DB_CONN_STRING” para que coincida con la configuración de tu BD.
- Como modelo de NLP opte por usar la API  de google Gemini, se puede generar una API KEY en https://aistudio.google.com/app/apikey?hl=es-419. Una vez obtenida pegarla en el .env del folder "backend", hay un archivo de ejemplo de todas las variables de entorno necesarias en "env.example"
- Los test se ejecutan con "npm test".



## DETALLES DEL DESARROLLO
- Se usó Node.js, MongoDB y Typescript
- Se utilizó un patrón MVC
- Si bien el dominio es bastante sencillo, busque aplicar principios SOLID de forma tal que el código quede lo más comprensible, flexible, escalable y mantenible posible
- Para la creación del servidor use Express
- Cómo ODM use Mongoose
- Dado que lo que se plantea es la solicitud de información y un guardado de las órdenes, opte por definir un único endpoint POST para poder interactuar con el chat. En este, se procesa el mensaje del usuario, con la opción de mandar contexto previo, en lenguaje natural y se determina la “intención” a partir de estos. Además se obtienen las entidades, es decir los platos solicitados, en caso de que corresponda.
- Utilizo POST ya que no expone los datos en la URL, permite manejar una mayor cantidad de datos en el body y deja claro que se pueden producir cambios en el estado interno del servidor. Direccion del endpoint http://localhost:3000/api/interact
- A fin de simplificar los detalles como el horario de atención fueron definidos en la variable de entorno “ASK_FAQ”
  
## ERRORES
- En caso de que se produzca un fallo en el servidor a nivel de base de datos o lógico siempre se retorna “Internal Server Error”
- Las siguientes situaciones de uso fueron contempladas y planteadas en la resolución:
  - **view_menu:** Se retorna el menú con todos los productos disponibles. Puede haber productos no disponibles que están en la BD, simulando que se encuentran agotados o que no se sirven ese día, estos no forman parte del menú.
  - **make_order:** El usuario hace un pedido. En caso que no se reconozcan “entidades” en la solicitud, se retorna un mensaje de que no se ha podido realizar la orden y que se debe seleccionar al menos un producto.
  
- En caso de que se soliciten productos no disponibles en el menú, por más que se encuentren cargados en la BD, se retorna un mensaje a fin de que el usuario haga otro pedido diferente.
  
- En caso de que esté todo correcto se le consulta al usuario si el chat interpretó bien el pedido, se retorna un mensaje de verificación junto con los platos y cantidades interpretadas para que las confirme el usuario.
  - **cancel_order:** El usuario revisa lo interpretado por el chat y decide rechazarlo, el chat envía un mensaje confirmando que se canceló la orden y consulta si desea hacer otro pedido.
  - **confirm_order:** El usuario revisa lo interpretado por el chat y confirma que es correcto. El chat genera una orden, la guarda en la base de datos y retorna una copia junto con un mensaje de confirmación. Para simplificar el dominio, se identifica a los usuarios con un id de 6 digitos de la forma “IDxxxx”.
  - **unknown:** en caso de que no se logre entender al cliente se retorna un mensaje de disculpas indicando que se lo pudo entender
 
## TEST REALIZADOS:

- **Ask if its open:** Consulta si esta abierto
- **Ask for menu:** Consulta y devuelve el menú
- **Make a request with missing products:** Hace una solicitud con platos no disponibles
- **Make a rejected request:** Realiza una solicitud inválida sin items
- **Make an accepted request:** Realiza una solicitud válida
- **Order confirmed:** Confirma que se identificó bien la solicitud realizada
- **Message not recognized:** Envía un mensaje no reconocido por el chat

## MENSAJES DE EJEMPLO
###PLATOS DISPONIBLES PARA PEDIR
- Maki Roll
- Uramaki
- California Roll
- Frushi (en base de datos pero no disponible en el menú, lo use para simular la situacion de que haya platos no disponibles o fuera del menú)
  
###Saludos y despedidas
- Hola
- Buenas
- Adios
- Chau

## SOLICITUD DE MENU
- Quiero el menú
- Hola me das el menú
- El menú profavor
- 
### Pedido con productos no disponibles
- Quiero pedir dos maki, un frushi, tres uramaki, cinco gunkan.
- Quiero dos maki
- dos frushi
### Respuesta incorrecta a la solicitud de nuevo pedido
- Si quiero hacer un nuevo pedido.
- Bueno
### Realización de una orden exitosa
- Quiero 2 california roll y tres uramaki.
- dos uramaki
### Confirmación de la orden
- Si es correcto.
- si
- correcto
- así es
- ok
