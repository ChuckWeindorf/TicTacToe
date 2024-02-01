class gameBoard {
    constructor()
        {
        this.board = [];
        this.vint = 0;
        }
    resetBoard() {
        this.board = [" "," "," "," "," "," "," "," "," "];
        for (let vint = 0; vint < 9; vint++)
          {
          document.getElementById("XO"+vint).style.backgroundColor = 
                 "rgba(255, 255, 255, 0.8)";
          }
        }
    takeSquare(xORo, squareNum)
        { 
        if (this.board[squareNum] == " ") {
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
         this.gameOver = false;
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
         this.adjacent = [ 
            [1,3],
            [0,2],
            [1,5],
            [0,6],
            [],
            [2,8],
            [3,7],
            [6,8],
            [5,7]
            ]
    }

    moveXO(squareNum) {
      {
        const currPlayer = this.playerArr[this.playerUp-1].playerSide;
        const currName = this.playerArr[this.playerUp-1].playerName;
        this.currentBoard.takeSquare(currPlayer, squareNum);
        if (this.playerUp == 1) 
             {this.playerUp = 2} 
        else 
             {this.playerUp = 1};
      return this.isGameOver(currPlayer, currName);
      }}

    isGameOver(playerSide, currName)
        { 
        if (this.wintest(playerSide))
            {return `WIN! Congrats ${currName} (${playerSide})!`}
        else if (this.currentBoard.board.filter(element => element == " ").length == 0) 
            {return "Draw"}
        else {return playerSide};
        }

    robotArrayCheck(arrNeed) {
        const board = this.currentBoard.board;
        let botSquareNum = -1;
        let arr = [];
        for (let vint = 0; vint < this.win.length; vint++)
          {arr = this.win[vint];
           if (board[arr[0]]+board[arr[1]]+board[arr[2]] == arrNeed[0] | 
             board[arr[0]]+board[arr[1]]+board[arr[2]] == arrNeed[1] |
             board[arr[0]]+board[arr[1]]+board[arr[2]] == arrNeed[2])
               {
                if (board[arr[0]] == " ") 
                  {botSquareNum = arr[0]}
               else if (board[arr[1]] == " ")  
                  {botSquareNum = arr[1]}
               else {botSquareNum = arr[2]}
               }
           }
         return botSquareNum;
        };  

 /*   robotIsAdjacent()
            {
             let botSquareNum = -1;
             let holdTest = 0;
             for (let vint = 0; vint < 9; vint++)
             {
                if (vint != 4 && botSquareNum == -1 && this.currentBoard.board[vint] == " ")
                    {
                        for (let vint2 = 0; vint2 < this.adjacent.length; vint2++)
                          {if (vint2 != 4) 
                            { holdTest = 0;
                            if (this.currentBoard.board[4] == "O") {holdTest++}; 
                            if (this.currentBoard.board[this.adjacent[vint2][0]] == "O") 
                                                                   {holdTest++}; 
                            if (this.currentBoard.board[this.adjacent[vint2][1]] == "O") 
                                                                   {holdTest++}; 
                            if (holdTest == 2) {
                                botSquareNum = vint}
                            }
                          }
                    }
             }   
            return botSquareNum
            };*/

    robotMove() {
        let botSquareNum = -1;
        //Check for way to win
        botSquareNum = this.robotArrayCheck(["OO ", "O O", " OO"]);
        //Check for way to block if no win
        if (botSquareNum == -1) 
           {botSquareNum = this.robotArrayCheck(["XX ", "X X", " XX"])};
        //take center if available
        if (botSquareNum == -1) 
           {if (this.currentBoard.board[4] == " ") {botSquareNum = 4}}
        //Select adjacent to two Os?
//        if (botSquareNum == -1) 
//           {botSquareNum = this.robotIsAdjacent()
//             if (botSquareNum > -1) {console.log("ajacent " + botSquareNum);}};
        //Check to create 2 Os with no X blocker if no win or block
        if (botSquareNum == -1) 
           {botSquareNum = this.robotArrayCheck(["O  ", " O ", "  O"])};
        //Corner then Side 0, 2, 6, 8, 1, 3, 5, 7
        if (botSquareNum == -1) 
           {
           if (this.currentBoard.board[0] == " ") {botSquareNum = 0}
           else if (this.currentBoard.board[2] == " ") {botSquareNum = 2}
           else if (this.currentBoard.board[6] == " ") {botSquareNum = 6}
           else if (this.currentBoard.board[8] == " ") {botSquareNum = 8}
           else if (this.currentBoard.board[1] == " ") {botSquareNum = 1}
           else if (this.currentBoard.board[3] == " ") {botSquareNum = 3}
           else if (this.currentBoard.board[5] == " ") {botSquareNum = 5}
           else if (this.currentBoard.board[7] == " ") {botSquareNum = 7}
        }
        return(botSquareNum);
    };

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
    const cstrName2 = document.getElementById("player2Name").value;
    let testPlay2 = new player(cstrName2, "O", cstrName2.toLowerCase() == "bot");
    cwGame = new gamePlay(testPlay1, testPlay2, 1);
    cwGame.currentBoard.resetBoard();
    cwGame.currentBoard.showBoard();
}

function oneMove(squareHTMLid) {
    const moveResult = cwGame.moveXO(Number(squareHTMLid.substring(2)));
    if (moveResult.substring(0,3) == "WIN") 
        {
         cwGame.gameOver = true;
         document.getElementById("grid-containerFoot").style.display = "inline-grid";
         document.getElementById("grid-containerPlayers").style.display = "none";
         document.getElementById("grid-Foot").innerHTML = `<p><strong>${moveResult}</strong></p>`;
        setTimeout(function() {
         document.getElementById("grid-containerGame").style.display = "none";
         document.getElementById("grid-containerFoot").style.display = "none";
         document.getElementById("grid-containerPlayers").style.display = "inline-grid";
        },2000);
        }
    else if (moveResult == "Draw") 
        {
        for (let vint = 0; vint < 9; vint++)
           {document.getElementById("XO" + vint).style.backgroundColor = "silver"}
           cwGame.gameOver = true;
           setTimeout(function() {
              document.getElementById("grid-containerGame").style.display = "none";
           },2000);
        }
    else if (moveResult == "X") 
        {document.getElementById(squareHTMLid).style.backgroundColor = "lime"}
    else {document.getElementById(squareHTMLid).style.backgroundColor = "yellow"}
}

function handleMoveClick(event)
    {  
    if (cwGame.currentBoard.board[Number(event.srcElement.id.substring(2))] == " ") 
      {
      oneMove(event.srcElement.id);
      if (cwGame.playerArr[1].playerRobot && cwGame.gameOver == false) {
        oneMove("XO" + cwGame.robotMove());
      }    
      }
    }

//-----------------------MAIN Routine

document.getElementById("newGame").addEventListener("click", newGame);
let varrTemp = document.getElementsByClassName("grid-item");
for (let vintI = 0; vintI < varrTemp.length; vintI++)
    { 
    varrTemp[vintI].addEventListener("click", event => {handleMoveClick(event)})
    };

let cwGame;