const Poke = require('../model/Poke');

function fixPokeName(rawPokeName) {
    let fixedName = rawPokeName[0].toUpperCase() + rawPokeName.slice(1)
    return fixedName
}

async function getPoke(pokeName) {
    let sanitizedPokeName

    switch (pokeName) {
        case 'nidoran-f':
        case 'nidoran-m': {
            // Nothing to do
        } break
        default: {
            sanitizedPokeName = fixPokeName(pokeName)
        } break
    }

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
