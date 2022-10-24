import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Word Secret</h1>
        <p>Clique no botão abaixo para iniciar o jogo</p>
        <button onClick={startGame}>Começar o jogo</button>

    </div>
  )
}

export default StartScreen