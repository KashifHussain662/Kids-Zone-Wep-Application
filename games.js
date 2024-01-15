



/* this preloader is continuosly running until code are not load on browser it depends on your
internet and computer speed  */

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
});

/* end of preloader */



// game 1

 // vanilla javascript document ready equivalent
 var ready = function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        return fn();
    }
    document.addEventListener('DOMContentLoaded', fn, false);
};

ready(function () {
    // all variables that need to be global accessible
    let $QSA = (elem) => document.querySelectorAll(elem),
        $QS = (elem) => document.querySelector(elem),
        $ID = (elem) => document.getElementById(elem),
        $Arr = (elem) => Array.from(elem),
        animalCounter,
        chosenAnimals = [],
        animalsArr = [],
        feedback = [
            "Good. Next round.",
            "Yeah. Next round.",
            "Keep going. Next round.",
            "Good job. Next round.",
            "Hurra. Next round.",
            "Super. Next round.",
            "Well done. Next round.",
            "You rock. Next round."
        ],
        playerCounter,
        attempts,
        moveCounter,
        lastRandomNum;

    // start
    init();

    function init() {
        animalCounter = 4;
        playerCounter = 0;
        $ID("countleft").innerText = animalCounter;
        $ID("playercounter").innerText = playerCounter;
        $QSA("#selection .animal").forEach(elem => elem.addEventListener("click", selectAnimal, false));
    };

    // HELPER FUNCTIONS
    // get random integer within range min max INCLUDING max and OPTIONAL WITHOUT same number twice in a row (repeat)
    function getRandomInt(min, max, repeat) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (repeat) {
            return num;
        } else {
            return num !== lastRandomNum ? num : getRandomInt(min, max);
        }
    }

    // --- CHOOSE INTRO --- User needs to select 4 animals to play with
    function selectAnimal() {
        let animal = this.querySelector("img");
        // enable deselection of a selected animal 
        if (animal.classList.contains("active")) {
            animal.classList.remove("active");
            animalCounter++;
            $ID("countleft").innerText = animalCounter;
        }
        // select animal
        else {
            animal.classList.add("active");
            this.querySelector("audio").play();
            animalCounter--
            $ID("countleft").innerText = animalCounter;
            // if 4 animals have been chosen
            if (animalCounter === 0) {
                $QSA("#selection .animal").forEach(elem => elem.removeEventListener("click", selectAnimal, false));
                // give user option to redo choice or play
                $QSA(".confirm-choice").forEach(elem => {
                    elem.classList.remove("confirm-choice-hide");
                    elem.classList.add("confirm-choice-show");
                });
                // choice = rechoose
                $QS(".confirm-choice .rechoose").addEventListener("click", function rechoose() {
                    $QSA(".confirm-choice").forEach(elem => {
                        elem.classList.remove("confirm-choice-show");
                        elem.classList.add("confirm-choice-hide");
                    });
                    $QSA("#selection .animal img").forEach(elem => elem.classList.remove("active"));
                    init();
                });
                // choice = play
                $QSA(".confirm-choice .play").forEach(elem => elem.addEventListener("click", function () {

                    // find out which mode is played
                    let playmode = this.getAttribute("data-playtype");
                    if (playmode === "normal") {
                        $QS(".playmode-normal").classList.remove("hide");
                        attempts = 3;
                    } else {
                        $QS(".playmode-hard").classList.remove("hide");
                        attempts = 1;
                    }

                    // necessary to check because function can get added multiple times
                    if (chosenAnimals.length === 0) {
                        $Arr($QSA("#selection .animal")).filter(item => {
                            if (item.querySelector("img").classList.contains("active")) {
                                chosenAnimals.push(item.id);
                            } else {
                                item.remove();
                            }
                        });

                        // stylings that needed to be adjusted for the game start
                        $QS(".confirm-choice").classList.remove("confirm-choice-show");

                        $QS("#selection h2").classList.add("hide");

                        $QSA("#selection .animal").forEach(elem => {
                            elem.querySelector("img").classList.remove("active");
                            elem.classList.remove("preselection");
                            elem.removeEventListener("click", selectAnimal)
                        });

                        $QSA(".selection-wrapper").forEach(elem => {
                            elem.classList.remove("choice-grid");
                            elem.classList.add("game-grid");
                        });

                        $QSA("#control").forEach(elem => {
                            elem.classList.remove("control-hide");
                            elem.classList.add("control-show");
                        });

                        $ID("start").addEventListener("click", startGame, false);
                        $ID("reset").addEventListener("click", reset, false);
                        $QSA(".selection-wrapper .animal").forEach(elem => {
                            elem.addEventListener("click", function () {
                                playerMove.call(this);
                            });
                        });
                        // attach reset func
                        $QSA(".playagain").forEach(elem => elem.addEventListener("click", reset, false));
                    }
                }));
            }
        }
    }


    // ---- GAMEPLAY --- GAME

    function startGame() {
        $ID("start").removeEventListener("click", startGame, false);
        $ID("start").classList.add("inactive");
        $ID("playercounter").classList.remove("inactive");
        $ID("playercounter").innerText = ++playerCounter;
        computerAddMove();
    }

    function reset() {
        window.location.href = window.location.href;
    }

    function getRandomFeedback() {
        let feedbackLength = feedback.length - 1,
            randomNum = getRandomInt(0, feedbackLength, true);
        $QSA("#feedback").forEach(elem => {
            elem.innerText = feedback[randomNum];
            elem.classList.remove("hidden");
        });
        $ID("playercounter").classList.add("highlight");
        setTimeout(() => {
            $ID("playercounter").classList.remove("highlight");
        }, 1500);
    }

    function notify(text) {
        $ID("feedback").classList.remove("hidden");
        $ID("feedback").innerText = text;
        setTimeout(() => {
            $ID("feedback").classList.add("hidden");
        }, 1000);
    }

    function computerAddMove() {
        let randomNum = getRandomInt(0, 3, false),
            randomAnimal = chosenAnimals[randomNum];
        lastRandomNum = randomNum; // update outer num to to avoid same num twice
        animalsArr.push(randomAnimal);
        computerReplayMoves();
    }

    function computerReplayMoves() {
        let i = 0,
            showAnimal = () => {
                return setTimeout(() => {
                    if (i < animalsArr.length) {
                        $ID(animalsArr[i]).querySelector("audio").play();
                        $ID(animalsArr[i]).querySelector("img").classList.remove("nobg");
                        ++i;
                        hideAnimal();
                    }
                    else {
                        notify("Your turn.")
                        // re-enable user clicking
                        $QSA(".selection-wrapper .animal").forEach(elem => elem.classList.remove("no-click"));
                    }
                }, 1000)
            },
            hideAnimal = () => {
                return setTimeout(() => {
                    $ID(animalsArr[i - 1]).querySelector("img").classList.add("nobg");
                    showAnimal();
                }, 1000);
            };

        // start
        showAnimal();
        // reset move counter
        moveCounter = 0;
        // prevent user clicking
        $QSA(".selection-wrapper .animal").forEach(elem => elem.classList.add("no-click"));
    }

    function playerMove() {
        let animalsArrLength = animalsArr.length;

        // user repeats all animals in the same order
        if (moveCounter < animalsArrLength) {
            if (this.id === animalsArr[moveCounter]) {
                this.querySelector("audio").play();
                this.querySelector("img").classList.remove("nobg");
                moveCounter++;
                setTimeout(() => {
                    this.querySelector("img").classList.add("nobg");
                }, 1000);
            }
            // if user makes a mistake
            else {
                notify("Wrong animal.")
                // prevent user clicking
                $QSA(".selection-wrapper .animal").forEach(elem => elem.classList.add("no-click"));
                // add error class to the wrongly clicked animal
                this.querySelector("img").classList.add("error");
                // show which animal would have been correct
                $ID(animalsArr[moveCounter]).querySelector("img").classList.remove("nobg");
                setTimeout(() => {
                    this.querySelector("img").classList.remove("error");
                    $ID(animalsArr[moveCounter]).querySelector("img").classList.add("nobg");
                }, 1000);
                // deduct attempt
                $QS(".playmode-counter").innerText = --attempts;
                // based on the amount of attempts game continues or game over
                if (attempts > 0) {
                    setTimeout(() => {
                        notify("Once again.");
                    }, 1000);
                    setTimeout(() => {
                        computerReplayMoves();
                    }, 2000);
                }
                else {
                    // show gameover popup
                    $QS(".gameover").classList.add("gameover-show");
                }
            }
            // if all animals are repeated in the correct order
            if (moveCounter === animalsArrLength) {
                // win if level 20 is reached
                if (playerCounter === 20) {
                    $QS(".win").classList.add("win-show");
                } else {
                    $ID("playercounter").innerText = ++playerCounter;
                    getRandomFeedback();
                    setTimeout(() => {
                        $ID("feedback").classList.add("hidden");
                    }, 1500);
                    setTimeout(() => {
                        computerAddMove();
                    }, 2000);
                }
            }
        }
    }

    // end document ready
});



