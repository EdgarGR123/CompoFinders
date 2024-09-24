import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import mysql.connector
from mysql.connector import errorcode

config ={
    'user':'ensofobi_compufinder',
    'password':'hi7kBK#WVQD?',
    'host':'https://compufinder.net/phpmyadmin',
    'databse':'ensofobi_compufinder',
}

def enviar_datos_mysql():
    cnx = mysql.connector.connect(config)
    cnx.close()

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
        
