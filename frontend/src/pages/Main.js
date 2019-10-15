import React, { useState } from 'react';
import './Main.css';
import PokeSearchBar from '../components/pokeSearchBar'


export default function App({ history }) {
    return (
        <div className="App">
            <h1 className="AppTitle">PokedexJS</h1>
            { PokeSearchBar(history) }
        </div>
    );
  }

