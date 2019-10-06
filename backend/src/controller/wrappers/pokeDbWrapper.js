const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');


function zip(a, b) {
    var arr = [];
    for (var key in a) arr.push([a[key], b[key]]);
    return arr;
}

class PokeDbExtractor {
    constructor(htmlCode) {
        this.htmlCode = htmlCode;
    }

    getPokemonJSON() {
        const dom = new JSDOM(this.htmlCode);
        
        let tmpDiv = dom.window.document.createElement('div');
        tmpDiv.innerHTML = this.htmlCode;
        const textContent = tmpDiv.textContent;

        if (! this.isValidPage(textContent)) {
            return {
                "species": "",
                "abilities": [],
                "status_hp": [-1, -1, -1],
                "status_attack": [-1, -1, -1],
                "status_defense": [-1, -1, -1],
                "status_spAttack": [-1, -1, -1],
                "status_spDefense": [-1, -1, -1],
                "status_speed": [-1, -1, -1],
                "status_total": [-1, -1, -1],
            }
        }

        let pokemonStatus = this.getPokemonStatus(dom.window.document)
        return {
            "species": this.getPokemonSpecies(dom.window.document),
            "abilities": this.getPokemonAbilities(dom.window.document),
            "status_hp": pokemonStatus[0][1],
            "status_attack": pokemonStatus[1][1],
            "status_defense": pokemonStatus[2][1],
            "status_spAttack": pokemonStatus[3][1],
            "status_spDefense": pokemonStatus[4][1],
            "status_speed": pokemonStatus[5][1],
            "status_total": pokemonStatus[6][1],
        }
    }

    getPokemonSpecies(dom) {
        const pokeHeaderHtml =  dom.getElementsByClassName("vitals-table").item(0);
        const tableContents = pokeHeaderHtml.getElementsByTagName("td");

        return tableContents.item(2).textContent;
    }

    /*
        0 - Numero
        1 - Tipos
        2 - Species
        3 - Altura
        4 - Peso
        5 -habilidades
    */

    getPokemonAbilities(dom) {
        const pokeHeaderHtml =  dom.getElementsByClassName("vitals-table").item(0);
        const tableContents = pokeHeaderHtml.getElementsByTagName("td");
        const abilityContent = tableContents.item(5).getElementsByTagName("a");

        let abilityList = [];

        for (let i = 0; i < abilityContent.length; ++i) {
            abilityList.push(abilityContent.item(i).textContent);
        }

        return abilityList;
    }

    getPokemonStatus(dom) {
        const pokeStatusHtml = dom.getElementsByClassName("vitals-table").item(3);
        const tableContents = pokeStatusHtml.getElementsByTagName("td");
        
        let statusList = [[]];
        let counter = 0;
        let lastIndex = 0;
        for (let i = 0; i < tableContents.length; ++i) {
            let currentContent = tableContents.item(i).textContent;
            if (currentContent.indexOf("\n") == -1) {
                if (counter == 3) {
                    statusList.push([]);
                    counter = 0;
                    lastIndex ++;
                }

                statusList[lastIndex].push(currentContent);
                counter ++;
            }
        }

        const namesTable = pokeStatusHtml.getElementsByTagName("th");

        let namesList = [];
        for (let i = 0; i < namesTable.length; ++i) {
            let currentName = namesTable.item(i).textContent;
            namesList.push(currentName);
        }
        namesList.splice(namesList.length-3, 3);
        
        return zip(namesList, statusList);
    }

    isValidPage(text) {
        return (text.indexOf('Check that you typed the URL (address) correctly.') < 0);
    }

    static sanitizePokemonName(pokemonName) {
        pokemonName = pokemonName.toLocaleLowerCase();
        pokemonName = pokemonName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        pokemonName = pokemonName.replace(". ", "-");
        pokemonName = pokemonName.replace(": ", "-");
        pokemonName = pokemonName.replace(" ", "-");
        pokemonName = pokemonName.replace("jr.", "jr");
        return pokemonName;
    }

    static getPokemonLink(pokemonName) {
        let sanitizedPokemonName = this.sanitizePokemonName(pokemonName);
        return "https://pokemondb.net/pokedex/" + sanitizedPokemonName;
    }

    static async getHtml(link) {
        const htmlPage = (await fetch(link)).text();

        return htmlPage;
    }

    static getPokemonHtml(pokemonName) {
        return this.getHtml(this.getPokemonLink(pokemonName));
    }
};


module.exports = PokeDbExtractor;