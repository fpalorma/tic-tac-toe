/* eslint-disable react/prop-types */
import { useState } from "react";
import confetti from "canvas-confetti";
import {Square} from "./components/Square"
import { TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board";
import { WinnerModal } from "./components/Winner";





function App() {
  
  
  const [board,setBoard] = useState(Array(9).fill(null));
  const [turn,setTurn] = useState(TURNS.X)
  //Null es que no hay ganador, y false es empate
  const [winner, setWinner] = useState(null)

  

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)
  }



  const updateBoard = (index)=>{
//Si la posicion ya tiene algo, no la actualizamos
if(board[index] || winner) return

//Actualizar el tablero
    const newBoard =[...board];
    newBoard[index] = turn;
    setBoard(newBoard);
//Cambiar el turno
    const newTurn = turn === TURNS.X? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //revisamos si hay ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  return(
    <main className="board">

     <h1>Tic tac toe</h1>

     <button onClick={resetGame}>Volver a empezar</button>

     <section className="game">
      {
        board.map((square,index)=>{
          return(
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
              </Square>
          )
        })
      }
     </section>
<section className="turn">
  <Square isSelected={turn === TURNS.X}>
    {TURNS.X}
  </Square>
  <Square isSelected={turn === TURNS.O}>
    {TURNS.O}
  </Square>
</section>
<WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
