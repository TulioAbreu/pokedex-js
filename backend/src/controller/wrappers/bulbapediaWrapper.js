const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;
const fetch = require('node-fetch');

class BulbapediaExtractor {
    constructor(htmlCode) {
        this.htmlCode = htmlCode;
    }

    getPokemonNumber(text) {
        return text.match(/#[0-9]*/g)[2];
    }

    getPokemonHeight(text) {
        return text.match(/[0-9]+\.[0-9]+\sm/g)[0];
    }

    getPokemonWeight(text) {
        return text.match(/[0-9]+\.[0-9]+\skg/g)[0];
    }

    getPokemonImage(text) {
        let pokeImage = text.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/);
        if (!pokeImage) {
            pokeImage = text.match(/\/\/cdn\.bulbagarden\.net\/upload\/thumb.*500px.*(?:jpg|gif|png)/);
            let splitTest = pokeImage[0].split(' ').slice(-1)[0];
            return splitTest;
        }
        return pokeImage[0];
    }

    getPokemonName(text) {
        return text.split('\n')[4].split(' (Pok')[0];
    }

    getPokemonType(text) {
        const types = text.match(/title=\".*\s\(type\)\"/g);
        let possiblyRealTypes = [
            types[0],
            types[1]
        ];
        let typesStr = possiblyRealTypes.map(value => {
            return value.substring(7, value.indexOf(' '));
        }).filter(value => {
            return value != "Unknown"
        });
        return typesStr;
    }

    getPokemonBiology(dom) {
        let p_or_div = dom.getElementById("Biology").parentElement.nextElementSibling;
        if (p_or_div.tagName == "DIV") { // Ignore first image if exists
            p_or_div = p_or_div.nextElementSibling;
        }

        return p_or_div.textContent;
    }

    isValidPage(text) {
        return (text.indexOf('There is currently no text in this page') < 0);
    }

    static getPokemonLink(pokemonName) {
        let pokeName = this.sanitizePokemonName(pokemonName);
        return "https://bulbapedia.bulbagarden.net/wiki/" + pokeName + "_(Pok%C3%A9mon)";
    }

    static fixPokemonName(rawPokemonName) {
        function fixLetters(str) {
            let newStr = "";
            let nextUpper = true;

            for (let i = 0; i < str.length; ++i) {
                if (nextUpper) {
                    newStr += str[i].toUpperCase();
                    nextUpper = false;
                } else {
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
        function fixLetters(str) {
            let newStr = "";
            let nextUpper = true;

            for (let i = 0; i < str.length; ++i) {
                if (nextUpper) {
                    newStr += str[i].toUpperCase();
                    nextUpper = false;
                } else {
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

    getPokemonJSON() {
        const dom = new jsdom.JSDOM(this.htmlCode);

        let tmpDiv = dom.window.document.createElement('div');
        tmpDiv.innerHTML = this.htmlCode;
        const textContent = tmpDiv.textContent;

        if (!this.isValidPage(textContent)) {
            return null;
        }

        return {
            name: this.getPokemonName(textContent),
            number: this.getPokemonNumber(textContent),
            imgURL: this.getPokemonImage(this.htmlCode),
            type: this.getPokemonType(this.htmlCode),
            height: this.getPokemonHeight(textContent),
            weight: this.getPokemonWeight(textContent),
            biology: this.getPokemonBiology(dom.window.document)
        };
    }
}

module.exports = BulbapediaExtractor;