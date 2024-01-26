// assets/js/main.js
const urlApi = "https://opentdb.com/api.php?amount=";
const defaultAmount = "10";
let allData = null;

//Afegim a un boto del HTML la funcion per cridar la API
document
    .getElementById("obtenerPreguntasApi")
    .addEventListener("click", () => obtindrePreguntesApi());

document
    .getElementById("guardarPreguntasBD")
    .addEventListener("click", () => guardarPreguntasEnBD());

document
    .getElementById("obtenerPreguntasBD")
    .addEventListener("click", () => obtindrePreguntesBD());

//Funció per cridar a la API y obtindre la informacio
const obtindrePreguntesApi = async () => {
    try {
        const response = await fetch(urlApi + defaultAmount);
        const data = await response.json();
        allData = data.results;
        mostrarPreguntas();
        document.getElementById("guardarPreguntasBD").disabled = false;
    } catch (error) {
        console.error("Error al obtener información:", error);
    }
};

const obtindrePreguntesBD = async () => {
    try {
        const response = await fetch("bbdd/get.php");
        const data = await response.json();
        allData = data;
        mostrarPreguntas();
        document.getElementById("guardarPreguntasBD").disabled = true;
    } catch (error) {
        console.error("Error al obtener información:", error);
    }
};

const guardarPreguntasEnBD = () => {
    $.ajax({
        type: "POST",
        url: "bbdd/post.php", // Ruta del script PHP para insertar preguntas
        data: JSON.stringify(allData), // Supongamos que 'data' contiene las preguntas obtenidas de la API
        contentType: "application/json", // Especificamos el tipo de contenido como JSON
        success: (response) => {
            console.error(response);
        },
        error: () => {
            console.error("Error al guardar preguntas en la base de datos");
        },
    });
    document.getElementById("guardarPreguntasBD").disabled = true;
};

// Funció per a mostrar tota la informacion sobre les preguntes en el DOM
const mostrarPreguntas = () => {
    const resultatDiv = document.getElementById("resultadoApi");
    resultatDiv.innerHTML = "";

    allData.forEach((pregunta, index) => {
        const preguntaDiv = document.createElement("div");
        preguntaDiv.classList.add("preguntaCompleta");

        preguntaDiv.innerHTML = `
            <p class="preguntaString">${index + 1}. ${pregunta.question}</p>
            <div class="respuestas">
                ${mostrarRespostes(pregunta)}
            </div>
            <div class="infoAdicional">${mostrarInfoAdicional(pregunta)}</div>
        `;

        resultatDiv.appendChild(preguntaDiv);
    });
};

//Funció per a mostrar l'informació adicional de una pregunta
const mostrarInfoAdicional = (pregunta) => {
    const infoAdicionalHTML = `<p>Tipus: ${pregunta.type}</p>
    <p>Dificultat: ${pregunta.difficulty}</p>
    <p>Categoría: ${pregunta.category}</p>`;

    return infoAdicionalHTML;
};

//Funció per a mostrar les posibles respostes amb la correcta subrayada
const mostrarRespostes = (pregunta) => {
    const respostesHTML = pregunta.incorrect_answers.map(
        (incorrect_answer) => `<div class="respuesta">${incorrect_answer}</div>`
    );

    // Agregar la resposta correcta amb un estil especial
    respostesHTML.push(
        `<div class="respuesta correcta">${pregunta.correct_answer}</div>`
    );

    return respostesHTML.join("");
};
