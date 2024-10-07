import requests


class GuardarImg():
    def __init__(self, imagenes, nombre_imagen):
        self.sitio_a_enviar = "https://compufinder.net/php/resivir_img.php"
        self.imagenes = imagenes  #lista de URLs de imágenes
        self.nombre_imagen = nombre_imagen

    def enviar_img(self):
        try:
           
            imagenes_validas = []
            for url in self.imagenes:
                url = url.replace("%5B", "").replace("%5D", "")  
                url = url.split('?')[0]

               
                if url.lower().endswith(('.jpg', '.jpeg', '.png')):
                    imagenes_validas.append(url)
                else:
                    url += ".jpg"
                    print(f"Extensión no válida, asignada .jpg por defecto: {url}")
                    imagenes_validas.append(url)

            if not imagenes_validas:
                print("No hay imágenes válidas para enviar.")
                return None

            data = {'imagenes': imagenes_validas}
            respuesta = requests.post(self.sitio_a_enviar, json=data)

            if respuesta.status_code == 200:
                print("URLs de imágenes en el servidor:", respuesta.text)
                return respuesta.json()
            else:
                print("Error en la respuesta de la solicitud:", respuesta.status_code)
                return None
        except Exception as e:
            print("Error al enviar las imágenes:", e)
            return None



'''

class GuardarImg():
    def __init__(self, imagen, nombre_imagen):
        self.sitio_a_enviar = "https://compufinder.net/php/resivir_img.php"
        self.ruta_imagen = imagen
        self.nombre_imagen = nombre_imagen  # Nombre que quieres usar para guardar la imagen

    def enviar_img(self):
        try:
            # Abrir o enviar la imagen directamente desde la URL
            archivo = {'imagen': requests.get(self.ruta_imagen, stream=True).raw}
            data = {'nombre_imagen': self.nombre_imagen}  # Incluir el nombre de la imagen en los datos POST
            
            # Enviar la imagen y el nombre al servidor
            respuesta = requests.post(self.sitio_a_enviar, files=archivo, data=data)
            
            # Verificar si la solicitud fue exitosa
            if respuesta.status_code == 200:
                print("Ruta imagen en el servidor:", respuesta.text)
                return respuesta.text
            else:
                print("Error en la respuesta de la solicitud:", respuesta.status_code)
                return None
        except Exception as e:
            print("Error al enviar la imagen:", e)
            return None

'''
