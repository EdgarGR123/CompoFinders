// Text3.jsx
import Marcas from "../components/marcas";
import Aside from '../components/aside';
import Productos_lista from "../components/productos_lista";
import React, { useState, useEffect } from 'react';

export default function Text3({ setElementos }) { 
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchDatosRamdon = async () => {
            const datos = await Datos_ramdon();
            if (datos) {
                setProductos(datos); 
            }
        };
        fetchDatosRamdon();
    }, []);
    
    function limpiarDatos(datos) {
        if (Array.isArray(datos)) {
            return datos.map(item => {
                const nuevoItem = { ...item };
                Object.keys(nuevoItem).forEach(key => {
                    nuevoItem[key] = stripHTML(nuevoItem[key]);
                });
                return nuevoItem;
            });
        } else if (typeof datos === 'object' && datos !== null) {
            const nuevoDatos = { ...datos };
            Object.keys(nuevoDatos).forEach(key => {
                nuevoDatos[key] = stripHTML(nuevoDatos[key]);
            });
            return nuevoDatos;
        }
        return datos;
    }
    
    function stripHTML(texto) {
        if (typeof texto === 'string') {
            return texto.replace(/<\/?[^>]+(>|$)/g, "");
        }
        return texto; 
    }
    
    const Datos_ramdon = async () => {
        try {
            const response = await fetch('https://compufinder.net/php/ramdon.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseBody = await response.text();
    
            if (!response.ok) {
                throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
            }

            let data; 
            try {
                data = JSON.parse(responseBody);
            } catch (error) {
                throw new Error("Error al analizar el JSON: " + error.message);
            }
            const datosLimpios = limpiarDatos(data);
            return datosLimpios;
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <Aside setProductos={setProductos} /> 
                    <Productos_lista productos={productos} setElementos={setElementos} /> 
                </div>
            </div>
            <Marcas />
        </>
    );
}
