var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


// Use the below section if you want the audio file to play in the nextSequence function

/*$("body").click(function(){
    nextSequence();
});*/

$(".btn").on("click", function () {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
});



var j = 0;
$("body").on("keypress", function () {

    $("h1").text("Level 0");
    //    console.log(j);        
    j += 1;
    //    console.log(j);
    nextSequence();

});

function playSound(name) {
    var yelaudio = new Audio("sounds/" + name + ".mp3");
    yelaudio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");

    }, 100);

}

function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
        // console.log("wrong");

    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    
}


function nextSequence() {
    var randomNumber = Math.random();
    randomNumber = Math.floor((randomNumber * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // return randomChosenColour;

    switch (randomChosenColour) {

        case "green":
            $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            var yelaudio = new Audio("sounds/green.mp3");
            yelaudio.play();
            break;

        case "red":
            $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            var yelaudio = new Audio("sounds/red.mp3");
            yelaudio.play();
            break;

        case "yellow":
            $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            var yelaudio = new Audio("sounds/yellow.mp3");
            yelaudio.play();
            break;

        case "blue":
            $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            var yelaudio = new Audio("sounds/blue.mp3");
            yelaudio.play();
            break;

    }

    level = level + 1;
    // console.log(level);
    $("h1").text("Level " + level);
    // console.log(randomChosenColour);
    // $("#randomChosenColour").css("background", "pink");

    // $("randomChosenColour").on("click", function(){
    //       alert("I was clicked");
    // });
    // console.log(randomNumber);
    // return randomNumber; //In case you want to return the value to the function outside this function



}








