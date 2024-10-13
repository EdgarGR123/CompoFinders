import '../css/header.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Get_datos2 from '../API/datos2'
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Header({setElementos}){
    const [valor , setValor] = useState('')
    const [estado, setEstado] = useState(false)
    const [resultados, setResultados] = useState([]);
    const navigate = useNavigate();

    const { transcript, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        if (transcript) {
            setValor(transcript);
            Cambios_input({ target: { value: transcript } });
        }
    }, [transcript]);
    
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
    const Cambios_input = async (e) => {
        setValor(e.target.value);
        try {
            const respuesta = await fetch(`https://compufinder.net/php/consulta_busqueda.php?titulo=${valor}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json',}
            });
            const responseBody = await respuesta.text(); 
            if (!respuesta.ok) {
                throw new Error("Error " + respuesta.status + " al llamar al API: " + respuesta.statusText);
            }    
            let data;
            try {
                data = JSON.parse(responseBody); 
            } catch (error) {
                throw new Error("Error al analizar el JSON: " + error.message);
            }
            const datosLimpios = limpiarDatos(data);
            setResultados(datosLimpios)
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setResultados([]);
        }
    };
    const Abrir_producto = async (valor_titulo) => {
        console.log("titulo antes de :", valor_titulo); 
        const consulta_titulo = await Get_datos2(valor_titulo); 
        console.log("Datos obtenidos de la API:", consulta_titulo); 
        setElementos(consulta_titulo); 
        navigate('/Shop_busqueda'); 
    };

    const manejarMicrófono = () => {
        SpeechRecognition.startListening({language:'es-Es'});
    };

    const para_escucha = () => {
        SpeechRecognition.stopListening();
    };

    const abrir_modal= () => setEstado(true)
    const cerrar_modal= () => setEstado(false)
    return (
        <>   
        <nav className="navbar navbar-expand-lg navbar-light shadow">
            <div className="container d-flex justify-content-between align-items-center">
                <a className="navbar-brand text-success logo h1 align-self-center" href="Inicio">
                    Compufinder
                </a>
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#templatemo_main_nav"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                    <div className="flex-fill">
                        <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                            <li className="nav-item"><a className="nav-link" href="Inicio">Inicio</a></li>
                            <li className="nav-item"><a className="nav-link" href="Sobre">Acerca de</a></li>
                            <li className="nav-item"><a className="nav-link" href="Comprar">Comprar</a></li>
                            <li className="nav-item"><a className="nav-link" href="Contacto">Contacto</a></li>
                            <div className="navbar align-self-center d-flex">
                                <button className="" href="" onClick={abrir_modal}><i className="fa fa-fw fa-search text-dark mr-2"></i></button>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        {estado &&(
            <div className='modal_padre'>
                <button className="boton_cerrar" onClick={cerrar_modal}>X</button>
                <div className='input_div'>
                    <input type="search" id="input_busqueda" placeholder="Buscar"  value={valor} onChange={Cambios_input} />
                    <div className="div_icon_microfono" onClick={manejarMicrófono} >
                        <i className="fa-solid fa-microphone"></i> 
                        <button onClick={para_escucha}></button>
                    </div>
                </div>
                <div className='resultado_busqueda'>
                    {resultados.length > 0 ? (
                        resultados.map((resultado, index) => {
                            // Intentamos procesar el campo ruta_imagen
                            let imagenesArray = [];
                            try {
                                const imagenesString = resultado.ruta_imagen
                                    .replace(/&quot;/g, '"')
                                    .replace(/\\+/g, '')
                                    .replace(/(^"|"$)/g, '');
                                imagenesArray = JSON.parse(imagenesString);
                            } catch (error) {
                                console.error("Error al parsear ruta_imagen:", error);
                            }
                            return (
                                <div key={index} className="cartas">
                                    {Array.isArray(imagenesArray) && imagenesArray.length > 0 ? (
                                        <div className='image-div'>
                                            <img  src={imagenesArray[0]} alt={resultado.nombre} />
                                        </div> 
                                    ) : (
                                        <p>No hay imagen disponible</p>
                                    )}
                                    <div className="contenido_producto">
                                        <span className="titulo">{resultado.titulo}</span>
                                        <span className="precio">${resultado.precio_producto}</span>
                                        <br></br>
                                        <button className="ver_detalle" onClick={()=> Abrir_producto(resultado.titulo)}>Detalles</button>
                                    </div>
                                </div>
                            );
                        })) : (
                        <p>No hay resultados</p>
                    )}
                </div>
            </div>
        )}
        </>
    );
}
export default Header;