const corsOptions = {
    //Permite que cualquier origen acceda a la API
    origin: true,
    //Permite que la API envie y reciba cookies
    credenciales: true,
    //Establece lños métodos permitidos en la API
    mehtods: "GET,POST,PUT,DELETE",
    //Define los header que el cliente puede enviar
    allowedHeaders: "Content-Type,Authorization"
}

//Exportación normal de la función
export { corsOptions }