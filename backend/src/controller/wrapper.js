const BulbapediaExtractor = require('./bulbapediaExtractor');
const PokeDbExtractor = require('./pokeDbExtractor');

module.exports = {
    async scrapePokeData(pokeName) {
        const bulbapediaPokeHtml = await BulbapediaExtractor.getPokemonHtml(pokeName)
        const pokedbPokeHtml = await PokeDbExtractor.getPokemonHtml(pokeName)

        let bulbaExtractor = new BulbapediaExtractor(bulbapediaPokeHtml)
        let pokedbExtractor = new PokeDbExtractor(pokedbPokeHtml)

        const bulbapediaData = bulbaExtractor.getPokemonJSON()
        const pokedbData = pokedbExtractor.getPokemonJSON()

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

        console.log(pokeData)

        return pokeData
    }
}