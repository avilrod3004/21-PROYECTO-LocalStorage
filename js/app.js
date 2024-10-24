let tweets = []

const contenedor = document.querySelector(".container")
const textarea = document.querySelector("#tweet");
const listaTweets = document.querySelector("#lista-tweets");
const formulario = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", () => {
    recuperarAlmacenamiento()
    mostrarTweets()
})

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (textarea.value.trim() === "") {
        mostrarMensajeError()
    } else {
        const value = textarea.value;
        tweets.unshift(value);

        textarea.value = "";

        limpiarListaTweets()
        mostrarTweets();
        almacenarTweets();
    }
})

listaTweets.addEventListener("click", (event) => {
    if (event.target.classList.contains('borrar-tweet')) {
        const contenidoParrafo = event.target.parentElement.textContent;
        const mensajeTweet = contenidoParrafo.substring(0, contenidoParrafo.length - 1);

        tweets = tweets.filter(tweet => tweet !== mensajeTweet);

        limpiarListaTweets();
        mostrarTweets();
        almacenarTweets();
    }
})

function mostrarTweets() {
    tweets.forEach(tweet => {
        const parrafoTweet = document.createElement("p");
        parrafoTweet.textContent = tweet;

        const borrarTweet = document.createElement("a");
        borrarTweet.classList.add('borrar-tweet');
        borrarTweet.textContent = "X";

        parrafoTweet.appendChild(borrarTweet);
        listaTweets.appendChild(parrafoTweet);
    })
}

function limpiarListaTweets() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function mostrarMensajeError() {
    const error = document.createElement("p");
    error.textContent = "¡¡El tweet no puede estar vacío!!"
    error.classList.add('error');

    contenedor.appendChild(error);

    setTimeout(quitarMensajeError, 3000)
}

function quitarMensajeError() {
    const error = document.querySelector(".error");
    contenedor.removeChild(error);
}

function almacenarTweets() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function recuperarAlmacenamiento() {
    if (localStorage.getItem("tweets") === null) {
        localStorage.setItem("tweets", JSON.stringify(tweets));
    } else {
        tweets = JSON.parse(localStorage.getItem("tweets"));
    }
}