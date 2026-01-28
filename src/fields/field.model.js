'use strict'


import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
    fieldName: {
        type: String,
        required: true,
        trim: true,
        maxLenght: [100, 'El nombre del campo no puede tener más de 100 caracteres']
    },
    fieldType: {
        type: String,
        required: [true, 'El tipoo de campo es requerido'],
        enum: {
            values: ['NATURAL', 'SINTETICA', 'CONCRETO'],
            message: 'Tipo de superficie no válida',
        },
    },
    capacity: {
        type: String,
        required: [true, 'La capacidad es requerida'],
        enum: {
            values: ['FURBOL_5', 'FUTBOL_7', 'FUTBOL11'],
            message: 'Capacidad no válida',
        },
    },
    pricePerHour: {
        type: Number,
        required: [true, 'El precio por hora es requerido'],
        min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
    photo: {
        type: String,
        // valor por defecto
        default: 'fields/kinal_sports_nyvxo5',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

fieldSchema.index({ isActive: 1});
fieldSchema.index({ fieldName: 1 })
fieldSchema.index({ fieldName: 1, isActive: 1});

export default mongoose.model('Field', fieldSchema);