//Importar las dependencias

import { Router } from "express";
import { getFields } from "./field.controller.js";

//Crear el router
const router = Router();

//RUTAS GET
router.get('/', getFields);

//RUTAS POST

//RUTAS PUT

//RUTAS DELETE

//Exportar el router

export default router
