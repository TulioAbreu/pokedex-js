const fetch = require('node-fetch');

class Bulbapedia {


    static getPokemonLink(pokemonName) {
        let pokeName = this.sanitizePokemonName(pokemonName);
        return "https://bulbapedia.bulbagarden.net/wiki/" + pokeName + "_(Pok%C3%A9mon)";
    }

    static fixPokemonName(rawPokemonName) {
        function fixLetters (str) {
            let newStr = "";
            let nextUpper = true;

            for (let i = 0; i < str.length; ++i) {
                if (nextUpper) {
                    newStr += str[i].toUpperCase();
                    nextUpper = false;
                }
                else {
                    newStr += str[i].toLowerCase();
                }

                if (str[i] == '-' || str[i] == '_' || str[i] == ' ') {
                    nextUpper = true;
                }
            }

            return newStr;
        }

        let pokeName = rawPokemonName;
        pokeName = fixLetters(pokeName);

        return pokeName;
    }

    
    static sanitizePokemonName(rawPokemonName) {
        function fixLetters (str) {
            let newStr = "";
            let nextUpper = true;

            for (let i = 0; i < str.length; ++i) {
                if (nextUpper) {
                    newStr += str[i].toUpperCase();
                    nextUpper = false;
                }
                else {
                    newStr += str[i].toLowerCase();
                }

                if (str[i] == '-' || str[i] == '_') {
                    nextUpper = true;
                }
            }

            return newStr;
        }

        let pokeName = rawPokemonName;
        pokeName = pokeName.replace(' ', '_');
        pokeName = pokeName.replace("'", "%27");
        pokeName = pokeName.replace('é', "%C3%A9");
        pokeName = fixLetters(pokeName);

        return pokeName;
    }

    static async getHtml(link) {
        const htmlPage = (await fetch(link)).text();

        return htmlPage;
    }

    static getPokemonHtml(pokemonName) {
        return this.getHtml(this.getPokemonLink(pokemonName));
    }
}

module.exports = Bulbapedia;
