import React, { useEffect, useState } from 'react';
import api from '../services/api'
import './Pokemon.css';
import './Main.css'
import PokeSearchBar from '../components/pokeSearchBar'
import ReactLoading from "react-loading";
import pokeNotFound from '../components/pokeNotFound'

export default function Pokemon({ history, match }) {
    const [reloadPage, setReload] = useState(true);
    const [types, setTypes] = useState([])
    const [pokeInfo, setPokeInfo ] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    function onSearchSubmit() {
        setIsLoading(true)
        setReload(true)
    }
    
    useEffect(() => {
        async function loadPokemonPage() {
            async function loadPokemon() {
                const pokename = match.params.pokeData
                const response = await api.post(`/poke/${pokename}`)
        
                if (response.data == null) {
                    setPokeInfo(null);
                    return;
                }
        
                const typesList = response.data.type
                let pokeTypeStyles = []
                for (let i = 0; i < typesList.length; ++i) {
                    pokeTypeStyles.push({
                        str: typesList[i],
                        cssClass: "type-icon type-" + typesList[i].toLowerCase()
                    })
                }
        
                setTypes(pokeTypeStyles)
                setPokeInfo(response.data)
            }

            await loadPokemon().then(_ => {
                setIsLoading(false)
            })
        }

        if (! reloadPage) return
        loadPokemonPage();
        setReload(false);
    });

    return (
        <div className="App">
            <h1 className="AppTitle">Pokédex JS</h1>
            { PokeSearchBar(history, onSearchSubmit) }

            <div className={isLoading? "loading":"notLoading"}></div>

            {isLoading? 
                <div className="loadingBars">
                    <ReactLoading type={"bars"} color={"white"} />
                </div>
                :
                <div className="pokeTable">
                    {pokeInfo == null?
                        <div>
                            { pokeNotFound() }
                        </div>
                        :
                        <div>
                            <p className="pokeName">
                                { pokeInfo.number } - { pokeInfo.name }
                            </p>
                            <img 
                                className="pokeImage" 
                                src={ pokeInfo.imgURL } 
                                alt={ pokeInfo.name } width="300"
                                />
                            {
                                types.map(type => (
                                    <div className={ type.cssClass }>
                                        { type.str }
                                    </div>
                                ))
                            }
                            <p>
                                Height: { pokeInfo.height }
                            </p>
                            <p>
                                Weight: {pokeInfo.weight}
                            </p>

                            <hr class="element-divider"/>

                            <p className="info-title">
                                Biology: 
                            </p>
                            <p className="pokeBiology">
                                { pokeInfo.biology }
                            </p>

                            <hr class="element-divider"/>
                            
                            <p className="info-title"> 
                                Abilities
                            </p>
                            {
                                pokeInfo.abilities.map(ability => (
                                    <p>
                                        { ability }
                                    </p>
                                ))
                            }

                            <hr className="element-divider"/>
                            
                            <p className="info-title">
                                Status
                            </p>

                            <table className="status-table">
                                <tr>
                                    <th className="status-table-top-header"></th>
                                    <th className="status-table-top-header">Base</th>
                                    <th className="status-table-top-header">Min</th>
                                    <th className="status-table-top-header">Max</th>
                                </tr>
                                <tr>
                                    <td className="status-table-left-header">HP</td>
                                    <td className="status-table-cell">{ pokeInfo.status_hp[0] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_hp[1] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_hp[2] }</td>
                                </tr>
                                <tr>
                                    <td className="status-table-left-header">Attack</td>
                                    <td className="status-table-cell">{ pokeInfo.status_attack[0] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_attack[1] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_attack[2] }</td>
                                </tr>
                                <tr>
                                    <td className="status-table-left-header">Defense</td>
                                    <td className="status-table-cell">{ pokeInfo.status_defense[0] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_defense[1] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_defense[2] }</td>
                                </tr>
                                <tr>
                                    <td className="status-table-left-header">Sp. Attack</td>
                                    <td className="status-table-cell">{ pokeInfo.status_spAttack[0] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_spAttack[1] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_spAttack[2] }</td>
                                </tr>
                                <tr>
                                    <td className="status-table-left-header">Sp. Defense</td>
                                    <td className="status-table-cell">{ pokeInfo.status_spDefense[0] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_spDefense[1] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_spDefense[2] }</td>
                                </tr>
                                <tr>
                                    <td className="status-table-left-header">Speed</td>
                                    <td className="status-table-cell">{ pokeInfo.status_speed[0] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_speed[1] }</td>
                                    <td className="status-table-cell">{ pokeInfo.status_speed[2] }</td>
                                </tr>
                            </table>
                        </div>
                    }
                </div>
            }
        </div>
    )
}