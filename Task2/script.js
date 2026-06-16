const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

function cellClicked(){

    if(this.textContent !== "" || !gameActive){
        return;
    }

    this.textContent = currentPlayer;

    if(checkWinner()){
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
    "Player " + currentPlayer + " Turn";
}

function checkWinner(){

    for(let pattern of winPatterns){

        let a = cells[pattern[0]].textContent;
        let b = cells[pattern[1]].textContent;
        let c = cells[pattern[2]].textContent;

        if(a !== "" && a === b && b === c){

            statusText.textContent =
            "Player " + a + " Wins!";

            gameActive = false;

            restartBtn.style.display = "inline-block";

            return true;
        }
    }

    let draw = true;

    cells.forEach(cell => {
        if(cell.textContent === ""){
            draw = false;
        }
    });

    if(draw){

        statusText.textContent =
        "Match Draw!";

        gameActive = false;

        restartBtn.style.display = "inline-block";

        return true;
    }

    return false;
}

function restartGame(){

    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent =
    "Player X Turn";

    restartBtn.style.display = "none";
}