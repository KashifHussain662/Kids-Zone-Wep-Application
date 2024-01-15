
/* this preloader is continuosly running until code are not load on browser it depends on your
internet and computer speed  */

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
});

/* end of preloader */

// audio of pronounce months

const january = new Audio();
january.src = "./sounds/months/january.mp3";


const february = new Audio();
february.src = "./sounds/months/february.mp3";


const march = new Audio();
march.src = "./sounds/months/march.mp3";


const april = new Audio();
april.src = "./sounds/months/april.mp3";


const may = new Audio();
may.src = "./sounds/months/may.mp3";


const june = new Audio();
june.src = "./sounds/months/june.mp3";


const july = new Audio();
july.src = "./sounds/months/july.mp3";


const august = new Audio();
august.src = "./sounds/months/august.mp3";


const september = new Audio();
september.src = "./sounds/months/september.mp3";


const october = new Audio();
october.src = "./sounds/months/october.mp3";


const november = new Audio();
november.src = "./sounds/months/november.mp3";


const december = new Audio();
december.src = "./sounds/months/december.mp3";



// end of pronounce months audio