import { Router } from "express";
import { getReservations, createReservation } from "./reservation.controller.js";

import { validateCreateReservation } from "../../middlewares/reservation-validator.js";

const router = Router();
router.get('/', getReservations);
router.post('/', validateCreateReservation, createReservation);
export default router