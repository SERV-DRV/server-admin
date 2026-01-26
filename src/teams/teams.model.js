'use strict'

import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, 'El nombre del equipo es requerido'],
        trim: true,
        maxLength: [100, 'El nombre del equipo no puede exceder 100 caracteres'],
    },

    category: {
        type: String,
        enum: {
            values: ['INFANTIL', 'JUVENIL', 'ADULTO', 'MIXTO'],
            message: 'Categoría no válida',
        },
        required: [true, 'La categoría es requerida'],
    },

    captain: {
        name: {
            type: String,
            required: [true, 'El nombre del capitán es requerido'],
            trim: true,
            maxLength: [100, 'El nombre no puede exceder 100 caracteres'],
        },
        phone: {
            type: String,
            required: [true, 'El teléfono del capitán es requerido'],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
    },

    players: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            number: {
                type: Number,
                min: [1, 'El número debe ser mayor a 0'],
            },
            position: {
                type: String,
                enum: ['PORTERO', 'DEFENSA', 'MEDIO', 'DELANTERO'],
            },
        }
    ],

    logo: {
        type: String,
        default: 'teams/default_team_logo',
    },

    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Team', teamSchema);
