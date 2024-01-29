<?php
// Configura la conexión a tu base de datos
$servidor = "localhost";
$usuari = "root";
$password = "";
$dbname = "trivial";

// Conecta a la base de datos
$conexio = mysqli_connect($servidor, $usuari, $password, $dbname);

// Verifica la conexió
if ($conexio->connect_error) {
    die("Error en la conexión a MySQL: " . $conexio->connect_error);
}

// Realitza la consulta a la base de dades
$sql = "SELECT * FROM preguntes";
$resultado = $conexio->query($sql);

// Verifica si ni han restultats
if ($resultado->num_rows > 0) {
    $preguntas = array();

    // Recorre els resultats y agrega cada pregunta al array
    while ($fila = $resultado->fetch_assoc()) {
        // Construim la pregunta amb el format que necessita el Trivial
        $pregunta = array(
            "type" => $fila["tipus"],
            "difficulty" => $fila["dificultat"],
            "category" => $fila["categoria"],
            "question" => $fila["pregunta"],
            "correct_answer" => $fila["resposta_correcta"],
            "incorrect_answers" => $fila["respostes_incorrectes"]
        );
        $preguntas[] = $pregunta;
    }

    // Mostra las preguntes en formato JSON
    echo json_encode($preguntas);
} else {
    // Si no ni han resultats, mostra un mensatje
    echo json_encode(array("mensaje" => "No hay preguntas en la base de datos."));
}

// Tanca la conexión a la base de dades
$conexio->close();
