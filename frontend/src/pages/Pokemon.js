import React, { useEffect, useState } from 'react';
import api from '../services/api'
import './Pokemon.css';
import './Main.css'
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import pokeNotFound from '../components/pokeNotFound'

export default function Pokemon({ history, match }) {
    const [reloadPage, setReload] = useState(true);
    const [pokename, setPokename] = useState('');
    const [types, setTypes] = useState([])
    const [pokeInfo, setPokeInfo ] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        history.push(`/poke/${pokename}`);
        setReload(true);
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

    async function loadPokemonPage() {
        await loadPokemon().then(_ => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (! reloadPage) return
        loadPokemonPage();
        setReload(false);
    });

    return (
        <div className="App">
            <h1 className="AppTitle">PokedexJS</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    className="PokeInput"
                    value={pokename}
                    onChange={e => setPokename(e.target.value)}
                    placeholder="Pokemon name"
                    required
                >
                </input>
                <button 
                    type="submit"
                    className="PokeButton"
                >
                    Search
                </button>
            </form>

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
                            <p className="pokeName">{pokeInfo.number} - {pokeInfo.name}</p>
                            <img className="pokeImage" 
                                src={pokeInfo.imgURL} 
                                alt={pokeInfo.name} width="300"></img>
                            {types.map(type => (
                                <div className={ type.cssClass }>
                                    { type.str }
                                </div>
                            ))}
                            <p>Height: {pokeInfo.height}</p>
                            <p>Weight: {pokeInfo.weight}</p>
                            <p className="pokeBiology">Biology: {pokeInfo.biology}</p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}