

from ...app.obtener import obtener_elementos #app.obtener.obtener_elementos  
from ...app.extraer.extraer_info import Extraer_info_products
import json

def Abrir_json():
    
    with open("C:/Users/Admin/Desktop/Scraper2/mi_proyecto/mi_aplicacion/app/obtener/aeon_cables_adaptadores.json", "r") as archivo:
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

            '''
            driver= obtener_elementos.Abrir_sitio(url, total_paginas)
            obtener_elementos.Extraer_links_productos(driver,selector_links, sitio)
            links= obtener_elementos.Extraer_links_productos(driver,selector_links, sitio)
            extractor = Extraer_info_products(title, price, description, image, state_product, links)
            extractor.iterar_links()
            
            '''
            


            ## este codigo te ayuda a ponder escrapear todas las paginas que contienen esos productos 
            for driver in  obtener_elementos.Abrir_sitio(url, total_paginas, parametro):
                if driver:
                    links = obtener_elementos.Extraer_links_productos(driver, selector_links, sitio)
                    if links:
                        extractor = Extraer_info_products(title, price, description, image, state_product, links)
                        extractor.iterar_links()


            '''   
            links= Extraer_links_productos(driver,selector_links)
            if links:
                extractor = Extraer_info_products(title, price, description, image, state_product, links)
                extractor.iterar_links()
            driver.quit()

            '''

''' 
def verificar_sitios():
    with open("datos.json", "r") as json: 
        x = json.load(json)
    for sitio in x :
        if sitio.get() == 'aeon':
            pass
        elif sitio.get() == 'kayfa':
            pass
        elif sitio.get() == 'zona_digital':
            pass
        elif sitio.get() == 'intelmax':
            pass
        elif sitio.get() == '':
            pass
        else :
            print('No se encontro sitio web solicitado.....')
            break
'''