import React, { useState } from 'react';
import './Main.css';

export default function App({ history }) {
    const [pokename, setPokename] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        history.push(`/poke/${pokename}`);
    }

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
      </div>
    );
  }

