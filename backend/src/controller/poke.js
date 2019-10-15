const { getPoke, savePoke } = require('./pokeController')
const { scrapePokeData } = require('./wrapper')

module.exports = {
    async show(request, response) {
        function isPokeDataExpired(dateStr) {
            const extractionDate = new Date(dateStr)
            const hoursLimit = 24
            const nowDate = new Date()

            const hoursSinceExtraction = (nowDate - extractionDate) / (1000*60*60)

            return hoursSinceExtraction > hoursLimit            
        }

        const { pokeName } = request.params

        let pokeData = await getPoke(pokeName)

        let isExpired = false
        if (pokeData != null) {
            isExpired = isPokeDataExpired(pokeData["lastExtractionAt"])
        }
    
        if (pokeData == null || isExpired) {
            try {
                if (isExpired) {
                    console.log(`Pokemon data may be deprecated [POKEMON=${pokeName}]`)
                }
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