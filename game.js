let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;

let greenSound = new Audio('sounds/green.mp3');
let redSound = new Audio('sounds/red.mp3');
let yellowSound = new Audio('sounds/yellow.mp3');
let blueSound = new Audio('sounds/blue.mp3');
let wrongSound = new Audio('sounds/wrong.mp3');


// start game

$(document).keydown(function () {
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
});


// triggers random color from simon

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    if (randomChosenColor === "green") {
        greenSound.play();
    } else if (randomChosenColor === "red") {
        redSound.play();
    } else if (randomChosenColor === "yellow") {
        yellowSound.play();
    } else {
        blueSound.play();
    }
}


//triggers when user clicks button

$(".btn").click(function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);    used to check array is working
    checkAnswer(userClickedPattern.length - 1);

    if (userChosenColor === "green") {
        greenSound.play();
    } else if (userChosenColor === "red") {
        redSound.play();
    } else if (userChosenColor === "yellow") {
        yellowSound.play();
    } else {
        blueSound.play();
    }

});


// checks uner answer against game answer 

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };

    } else {
        wrongSound.play();
        $("body").addClass("game-over").delay(200).queue(function () {
            $(this).removeClass("game-over").dequeue()
        });
        $("h1").text("Game over! Press any key to restart");

        startOver();
    };

};


// resets game after losing

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//animates when pressing the button

$(".red").click(function (currentColor) {
    $(".red").addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    });
});

$(".green").click(function (currentColor) {
    $(".green").addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    });
});

$(".yellow").click(function (currentColor) {
    $(".yellow").addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    });
});

$(".blue").click(function (currentColor) {
    $(".blue").addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    });
});