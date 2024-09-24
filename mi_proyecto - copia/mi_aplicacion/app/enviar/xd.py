import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd


archivo_credenciales_json="C:/Users/Admin/Desktop/Scraper2/app/enviar/gs.json"


def a():
    Scopes_Xs =["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"] 
    credencials = ServiceAccountCredentials.from_json_keyfile_name(archivo_credenciales_json, Scopes_Xs)

    cliente =gspread.authorize(credencials)

    #sheet=cliente.create("PrimerBase")
    sheet= cliente.open("PrimerBase").sheet1
    print(os.path.abspath("hola.csv"))
    df= pd.read_csv("app\enviar\hola.csv")
    sheet.update([df.columns.values.tolist()] + df.values.tolist())
    #sheet.share("edgarnahumgarciarosales910@gmail.com", perm_type='user', role="writer")
a()