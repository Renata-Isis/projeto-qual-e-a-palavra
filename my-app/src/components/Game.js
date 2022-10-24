import { useState, useRef } from 'react'
import './Game.css'

const Game = (
  {verifyLetter, 
    pickedWord, 
    pickedCategory, 
    letters, 
    guessedLetters, 
    wrongLetters, 
    guesses, 
    score,
  }) => {
    //State para letra digitada
  const [letter, setLetter] = useState("");
  
  //Hook de referencia, utilizei ele no input, é como se estivessemos selecionando ele no dom
  const letterInputRef = useRef(null);

  const handleSubmit = (e)=> {
    e.preventDefault();

    //Chamando a função verifyLetter e passando a letra digitada
    verifyLetter(letter);

    setLetter("");

    //Focando sempre no input após o envio da letra
    letterInputRef.current.focus();
  }

  return (
    <div className='game'>
      <p className='points'>
          <span>Potuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className='tip'>
          Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>

      <div className='wordContainer'>
        {/* Percorrendo o arrays de letras, se nesse array tiver a letra digitada, ela e mostrada na tela, caso contrário fica só o quadrado branco */}
        {letters.map((letter, i)=>
          guessedLetters.includes(letter) ? (
            <span key={i} className='letter'>{letter}</span>
          ) : (
            <span key={i} className='blankSquare'></span>
          )
        )};
      </div>
      <div className='letterContainer'>
        <p>Tente adivinhar a palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(e)=> setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
          <button>Jogar</button>
        </form>
      </div>

      <div className='wrongLettersContainer'>
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i)=> (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game