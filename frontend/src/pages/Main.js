import React, { useState } from 'react';
import './Main.css';
import PokeSearchBar from '../components/pokeSearchBar'
import PageTitle from '../components/pageTitle'

export default function App({ history }) {
    return (
        <div className="App">
            { PageTitle() }
            { PokeSearchBar(history) }
        </div>
    );
  }

