const BulbapediaExtractor = require('./wrappers/bulbapediaWrapper');
const PokeDbExtractor = require('./wrappers/pokeDbWrapper');

module.exports = {
    async scrapePokeData(pokeName) {
        const bulbapediaPokeHtml = await BulbapediaExtractor.getPokemonHtml(pokeName)
        const pokedbPokeHtml = await PokeDbExtractor.getPokemonHtml(pokeName)

        let bulbaExtractor = new BulbapediaExtractor(bulbapediaPokeHtml)
        let pokedbExtractor = new PokeDbExtractor(pokedbPokeHtml)

        const bulbapediaData = bulbaExtractor.getPokemonJSON()
        const pokedbData = pokedbExtractor.getPokemonJSON()

        if (bulbapediaData == null ||
            pokedbData == null) 
        {
            return null;
        }

        const pokeData = {
            name: bulbapediaData["name"],
            number: bulbapediaData["number"],
            imgURL: bulbapediaData["imgURL"],
            alolanFormURL: bulbapediaData["alolanFormURL"],
            galarFormURL: bulbapediaData["galarFormURL"],
            type: bulbapediaData["type"],
            height: bulbapediaData["height"],
            weight: bulbapediaData["weight"],
            biology: bulbapediaData["biology"],
            species: pokedbData["species"],
            abilities: pokedbData["abilities"],
            status_hp: pokedbData["status_hp"],
            status_attack: pokedbData["status_attack"],
            status_defense: pokedbData["status_defense"],
            status_spAttack: pokedbData["status_spAttack"],
            status_spDefense: pokedbData["status_spDefense"],
            status_speed: pokedbData["status_speed"],
            status_total: pokedbData["status_total"],
            lastExtractionAt: new Date().toString()
        }

        return pokeData
    }
}