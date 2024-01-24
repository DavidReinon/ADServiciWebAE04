// assets/js/main.js

const urlApi = "https://opentdb.com/api.php?amount=";
const defaultAmount = "10";

document.getElementById("obtenerPreguntasApi").addEventListener(
    "click",
    () => obtenerInformacion() // Llamar a la función que realiza la solicitud a la API
);

const obtenerInformacion = async () => {
    try {
        const response = await fetch(urlApi + defaultAmount);
        const data = await response.json();
        mostrarResultadoJSONString(data);
    } catch (error) {
        console.error("Error al obtener información:", error);
    }
};

const mostrarResultadoJSONString = (data) => {
    // Mostrar la la información obtenida en la página
    var resultadoDiv = document.getElementById("resultadoApi");
    resultadoDiv.innerHTML = JSON.stringify(data, null, 2);
};
