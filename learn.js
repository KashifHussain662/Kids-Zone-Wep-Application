

/* this preloader is continuosly running until code are not load on browser it depends on your
internet and computer speed  */

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
});

 const event = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', which: 13, keyCode: 13, });

/* end of preloader */