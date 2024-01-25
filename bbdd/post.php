<?php
// Configura la conexión a tu base de datos
$servidor = "localhost";
$usuario = "root";
$password = "";
$dbname = "trivial";

// Recibe los datos de la API mediante POST
$data = json_decode(file_get_contents("php://input"), true);

// Conecta a la base de datos
$conexion = mysqli_connect($servidor, $usuario, $password, $dbname);

// Verifica la conexión
if (!$conexion) {
    echo "Error en la conexión a MySQL: " . mysqli_connect_error();
    exit();
}

// Recorre los datos y realiza la inserción en la base de datos
foreach ($data as $preguntaInfo) {
    $tipus = $preguntaInfo["type"];
    $dificultat = $preguntaInfo["difficulty"];
    $categoria = $preguntaInfo["category"];
    $pregunta = $conn->real_escape_string($preguntaInfo["question"]);
    $resposta_correcta = $conn->real_escape_string($preguntaInfo["correct_answer"]);
    $respuestas_incorrectas = json_encode($preguntaInfo["incorrect_answers"]);

    $sql = "INSERT INTO preguntas (tipo, dificultad, categoria, pregunta, respuesta_correcta, 
    respuestas_incorrectas) VALUES ('$tipus', '$dificultat', '$categoria', '$pregunta', 
    '$resposta_correcta', '$respostes_incorrectes')";

    if (mysqli_query($conexion, $sql)) {
        echo "Registro insertado correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conexion);
    }
}

// Cierra la conexión a la base de datos
mysqli_close($conexion);
