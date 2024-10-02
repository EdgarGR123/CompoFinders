import mysql.connector
from mysql.connector import errorcode

class Base_dados():
    def __init__(self):
        self.usuario = 'root'
        self.contraseña = ''
        self.host = 'localhost'
        self.database = 'prueba'

    def establecer_conexion(self):
        configuracion = {'user': self.usuario,'password': self.contraseña,'host': self.host,'database': self.database}
        try:
            self.conexion = mysql.connector.connect(**configuracion)
            print("Conexión exitosa")
            self.cursor = self.conexion.cursor()
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Error con el usuario y contraseña..")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("La base de datos no existe..")
            else:
                print(err)

    def cerrar_conexion(self):
        if self.conexion.is_connected():
            self.cursor.close()
            self.conexion.close()
            print("Conexión cerrada")

    def datos_para_guardar(self, titulo, precio, descripcion, estado, imagen, origen):
        self.establecer_conexion()
        try:
            query = """ insert into productos (titulo, precio, descripcion, estado, imagen, origen) values (%s, %s, %s, %s, %s, %s)"""
            datos = (titulo, precio, descripcion, estado, imagen, origen)
            self.cursor.execute(query, datos)
            self.conexion.commit()
            print("Datos insertados correctamente")
        except mysql.connector.Error as err:
            print(f"Error al insertar los datos: {err}")
        finally:
            self.cerrar_conexion()