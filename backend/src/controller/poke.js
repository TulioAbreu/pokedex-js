const { getPoke, savePoke } = require('./pokeController')
const { scrapePokeData } = require('./wrapper')

module.exports = {
    async show(request, response) {
        const { pokeName } = request.params

        let pokeData = await getPoke(pokeName)
        if (pokeData == null) {
            console.log(`Scrapping for pokemon data [POKEMON=${pokeName}]`)
            pokeData = await scrapePokeData(pokeName)
            savePoke(pokeData)
        }
        else {
            console.log(`Sent pokemon cached data [POKEMON=${pokeName}]`)
        }

        return response.json(pokeData)
    }
};