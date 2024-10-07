-- Este es el Scripts en mysql no sql es mysql

-- En algunas interfaces los comillas reversas no son necesarias
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255),
    precio VARCHAR(50),
    descripcion TEXT,
    estado VARCHAR(50),
    ruta_imagen TEXT,
    carrusel_json TEXT,
    origen VARCHAR(100),
    nombre_componente VARCHAR(50),
    categoria VARCHAR(100),
    grupo VARCHAR(50),
    url_producto TEXT,
    fecha_hora DATETIME
);

INSERT INTO productos (
    titulo, 
    precio, 
    descripcion, 
    estado, 
    ruta_imagen,
    carrusel_json,
    origen, 
    nombre_componente,
    categoria, 
    grupo,
    url_producto,
    fecha_hora) 
VALUES (%s, %s, %s, %s, %s, %s, %s,%s, %s, %s, NOW());
