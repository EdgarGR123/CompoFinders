import '../estilos2/custom.css';
import React from 'react';

export default function ProductoSolo_busqueda({ elementos = [] }) {
    return (
        <>
            {elementos.length > 0 ? (
                elementos.map((elemento, index) => {
                    let imagenesArray = [];

                    try {
                        const imagenesString = elemento.ruta_imagen
                            .replace(/&quot;/g, '"')
                            .replace(/\\+/g, '')
                            .replace(/(^"|"$)/g, '');
                        imagenesArray = JSON.parse(imagenesString);
                    } catch (error) {
                        console.error("Error al parsear ruta_imagen:", error);
                    }

                    return (
                        <section className="bg-light" key={index}>
                            <div className="container pb-5">
                                <div className="row">
                                    <div className="col-lg-5 mt-5">
                                        <div className="card mb-3">
                                            <img 
                                                className="card-img img-fluid" 
                                                src={imagenesArray[0]} 
                                                alt="Imagen del producto" 
                                                id="product-detail" 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-7 mt-5">
                                        <div className="card">
                                            <div className="card-body">
                                                <h1 className="h2">{elemento.titulo}</h1>
                                                <p className="h3 py-2">{elemento.precio_producto}</p>
                                                <p>{elemento.descripcion}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })
            ) : (
                <div className="col-12">
                    <p className="text-center">No hay productos disponibles.</p>
                </div>
            )}
        </>
    );
}
