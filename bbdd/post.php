<?php
// Configura la conexión a tu base de datos
$servidor = "localhost";
$usuari = "root";
$password = "";
$dbname = "trivial";

// Recibe los datos de la API mediante POST
$data = json_decode(file_get_contents("php://input"), true);

// Conecta a la base de datos
$conexio = mysqli_connect($servidor, $usuari, $password, $dbname);

// Verifica la conexión
if (!$conexio) {
    echo "Error en la conexión a MySQL: " . mysqli_connect_error();
    exit();
}

// Recorre los datos y realiza la inserción en la base de datos
foreach ($data as $preguntaInfo) {
    $tipus = $preguntaInfo["type"];
    $dificultat = $preguntaInfo["difficulty"];
    $categoria = $preguntaInfo["category"];
    $pregunta = $conexio->real_escape_string($preguntaInfo["question"]);
    $resposta_correcta = $conexio->real_escape_string($preguntaInfo["correct_answer"]);
    $respostes_incorrectes = json_encode($preguntaInfo["incorrect_answers"]);

    $sql = "INSERT INTO preguntes (tipus, dificultat, categoria, pregunta, resposta_correcta, 
    respostes_incorrectes) VALUES ('$tipus', '$dificultat', '$categoria', '$pregunta', 
    '$resposta_correcta', '$respostes_incorrectes')";

    if (!mysqli_query($conexio, $sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($conexio);
    }
}

// Cierra la conexión a la base de datos
mysqli_close($conexio);
