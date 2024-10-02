from bs4 import BeautifulSoup as bs
import requests
import os
import re
from ..enviar.datos_quemados import Base_dados

class Extraer_info_products():
    def __init__(self, title, price, description, image, state_product, docs, sitio):
        self.titulo= title 
        self.precio= price 
        self.descripcion= description 
        self.imagen= image 
        self.estado_producto= state_product 
        self.documentos= docs
        self.sitio= sitio

    def limpiar_text(self, texto):
        return ' '.join(texto.split())
    
    def iterar_links(self):
        for self.index, url in enumerate(self.documentos):
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
        estado = self.soup.find(class_=self.estado_producto)
        image = self.soup.find(class_=self.imagen)

        if titulo:
            titulo=  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo) 
            #print(f"Título encontrado en el documento {self.index}: {titulo}")
        else :
            titulo= "titulo no encontrado"
            #print(f"No se encontró el título en el documento {self.index}")

        if precio:
            precio= str(precio.get_text().strip().replace("", ""))
            #print(f"Precio encontrado en el documento {self.index}: {precio}")
        else :
            precio= "precio no encontrado"
            #print(f"No se encontró el precio en el documento {self.index}")
        if descripcion:
            descripcion=  self.limpiar_text( str(descripcion.get_text().strip().replace("'", "")))
            #print(f"Descripcion encontrado en el documento {self.index}: {descripcion}")
        else :
            descripcion= "No se encontró el Descripcion"
            #print(f"No se encontró el Descripcion en el documento {self.index}")
        if estado:
            estado= str(estado.get_text().strip().replace("'", ""))
            #print(f"Estado encontrado en el documento {self.index}: {estado}")
        else:
            estado= "No se encontró el Estado"
            #print(f"No se encontró el Estado en el documento {self.index}")
            if image:
                img_url = image.get('src')
                if img_url:
                    if not img_url.startswith('http'):
                        img_url = 'https://aeon.com.sv' + img_url

                        ruta_carpeta_imagenes = os.path.dirname(os.path.abspath(__file__),  'imagenes_descargadas')
                        os.makedirs(ruta_carpeta_imagenes, exist_ok=True)

                        nombre_imagen = f"{titulo_limpio}.jpg"
                        ruta_imagen = os.path.join(ruta_carpeta_imagenes, nombre_imagen)

                        image_data = requests.get(img_url, verify=False).content
                        with open(ruta_imagen, 'wb') as img_file:
                            img_file.write(image_data)
                            print(f"Imagen guardada: {ruta_imagen}")
                    else:
                        print(f"Error al acceder a la URL {self.index}: {self.response.status_code}")
            else:
                print(f"No se encontró imagen {self.index}")

    def kayfa(self):
        print("\n\n\nSITIO KAYFA")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find(class_=self.estado_producto)
        image = self.soup.select_one(self.imagen) 

        if titulo:
            titulo =  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            #print(f"Título encontrado en el documento {self.index}: {titulo}")
        else :
            titulo= "titulo no encontrado"
            #print(f"No se encontró el título en el documento {self.index}")

        if precio:
            precio= str(precio.get_text().strip().replace("", ""))
            #print(f"Precio encontrado en el documento {self.index}: {precio}")
        else :
            precio= "precio no encontrado"
            #print(f"No se encontró el precio en el documento {self.index}")
        if descripcion:
            descripcion=  self.limpiar_text( str(descripcion.get_text().strip().replace("'", "")))
            #print(f"Descripcion encontrado en el documento {self.index}: {descripcion}")
        else :
            descripcion= "No se encontró el Descripcion"
            #print(f"No se encontró el Descripcion en el documento {self.index}")
        if estado:
            estado= str(estado.get_text().strip().replace("'", ""))
            #print(f"Estado encontrado en el documento {self.index}: {estado}")
        else:
            estado= "No se encontró el Estado"
            #print(f"No se encontró el Estado en el documento {self.index}")

        if image:
            ruta_carpeta_imagenes = os.path.dirname(os.path.abspath(__file__), 'imagenes_descargadas')
            os.makedirs(ruta_carpeta_imagenes, exist_ok=True) 

            img_url = image.get('src')
            if img_url:
                nombre_imagen = os.path.basename(img_url)
                ruta_imagen = os.path.join(ruta_carpeta_imagenes, nombre_imagen)

                image_data = requests.get(img_url).content
                with open(ruta_imagen, 'wb') as img_file:
                    img_file.write(image_data)
                    print(f"Imagen guardada: {ruta_imagen}")
            else:
                print(f"Error al acceder a la URL {self.index}: {self.response.status_code}")
        else:   
            print(f"No se encontro imagen {self.index}")

    def zona_digital(self):
        print("\n\n\nSITIO_ ZONA DIGITAL")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find(class_=self.estado_producto)
        image = self.soup.select_one('.product-gallery .product-carousel a>img')
        origen = self.sitio

        if titulo:
            titulo =  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
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

        if image:
            ruta_carpeta_imagenes = os.path.dirname(os.path.abspath(__file__), 'imagenes_descargadas')
            os.makedirs(ruta_carpeta_imagenes, exist_ok=True) 

            img_url = image.get('src')
            print(img_url)
        if img_url:

            nombre_imagen = self.limpiar_text(self.limpiar_text( str(titulo.strip().replace("'", ""))))
      
            if not os.path.splitext(nombre_imagen)[1]:
                nombre_imagen += '.jpg'
                ruta_imagen = os.path.join(ruta_carpeta_imagenes, nombre_imagen)

                image_data = requests.get(img_url).content
                with open(ruta_imagen, 'wb') as img_file:
                    img_file.write(image_data)
                print(f"Imagen guardada: {ruta_imagen}")
        else:
            print(f"Error al acceder a la URL")
        isinstance = Base_dados() 
        isinstance.datos_para_guardar(titulo, precio, descripcion, estado, ruta_imagen, origen)

    def mercado_libre(self):
        #code de aeon
        print("\n\n\nSITIO_ Mercado Libre")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find(class_=self.estado_producto)
        image = self.soup.find(class_=self.imagen)

        if titulo:
            titulo=  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo) 
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
        if image:
            img_url = image.get('src')
            print("\n\n\nimagen...", img_url)
            if img_url:

                ruta_carpeta_imagenes = os.path.dirname(os.path.abspath(__file__), 'imagenes_descargadas')
                os.makedirs(ruta_carpeta_imagenes, exist_ok=True)
                nombre_imagen = f"{titulo_limpio}.jpg"
                ruta_imagen = os.path.join(ruta_carpeta_imagenes, nombre_imagen)
                image_data = requests.get(img_url, verify=False).content
                with open(ruta_imagen, 'wb') as img_file:
                    img_file.write(image_data)
                    print(f"Imagen guardada: {ruta_imagen}")
            else:
                print(f"Error al acceder a la URL {self.index}: {self.response.status_code}")
        else:
                print(f"No se encontró imagen {self.index}")

    def intelmax(self):
        #code de aeon
        print("\n\n\nSITIO INTELMAX")
        titulo = self.soup.select_one(self.titulo)
        precio = self.soup.find(class_=self.precio)
        descripcion = self.soup.find(class_=self.descripcion)
        estado = self.soup.find('a', {'title': 'Ver Disponibilidad'})

        image = self.soup.select_one('.product__details-nav-thumb img')

        if titulo:
            titulo=  self.limpiar_text( str(titulo.get_text().strip().replace("'", "")))
            titulo_limpio = re.sub(r'[<>:"/\\|?*]', '', titulo) 
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

        if image:
            img_url = image.get('src')
            if img_url:

                ruta_carpeta_imagenes = os.path.dirname(os.path.abspath(__file__), 'imagenes_descargadas')
                os.makedirs(ruta_carpeta_imagenes, exist_ok=True)

                nombre_imagen = f"{titulo_limpio}.jpg"

                ruta_imagen = os.path.join(ruta_carpeta_imagenes, nombre_imagen)
                image_data = requests.get(img_url, verify=False).content
                with open(ruta_imagen, 'wb') as img_file:
                    img_file.write(image_data)
                    print(f"Imagen guardada: {ruta_imagen}")
            else:
                print(f"Error al acceder a la URL {self.index}: {self.response.status_code}")
        else:
                print(f"No se encontró imagen {self.index}")

