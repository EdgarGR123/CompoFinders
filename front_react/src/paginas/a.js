import React, { useEffect, useState } from "react";
import SearchVar from "../SearchVar";
import '../estilos/home.css'

async function Peticion() {
    try{
        const respuesta =await fetch("https://jsonplaceholder.typicode.com/posts")
        const datos = await respuesta.json()
        return  datos
    }catch (error){
        console.log("hay un error: ", error)
        return[];
    }
}

export default function Recibir() {
    const [datos , setdatos]=  useState([]);
    useEffect(()=>{
        async function Recibir() {
            const datos_rec = await Peticion()
            setdatos(datos_rec)
        }
        Recibir()
    }, []);

    return(
        <div className="Set">
            <SearchVar/>            
            {datos.map((element) => (
                <div className="card" key={element.userId}>
                    <h1>{element.id}</h1>
                    <h3>{element.title}</h3>
                    <p>{element.body}</p>
                </div>
            ))}
        </div>
    )
}