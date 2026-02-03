import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateTeams = [
    body('teamName')
        .trim()
        .notEmpty() 
        .withMessage('El nombre del equipo es obligatorio')
        .isLength({ max: 100 })
        .withMessage('El nombre del equipo no puede exceder los 100 caracteres'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('La categoría es obligatoria')
        .isIn(['INFANTIL', 'JUVENIL', 'ADULTO', 'MIXTO'])
        .withMessage('No es una categoría válida'),
    body('captainName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del capitán es obligatorio')
        .isLength({ max: 100 })
        .withMessage('El nombre del capitán no puede exceder los 100 caracteres'),
    body('captainPhone')
        .trim()
        .notEmpty()
        .withMessage('El teléfono del capitán es obligatorio'),
    body('captainEmail')
        .trim() 
        .isEmail()
        .withMessage('El correo electrónico no es válido'),
    body('playerName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del jugador es obligatorio'),
    body('playerNumber')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El número debe ser mayor a 0'),
    body('playerPosition')
        .isIn(['PORTERO', 'DEFENSA', 'MEDIO', 'DELANTERO'])
        .withMessage('No es una posición válida'),
    checkValidators
];