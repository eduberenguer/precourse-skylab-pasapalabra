var questions = [
    { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
];

/*var questions = [
    {letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    {letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    {letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") }
]*/
var count = 0;
var letters;
var point = 0;
var classification = [];
var name;
var crono;
var totalTime;

//Métodos Listeners
init.addEventListener('click', game);
accept.addEventListener('click', answer);
pasapalabraBtn.addEventListener('click',pasapalabra);
final.addEventListener('click',end);
ready.addEventListener('click',game);

//Creo las letras 
function creationLetters() {
    document.getElementById("name").style.border = "none";
    document.getElementById("name").value = "";
    //totalTime = 10;
    totalTime = 130;
    document.getElementById("time").innerHTML = "Tiempo restante: " + totalTime;
    time();
    count = 0;
    point = 0;
    for (var i = 0; i < questions.length; i++) {
        var element = document.createElement("h2");
        element.setAttribute("id", i);
        element.innerHTML = questions[i].letter;
        document.getElementById("letters").appendChild(element).classList.add("circles");
    }
    questionsGame();
}

//Función para crear el tiempo y vaya disminuyendo a cada segundo
function time() {
    crono = window.setInterval(function () {
        document.getElementById("time").innerHTML = "Tiempo restante: " + totalTime;
        if (totalTime == 0) {
            clearInterval(crono);
            end();
        }
        totalTime--;
    }, 1000);
}

//Checkeo si hay preguntas disponibles para seguir jugando o no
function question() {
    letters = 0;
    questions.forEach(function (obj) {
        if (obj.status === 0) {
            letters++;
        }
    });
    if (letters > 0) {
        questionsGame();
    } else {
        clearInterval(crono);
        end();
    }
}

//Muestro la siguiente pregunta disponible para el usuario
function questionsGame() {
    if (count == questions.length) {
        resetCount();
    } else if (questions[count].status != 0) {
        count++;
        return questionsGame();
    } else {
        document.getElementById("name").focus();
        document.getElementById("counter").innerHTML = "Aciertos: " + point;
        document.getElementById("question").innerHTML = questions[count].question;
        document.getElementById(count).style.backgroundColor = "#F2DF4C";
    }
}

//Checkeo si la respuesta del usuario es correcta o incorrecta
function answer() {
    var ans = "";
    ans = document.getElementById("name").value;
    ans = ans.toLowerCase();
    document.getElementById("name").focus();
    if (ans == questions[count].answer) {
        document.getElementById(count).style.backgroundColor = "#53A247";
        audio("correct");
        questions[count].status = 2;
        point++;
    } else {
        document.getElementById(count).style.backgroundColor = "#AE304B";
        questions[count].status = 1;
        audio("incorrect");
    }
    document.getElementById("name").value = "";
    count++;
    question();
}

//Función para hacer "pasapalabra" en el caso de hacer click en su botón
function pasapalabra(){
    document.getElementById(count).style.backgroundColor = "#315A99";
    questions[count].status = 0;
    document.getElementById("name").value = "";
    count++;
    question();
}

//Reseteamos el contador para un nuevo juego 
function resetCount() {
    count = 0;
    question();
}

//Al hacer click en "finalizar" o se acaba el tiempo se muestra el ranking y se prepara para un nuevo juego
function end() {
    clearInterval(crono);
    document.getElementById("name").value= "";
    document.getElementById("question").innerHTML = "JUEGO FINALIZADO, ESCRIBE UN NOMBRE PARA VOLVER A JUGAR";
    document.getElementById("welcome").classList.remove("welcome");
    document.getElementById("welcome").classList.add("welcomeLeft");
    document.getElementById("central").classList.remove("central");
    document.getElementById("central").classList.add("centralLeft");
    document.getElementById("counter").style.display = "none";
    document.getElementById("accept").style.display = "none";
    document.getElementById("pasapalabraBtn").style.display = "none";
    document.getElementById("final").style.display = "none";
    document.getElementById("time").style.display = "none";
    document.getElementById("ready").style.display = "inline-block";
    document.getElementById("ranking").style.display = "inline-block";
    classification.push({
        Nombre: name,
        Puntos: point
    });

    function compare(a, b) {
        return b.Puntos - a.Puntos;
    }
    classification.sort(compare);
    var fatherRanking = document.getElementById("ranking");
    while (fatherRanking.firstChild) {
        fatherRanking.removeChild(fatherRanking.firstChild);
    }
    for (var i = 0; i < classification.length; i++) {
        var elements = document.createElement("p");
        elements.innerHTML = i + 1 + "º " + classification[i].Nombre + " => " + classification[i].Puntos + " puntos";
        document.getElementById("ranking").appendChild(elements);
    }
    fatherLetters = document.getElementById("letters");
    while (fatherLetters.firstChild) {
        fatherLetters.removeChild(fatherLetters.firstChild);
    }
    questions.forEach(function (obj) {
        obj.status = 0;
    });
    document.getElementById("name").style.display = "inline-block";
}

//Inicio del juego, ocultando y mostrando los elementos correspondientes
function game() {
    name = document.getElementById("name").value;
    //Obligo al usuario a poner un nombre para poder continuar
    if (name == "") {
        document.getElementById("name").style.border = "solid 3px red";
        document.getElementById("name").placeholder = "Escribe tu nombre";
    } else {
        document.getElementById("welcome").classList.remove("welcomeLeft");
        document.getElementById("welcome").classList.add("welcome");
        document.getElementById("hello").classList.add("hidden");
        document.getElementById("central").classList.remove("centralLeft");
        document.getElementById("central").classList.add("central");
        document.getElementById("ranking").style.display = "none";
        document.getElementById("ready").style.display = "none";
        document.getElementById("accept").style.display = "inline-block";
        document.getElementById("pasapalabraBtn").style.display = "inline-block";
        document.getElementById("final").style.display = "inline-block";  
        document.getElementById("counter").style.display = "inline-block";
        document.getElementById("time").style.display = "inline-block";
        document.getElementById("time").value = count;
        creationLetters();
    }
}
//Función audio, dependiendo del tipo de respuesta manda como parámetro un audio u otro
function audio(value) {
    if (value == "correct") {
        document.getElementById('correct').play();
    } else {
        document.getElementById('incorrect').play();
    }
}
