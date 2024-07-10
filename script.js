// there is 3x3 gird
// thow players place their symbol at any place on the grid
// first turn is player 1 he places his symbol
// then player two place his
// then reapeat until there is 3 symobls in a row.
// 
let gameOver = false;

function Board(){
let board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
];

function getBoard(){
    return board;
}
function placeSymbol(symbol,x,y){
 board[x][y]= symbol;
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
player1.setSymbol('x');
player2.setSymbol('o');


let activePlayer = player1;

let round = 1;

function swtchActivePlayer()
{
activePlayer = activePlayer === player1 ? player2:player1;
}
console.log(`${activePlayer.getPlayerName()} choose your cell`);
let playerChoise = [1,1];
function setPlayerChoise(arr){
playerChoise = arr;
}

function checkWin(){
 const patternRowPlayer1 = /x..x..x/;
 const patternColumnPlayer1 = /xxx/;
 const patternDiagonalPlayer1 = /x...x...x/;
 const patternDiagonal2Player1 =/x.x.x/;
 const patternRowPlayer2 = /o..o..o/;
 const patternColumnPlayer2 = /ooo/;
 const patternDiagonalPlayer2 = /o...o...o/;
 const patternDiagonal2Player2 =/o.o.o/;
 let string = board.getBoard().flat().join('');
 console.log(string);
 if (patternColumnPlayer1.test(string)||patternDiagonalPlayer1.test(string)||patternRowPlayer1.test(string)||patternDiagonal2Player1.test(string)){
    alert('stas win');
    gameOver=true;
    return;
 }
 if (patternColumnPlayer2.test(string)||patternDiagonalPlayer2.test(string)||patternRowPlayer2.test(string)||patternDiagonal2Player2.test(string)){
    alert('masha win');
    gameOver=true;
    return;
 }
 if(!string.includes('-')){
    alert('tie');
    gameOver=true;
    return;
 }
}

function playRound(){
    setPlayerChoise(prompt(`${activePlayer.getPlayerName()} input where you will put your symbol`).split('')) 
    board.placeSymbol(activePlayer.getSymbol(),playerChoise[0],playerChoise[1]);
    if(round>4){checkWin();}
    swtchActivePlayer();
    console.log(board.getBoard());
    round++;
}


return {playRound};
}
const game = GameController();
