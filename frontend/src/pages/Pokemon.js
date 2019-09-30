import React, { useEffect, useState } from 'react';
import api from '../services/api'
import './Pokemon.css';
import './Main.css'

export default function Pokemon({ history, match }) {
    const [reloadPage, setReload] = useState(true);
    const [pokename, setPokename] = useState('');
    const [pokeInfo, setPokeInfo ] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        history.push(`/poke/${pokename}`);
        setReload(true);
    }

    useEffect(() => {
        if (reloadPage) {
            async function loadPokemon() {
                const pokename = match.params.pokeData;
                const response = await api.post(`/poke/${pokename}`);
                response.data.type = response.data.type.join(' and ');
                setPokeInfo(response.data);
            }
    
            loadPokemon();
            setReload(false);
        }
    });

    return (
        <div className="App">
            <h1 className="AppTitle">PokedexJS</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    className="PokeInput"
                    value={pokename}
                    onChange={e => setPokename(e.target.value)}
                    placeholder="Pokemon name">
                </input>
                <button 
                    type="submit"
                    className="PokeButton">
                    Search
                </button>
            </form>

            <div className="pokeTable">
                <p className="pokeName">{pokeInfo.number} - {pokeInfo.name}</p>
                <img className="pokeImage" 
                    src={pokeInfo.imgURL} 
                    alt={pokeInfo.name} width="300"></img>
                <p>Type: {pokeInfo.type} </p>
                <p>Height: {pokeInfo.height}</p>
                <p>Weight: {pokeInfo.weight}</p>
                <p className="pokeBiology">Biology: {pokeInfo.biology}</p>
            </div>
        </div>
    )
}