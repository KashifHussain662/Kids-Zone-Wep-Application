

/* this preloader is continuosly running until code are not load on browser it depends on your
internet and computer speed  */

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
});

/* end of preloader */

// audio of pronounce plants names


const rose = new Audio();
rose.src = "./sounds/plants/rose.mp3";



const sunflower = new Audio();
sunflower.src = "./sounds/plants/sunflower.mp3";



const tulip = new Audio();
tulip.src = "./sounds/plants/tulip.mp3";


const daisy = new Audio();
daisy.src = "./sounds/plants/daisy.mp3";



const lily = new Audio();
lily.src = "./sounds/plants/lily.mp3";


const dandelion = new Audio();
dandelion.src = "./sounds/plants/dandelion.mp3";



const marigold = new Audio();
marigold.src = "./sounds/plants/marigold.mp3";


const cactus = new Audio();
cactus.src = "./sounds/plants/cactus.mp3";





const fern = new Audio();
fern.src = "./sounds/plants/fern.mp3";



const aloevera = new Audio();
aloevera.src = "./sounds/plants/aloe-vera.mp3";



const basil = new Audio();
basil.src = "./sounds/plants/basil.mp3";



const hosta = new Audio();
hosta.src = "./sounds/plants/hosta.mp3";


// end of pronounce plants names audio


