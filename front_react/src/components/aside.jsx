import Get_datos from '../API/datos.jsx'
import React ,{ useState } from 'react';
import Get_grupos from '../API/grupos.jsx'

export default function Aside({setProductos}) {
    const clik_categoria = async (event, valor) => {
        event.preventDefault();
        const datos = await Get_datos(valor);
        setProductos(datos);
    }
    
    const clik_grupos = async (event, valor) => {
        event.preventDefault();
        console.log(valor)
        const datos = await Get_grupos(valor);
        console.log(datos)
        setProductos(datos);
    }
    
    return (
        <>
        <div className="col-lg-3">
            <h1 className="h2 pb-4">Categorias</h1>
            <ul className="list-unstyled templatemo-accordion">
                <li className="pb-3">
                    <a className="collapsed d-flex justify-content-between h3 text-decoration-none categorias_btn" 
                    href="#" data-bs-toggle="collapse" 
                    data-bs-target="#collapseOne"
                    onClick={(event) => clik_categoria( event, 'perifericos')}
                    
                    >
                        Periféricos
                        <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                    </a>
                    <ul id="collapseOne" className="collapse show list-unstyled pl-3">
                        <li><a className="text-decoration-none" title='mouse' href="#"  onClick={(event) => clik_grupos(event, 'mouse' )}>Mouse</a></li>
                        <li><a className="text-decoration-none" title='teclados' href="#" onClick={(event) => clik_grupos(event,'teclados' )}>Teclados</a></li>
                        <li><a className="text-decoration-none" title='camaras_web' href="#" onClick={(event) => clik_grupos(event , 'camaras_web')}>Cámaras Web</a></li>
                        <li><a className="text-decoration-none" title='audifonos_headset' href="#" onClick={(event) => clik_grupos(event , 'audifonos_headset')}>Audífonos y Headset</a></li>
                        <li><a className="text-decoration-none" title='microfonos' href="#" onClick={(event) => clik_grupos(event , 'microfonos')}>Micrófonos</a></li>
                    </ul>
                </li>

                <li className="pb-3">
                    <a className="collapsed d-flex justify-content-between h3 text-decoration-none categorias_btn" 
                    href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo" onClick={(event) => clik_categoria(event ,'componentes_internos')}>
                        Componentes Internos
                        <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                    </a>
                    <ul id="collapseTwo" className="collapse list-unstyled pl-3">
                        <li><a className="text-decoration-none" title='tarjetas_video' href="#" onClick={(event) => clik_grupos(event , 'tarjetas_video')}>Tarjetas de Video</a></li>
                        <li><a className="text-decoration-none" title='memorias_ram' href="#" onClick={(event) => clik_grupos(event, 'memorias_ram')}>Memorias RAM</a></li>
                        <li><a className="text-decoration-none" title='procesadores' href="#" onClick={(event) => clik_grupos(event, 'procesadores')}>Procesadores</a></li>
                        <li><a className="text-decoration-none" title='motherboard' href="#" onClick={(event) => clik_grupos(event, 'motherboard')}>Motherboards</a></li>
                        <li><a className="text-decoration-none" title='fuuentes_poder' href="#" onClick={(event) => clik_grupos(event ,'fuentes_poder')}>Fuentes de Poder</a></li>
                    </ul>
                </li>

                <li className="pb-3">
                    <a className="collapsed d-flex justify-content-between h3 text-decoration-none categorias_btn" 
                    href="#" data-bs-toggle="collapse" data-bs-target="#collapseThree" onClick={(event) => clik_categoria(event , 'equipos_informaticos')}>
                        Equipos Informáticos
                        <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                    </a>
                    <ul id="collapseThree" className="collapse list-unstyled pl-3">
                        <li><a className="text-decoration-none" title='laptops' href="#" onClick={(event) => clik_grupos(event , 'laptops')}>Laptops</a></li>
                        <li><a className="text-decoration-none" title='pc' href="#" onClick={(event) => clik_grupos(event , 'pc')}>PC</a></li>
                        <li><a className="text-decoration-none" title='monitores' href="#" onClick={(event) => clik_grupos(event, 'monitores')}>Monitores</a></li>
                    </ul>
                </li>

                <li className="pb-3">
                    <a className="collapsed d-flex justify-content-between h3 text-decoration-none categorias_btn" 
                    href="#" data-bs-toggle="collapse" data-bs-target="#collapseFour" onClick={(event) => clik_categoria(event , 'accesorios')}>
                        Accesorios
                        <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                    </a>
                    <ul id="collapseFour" className="collapse list-unstyled pl-3">
                        <li><a className="text-decoration-none" title='adaptadores_cables' href="#" onClick={(event) => clik_grupos(event ,'adaptadores_cables')}>Adaptadores y Cables</a></li>
                        <li><a className="text-decoration-none" title='memorias_usb' href="#" onClick={(event) => clik_grupos(event, 'memoria_usb')}>Memorias USB</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        </>
        

    );
}
