<?php
// Configura la conexión a tu base de datos
$servidor = "localhost";
$usuario = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

// Conecta a la base de datos
$conexion = new mysqli($servidor, $usuario, $password, $dbname);

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error en la conexión a MySQL: " . $conexion->connect_error);
}

// Realiza la consulta a la base de datos
$sql = "SELECT * FROM preguntas";
$resultado = $conexion->query($sql);

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
$conexion->close();
