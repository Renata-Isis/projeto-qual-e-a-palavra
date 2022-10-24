// Css
import './App.css';

// React
import {useCallback, useEffect, useState} from 'react';

// Data
import { wordList } from './data/words';

// Components 
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//Estágios do jogo
const stages = [
  {id: 1, name:'start'},
  {id: 2, name:'game'},
  {id: 3, name:'end'}
];

const guessesQtd = 3;

function App() {
  //Iniciando o estagio do jogo com o start
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(()=> {
    //Pegando as chaves do array de objetos words
    const categories = Object.keys(words);

    // Fazendo as chaves do array de objetos words aparecerem de forma randomica
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Fazendo as palavras aparecerem de forma randomica,pegando o array de obj wordsList e acessando uma categoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    //Retornando a palava e a categoria de forma desestruturada
    return {word, category};
  }, [words]);

  //Iniciando o jogo 
  const startGame = useCallback(()=> {
    clearLettersStates();
    //Pegando a palavra e a categoria vindas da função
    const {word, category} = pickWordAndCategory();

    //Recebendo minha palavra aleatoria e quebrando ela em letras
    let wordLetter = word.split("");
    wordLetter = wordLetter.map((letter)=> letter.toLowerCase());
    console.log(wordLetter);

    //Setando os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetter);

    setGameStage(stages[1].name)
  }, [pickWordAndCategory]);

  //Verificar a letra digitada
  const verifyLetter = (letter)=> {
    const normalizeLetter = letter.toLowerCase();

    //Verificando se a letra já foi utilizada
    if(guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)) {
      return 
    }

    if(letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizeLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizeLetter
      ]);

      //Diminuindo as tentativas
      setGuesses((actualGuesses)=> actualGuesses - 1);
    }
  }

  const clearLettersStates = ()=> {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  //Useefect é utilizado para monitorar dados, toda vez que os dados mudarem a função é chamada
  useEffect(()=> {
    if(guesses <= 0) {
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //Unificando as letras, para que a condição de vitoria seja alcançada da forma correta
  useEffect(()=> {
    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore)=> (actualScore += 100));

      startGame();
    }
  }, [guessedLetters, letters, startGame])

    //Recomeçar o jogo
    const retry = ()=> {
      //Zerando o score e reiniciando as 3 tentativas
      setScore(0);
      setGuesses(guessesQtd);
      setGameStage(stages[0].name);
    }

  return (
    <div className="App">
      {/* Exibindo a renderização do componente conforme estágio do jogo */}
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
      
    </div>
   
  );
}

export default App;
