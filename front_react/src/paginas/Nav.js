import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
    return(
        <nav className="Nav">
            <NavLink className={({isActive}) => (isActive ? "activado": 'link')} to="/">Inicio</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activado": 'link')} to="/pagina1">Home</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activado": 'link')} to="/pagina2">Perfil</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activado": 'link')} to="/pagina3">Notificaciones</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activado": 'link')} to="/pagina4">Crear</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activado": 'link')} to="/pagina5">Mini Meedio</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activado": 'link')} to="/pagina6">Salir</NavLink>
        </nav>
    )
}