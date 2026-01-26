'use strict'

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    field: {
        fieldName: {
            type: String,
            required: true,
            trim: true,
            maxLength: [100, 'El nombre del campo no puede tener más de 100 caracteres']
        },
        fieldType: {
            type: String,
            required: true,
            enum: {
                values: ['NATURAL', 'SINTETICA', 'CONCRETO'],
                message: 'Tipo de superficie no válida',
            },
        },
        capacity: {
            type: String,
            required: true,
            enum: {
                values: ['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11'],
                message: 'Capacidad no válida',
            },
        },
        pricePerHour: {
            type: Number,
            required: true,
            min: [0, 'El precio debe ser mayor o igual a 0'],
        },
    },

    customerName: {
        type: String,
        required: [true, 'El nombre del cliente es requerido'],
        trim: true,
        maxLength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    customerPhone: {
        type: String,
        required: [true, 'El teléfono es requerido'],
        trim: true,
    },

    reservationDate: {
        type: Date,
        required: [true, 'La fecha de la reserva es requerida'],
    },
    startTime: {
        type: String,
        required: [true, 'La hora de inicio es requerida'],
    },
    endTime: {
        type: String,
        required: [true, 'La hora de finalización es requerida'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'El precio total es requerido'],
        min: [0, 'El precio total debe ser mayor o igual a 0'],
    },

    status: {
        type: String,
        enum: {
            values: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
            message: 'Estado de reserva no válido',
        },
        default: 'PENDIENTE',
    },

    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('Reservation', reservationSchema);
