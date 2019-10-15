import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PokeSearchBar from '../components/pokeSearchBar'
import './Main.css'
import './Pokemon.css'
import './NidoranSelect.css'

export default function NidoranPage({ history }) {
    let nidoranMaleImgLink = 'https://cdn.bulbagarden.net/upload/thumb/4/4a/032Nidoran.png/250px-032Nidoran.png'
    let nidoranFemaleImgLink = 'https://cdn.bulbagarden.net/upload/thumb/8/81/029Nidoran.png/250px-029Nidoran.png'

    return (
        <div className="App">
            <h1 className="AppTitle">PokedexJS</h1>
            { PokeSearchBar() }
            <div className="pokeTable">
                <p>
                    Nidoran is a name used for two different Pokémon because of it's gender special case.
                </p>
                <p>
                    Select the Pokémon you want to check.
                </p>
                <table className='nidoran-table'>
                    <tr>
                        <td className='nidoran-cell'>
                            <Link to='/poke/nidoran-m'>
                                <img className='nidoran-image' src={nidoranMaleImgLink} />
                                <p>Male Nidoran</p>
                            </Link>
                        </td>
                        <td className='nidoran-cell'>
                            <Link to='/poke/nidoran-f'>
                                <img className='nidoran-image' src={nidoranFemaleImgLink} />
                                <p>Female Nidoran</p>
                            </Link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )

}