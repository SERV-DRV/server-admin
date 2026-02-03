import { Router } from "express";
import { getTeams, createTeam } from "./teams.controller.js";

import { validateCreateTeams } from "../../middlewares/teams-validators.js";
import { uploadTeamImage } from "../../middlewares/file-uploader.js";

//Crear el router
const router = Router();

//RUTAS GET
router.get('/', getTeams);

//RUTAS POST
router.post('/', uploadTeamImage.single('image'), validateCreateTeams, createTeam);  

//RUTAS PUT

//RUTAS DELETE

//Exportar el router
export default router