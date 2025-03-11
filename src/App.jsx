import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayerSymbol(gameTurns) {
    let currentPlayer = 'X'

    if (gameTurns.length > 0 && gameTurns[0].playerSymbol === 'X') {
        currentPlayer = 'O'
    }

    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const {square, playerSymbol} = turn;
        const {row, col} = square
        gameBoard[row][col] = playerSymbol;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner = undefined;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayerSymbol = deriveActivePlayerSymbol(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            const currentPlayerSymbol = deriveActivePlayerSymbol(prevTurns);
            const currentPlayerName = players[currentPlayerSymbol];
            return [{square: {row: rowIndex, col: colIndex}, playerSymbol: currentPlayerSymbol, playerName: currentPlayerName}, ...prevTurns];
        });
    }

    function handleRematch() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayer => {
            return {
                ...prevPlayer,
                [symbol]: newName
            }
        })
    }

    return <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayerSymbol === 'X'}
                        handlePlayerNameChange={handlePlayerNameChange}/>
                <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayerSymbol === 'O'}
                        handlePlayerNameChange={handlePlayerNameChange}/>
            </ol>
            {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
            <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
    </main>
}

export default App
