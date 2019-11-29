import React, { useEffect, useState } from 'react';
import api from '../services/api'
import './Pokemon.css';
import './Main.css'
import PokeSearchBar from '../components/pokeSearchBar'
import ReactLoading from "react-loading";
import pokeNotFound from '../components/pokeNotFound'
import PageTitle from '../components/pageTitle';

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
        <div>
            { PageTitle(history, onSearchSubmit) }
            <div className={isLoading? "loading":"notLoading"}/>
            <div class="container-fluid">
                {isLoading? 
                    <div className="loadingBars">
                        <ReactLoading type={"bars"} color={"white"} />
                    </div>
                    :
                    <div class="col-xs-1 text-center">
                        {pokeInfo == null?
                            <div>
                                { pokeNotFound() }
                            </div>
                            :
                            <div class="pt-5">
                                <p class="display-4 pb-3">
                                    { pokeInfo.number } - { pokeInfo.name }
                                </p>
                                <img 
                                    className="pokeImage" 
                                    src={ pokeInfo.imgURL } 
                                    alt={ pokeInfo.name } width="30%"
                                    />
                                <div class="pb-3">
                                    {
                                        types.map(type => (
                                            <div className={ type.cssClass }>
                                                { type.str }
                                            </div>
                                        ))
                                    }
                                </div>
                                <p>
                                    Height: { pokeInfo.height }
                                </p>
                                <p>
                                    Weight: {pokeInfo.weight}
                                </p>

                                {pokeInfo.alolanFormURL != ""?
                                    <div>
                                        <img
                                            src={ "http://" + pokeInfo.alolanFormURL }
                                            alt="Alolan Form"
                                            width="200"/>
                                        <p>
                                            { pokeInfo.name }'s Alolan Form
                                        </p>
                                    </div>
                                    :
                                    <div></div>
                                }

                                {pokeInfo.galarFormURL != ""?
                                    <div>
                                        <img
                                            src={ "http://" + pokeInfo.galarFormURL }
                                            alt="Galarian Form"
                                            width="200"/>
                                        <p>
                                            { pokeInfo.name }'s Galarian Form
                                        </p>
                                    </div>
                                    :
                                    <div></div>
                                }


                                <hr class="element-divider"/>

                                <p class="display-4">
                                    Biology
                                </p>
                                <p className="pokeBiology">
                                    { pokeInfo.biology }
                                </p>

                                <hr class="element-divider"/>
                                
                                <p class="display-4"> 
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
                                
                                <p class="display-4">
                                    Status
                                </p>

                                <div class="container pl-5 pr-5 mb-5">
                                    <table class="table table-hover table-striped">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Base</th>
                                                <th scope="col">Min</th>
                                                <th scope="col">Max</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">HP</th>
                                                <td>{ pokeInfo.status_hp[0] }</td>
                                                <td>{ pokeInfo.status_hp[1] }</td>
                                                <td>{ pokeInfo.status_hp[2] }</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Attack</th>
                                                <td>{ pokeInfo.status_attack[0] }</td>
                                                <td>{ pokeInfo.status_attack[1] }</td>
                                                <td>{ pokeInfo.status_attack[2] }</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Defense</th>
                                                <td>{ pokeInfo.status_defense[0] }</td>
                                                <td>{ pokeInfo.status_defense[1] }</td>
                                                <td>{ pokeInfo.status_defense[2] }</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sp. Attack</th>
                                                <td>{ pokeInfo.status_spAttack[0] }</td>
                                                <td>{ pokeInfo.status_spAttack[1] }</td>
                                                <td>{ pokeInfo.status_spAttack[2] }</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sp. Defense</th>
                                                <td>{ pokeInfo.status_spDefense[0] }</td>
                                                <td>{ pokeInfo.status_spDefense[1] }</td>
                                                <td>{ pokeInfo.status_spDefense[2] }</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Speed</th>
                                                <td>{ pokeInfo.status_speed[0] }</td>
                                                <td>{ pokeInfo.status_speed[1] }</td>
                                                <td>{ pokeInfo.status_speed[2] }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>

        </div>
    )
}