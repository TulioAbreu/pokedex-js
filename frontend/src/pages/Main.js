import React, { useState } from 'react';
import './Main.css';
import PokeSearchBar from '../components/pokeSearchBar'
import PageTitle from '../components/pageTitle'

import '../components/pageTitle.css'

export default function App({ history }) {
    return (
        <div class="container-fluid bg-danger" style={{height: "100vh"}}>
            <div class="container h-100 d-flex justify-content-center">
                <div class="my-auto">
                    <div class="text-white AppTitle display-2">Pokédex JS</div>
                    { PokeSearchBar(history) }
                </div>
            </div>
        </div>
    );
  }

