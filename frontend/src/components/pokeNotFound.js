import React, { useEffect, useState } from 'react';
import detectivePikachu from '../assets/pikachu_detective.png'
import './pokeNotFound.css'

export default function pokeNotFound() {
    return (
        <div>
            <img className="pikachuImg" src={detectivePikachu}/>
            
            <div className="notFoundText">
                Pokemon not found!
            </div>
        </div>
    )
}