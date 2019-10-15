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
    status: [{
        type: Schema.Types.Array,
        required: false
    }],
    lastExtractionAt: {
        type: Schema.Types.String,
        required: true
    }
});

module.exports = model('Poke', PokeSchema);