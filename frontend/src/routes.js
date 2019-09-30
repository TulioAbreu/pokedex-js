import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './pages/Main'
import Pokemon from './pages/Pokemon'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Main}/>
            <Route path="/poke/:pokeData" component={Pokemon}/>
        </BrowserRouter>
    );
}