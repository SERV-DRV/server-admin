import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateReservation = [
    body('customerName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({min: 3, max: 100 })
        .withMessage('El nombre del cliente debe tener entre 3 y 100 caracteres'),
    body('customerPhone')
        .trim()
        .notEmpty()
        .withMessage('El teléfono del cliente es obligatorio'),
    body('reservationDate')
        .trim()
        .notEmpty()
        .withMessage('La fecha de la reserva es obligatoria')
        .isISO8601(),
    body('startTime')
        .trim()
        .notEmpty()
        .withMessage('La hora de inicio es obligatoria')
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('La hora de inicio debe estar en formato HH:mm'),
    body('endTime')
        .trim()
        .notEmpty()
        .withMessage('La hora de finalización es obligatoria')
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('La hora de finalización debe estar en formato HH:mm'),
    body('totalPrice')
        .notEmpty()
        .withMessage('El precio total es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio total debe ser mayor o igual a 0'),
    body('status')
        .optional()
        .isIn(['PENDIENTE', 'CONFIRMADA', 'CANCELADA'])
        .withMessage('El estado de la reserva no es válido'),
    checkValidators    
]