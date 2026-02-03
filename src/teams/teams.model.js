'use strict';

import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del equipo no puede exceder los 100 caracteres']
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: ['INFANTIL', 'JUVENIL', 'ADULTO', 'MIXTO']
        }
    },

    captainName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del capitán no puede exceder los 100 caracteres']
    },

    captainPhone: {
        type: String,
        required: true,
        trim: true
    },

    captainEmail: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },

    playerName: {
        type: String,
        required: true,
        trim: true
    },

    playerNumber: {
        type: Number,
        min: [1, 'El número debe ser mayor a 0']
    },

    playerPosition: {
        type: String,
        enum: {
            values: ['PORTERO', 'DEFENSA', 'MEDIO', 'DELANTERO'],
            message: '{VALUE} no es una posición válida'
        }
    },

    logo: {
        type: String,
        trim: true,
        default: 'teams/default_team_logo'
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

teamSchema.index({ isActive: 1 });
teamSchema.index({ teamName: 1 });
teamSchema.index({ teamName: 1, isActive: 1 });

export default mongoose.model('Team', teamSchema);
