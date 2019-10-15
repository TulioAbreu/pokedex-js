const { getPoke, savePoke } = require('./pokeController')
const { scrapePokeData } = require('./wrapper')

module.exports = {
    async show(request, response) {
        const { pokeName } = request.params

        let pokeData = await getPoke(pokeName)
        if (pokeData == null) {
            try {
                console.log(`Scrapping for pokemon data [POKEMON=${pokeName}]`)
                pokeData = await scrapePokeData(pokeName)
                savePoke(pokeData)
            }
            catch (e) {
                console.log(`Failed to scrap pokemon data [POKEMON=${pokeName}]`)
                pokeData = null;
            }
        }
        else {
            console.log(`Sent pokemon cached data [POKEMON=${pokeName}]`)
        }

        return response.json(pokeData)
    }
};  