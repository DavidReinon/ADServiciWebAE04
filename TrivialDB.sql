CREATE DATABASE trivial CHARACTER SET utf8;
USE trivial;

CREATE TABLE IF NOT EXISTS preguntes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipus VARCHAR(255) NOT NULL,
    dificultat VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    pregunta TEXT NOT NULL,
    resposta_correcta VARCHAR(255) NOT NULL,
    respostes_incorrectes TEXT NOT NULL
);
