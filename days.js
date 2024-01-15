
/* this preloader is continuosly running until code are not load on browser it depends on your
internet and computer speed  */

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
});

/* end of preloader */

// audio of pronounce days

const monday = new Audio();
monday.src = "./sounds/days/monday.mp3";


const tuesday = new Audio();
tuesday.src = "./sounds/days/tuesday.mp3";


const wednesday = new Audio();
wednesday.src = "./sounds/days/wednesday.mp3";


const thursday = new Audio();
thursday.src = "./sounds/days/thursday.mp3";


const friday = new Audio();
friday.src = "./sounds/days/friday.mp3";


const saturday = new Audio();
saturday.src = "./sounds/days/saturday.mp3";


const sunday = new Audio();
sunday.src = "./sounds/days/sunday.mp3";



// end of pronounce days audio