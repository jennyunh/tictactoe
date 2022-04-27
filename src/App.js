import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {


let matrixMax = 3;

  let initMatrix = [];
  for(let i=0; i< matrixMax; i++) {
      initMatrix[i] = new Array(matrixMax).fill(null);
  }





//States:
const [opening, setOpening] = useState(true);

const [current, setCurrent] = useState(processOpening);

const [matrix, setMatrix] = useState(initMatrix);

const [selCol, setSelCol] = useState(null);

const [selRow, setSelRow] = useState(null);

const [player, setPlayer] = useState(null);

const [winner, setWinner] = useState(false);



function processOpening() {
  
if (opening) {
  return "O"
}

else{
  return "X"
}

}



function boxClick(column, row){

 if (winner === false){

setSelCol(column);
setSelRow(row);

  //if there is nothing in the box
if (!matrix[column][row]){
  let matrixCopy = [...matrix];
matrixCopy[column][row] = current;
setMatrix(matrixCopy);
}

if (matrix[column][row] === "O") {
  setPlayer("O");
  setCurrent("X");
}

else{
  setPlayer("X");
  setCurrent("O");
}
}
}

useEffect(() => {

console.log("current is " + current + " player is " + player);

isWinner()

  })


function isWinner(){
  let vertical = true;
  let horizontal = true;
  let diagonal1 = true;
  let diagonal2 = true;

if (selCol === null || selRow === null) {return}

for (let i = 0; i < matrixMax; i++) {

if (matrix[selCol][i] !== player) {
  console.log("VERTICAL is false");
  vertical = false;
}

if (matrix[i][selRow] !== player) {
  console.log("ROW is false")
  horizontal = false;
}

if (matrix[i][i] !== player) {
  console.log("DIAGONAL FALSE");
  diagonal1 = false;
}

if (matrix[i][matrixMax - 1 - i] !== player) {
  console.log("DIAGONAL FALSE");
  diagonal2 = false;
}


}

if (vertical || horizontal || diagonal1 || diagonal2) {
  console.log("THERE IS A WINNER: Player " + player)
  setWinner(true);
}

}





function resetGame(){
  setOpening(!opening);
 setCurrent(processOpening);

setMatrix(initMatrix);

setSelCol(null);

setSelRow(null);

setPlayer(null);

setWinner(false);

}

  return (

    <div className="App">


{matrix.map((val, column) => (
<div className="column">
  {val.map((val2, row) => 
  (<div onClick={() => {boxClick(column, row)}} className="matrixBox row">
    {matrix[column][row]}
  </div>)
  )}
  </div>) )}




     <h1>Tic Tac Toe</h1>


{
winner ? (<><h1>WINNER IS PLAYER {player}</h1><br></br>
<button onClick={resetGame}>Reset Game</button>
</>) : ("")

}



    </div>
  );
}

export default App;
