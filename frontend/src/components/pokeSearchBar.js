import React, { useState } from 'react';
import './pokeSearchBar.css'

export default function PokeSearchBar(history, onSubmitCallback) {
    const [pokename, setPokename] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        history.push(`/poke/${pokename}`);

        if (onSubmitCallback != null) {
            onSubmitCallback();
        }
    }

    return (
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
    )
}