// end of game 1


// game 2 


var pictureArray = [["apple.jpg", "apple",], ["ball.jpg", "ball"], ["lamp.jpg", "lamp"], ["rabbit.jpg", "rabbit"], ["dog.jpg", "dog"], ["zebra.jpg", "zebra"], ["egg.jpg", "egg"], ["orange.jpg", "orange"]];

randomIndex = "";
var memory_values = [];
var memory_tile_ids = [];
var checkStart = 0;
var attempt = 0;
var score = 0;

var gameLength = 10;


var btnStart = document.getElementById("k-m-game-start-btn");
var btnStartmobile = document.getElementById("k-m-game-start-btn-mobile");
var deckCover = document.getElementsByClassName("k-memory-game-deck-cover");
var gameOptions = document.getElementById("k-m-game-options-wrap");
var finishMessage = document.getElementById("k-m-gamefinish-message-wrapper");
var finalScore = document.getElementById("k-m-game-final-score");
var gamePlaceHolder = document.getElementById('m-k-m-game-placeholder');
var gameInstruction = document.getElementById("k-m-game-instructions");
var gameInstructionBtn = document.getElementById("k-m-game-instruction-btn");

gameInstructionBtn.addEventListener("click", function () {
    if (gameInstruction.style.display == "block") {
        gameInstruction.style.display = "none";
    } else {
        gameInstruction.style.display = "block";
    }

});



