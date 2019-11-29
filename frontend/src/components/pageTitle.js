import React, { useEffect, useState } from 'react'
import './pageTitle.css'
import PokeSearchBar from './pokeSearchBar'

export default function PageTitle(history, onSearchSubmit) {
    return (
        <nav class="navbar navbar-light bg-danger">
            <a class="navbar-brand text-white display-3 AppTitle" href="#">PokédexJS</a>
            { PokeSearchBar(history, onSearchSubmit) }
        </nav>
    )
}