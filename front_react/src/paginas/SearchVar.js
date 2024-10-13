import React from "react";
import './estilos/nav.css'

export default function SearchVar() {
    return(

        <header>
            <div className="search-div">
                <input className="search" placeholder="Buscar" type="search"></input>
                <button className="btn-search">ok</button>
            </div>
        </header>
    )
}