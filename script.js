// there is 3x3 gird
// thow players place their symbol at any place on the grid
// first turn is player 1 he places his symbol
// then player two place his
// then reapeat until there is 3 symobls in a row.
// 
let gameOver = false;


const setEvents = function setEvents(){
    const game = GameController();
    const ttrContainer = document.querySelector('.ttt-container');
    ttrContainer.addEventListener('click',(event)=>{
        game.setPlayerChoise(event.target.id.split(''));
        game.playRound(); 
    })
}();


function Board(){
let board = [
     '','',''
    ,'','',''
    ,'','',''
];

function getBoard(){
    return board;
}
function placeSymbol(symbol,x){
  board[x]= symbol;
}
return { getBoard,placeSymbol};
}


function Player(name){
    let symbol ='';
    function setSymbol(newSymbol){
        symbol=newSymbol;
    }
    function getSymbol(){
        return symbol;
    }
    function getPlayerName(){
        return name;
    }
    return {setSymbol, getSymbol,getPlayerName};
}

function GameController(){
const board = Board();
const player1 = Player('Stas');
const player2 = Player('Masha');

player1.setSymbol('X');
player2.setSymbol('0');


let activePlayer = player1;
let winner;

function swtchActivePlayer()
{
activePlayer = activePlayer === player1 ? player2:player1;
}
console.log(`${activePlayer.getPlayerName()} choose your cell`);
let playerChoise = [1,1];
function setPlayerChoise(x){
playerChoise = x;
}

function checkWin(){
    const currentBoard = board.getBoard();
    const winConditions= [
         [0,1,2],
         [3,4,5],
         [6,7,8],
         [0,3,6],
         [1,4,7],
         [2,5,8],
         [0,4,8],
         [2,4,6]
    ]
    if(winConditions.some((winCondition)=> winCondition.every((element)=> currentBoard[element]===activePlayer.getSymbol())))
    {
        winner = activePlayer;
        gameOver = true;
    }
    if(currentBoard.every((element)=> element!=='')){
        gameOver = true;
    }

 }

function playRound(){
    if(!gameOver&&board.getBoard()[playerChoise]==='')
    {
    board.placeSymbol(activePlayer.getSymbol(),playerChoise[0]);
    checkWin();
    swtchActivePlayer();
    buildDOM();
    }
}
function buildDOM(){
    const boardButtons = document.querySelectorAll('.board');
    const currentBoard = board.getBoard();
    boardButtons.forEach((button)=>{
        if(currentBoard[button.id]!==''&&button.childElementCount===0){
            const img = document.createElement('img');
            if(currentBoard[button.id]==='X'){
              img.src= "./Images/cross.png";
            }
            if(currentBoard[button.id]==='0'){
                img.src = "./Images/circle.png";
            }
            button.appendChild(img);
        }
    });
}
buildDOM();
return {playRound,setPlayerChoise,winner};
}









