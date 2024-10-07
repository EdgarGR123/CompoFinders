import requests

# Ruta local de la imagen a subir
ruta_imagen = 'fotos/mesi.jpg'

# URL del script PHP en tu servidor
url = 'https://compufinder.net/php/resivir_img.php'

# Abrir el archivo de la imagen
with open(ruta_imagen, 'rb') as imagen:
    # Enviar la imagen al servidor mediante POST
    files = {'imagen': imagen}
    respuesta = requests.post(url, files=files)

# Mostrar la respuesta del servidor
print(respuesta.text)
