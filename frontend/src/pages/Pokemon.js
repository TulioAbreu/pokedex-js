import React, { useEffect, useState } from 'react';
import api from '../services/api'
import './Pokemon.css';
import './Main.css'
import PokeSearchBar from '../components/pokeSearchBar'
import ReactLoading from "react-loading";
import pokeNotFound from '../components/pokeNotFound'

export default function Pokemon({ history, match }) {
    const [reloadPage, setReload] = useState(true);
    const [types, setTypes] = useState([])
    const [pokeInfo, setPokeInfo ] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    function onSearchSubmit() {
        setIsLoading(true)
        setReload(true)
    }
    
    async function loadPokemon() {
        const pokename = match.params.pokeData
        const response = await api.post(`/poke/${pokename}`)

        if (response.data == null) {
            setPokeInfo(null);
            return;
        }

        const typesList = response.data.type
        let pokeTypeStyles = []
        for (let i = 0; i < typesList.length; ++i) {
            pokeTypeStyles.push({
                str: typesList[i],
                cssClass: "type-icon type-" + typesList[i].toLowerCase()
            })
        }

        setTypes(pokeTypeStyles)
        setPokeInfo(response.data)
    }

    useEffect(() => {
        async function loadPokemonPage() {
            await loadPokemon().then(_ => {
                setIsLoading(false)
            })
        }

        if (! reloadPage) return
        loadPokemonPage();
        setReload(false);
    });

    return (
        <div className="App">
            <h1 className="AppTitle">Pokédex JS</h1>
            { PokeSearchBar(history, onSearchSubmit) }

            <div className={isLoading? "loading":"notLoading"}></div>

            {isLoading? 
                <div className="loadingBars">
                    <ReactLoading type={"bars"} color={"white"} />
                </div>
                :
                <div className="pokeTable">
                    {pokeInfo == null?
                        <div>
                            { pokeNotFound() }
                        </div>
                        :
                        <div>
                            <p className="pokeName">
                                { pokeInfo.number } - { pokeInfo.name }
                            </p>
                            <img 
                                className="pokeImage" 
                                src={ pokeInfo.imgURL } 
                                alt={ pokeInfo.name } width="300"
                                />
                            {
                                types.map(type => (
                                    <div className={ type.cssClass }>
                                        { type.str }
                                    </div>
                                ))
                            }
                            <p>
                                Height: { pokeInfo.height }
                            </p>
                            <p>
                                Weight: {pokeInfo.weight}
                            </p>
                            <p className="pokeBiology">
                                Biology: { pokeInfo.biology }
                            </p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}