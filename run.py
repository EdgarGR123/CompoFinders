from activar import inicio as mi_function 
from flask import Flask, render_template, jsonify , request
import json
app= Flask(__name__)

@app.route('/')
def home():
    return  render_template('home.html')


@app.route('/scraper/', methods=['POST'])
def scraper():
    if request.method == 'POST':
        datos= request.get_json()
        with open("datos.json", 'w') as e :
            json.dump( datos, e)
        print ('ACCION COMPLETA') 
        resultado = mi_function()
        return render_template('home.html')
    return jsonify({"error": "Método no permitido"}, status=405)

if __name__ == '__main__':
    app.run(debug=True)