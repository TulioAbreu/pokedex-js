const Poke = require('../model/Poke');

const BulbapediaExtractor = require('./bulbapediaExtractor');
const PokeDbExtractor = require('./pokeDbExtractor');

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
        const bulbapediaPokeHtml = await BulbapediaExtractor.getPokemonHtml(pokeName);
        const pokedbPokeHtml = await PokeDbExtractor.getPokemonHtml(pokeName);

        let bulbaExtractor = new BulbapediaExtractor(bulbapediaPokeHtml);
        let pokedbExtractor = new PokeDbExtractor(pokedbPokeHtml);

        const bulbapediaData = bulbaExtractor.getPokemonJSON();
        const pokedbData = pokedbExtractor.getPokemonJSON();

        const pokeData = {
            name: bulbapediaData["name"],
            number: bulbapediaData["number"],
            imgURL: bulbapediaData["imgURL"],
            type: bulbapediaData["type"],
            height: bulbapediaData["height"],
            weight: bulbapediaData["weight"],
            biology: bulbapediaData["biology"],
            species: pokedbData["species"],
            abilities: pokedbData["abilities"],
            status: pokedbData["status"]
        }

        await Poke.create(pokeData);
        return response.json(pokeData);
    }
};