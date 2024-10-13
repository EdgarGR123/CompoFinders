import React, { useEffect, useState } from "react";
import Productos_similares from "../components/productos_similares";
import Producto_solo from "../components/producto_solo";

export default function Text5({ elementos }) {
    const [productos, setProductos] = useState(elementos);

    useEffect(() => {
        // Guardar los productos en localStorage si existen
        if (elementos.length > 0) {
            localStorage.setItem('productos', JSON.stringify(elementos));
            setProductos(elementos);
        } else {
            // Intentar recuperar los productos desde localStorage si no hay elementos
            const productosGuardados = localStorage.getItem('productos');
            if (productosGuardados) {
                setProductos(JSON.parse(productosGuardados));
            }
        }
    }, [elementos]);

    useEffect(() => {
        console.log("Elementos en Text5:", productos);
    }, [productos]);

    return (
       <> 
            {productos.length > 0 ? (
              <Producto_solo elementos={productos} />
            ) : (
              <p>No product selected.</p>
            )}
        <section className="py-5">
            <div className="container">
                <div className="row text-left p-2 pb-3"><h4>Related Products</h4></div>
                <div id="carousel-related-product" className="slick-initialized slick-slider slick-dotted">
                    <div className="slick-list draggable">
                        <div className="slick-track">
                            <Productos_similares />
                        </div>
                    </div>
                </div>
            </div>
        </section>
       </>
    );
}
