var randomNumber1 = Math.random();
var randomNumber2 = Math.random();
randomNumber1 = Math.floor((randomNumber1 * 6) + 1);
randomNumber2 = Math.floor((randomNumber2 * 6) + 1);

var randomimage1 = "images/dice" + randomNumber1 + ".png";
var randomimage2 = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", randomimage1);
document.querySelectorAll("img")[1].setAttribute("src", randomimage2);

if ( randomNumber1 > randomNumber2){

    document.querySelector("h1").innerHTML = "Player 1 Wins";
} else if (randomNumber1 < randomNumber2){

    document.querySelector("h1").innerHTML = "Player 2 Wins";
} else{

    document.querySelector("h1").innerHTML = "It's a draw";
}

