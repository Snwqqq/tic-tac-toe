// there is 3x3 gird
// thow players place their symbol at any place on the grid
// first turn is player 1 he places his symbol
// then player two place his
// then reapeat until there is 3 symobls in a row.
// 
let gameOver = false;
const player1 = Player('X');
const player2 = Player('0');
let winner;



const board = function(){
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
    function clearBoard(){
        board = [
            '','',''
           ,'','',''
           ,'','',''
       ];
    }
    return { getBoard,placeSymbol,clearBoard};
    }();


const setEvents = function setEvents(){
    const ttrContainer = document.querySelector('.ttt-container');
    ttrContainer.addEventListener('click',(event)=>{
        game.setPlayerChoise(event.target.id.split(''));
        game.playRound(); 
    })
}();




function Player(newSymbol){
    let symbol =newSymbol;

    function getSymbol(){
        return symbol;
    }
    return { getSymbol};
}


function buildDOM(){
    const boardButtons = document.querySelectorAll('.board');
    const infoText = document.querySelector('.info-text');
    const infoImg = document.querySelector('.info-img');
    infoImg.src = game.getActivePlayer().getSymbol()==='0'?"./Images/circle.png":"./Images/cross.png";
    
    if(winner)
    {
        if(winner.getSymbol() === player1.getSymbol())
        {
            infoImg.src = "./Images/cross.png"
            infoText.textContent = "WIN!";
        }
         else if(winner.getSymbol()===player2.getSymbol())
        {
            infoImg.src ="./Images/circle.png"
            infoText.textContent = "WIN!";
        }
    }
    if(gameOver&&!winner){
        infoImg.src='';
        infoImg.alt='';
        infoText.textContent="IT'S A TIE";
    }

    const currentBoard = board.getBoard();
    boardButtons.forEach((button)=>{
        if(currentBoard[button.id]!==''&&button.childElementCount===0){
            const img = document.createElement('img');
            if(currentBoard[button.id]==='X'){
              img.src= "./Images/cross.png";
              button.appendChild(img);
            }
            if(currentBoard[button.id]==='0'){
                img.src = "./Images/circle.png";
                button.appendChild(img);
            }
        }
        if(currentBoard[button.id]===''&&button.childElementCount>0)
            {
                button.removeChild(button.firstChild);
            }
    });
}




const game = function(){
let activePlayer = player1;
let playerChoise;

function swtchActivePlayer()
{
activePlayer = activePlayer === player1 ? player2:player1;
}
function getActivePlayer(){
    return activePlayer;
}
function resetActivePlayer(){
    activePlayer = player1;
}



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
return {playRound,setPlayerChoise,getActivePlayer,resetActivePlayer};
}();







const resetGame = function resetGame(){
const resBut = document.querySelector('#new-game');
resBut.addEventListener('click',()=>{
    board.clearBoard();
    game.resetActivePlayer();
    winner=undefined;
    gameOver=false;
    buildDOM();
})

}();






