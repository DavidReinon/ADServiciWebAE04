// assets/js/main.js
const defautlUrlApi = "https://opentdb.com/api.php?amount=";
let allData = null;


//Afegim als botos del HTML les seves respecitves funcions
document
    .getElementById("buscarPreguntesApi")
    .addEventListener("click", () => buscarPreguntesApi());

document
    .getElementById("guardarPreguntesBD")
    .addEventListener("click", () => guardarPreguntesBD());

document
    .getElementById("obtindrePreguntesBD")
    .addEventListener("click", () => obtindrePreguntesBD());


/**
 * Funció per a obtindre les preguntes de la API
 * @returns {Promise<void>}
 */
const buscarPreguntesApi = async () => {
    try {
        const amount = document.getElementById("trivia_amount").value;
        let apiUrl = `${defautlUrlApi}${amount}`;

        const category = document.getElementById("Categoria").value;
        if (!category === "any") apiUrl += `&category=${category}`;

        const difficulty = document.getElementById("trivia_difficulty").value;
        if (!difficulty === "any") apiUrl += `&difficulty=${difficulty}`;

        const type = document.getElementById("trivia_type").value;
        if (!type === "any") apiUrl += `&type=${type}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        allData = data.results;
        mostrarPreguntas();
        document.getElementById("guardarPreguntesBD").disabled = false;
    } catch (error) {
        console.error("Error al obtener información:", error);
    }
};

/**
 * Funció per a obtindre les preguntes de la BD
 * @returns {Promise<void>}
 */
const obtindrePreguntesBD = () => {
    $.ajax({
        type: "GET",
        url: "bbdd/get.php",
        dataType: "json",
        success: (data) => {
            allData = data;
            mostrarPreguntas();
            document.getElementById("guardarPreguntesBD").disabled = true;
        },
        error: (error) => {
            console.error("Error al obtener información:", error);
        },
    });
};

/**
 * Funció per a guardar les preguntes a la BD
 * @returns {Promise<void>}
 */
const guardarPreguntesBD = () => {
    $.ajax({
        type: "POST",
        url: "bbdd/post.php",
        data: JSON.stringify(allData),
        contentType: "application/json",
        success: (response) => {
            console.log(response);
        },
        error: () => {
            console.error("Error al guardar preguntas en la base de datos");
        },
    });
    document.getElementById("guardarPreguntesBD").disabled = true;
};


/**
 * Funció per a mostrar les preguntes en el DOM
 * @returns {Promise<void>}
 */
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


/**
 * Funció per a mostrar l'informació adicional de una pregunta
 * @param pregunta
 * @returns {string}
 */
const mostrarInfoAdicional = (pregunta) => {
    const infoAdicionalHTML = `<p>Tipus: ${pregunta.type}</p>
    <p>Dificultat: ${pregunta.difficulty}</p>
    <p>Categoría: ${pregunta.category}</p>`;

    return infoAdicionalHTML;
};

/**
 * Funció per a mostrar les respostes amb la correcta resaltada
 * @param pregunta
 * @returns {string}
 */
const mostrarRespostes = (pregunta) => {
    let arrayIncorrectAnswers;

    //En el cas de ser info de la API es un array, si no (desde la BD) es JSON
    if (Array.isArray(pregunta.incorrect_answers)) {
        arrayIncorrectAnswers = pregunta.incorrect_answers;
    } else {
        arrayIncorrectAnswers = JSON.parse(pregunta.incorrect_answers);
    }
    const respostesHTML = arrayIncorrectAnswers.map((incorrect_answer) => {
        return `<div class="respuesta">${incorrect_answer}</div>`;
    });

    // Agregar la resposta correcta amb un estil especial
    respostesHTML.push(
        `<div class="respuesta correcta">${pregunta.correct_answer}</div>`
    );

    return respostesHTML.join("");
};
