// src/API/datos.js

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
    return datos; // Retorna el dato tal cual si no es un objeto o array
}

function stripHTML(texto) {
    if (typeof texto === 'string') {
        return texto.replace(/<\/?[^>]+(>|$)/g, ""); // Elimina las etiquetas HTML
    }
    return texto; // Retorna el texto sin cambios si no es un string
}

export default async function Get_datos(valor) {
    try {
        const response = await fetch(`https://compufinder.net/php/consulta_inicial_index.php?categoria=${valor}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Intentar obtener el cuerpo de la respuesta como texto
        const responseBody = await response.text(); // Obtener el cuerpo como texto
        //console.log("Cuerpo de la respuesta:", responseBody); // Imprimir el cuerpo de la respuesta

        if (!response.ok) {
            throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
        }

        // Intentar analizar el cuerpo como JSON
        let data; // Declarar 'data' aquí
        try {
            data = JSON.parse(responseBody); // Intentar parsear el JSON
        } catch (error) {
            throw new Error("Error al analizar el JSON: " + error.message);
        }

        const datosLimpios = limpiarDatos(data); // Limpia los datos obtenidos
        //console.log("Datos obtenidos:", datosLimpios);
        return datosLimpios; // Retorna los datos limpios
    } catch (error) {
        //console.error("Error en la solicitud:", error);
    }
}
