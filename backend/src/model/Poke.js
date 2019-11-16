const { Schema, model } = require('mongoose');

const PokeSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    number: {
        type: Schema.Types.String,
        required: true
    },
    imgURL: {
        type: Schema.Types.String,
        required: true
    },
    alolanFormURL: {
        type: Schema.Types.String,
        required: false
    },
    galarFormURL: {
        type: Schema.Types.String,
        required: false
    },
    type: [{
        type: Schema.Types.String,
        required: true
    }],
    height: {
        type: Schema.Types.String,
        required: true
    },
    weight: {
        type: Schema.Types.String,
        required: true
    },
    biology: {
        type: Schema.Types.String,
        required: true
    },
    species: {
        type: Schema.Types.String,
        required: false
    },
    abilities: [{
        type: Schema.Types.String,
        required: false
    }],
    lastExtractionAt: {
        type: Schema.Types.String,
        required: true
    },
    status_hp: [{
        type: Schema.Types.String,
        required: true
    }],
    status_attack: [{
        type: Schema.Types.String,
        required: true
    }],
    status_defense: [{
        type: Schema.Types.String,
        required: true
    }],
    status_spAttack: [{
        type: Schema.Types.String,
        required: true
    }],
    status_spDefense: [{
        type: Schema.Types.String,
        required: true
    }],
    status_speed: [{
        type: Schema.Types.String,
        required: true
    }],
    status_total: [{
        type: Schema.Types.String,
        required: true
    }]
});

module.exports = model('Poke', PokeSchema);