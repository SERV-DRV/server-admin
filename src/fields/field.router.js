//Importar las dependencias

import { Router } from "express";
import { getFields, createField } from "./field.controller.js";

import { validateCreateField } from "../../middlewares/fields-validators.js";
import { uploadFieldImage } from "../../middlewares/file-uploader.js";

//Crear el router
const router = Router();

//RUTAS GET
router.get('/', getFields);

//RUTAS POST
router.post('/', uploadFieldImage.single('image'), validateCreateField, createField);

//RUTAS PUT

//RUTAS DELETE

//Exportar el router

export default router
