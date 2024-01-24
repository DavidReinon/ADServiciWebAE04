CREATE DATABASE trivial CHARACTER SET utf8;
USE trivial;

CREATE TABLE IF NOT EXISTS preguntas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(255) NOT NULL,
    dificultad VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    pregunta TEXT NOT NULL,
    respuesta_correcta VARCHAR(255) NOT NULL,
    respuestas_incorrectas TEXT NOT NULL
);
