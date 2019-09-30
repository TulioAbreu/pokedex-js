const express = require('express');
const mongoose = require('mongoose');

const PokeController = require('./controller/poke');
const cors = require('cors');

const app = express();
const mongoDbConnectionStr = require('./secret');

mongoose.connect(mongoDbConnectionStr, {
    useNewUrlParser: true
});

app.use(cors());
app.use(express.json());

app.post('/poke/:rawPokeName', PokeController.show);

app.listen(3333, () => {
    console.log('[INFO] PokeJS server is open on port 3333!');
});