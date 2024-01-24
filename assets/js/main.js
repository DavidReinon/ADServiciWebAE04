// assets/js/main.js
const urlApi = "https://opentdb.com/api.php?amount=";
const defaultAmount = "10";

//Afegim a un boto del HTML la funcion per cridar la API
document
    .getElementById("obtenerPreguntasApi")
    .addEventListener("click", () => obtenerInformacion());

//Funció per cridar a la API y obtindre la informacio
const obtenerInformacion = async () => {
    try {
        const response = await fetch(urlApi + defaultAmount);
        const data = await response.json();
        mostrarPreguntas(data.results);
    } catch (error) {
        console.error("Error al obtener información:", error);
    }
};

// Funció per a mostrar tota la informacion sobre les preguntes en el DOM
const mostrarPreguntas = (preguntas) => {
    const resultatDiv = document.getElementById("resultadoApi");
    resultatDiv.innerHTML = "";

    preguntas.forEach((pregunta, index) => {
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
        (respuesta) => `<div class="respuesta">${respuesta}</div>`
    );

    // Agregar la resposta correcta amb un estil especial
    respostesHTML.push(
        `<div class="respuesta correcta">${pregunta.correct_answer}</div>`
    );

    return respostesHTML.join("");
};
