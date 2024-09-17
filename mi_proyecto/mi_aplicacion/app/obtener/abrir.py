import app.obtener.obtener_elementos  
from app.extraer.extraer_info import Extraer_info_products
import json

def Abrir_json():
    with open("mi_proyecto/mi_aplicacion/app/obtener/kayfa.json", "r") as archivo:
        script = json.load(archivo)

        for scr in script:
            sitio= scr.get('sitio')
            url = scr.get('url_uno')
            total_paginas= scr.get('pagination').get('total')
            selector_links = scr.get('links_productos')
            title = scr.get('fields')[0].get('class_title_product')
            price = scr.get('fields')[1].get('class_price_product')
            description = scr.get('fields')[2].get('class_description_product')
            image = scr.get('fields')[3].get('class_image_product')
            state_product = scr.get('fields')[4].get('class_state_product')
            
            driver= app.obtener.obtener_elementos.Abrir_sitio(url, total_paginas)
            app.obtener.obtener_elementos.Extraer_links_productos(driver,selector_links, sitio)
            links= app.obtener.obtener_elementos.Extraer_links_productos(driver,selector_links, sitio)
            extractor = Extraer_info_products(title, price, description, image, state_product, links)
            extractor.iterar_links()

            '''for driver in app.obtener.obtener_elementos.Abrir_sitio(url, total_paginas):
                if driver:
                    links = app.obtener.obtener_elementos.Extraer_links_productos(driver, selector_links)
                    if links:
                        extractor = Extraer_info_products(title, price, description, image, state_product, links)
                        extractor.iterar_links()'''

            '''   
            links= Extraer_links_productos(driver,selector_links)
            if links:
                extractor = Extraer_info_products(title, price, description, image, state_product, links)
                extractor.iterar_links()
            driver.quit()

            '''
