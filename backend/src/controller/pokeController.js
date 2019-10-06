const Poke = require('../model/poke');

function fixPokeName(rawPokeName) {
    let fixedName = rawPokeName[0].toUpperCase() + rawPokeName.slice(1)
    return fixedName
}

async function getPoke(pokeName) {
    let sanitizedPokeName = fixPokeName(pokeName)

    const pokeData = await Poke.findOne({
        "name": sanitizedPokeName
    })

    return pokeData
}

async function savePoke(pokeData) {
    await Poke.create(pokeData)
}    

module.exports = {
    fixPokeName,
    getPoke,
    savePoke
}