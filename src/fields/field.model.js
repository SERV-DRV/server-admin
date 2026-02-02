'use strict';
 
// Mongoose en este archivo se usa para definir el esquema y modelo de datos
//? Que es Mongoose: Biblioteca de modelado de datos para MongoDB y Node.js
import mongoose from 'mongoose';
 
// Definición del esquema para el modelo "Field"
const fieldSchema = new mongoose.Schema({
    // Datos del campo deportivo
    fieldName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del campo no puede exceder los 100 caracteres']
    },
    fieldType: {
        type: String,
        required: true,
        enum: {
            values: ['CÉSPED_NATURAL', 'CÉSPED_ARTIFICIAL', 'CONCRETO', 'ARENA'],
            message: '{VALUE} no es un tipo de campo válido'
        },
    },
    capacity: {
        type: String,
        required: true,
        enum: {
            values: ['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11', 'BASQUETBOL', 'VOLEIBOL', 'TENIS'],
            message: '{VALUE} no es una capacidad válida'
        },
    },
    pricePerHour: {
        type: Number,
        required: true,
        min: [0, 'El precio por hora no puede ser negativo']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder los 500 caracteres']
    },
    photo: {
        type: String,
        trim: true,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
});
 
fieldSchema.index({ isActive: 1 });
fieldSchema.index({ fieldName: 1 });
fieldSchema.index({ fieldName: 1, isActive: 1 });
 
 
export default mongoose.model('Field', fieldSchema);