var kmGameLength = document.getElementById("k-m-game-length");
document.getElementById("d-g-final-marks").innerHTML = attempt;



Array.prototype.memory_tile_shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}


function newBoard() {
    randomIndex = Math.floor(Math.random() * pictureArray.length);
    tiles_flipped = 0;
    var output = '';
    pictureArray.memory_tile_shuffle();

    for (var i = 0; i < pictureArray.length; i++) {
        output += '<div class="d-game-item-wrap" id="d-game-item-wrap' + [i] + '"><div class="k-memory-game-deck-cover" id="k-memory-game-deck-cover' + [i] + '"onclick="gamePlay(this,\'' + pictureArray[i][0] + '\')"></div><img class="d-game-item-image-wrap" src="./images/games-2/' + pictureArray[i][0] + '" /></div>'
    }
    gamePlaceHolder.innerHTML = output;
}


newBoard();

function gameinit() {
    newBoard();
    if (checkStart === 1) {
        boardDisplay();
    }

}

function gameOption() {
    gameOptions.innerHTML = pictureArray[randomIndex][1];
    return gameOptions.innerHTML;
};

function boardDisplay() {
    setTimeout(gameOption, 10000);
    var kmgOptionSound = new Audio();
    kmgOptionSound.src = "./sounds/games-2/" + pictureArray[randomIndex][1] + ".mp3";
    setTimeout(function () { kmgOptionSound.play(); }, 10000);
    for (let i = 0; i < deckCover.length; i++) {
        deckCover[i].style.animation = "lefttorightanimation 10s";
        var kmgsSlideOutSound = new Audio();
        kmgsSlideOutSound.src = "./sounds/games-2/slideout.mp3";
        kmgsSlideOutSound.play();
    }
}

function boardDim() {
    for (let i = 0; i < deckCover.length; i++) {
        deckCover[i].style.background = "none";
        deckCover[i].style.opacity = ".5";
        deckCover[i].style.backgroundColor = "red";
    }
}


function gamePlay(tile, val) {
    if (checkStart === 1) {
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        }
        if (memory_values[0] === gameOption() + '.jpg') {
            score++;
            document.getElementById("k-m-game-score").innerHTML = score;
            finalScore.innerHTML = score;
            document.getElementById(memory_tile_ids[0]).style.display = "none";
            var kmgSuccessSound = new Audio();
            kmgSuccessSound.src = "./sounds/games-2/success1.mp3";
            kmgSuccessSound.play();
            memory_values = [];
            memory_tile_ids = [];
            checkStart = 1;
            boardDim();
            setTimeout(gameinit, 2000);
            gameOptions.innerHTML = "";

        } else {
            var kmgfailureSound = new Audio();
            kmgfailureSound.src = "./sounds/games-2/wrong-game.mp3";
            kmgfailureSound.play();
            document.getElementById(memory_tile_ids[0]).style.display = "none";
            memory_values = [];
            memory_tile_ids = [];
            checkStart = 1;
            boardDim();
            setTimeout(gameinit, 2000);
            gameOptions.innerHTML = "";
        }

        if (attempt < gameLength - 1) {

            attempt++;
            kmGameLength.innerHTML = attempt;
            var kmgClickSound = new Audio();
            kmgClickSound.src = "./sounds/games-2/click.mp3";
            kmgClickSound.play();

        } else {
            var kmgFinishSound = new Audio();
            kmgFinishSound.src = "./sounds/games-2/winner.mp3";
            kmgFinishSound.play();
            document.getElementById("k-m-gamefinish-message-wrapper").style.display = "block";
            checkStart = 0;

        }
    }
}


btnStart.addEventListener("click", function () {
    gameInstruction.style.display = "none";
    checkStart = 1;
    attempt = 0;
    gameinit();
});

btnStartmobile.addEventListener("click", function () {
    gameInstruction.style.display = "none";
    checkStart = 1;
    attempt = 0;
    gameinit();
});

var playAgain = document.getElementById("k-m-game-play-again-btn");
playAgain.addEventListener("click", function () {
    score = 0;
    attempt = 0;
    checkStart = 1;
    gameinit();
    finishMessage.style.display = "none";
});


// end of game 2


