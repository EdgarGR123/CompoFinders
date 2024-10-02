from app.obtener import obtener_elementos #app.obtener.obtener_elementos  
from app.extraer.extraer_info import Extraer_info_products
import json
import os

def Abrir_json():
    ruta_directorio= os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    ruta_json = os.path.join(ruta_directorio, 'datos.json')
    with open(ruta_json, "r") as datos:
        json_a_vaciar= json.load(datos)
        nombre_tienda= json_a_vaciar.get('nombre-tienda')
        nombre_del_json= json_a_vaciar.get('componente-categoria')

    ruta_mapear= os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_ruta= os.path.join(ruta_mapear, 'json_paginas', f"{nombre_tienda}_{nombre_del_json}.json")

    with open(json_ruta, "r") as archivo:
        script = json.load(archivo)
        
        for scr in script:
            sitio= scr.get('sitio')
            url = scr.get('url')
            total_paginas= scr.get('pagination').get('total')
            selector_links = scr.get('links_productos')
            title = scr.get('fields')[0].get('class_title_product')
            price = scr.get('fields')[1].get('class_price_product')
            description = scr.get('fields')[2].get('class_description_product')
            image = scr.get('fields')[3].get('class_image_product')
            state_product = scr.get('fields')[4].get('class_state_product')
            parametro= scr.get('pagination').get('parameter')

            ## este codigo te ayuda a ponder escrapear todas las paginas que contienen esos productos 
            for driver in  obtener_elementos.Abrir_sitio(url, total_paginas, parametro, sitio):
                if driver:
                    links = obtener_elementos.Extraer_links_productos(driver, selector_links, sitio)
                    if links:
                        extractor = Extraer_info_products(title, price, description, image, state_product, links, sitio)
                        extractor.iterar_links()