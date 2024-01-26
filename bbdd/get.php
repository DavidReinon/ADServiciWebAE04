<?php
// Configura la conexión a tu base de datos
$servidor = "localhost";
$usuari = "root";
$password = "";
$dbname = "trivial";

// Conecta a la base de datos
$conexio = mysqli_connect($servidor, $usuari, $password, $dbname);

// Verifica la conexión
if ($conexio->connect_error) {
    die("Error en la conexión a MySQL: " . $conexio->connect_error);
}

// Realiza la consulta a la base de datos
$sql = "SELECT * FROM preguntas";
$resultado = $conexio->query($sql);

// Verifica si hay resultados
if ($resultado->num_rows > 0) {
    $preguntas = array();

    // Recorre los resultados y agrega cada pregunta al array
    while ($fila = $resultado->fetch_assoc()) {
        $preguntas[] = $fila;
    }

    // Imprime las preguntas en formato JSON
    echo json_encode($preguntas);
} else {
    // Si no hay resultados, imprime un mensaje
    echo json_encode(array("mensaje" => "No hay preguntas en la base de datos."));
}

// Cierra la conexión a la base de datos
$conexio->close();
