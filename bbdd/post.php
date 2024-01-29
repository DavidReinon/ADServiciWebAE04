<?php
// Configura la conexión a la bd
$servidor = "localhost";
$usuari = "root";
$password = "";
$dbname = "trivial";

// Redibeix les dades de la API mediante POST
$data = json_decode(file_get_contents("php://input"), true);

// Conecta a la base de dades
$conexio = mysqli_connect($servidor, $usuari, $password, $dbname);

// Verifica la conexió
if (!$conexio) {
    echo "Error en la conexión a MySQL: " . mysqli_connect_error();
    exit();
}

// Recorre les dades y realitza la inserció en la base de dades
foreach ($data as $preguntaInfo) {
    $tipus = $preguntaInfo["type"];
    $dificultat = $preguntaInfo["difficulty"];
    $categoria = $preguntaInfo["category"];
    $pregunta = $conexio->real_escape_string($preguntaInfo["question"]); //Llevem caracters especials
    $resposta_correcta = $conexio->real_escape_string($preguntaInfo["correct_answer"]); //Llevem caracters especials
    $respostes_incorrectes = json_encode($preguntaInfo["incorrect_answers"]);

    $sql = "INSERT INTO preguntes (tipus, dificultat, categoria, pregunta, resposta_correcta, 
    respostes_incorrectes) VALUES ('$tipus', '$dificultat', '$categoria', '$pregunta', 
    '$resposta_correcta', '$respostes_incorrectes')";

    if (!mysqli_query($conexio, $sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($conexio);
    }
}

// Tanca la conexión a la base de dades
mysqli_close($conexio);
