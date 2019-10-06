const Poke = require('../model/Poke');

const BulbapediaExtractor = require('./bulbapediaExtractor');
const PokeDbExtractor = require('./pokeDbExtractor');

const { scrapePokeData } = require('./wrapper')

module.exports = {
    async show(request, response) { 
        const { rawPokeName } = request.params;
        let pokeName = BulbapediaExtractor.sanitizePokemonName(rawPokeName);

        const pokeExist  = await Poke.findOne({
            "name": BulbapediaExtractor.fixPokemonName(rawPokeName)
        });

        if (pokeExist) {
            console.log(`Sent pokemon cached data [POKEMON=${pokeName}]`);
            return response.json(pokeExist);
        }

        console.log(`Scrapping for pokemon data [POKEMON=${pokeName}]`);
        const pokeData = await scrapePokeData(pokeName);

        await Poke.create(pokeData);
        return response.json(pokeData);
    }
};