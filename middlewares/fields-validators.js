import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateField = [ 
    body('fieldName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del campo es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre del campo debe tener entre 2 y 100 caracteres'),
    body('fieldType')
        .trim()
        .notEmpty() 
        .withMessage('El tipo de campo es obligatorio')
        .isIn(['CÉSPED_NATURAL', 'CÉSPED_ARTIFICIAL', 'CONCRETO', 'ARENA'])
        .withMessage('El tipo de campo no es válido'),
    body('capacity')
        .trim()
        .notEmpty()
        .withMessage('La capacidad es obligatoria')
        .isIn(['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11', 'BASQUETBOL', 'VOLEIBOL', 'TENIS'])
        .withMessage('La capacidad no es válida'),
    body('pricePerHour')
        .notEmpty()
        .withMessage('El precio por hora es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio por hora debe ser mayor o igual a 0'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder los 500 caracteres'),
    body('photo')
        .optional()
        .trim() 
        .isURL()
        .withMessage('La foto debe ser una URL válida'),
    checkValidators
];