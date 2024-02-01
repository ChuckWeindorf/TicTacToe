class gameBoard {
    constructor()
        {
        this.board = [];
        this.vint = 0;
        }
    resetBoard() {
        this.board = [".",".",".",".",".",".",".",".","."];
        for (let vint = 0; vint < 9; vint++)
          {
          document.getElementById("XO"+vint).style.backgroundColor = 
                 "rgba(255, 255, 255, 0.8)";
          }
        }
    takeSquare(xORo, squareNum)
        { 
        if (this.board[squareNum] == ".") {
            this.board[squareNum] = xORo;
            this.showBoard();
            return true;
        }
        else {return false}
        }
    showBoard() 
        {
        for (let vintCW = 0; vintCW < 9; vintCW++)
                {
                document.getElementById("XO" + vintCW).textContent = this.board[vintCW];
                }
                
        document.getElementById("grid-containerGame").style.display = "inline-grid";
        }
}

class player {
    constructor(playerName, playerXO, playerRobot)
    {
        this.playerName = playerName;
        this.playerSide = playerXO;
        this.playerRobot = playerRobot;
    }
}

class gamePlay {
    constructor(player1, player2, playerUp)
    {
         this.playerArr =[player1, player2];
         this.playerUp = playerUp;
         this.currentBoard = new gameBoard();
         this.win = 
           [[0,1,2], 
            [3,4,5], 
            [6,7,8], 
            [0,4,8], 
            [2,4,6], 
            [0,3,6], 
            [1,4,7], 
            [2,5,8]]
    }

    moveXO(squareNum) {
      {
        const currPlayer = this.playerArr[this.playerUp-1].playerSide;
        this.currentBoard.takeSquare(currPlayer, squareNum);
        if (this.playerUp == 1) 
             {this.playerUp = 2} 
        else 
             {this.playerUp = 1};
      return this.isGameOver(currPlayer);
      }}

    isGameOver(playerSide)
        { 
        if (this.wintest(playerSide)) 
            {return `WIN! Congrats ${playerSide} player!`}
        else if (this.currentBoard.board.filter(element => element == ".").length == 0) 
            {return "Draw"}
        else {return playerSide};
        }

    robotMove() {};

    wintest(vstrXO) 
        {
        //there are eight wins possible for victory
        let vbolWin = false;
        this.win.forEach(arr => 
            { 
            if (vstrXO.repeat(3) == 
                    this.currentBoard.board[arr[0]]
                    + this.currentBoard.board[arr[1]]
                    + this.currentBoard.board[arr[2]]) 
                {
                    vbolWin = true;
                    for (let vint = 0; vint < 9; vint++){
                         {document.getElementById("XO"+vint).style.backgroundColor = "gray"} 
                    for (let vint = 0; vint <3; vint++)
                         {document.getElementById("XO"+arr[vint]).style.backgroundColor = "red"}
                }
                }
            })
        return vbolWin;
        };
}

function newGame() {
    let testPlay1 = new player(document.getElementById("player1Name").value, "X", false);
    const cstrName2 = document.getElementById("player1Name").value;
    let testPlay2 = new player(cstrName2, "O", cstrName2 == "Bot");
    cwGame = new gamePlay(testPlay1, testPlay2, 1);
    cwGame.currentBoard.resetBoard();
    cwGame.currentBoard.showBoard();
}

function oneMove(event) {
    const moveResult = cwGame.moveXO(Number(event.srcElement.id.substring(2)));
    if (moveResult.substring(0,3) == "WIN") 
        {document.getElementById("grid-containerFoot").style.display = "inline-grid";
         document.getElementById("grid-containerPlayers").style.display = "none";
         document.getElementById("grid-Foot").innerHTML = `<p><strong>${moveResult}</strong></p>`;
         
        setTimeout(function() {
         document.getElementById("grid-containerGame").style.display = "none";
         document.getElementById("grid-containerFoot").style.display = "none";
         document.getElementById("grid-containerPlayers").style.display = "inline-grid";
        },3000);
         
        }
    else if (moveResult == "Draw") {
        for (let vint = 0; vint < 9; vint++)
           {document.getElementById("XO" + vint).style.backgroundColor = "silver"}
        }
    else if (moveResult == "X") 
        {document.getElementById(event.srcElement.id).style.backgroundColor = "lime"}
    else {document.getElementById(event.srcElement.id).style.backgroundColor = "yellow"}
}

//-----------------------MAIN Routine

document.getElementById("newGame").addEventListener("click", newGame);
let varrTemp = document.getElementsByClassName("grid-item");
for (let vintI = 0; vintI < varrTemp.length; vintI++)
    { 
    varrTemp[vintI].addEventListener("click", event => {oneMove(event)})
    };

let cwGame;