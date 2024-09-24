from bs4 import BeautifulSoup as bs
import requests
import os
import csv 

class Extraer_info_products():
    def __init__(self, title, price, description, image, state_product, docs):
        self.titulo= title 
        self.precio= price 
        self.descripcion= description 
        self.imagen= image 
        self.estado_producto= state_product 
        self.documentos= docs

    def limpiar_text(self, texto):
        return ' '.join(texto.split())

    def iterar_links(self):
        encabezados =["ID", "Nombre", "Descripcion", "Categoria", "Precio", "Estado","Imagen", "Origen", "Fecha"]
        total= []
        for index, url in enumerate(self.documentos):
            datos=  []
            try:
                response = requests.get(url, verify=False)
                if response.status_code == 200:
                    constent= response.text
                    soup = bs(constent, 'html.parser')
                    titulo = soup.select_one(self.titulo)
                    precio = soup.find(class_=self.precio)
                    descripcion = soup.find(class_=self.descripcion)
                    estado = soup.find(class_=self.estado_producto)
                    image = soup.find(class_= self.imagen)
                    if titulo:
                        datos.append( self.limpiar_text( str(titulo.get_text().strip().replace("'", ""))))
                        print(f"Título encontrado en el documento {index}: {titulo.get_text()}")
                    else :
                        datos.append("titulo no encontrado")
                        print(f"No se encontró el título en el documento {index}")
                    if precio:
                        datos.append(str(precio.get_text().strip().replace("", "")))
                        print(f"Precio encontrado en el documento {index}: {precio.get_text()}")
                    else :
                        datos.append("precio no encontrado")
                        print(f"No se encontró el precio en el documento {index}")
                    if descripcion:
                        datos.append( self.limpiar_text( str(descripcion.get_text().strip().replace("'", ""))))
                        print(f"Descripcion encontrado en el documento {index}: {descripcion.get_text()}")
                    else :
                        datos.append("No se encontró el Descripcion")
                        print(f"No se encontró el Descripcion en el documento {index}")
                    if estado:
                        datos.append(str(estado.get_text().strip().replace("'", "")))
                        print(f"Estado encontrado en el documento {index}: {estado.get_text()}")
                    else:
                        datos.append("No se encontró el Estado")
                        print(f"No se encontró el Estado en el documento {index}")
                    if image:
                        img_url=image.get('scr')
                        if img_url:
                            image_data= requests.get(img_url).content
                            with open('C:/Users/Admin/Desktop/Scraper2/imagenes_descargadas/{}', 'wb') as  img_file:
                                img_file.write(image_data)
                        pass 
                else:
                    print(f"Error al acceder a la URL {index}: {response.status_code}")
                total.append([datos])


            except Exception as e:
                print(f"Error al procesar la URL {index}: {e}")

        with open(os.path.abspath("hola.csv"), "w", newline='', encoding='utf-8') as archivo_csv:
            escritor_csv = csv.writer(archivo_csv)
            escritor_csv.writerow(encabezados) 
            for fila in total:
                escritor_csv.writerow(fila)
