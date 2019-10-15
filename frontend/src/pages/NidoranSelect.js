import React, { useState } from 'react';
import './Main.css';
import './Pokemon.css';
import './NidoranSelect.css'

export default function NidoranPage({ history }) {
    const [pokename, setPokename] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        history.push(`/poke/${pokename}`);
    }

    let nidoranMaleImgLink = 'https://cdn.bulbagarden.net/upload/thumb/4/4a/032Nidoran.png/250px-032Nidoran.png'
    let nidoranFemaleImgLink = 'https://cdn.bulbagarden.net/upload/thumb/8/81/029Nidoran.png/250px-029Nidoran.png'

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
                />
                <button 
                    type="submit"
                    className="PokeButton"
                >
                Search
                </button>
            </form>

            <div className="pokeTable">
                <p>
                    Nidoran is a name used for two different Pokémon because of it's gender special case.
                </p>
                <p>
                    Select the Pokémon you want to check.
                </p>
                <table className='nidoran-table'>
                    <tr>
                        {/* TODO: Add link to pages */}
                        <td className='nidoran-cell'>
                            <img className='nidoran-image' src={nidoranMaleImgLink} />
                            <p>Male Nidoran</p>
                        </td>
                        <td className='nidoran-cell'>
                            <img className='nidoran-image' src={nidoranFemaleImgLink} />
                            <p>Female Nidoran</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )

}