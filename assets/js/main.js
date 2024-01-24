// assets/js/main.js
const urlApi = "https://opentdb.com/api.php?amount=";
const defaultAmount = "10";

document
    .getElementById("obtenerPreguntasApi")
    .addEventListener("click", () => obtenerInformacion());

const obtenerInformacion = async () => {
    try {
        const response = await fetch(urlApi + defaultAmount);
        const data = await response.json();
        mostrarPreguntas(data.results);
    } catch (error) {
        console.error("Error al obtener información:", error);
    }
};
// Función para mostrar toda la informacion sobre las preguntas en el DOM
/**
 * 
 * @param {*} preguntas 
 */
const mostrarPreguntas = (preguntas) => {
    const resultadoDiv = document.getElementById("resultadoApi");
    resultadoDiv.innerHTML = "";

    preguntas.forEach((pregunta, index) => {
        const preguntaDiv = document.createElement("div");
        preguntaDiv.classList.add("preguntaCompleta");

        preguntaDiv.innerHTML = `
            <p class="preguntaString">${index + 1}. ${pregunta.question}</p>
            <div class="respuestas">
                ${mostrarRespuestas(pregunta)}
            </div>
            <div class="infoAdicional">${mostrarInfoAdicional(pregunta)}</div>
        `;

        resultadoDiv.appendChild(preguntaDiv);
    });
};

//Funcion para mostrar la informacion adicional de la pregunta
const mostrarInfoAdicional = (pregunta) => {
    const infoAdicionalHTML = `<p>Tipo: ${pregunta.type}</p>
    <p>Dificultad: ${pregunta.difficulty}</p>
    <p>Categoria: ${pregunta.category}</p>`;

    return infoAdicionalHTML;
};

//Funcion para mostrar las posibles respuestas con la correcta subrayada
const mostrarRespuestas = (pregunta) => {
    const respuestasHTML = pregunta.incorrect_answers.map(
        (respuesta) => `<div class="respuesta">${respuesta}</div>`
    );

    // Agregar la respuesta correcta con un estilo especial
    respuestasHTML.push(
        `<div class="respuesta correcta">${pregunta.correct_answer}</div>`
    );

    return respuestasHTML.join("");
};
