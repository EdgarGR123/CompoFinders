from django.shortcuts import render
from  django.http import JsonResponse
from .run import inicio as mi_function
import json

# Create your views here.

def home(request):
    return render(request,  "home.html")

def activar_scraper(request):
    if request.method == 'POST':
        datos= json.loads(request.body)
        with open("datos.json", 'w') as e :
            json.dump( datos, e)
        print ('ACCION _COMPLETA_XD--------------------') 
        resultado = mi_function()  
        return render ( request, "home.html") #JsonResponse({"mensaje": resultado})
    return JsonResponse({"error": "Método no permitido"}, status=405)
