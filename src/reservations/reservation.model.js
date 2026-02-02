'use strict'

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
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
