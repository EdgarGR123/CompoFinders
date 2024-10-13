import '../estilos2/custom.css';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; 

export default function ProductoSolo({ elementos = [] }) {
    const mapRef = useRef(null); 
    const routingControlRef = useRef(null); 
    const stores = [
        { name: 'Kayfa Plaza', location: [13.688117, -89.192856] },
        { name: 'Kayfa Multicentro', location: [13.669913, -89.224902] },
        { name: 'Aeon Las Cascadas', location: [13.694633, -89.260129] },
        { name: 'Aeon Plaza Mundo', location: [13.685710, -89.238173] },
        { name: 'Zona Digital', location: [13.687362, -89.206691] },
        { name: 'Zona Digital Santa Elena', location: [13.686148, -89.253035] },
        { name: 'Intelmax COOPEFA', location: [13.693090, -89.221340] },
        { name: 'Omega Plaza Merliot', location: [13.684694, -89.259903] },
        { name: 'Omega Plaza Mundo', location: [13.685112, -89.234093] }
    ];

    useEffect(() => {
        if (!mapRef.current) {
            initMap();
        }
    }, []);

    const initMap = () => {
        mapRef.current = L.map('map').setView([13.692940, -89.218191], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                L.marker(userLocation).addTo(mapRef.current).bindPopup('Tu ubicación').openPopup();
                mapRef.current.setView(userLocation, 13);
            }, () => {
                alert('No se pudo obtener la ubicación del usuario.');
            });
        } else {
            alert('La geolocalización no es soportada por tu navegador.');
        }

        document.getElementById('getRoute').addEventListener('click', getRoute);
        document.getElementById('wazeLink').addEventListener('click', openWaze);
    };

    const getRoute = () => {
        const storeIndex = document.getElementById('storeSelect').value;
        if (storeIndex) {
            const storeLocation = stores[storeIndex].location;
            calculateRoute(storeLocation, stores[storeIndex].name);
        } else {
            alert('Por favor, selecciona una tienda.');
        }
    };

    const openWaze = () => {
        const storeIndex = document.getElementById('storeSelect').value;
        if (storeIndex) {
            const storeLocation = stores[storeIndex].location;
            const wazeUrl = `https://waze.com/ul?ll=${storeLocation[0]},${storeLocation[1]}&navigate=yes`;
            window.open(wazeUrl, '_blank');
        } else {
            alert('Por favor, selecciona una tienda.');
        }
    };

    const calculateRoute = (storeLocation, storeName) => {
        if (routingControlRef.current) {
            mapRef.current.removeControl(routingControlRef.current);
        }

        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = [position.coords.latitude, position.coords.longitude];

            routingControlRef.current = L.Routing.control({
                waypoints: [L.latLng(userLocation), L.latLng(storeLocation)],
                routeWhileDragging: true,
                createMarker: () => null,
                lineOptions: {
                    styles: [{ color: '#3388ff', opacity: 0.7, weight: 5 }]
                }
            }).addTo(mapRef.current);

            routingControlRef.current.on('routesfound', (e) => {
                const routes = e.routes;
                const totalDistance = routes[0].summary.totalDistance / 1000;
                const totalTime = routes[0].summary.totalTime / 60;

                let instructions = `Instrucciones para llegar a ${storeName}:\n`;
                routes[0].instructions.forEach((instruction, i) => {
                    instructions += `${i + 1}. ${instruction.text}\n`;
                });

                L.popup()
                    .setLatLng(storeLocation)
                    .setContent(instructions)
                    .openOn(mapRef.current);
            });

        });
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
                <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
            </Helmet>

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
                                                <p>{elemento.descripcion}</p>
                                                <p className="h3 py-2">$ {elemento.precio_producto}</p>
                                                <span>{elemento.estado_producto}</span>
                                                <p>{elemento.origen}</p>
                                                <form action="#" method="GET">
                                                    <input type="hidden" name="product-title" value={elemento.titulo} />

                                                    <div className="row pb-3">
                                                        <div className="col d-grid">
                                                            <a  className="btn btn-success btn-lg" href={elemento.url_producto} name="submit" value="buy">Ir a comprar</a>
                                                        </div>
                                                        <div className="col d-grid">
                                                            <button type="submit" className="btn btn-outline-success btn-lg" name="submit" value="cart">Añadir al carrito</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="map" style={{ height: "400px" }} className="mt-5"></div>
                                <select id="storeSelect" className="form-select mt-3">
                                    <option value="">Selecciona una tienda</option>
                                    {stores.map((store, index) => (
                                        <option value={index} key={index}>{store.name}</option>
                                    ))}
                                </select>
                                <button id="getRoute" className="btn btn-primary mt-3">Obtener ruta</button>
                                <button id="wazeLink" className="btn btn-secondary mt-3">Abrir en Waze</button>
                            </div>
                        </section>
                    );
                })
            ) : (
                <h2>No se encontraron productos</h2>
            )}
        </>
    );
}