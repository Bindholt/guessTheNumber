window.addEventListener("load", main);


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
    let guess = generateGuess();

    registerGuess(guess, tooHighBool);
}

function generateGuess() {
    return Math.floor(Math.random() * 100) + 1;
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

function tooHigh(){
    submitGuess(true);
}

function tooLow(){
    submitGuess(false);
}

function correct() {
    document.querySelector("#btn-span").style.display = "none";
    document.querySelector("#success-span").style.display = "inline";
    document.querySelector("#success").style.display = "block";
}