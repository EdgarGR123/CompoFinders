// productos_lista.jsx
import React from "react";
import Get_datos2 from "../API/datos2";
import { useNavigate } from "react-router-dom";

export default function ProductosLista({ productos = [], setElementos } ) {
    const navegador = useNavigate();

    const clik_elemento = async (valor) => {
        const datos = await Get_datos2(valor);
        //console.log("Datos obtenidos de la API:", datos); 
        if (datos) { 
            setElementos(datos);
            navegador(`/Shop`);
        } else {
            console.error("No se recibieron datos.");
        }
    };

    return (
        <div className="col-lg-9">
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-inline shop-top-menu pb-3 pt-1">
                        <li className="list-inline-item">
                            <a className="h3 text-dark text-decoration-none mr-3" href="#">Todo</a>
                        </li>
                        <li className="list-inline-item">
                            <a className="h3 text-dark text-decoration-none mr-3" href="#">Menor Precio</a>
                        </li>
                        <li className="list-inline-item">
                            <a className="h3 text-dark text-decoration-none" href="#">Mayor Precio</a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-6 pb-4">
                    <div className="d-flex">
                        <select className="form-control">
                            <option>Featured</option>
                            <option>A to Z</option>
                            <option>Item</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                {productos.length > 0 ? (
                    productos.map((producto, index) => {
                        let primeraImagen = '';

                        try {
                            const imagenesString = producto.ruta_imagen
                                .replace(/&quot;/g, '"') 
                                .replace(/\\+/g, '') 
                                .replace(/(^"|"$)/g, ''); 
                            const imagenesArray = JSON.parse(imagenesString);
                            primeraImagen = imagenesArray[0]; 
                        } catch (error) {
                            console.error("Error al parsear ruta_imagen:", error);
                        }

                        return (
                            <div className="col-md-4" key={index}>
                                <div className="card mb-4 product-wap rounded-0">
                                    <div className="card rounded-0">
                                        <img className="card-img rounded-0 img-fluid" src={primeraImagen} alt={producto.titulo}  onClick={() => clik_elemento(producto.titulo)} />
                                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul className="list-unstyled">
                                                <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                <li><a className="btn btn-success text-white mt-2" href="#"  onClick={()=> clik_elemento(producto.titulo)} ><i className="far fa-eye"></i></a></li>
                                                <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <a href="#" className="h3 text-decoration-none" onClick={() => clik_elemento(producto.titulo)} >{producto.titulo}</a>
                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                            <span className="span">{producto.origen.toUpperCase()}</span>
                                            <li className="pt-2">
                                                <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                            <li>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-muted fa fa-star"></i>
                                                <i className="text-muted fa fa-star"></i>
                                            </li>
                                        </ul>
                                        <p className="text-center mb-0 span">${producto.precio_producto}</p>
                                    </div>
                                </div>

                                
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12">
                        <p className="text-center">No hay productos disponibles.</p>
                    </div>
                )}
            </div>
            <div className="row">
                <ul className="pagination pagination-lg justify-content-end">
                    <li className="page-item disabled">
                        <a className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0" href="#" tabIndex="-1">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" href="#">3</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
