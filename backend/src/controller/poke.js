const Poke = require('../model/Poke');

const Bulbapedia = require('./bulbapedia');
const BulbapediaExtractor = require('./bulbapediaExtractor');

module.exports = {
    async show(request, response) { 
        const { rawPokeName } = request.params;
        let pokeName = Bulbapedia.sanitizePokemonName(rawPokeName);

        const pokeExist  = await Poke.findOne({
            "name": Bulbapedia.fixPokemonName(rawPokeName)
        });

        if (pokeExist) {
            console.log(`Sent pokemon cached data [POKEMON=${pokeName}]`);
            return response.json(pokeExist);
        }

        console.log(`Scrapping for pokemon data [POKEMON=${pokeName}]`);
        const pokemonHtml = await Bulbapedia.getPokemonHtml(pokeName);

        var bulbaExtractor = new BulbapediaExtractor(pokemonHtml);
        const pokemonData = bulbaExtractor.getPokemonJSON();

        const poke = await Poke.create({
            name: pokemonData["name"],
            number: pokemonData["number"],
            imgURL: pokemonData["imgURL"],
            type: pokemonData["type"],
            height: pokemonData["height"],
            weight: pokemonData["weight"],
            biology: pokemonData["biology"],
        });

        return response.json(pokemonData);
    }
};