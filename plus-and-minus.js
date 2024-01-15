

/* this preloader is continuosly running until code are not load on browser it depends on your
internet and computer speed  */

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
});

/* end of preloader */


// addition section

function button1() {

    let input1 = document.getElementById("input1").value;


    if (input1 == 5) {
        alert("Correct Answer");
    }

    else if (input1 !== 5) {
        alert("Wrong Answer")
    }

}

function button2() {

    let input2 = document.getElementById("input2").value;


    if (input2 == 8) {
        alert("Correct Answer");
    }

    else if (input2 !== 8) {
        alert("Wrong Answer")
    }

}

function button3() {

    let input3 = document.getElementById("input3").value;


    if (input3 == 7) {
        alert("Correct Answer");
    }

    else if (input3 !== 7) {
        alert("Wrong Answer")
    }

}

function button4() {

    let input4 = document.getElementById("input4").value;


    if (input4 == 9) {
        alert("Correct Answer");
    }

    else if (input4 !== 9) {
        alert("Wrong Answer")
    }

}

// end of addition section

//subtraction section

function button5() {

    let input5 = document.getElementById("input5").value;


    if (input5 == 2) {
        alert("Correct Answer");
    }

    else if (input5 !== 2) {
        alert("Wrong Answer")
    }

}

function button6() {

    let input6 = document.getElementById("input6").value;


    if (input6 == 1) {
        alert("Correct Answer");
    }

    else if (input6 !== 1) {
        alert("Wrong Answer")
    }

}

function button7() {

    let input7 = document.getElementById("input7").value;


    if (input7 == 4) {
        alert("Correct Answer");
    }

    else if (input7 !== 4) {
        alert("Wrong Answer")
    }

}

function button8() {

    let input8 = document.getElementById("input8").value;


    if (input8 == 3) {
        alert("Correct Answer");
    }

    else if (input8 !== 3) {
        alert("Wrong Answer")
    }

}

// end of subtraction section

