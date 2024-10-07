from bs4 import BeautifulSoup as bs
import requests
import json
import re
from ..enviar.datos_quemados import Base_datos
from .google_api import GuardarImg

class Extraer_info_products():
    def __init__(self, title, price, description, image, state_product, docs, sitio, nombre_del_json, categoria):
        self.titulo= title 
        self.precio= price 
        self.descripcion= description 
        self.imagen= image 
        self.estado_producto= state_product 
        self.documentos= docs
        self.sitio= sitio
        self.nombre_componente= nombre_del_json
        self.categoria = categoria

    def limpiar_text(self, texto):
        return ' '.join(texto.split())
    
    def iterar_links(self):
        for self.index, url in enumerate(self.documentos):
            self.url_pagina= url
            self.response = requests.get(url, verify=False)
            if self.response.status_code == 200:
                constent= self.response.text
                self.soup = bs(constent, 'html.parser')
                if self.sitio == 'aeon':
                    isinstance = self.Aeon()
                if self.sitio == 'kayfa':
                    isinstance = self.kayfa()
                if self.sitio == 'zona-digital':
                    isinstance = self.zona_digital()
                if self.sitio == 'mercado-libre':
                    isinstance = self.mercado_libre()
                if self.sitio == 'intelmax':
                    isinstance = self.intelmax()
    
    def Aeon(self):
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado_contenedor = self.soup.find(class_= self.estado_producto)
        
        imagenes = self.soup.find_all(class_='img img-fluid product_detail_img mh-100')
        origen = self.sitio
        imagen_urls = []
    
        if titulo:
            titulo = self.limpiar_text(str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo).replace(" ", "_").replace("-", "_").replace(".", "_").lower()
        else:
            titulo = "titulo no encontrado"
    
        if precio:
            precio = str(precio.get_text().strip().replace("", ""))
        else:
            precio = "precio no encontrado"
    
        if descripcion:
            descripcion = self.limpiar_text(str(descripcion.get_text().strip().replace("'", "")))
        else:
            descripcion = "No se encontró la descripción"
    
        if estado_contenedor:
            estado = estado_contenedor.find('div')  # Encontrar el div dentro del contenedor
            if estado:
                estado = str(estado.get_text().strip().replace("'", ""))  # Extraer el texto del estado
            else:
                estado = "No se encontró el estado"
        else:
            estado = "No se encontró el contenedor de estado"

        for img in imagenes:
            img_url = img.get('src')
            if img_url and not img_url.startswith('http'):
                img_url = 'https://aeon.com.sv' + img_url
                
            img_url = img_url.replace("%5B", "").replace("%5D", "")
            img_url = img_url.split('?')[0] 
            if img_url:
                imagen_urls.append(img_url)

        if imagen_urls:
            img_guardar = GuardarImg(imagen_urls, titulo_limpio)
            ruta_imagen_s = img_guardar.enviar_img()
        else:
            print(f"No se encontraron imágenes en {self.index}")
        isinstance = Base_datos()
        isinstance.datos_para_guardar(titulo, precio, descripcion, estado, ruta_imagen_s, origen, self.nombre_componente, self.url_pagina, self.categoria)
    


    def kayfa(self):
        print("\n\n\nSITIO KAYFA")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find(class_=self.estado_producto)
        imagenes_contenedor = self.soup.find_all(class_='cloud-zoom-gallery')
        imagen= self.soup.select_one('.magnifier')
        origen = self.sitio
        imagen_urls = []
        ruta_imagen_s=None

        if titulo:
            titulo =  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo)
            titulo_limpio = titulo_limpio.replace(" ", "_").replace("-", "_").replace(".", "_")
            titulo_limpio = titulo_limpio.lower() 
        else :
            titulo= "titulo no encontrado"

        if precio:
            precio= str(precio.get_text().strip().replace("", ""))
        else :
            precio= "precio no encontrado"
        if descripcion:
            descripcion=  self.limpiar_text( str(descripcion.get_text().strip().replace("'", "")))
        else :
            descripcion= "No se encontró el Descripcion"
        if estado:
            estado= str(estado.get_text().strip().replace("'", ""))
        else:
            estado= "No se encontró el Estado"

        if imagenes_contenedor:
            for contenedor in imagenes_contenedor:
                imagenes = contenedor.find_all('img')
                for img in imagenes:
                    img_url = img.get('src')
                    print("Carrusel_imagenes", img_url)
                    if img_url:
                        img_url = img_url.replace("%5B", "").replace("%5D", "").split('?')[0]
                        imagen_urls.append(img_url)
        else:
            print(f"Error al acceder a las imagenes {self.index}: {self.response.status_code}")

        # Obtener la imagen única si existe
        if imagen:
            img_url = imagen.get('src')
            print("imagen_unica", imagen.get('src'))
            if img_url:
                img_url = img_url.replace("%5B", "").replace("%5D", "").split('?')[0]
                imagen_urls.append(img_url)

        # Verificar si se encontraron imágenes
        if imagen_urls:
            img_guardar = GuardarImg(imagen_urls, titulo_limpio)
            ruta_imagen_s = img_guardar.enviar_img()

        # Guardar datos en la base de datos
        isinstance = Base_datos()
        isinstance.datos_para_guardar(titulo, precio, descripcion, estado, ruta_imagen_s, origen, self.nombre_componente, self.url_pagina, self.categoria)

        if not imagen_urls:
            print(f"No se encontraron imágenes en {self.index}")
        if not ruta_imagen_s:
            print(f"No se pudo guardar la imagen en {self.index}")


    def zona_digital(self):
        print("\n\n\nSITIO_ ZONA DIGITAL")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find(class_=self.estado_producto)
        imagen = self.soup.select_one('.product-gallery .product-carousel a>img')
        origen = self.sitio
        ruta_imagen = None

        if titulo:
            titulo =  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo)
            titulo_limpio = titulo_limpio.replace(" ", "_").replace("-", "_").replace(".", "_")
            titulo_limpio = titulo_limpio.lower()
            print(f"Título encontrado en el documento {self.index}: {titulo}")
        else :
            titulo = "titulo no encontrado"
            print(f"No se encontró el título en el documento {self.index}")

        if precio:
            precio =  str(precio.get_text().strip().replace("", ""))
            print(f"Precio encontrado en el documento {self.index}: {precio}")
        else :
            precio = "precio no encontrado"
            print(f"No se encontró el precio en el documento {self.index}")
        if descripcion:
            descripcion = self.limpiar_text( str(descripcion.get_text().strip().replace("'", "")))
            print(f"Descripcion encontrado en el documento {self.index}: {descripcion}")
        else :
            descripcion = "No se encontró el Descripcion"
            print(f"No se encontró el Descripcion en el documento {self.index}")
        if estado:
            estado = str(estado.get_text().strip().replace("'", ""))
            print(f"Estado encontrado en el documento {self.index}: {estado}")
        else:
            estado = "No se encontró el Estado"
            print(f"No se encontró el Estado en el documento {self.index}")
        if imagen:
            img_url = imagen.get('src')
            print("\n\n\nimagen...", img_url)
            
            if img_url:
                isinstance= GuardarImg(img_url, titulo_limpio)
                ruta_imagen = isinstance.enviar_img()
            else:
                print(f"Error al acceder a la URL {self.index}: {self.response.status_code}")
        else:
                print(f"No se encontró imagen {self.index}")
        isinstance = Base_datos() 
        isinstance.datos_para_guardar(titulo, precio, descripcion, estado, ruta_imagen, origen, self.nombre_componente, self.url_pagina)

    def mercado_libre(self):
        #code de aeon
        print("\n\n\nSITIO_ Mercado Libre")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find(class_=self.estado_producto)
        imagenes = self.soup.find_all(class_=self.imagen)
        origen = self.sitio
        ruta_imagen_s = None
        imagen_urls=[]

        if titulo:
            titulo=  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo)
            titulo_limpio = titulo_limpio.replace(" ", "_").replace("-", "_").replace(".", "_")
            titulo_limpio = titulo_limpio.lower() 
        else :
            titulo= "titulo no encontrado"
        if precio:
            precio= str(precio.get_text().strip().replace("", ""))
        else :
            precio= "precio no encontrado"
        if descripcion:
            descripcion=  self.limpiar_text( str(descripcion.get_text().strip().replace("'", "")))
        else :
            descripcion= "No se encontró el Descripcion"
        if estado:
            estado= str(estado.get_text().strip().replace("'", ""))
        else:
            estado= "No se encontró el Estado"
        for img in imagenes:
            img_url = img.get('src')
                
            img_url = img_url.replace("%5B", "").replace("%5D", "")
            img_url = img_url.split('?')[0] 
            if img_url:
                imagen_urls.append(img_url)

        if imagen_urls:
            img_guardar = GuardarImg(imagen_urls, titulo_limpio)
            ruta_imagen_s = img_guardar.enviar_img()
        else:
            print(f"No se encontraron imágenes en {self.index}")
        isinstance = Base_datos()
        isinstance.datos_para_guardar(titulo, precio, descripcion, estado, ruta_imagen_s, origen, self.nombre_componente, self.url_pagina, self.categoria)


    def intelmax(self):
        #code de intelMax
        print("\n\n\nSITIO INTELMAX")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find('a', {'title': 'Ver Disponibilidad'})
        origen = self.sitio
        imagen = self.soup.select_one('.product__details-nav-thumb img')
        ruta_imagen = None

        if titulo:
            titulo=  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo)
            titulo_limpio = titulo_limpio.replace(" ", "_").replace("-", "_").replace(".", "_")
            titulo_limpio = titulo_limpio.lower() 
        else :
            titulo= "titulo no encontrado"
        if precio:
            precio= str(precio.get_text().strip().replace("", ""))
        else :
            precio= "precio no encontrado"
        if descripcion:
            descripcion=  self.limpiar_text( str(descripcion.get_text().strip().replace("'", "")))
        else :
            descripcion= "No se encontró el Descripcion"
        if estado:
            print(f"Estado encontrado en el documento {self.index}: {estado}")

            links_click = estado.get('href') 
            if links_click:
                response = requests.get(links_click, verify=False)
                if response.status_code == 200:
                    content = response.text
                    soup = bs(content, 'html.parser')

                    estado_detalle = soup.select_one(".your-order-table.table-responsive")
                    if estado_detalle:
                        texto = self.limpiar_text(str(estado_detalle.get_text().strip().replace("'", "")))
                        print(f"Estado ........: {texto}")
                    else:
                        print("No se encontró el detalle del estado.")
                else:
                    print(f"Error al acceder a la URL del estado: {response.status_code}")
        else:
            estado = "No se encontró el Estado"
            print(f"No se encontró el Estado en el documento {self.index}")
        if imagen:
            img_url = imagen.get('src')
            print("\n\n\nimagen...", img_url)
            if img_url:
                isinstance= GuardarImg(img_url, titulo_limpio)
                ruta_imagen = isinstance.enviar_img(nombre_imagen=titulo_limpio)
            else:
                print(f"Error al acceder a la URL {self.index}: {self.response.status_code}")
        else:
                print(f"No se encontró imagen {self.index}")
        isinstance=Base_datos()
        isinstance.datos_para_guardar(titulo, precio, descripcion,estado, ruta_imagen, origen, self.nombre_componente, self.url_pagina)
