window.addEventListener("load", main);

let max = 100;
let min = 0;
let guesses = 0;
let guess;


function main() {
    document.querySelector("#start-btn").addEventListener("click", start);
    document.querySelector("#low-btn").addEventListener("click", tooLow);
    document.querySelector("#high-btn").addEventListener("click", tooHigh);
    document.querySelector("#correct-btn").addEventListener("click", correct);
}

function start(){
    document.querySelector("#guesses").style.display = "block";
    submitGuess();
} 

function submitGuess(tooHighBool) {
    if (max >= min) {
        guess = generateGuess();
        registerGuess(guess, tooHighBool);
    } else {
        refuseGuessing();
    }

}

function generateGuess() {
    guesses++;
    return Math.floor((max+min)/2);
}

function registerGuess(guess, tooHighBool) {
    const lastGuess = document.querySelector("#guess").innerHTML;

    if(tooHighBool != null) {
        document.querySelector("#latest-guess").insertAdjacentHTML("beforebegin", /*html*/ `
            <li>
                I'm guessing ${lastGuess} - That was too ${tooHighBool ? "high" : "low"}.
            </li>    
        `)
    }
    
    document.querySelector("#guess").innerHTML = guess;
}

function refuseGuessing() {
    document.querySelector("#latest-guess").insertAdjacentHTML("beforebegin", /*html*/ `
        <li>
            You're lying! There are no more numbers to guess! The answer is ${guess}.
        </li>    
    `)
    document.querySelector("#btn-span").style.display = "none";
    correct();
}

function tooHigh(){
    max = guess - 1;  
    console.log(max);
    submitGuess(true);
}

function tooLow(){
    min = guess + 1;
    console.log(min);
    submitGuess(false);
}

function correct() {
    let successMsg;
    if (guesses == 1) {
        successMsg = "FIRST TRY! EASY!";
    } else if (guesses < 4) {
        successMsg = "That wasn't the hardest number to guess now was it?";
    } else if (guesses < 6) {
        successMsg = "Decent job, but I've seen better!";
    } else if (guesses < 8) {
        successMsg = "Okay that was a hard one, but I got it!";
    }

    if(guess == 42) {
        successMsg = "Frick off, Peter";
    }

    document.querySelector("#btn-span").style.display = "none";
    document.querySelector("#success-span").style.display = "inline";
    document.querySelector("#success").insertAdjacentHTML("beforebegin", /*html*/ `
        <li>
            ${successMsg}
        </li>    
    `)
}