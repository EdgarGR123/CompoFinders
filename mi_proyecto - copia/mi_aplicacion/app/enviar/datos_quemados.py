import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd

def enviar_datos_excel_google():
    try:
        Scopes = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
        credenciales = ServiceAccountCredentials(os.path.abspath("gs.json"), Scopes)
        cliente = gspread.authorize(credenciales)

        #sheet=cliente.create("PrimerBase")
        sheet= cliente.open("PrimerBase").sheet1
        print(os.path.abspath("hola.csv"))
        df= pd.read_csv("app\enviar\datos.csv")
        sheet.update([df.columns.values.tolist()] + df.values.tolist())
        #sheet.share("edgarnahumgarciarosales910@gmail.com", perm_type='user', role="writer")
    except ValueError as e :
        print("Hay un error: ", e)

