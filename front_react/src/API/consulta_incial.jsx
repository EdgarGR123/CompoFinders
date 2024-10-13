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

export default async function Get_datos(valor) {
    try {
        const response = await fetch(`https://compufinder.net/php/consulta_inicial_index.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        const responseBody = await response.text(); 
        console.log("Cuerpo de la respuesta:", responseBody); 

        if (!response.ok) {
            throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
        }


        let data;
        try {
            data = JSON.parse(responseBody);
        } catch (error) {
            throw new Error("Error al analizar el JSON: " + error.message);
        }

        const datosLimpios = limpiarDatos(data); // limpia los datos obtenidos
        console.log("Datos obtenidos:", datosLimpios);
        return datosLimpios; // retorna  datos limpios
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
