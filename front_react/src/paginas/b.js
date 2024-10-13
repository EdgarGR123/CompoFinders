import React, { useEffect, useState } from "react";

async function Peticion() {
    try {
        const response = await fetch("http://127.0.0.1:5000/perfil");
        const datos = await response.json();
        console.log("Datos recibidos:", datos);
        return datos;
    } catch (error) {
        console.log("Hay un error: ", error);
        return [];
    }
}

export default function DATA() {
    const [perfil, setPerfil] = useState(null);
    const [links, setLinks] = useState({});

    useEffect(() => {
        async function fetch_data() {
            const res = await Peticion();

            const perfilData = res.find(item => item.Nombre && item.banner && item.description);
            const linksData = res.find(item => item.link1 && item.link2 && item.link3);
            
            if (perfilData) setPerfil(perfilData);
            if (linksData) setLinks(linksData);
        }
        fetch_data();
    }, []);

    console.log("Perfil en el estado:", perfil);
    console.log("Links en el estado:", links);

    return (
        <>  
            <header><button>volver</button><span>Nombre</span></header>

            {perfil && (
                <section className="seccion-perfil">
                    <div className="sd">
                        <div className="banner">
                            <img className="img-banner" src={perfil.banner} alt="Banner" />
                        </div>
                        <div className="div-descrip">
                            <h1>{perfil.Nombre}</h1>
                            <p>{perfil.description}</p>
                            <a className="link-descrip" href={links.link1} target="_blank" rel="noopener noreferrer">Google</a>
                            <a className="link-descrip" href={links.link2} target="_blank" rel="noopener noreferrer">YouTube</a>
                            <a className="link-descrip" href={links.link3} target="_blank" rel="noopener noreferrer">CAD</a>
                        </div>
                    </div>

                    <div className="Content">
                        <button>Inicio</button>
                        <button>imagenes</button>
                        <button>Comunidad</button>
                    </div>
                </section>
            )}
        </>
    );
}