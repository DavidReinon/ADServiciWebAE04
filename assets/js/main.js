// assets/js/main.js
document.addEventListener("DOMContentLoaded", () => {
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

            const category = document.getElementById("trivia_category").value;
            if (category !== "any") apiUrl += `&category=${category}`;

            const difficulty =
                document.getElementById("trivia_difficulty").value;
            if (difficulty !== "any") apiUrl += `&difficulty=${difficulty}`;

            const type = document.getElementById("trivia_type").value;
            if (type !== "any") apiUrl += `&type=${type}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (respostaIncorrectaAPI(data.response_code)) return;

            allData = data.results;
            mostrarPreguntes();
            document.getElementById("guardarPreguntesBD").disabled = false;
        } catch (error) {
            console.error("Error al obtindre la informació: " + error);
            alert("Error al obtindre la informació: " + error);
        }
    };

    /**
     * Funció per a comprovar si la resposta de la API es correcta
     * @param resposta
     * @returns {boolean}
     */
    const respostaIncorrectaAPI = (resposta) => {
        if (resposta === Number(1)) {
            alert(
                "No ni han suficients preguntes per a la categoria seleccionada"
            );
            return true;
        }
        if (resposta === Number(2)) {
            alert("Arguments invalids en la petició");
            return true;
        }
        if (resposta === Number(3)) {
            alert("Token no existeix");
            return true;
        }
        if (resposta === Number(4)) {
            alert(
                "Token ha retornat totes les preguntes posibles per a la query seleccionada"
            );
            return true;
        }
        if (resposta === Number(5)) {
            alert(
                "Moltes peticions en un curt període de temps. Espera 5 segons"
            );
            return true;
        }
        return false;
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
                mostrarPreguntes();
                document.getElementById("guardarPreguntesBD").disabled = true;
            },
            error: (error) => {
                console.error("Error al obtindre la informació: " + error);
                alert("Error al obtindre la informació: " + error);
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
            success: () => {
                alert("Preguntes guardades correctament.");
            },
            error: (error) => {
                console.error(
                    "Error al guardar preguntes en la base de dades: " + error
                );
                alert(
                    "Error al guardar preguntes en la base de dades: " + error
                );
            },
        });
        document.getElementById("guardarPreguntesBD").disabled = true;
    };

    /**
     * Funció per a mostrar les preguntes en el DOM
     * @returns {Promise<void>}
     */
    const mostrarPreguntes = () => {
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
});
