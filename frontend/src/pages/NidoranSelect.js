import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PokeSearchBar from '../components/pokeSearchBar'
import './Main.css'
import './Pokemon.css'
import './NidoranSelect.css'
import PageTitle from '../components/pageTitle'

export default function NidoranPage({ history }) {
    let nidoranMaleImgLink = 'https://cdn.bulbagarden.net/upload/thumb/4/4a/032Nidoran.png/250px-032Nidoran.png'
    let nidoranFemaleImgLink = 'https://cdn.bulbagarden.net/upload/thumb/8/81/029Nidoran.png/250px-029Nidoran.png'

    return (
        <div className="App">
            { PageTitle() }
            { PokeSearchBar(history) }
            <div className="pokeTable">
                <p>
                    Nidoran is a species of Pokémon and there are two variations based on its gender.
                </p>
                <p>
                    Select the Nidoran you want to check
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