import React, { useState } from 'react'
import './pokeSearchBar.css'

export default function PokeSearchBar(history, onSubmitCallback) {
    const [pokename, setPokename] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        if (pokename.toLowerCase() == 'nidoran') {
            history.push('/selectNidoran')
        }
        else {
            history.push(`/poke/${pokename}`);
        }

        if (onSubmitCallback != null) {
            onSubmitCallback();
        }
    }

    return (
        <form class="form-inline" onSubmit={handleSubmit}>
            <input class="form-control mr-sm-2" type="search" value={pokename} onChange={e => setPokename(e.target.value)} placeholder="Pesquisar" aria-label="Pesquisar"/>
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}