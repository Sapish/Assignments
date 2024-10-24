import { print, askQuestion } from "./io.mjs"
import { ANSI } from "./ansi.mjs";
import DICTIONARY from "./language.mjs";
import showSplashScreen from "./splash.mjs";

const GAME_BOARD_SIZE = 3;
const PLAYER_1 = 1;
const PLAYER_2 = -1;

const MENU_CHOICES = {
    MENU_CHOICE_START_GAME: 1,
    MENU_CHOICE_SHOW_SETTINGS: 2,
    MENU_CHOICE_EXIT_GAME: 3
};

const NO_CHOICE = -1;

let language = DICTIONARY.en;
let gameboard;
let currentPlayer;


clearScreen();
showSplashScreen();
setTimeout(start, 2500);



//#region game functions -----------------------------

async function start() {

    do {

        let chosenAction = NO_CHOICE;
        chosenAction = await showMenu();

        if (chosenAction == MENU_CHOICES.MENU_CHOICE_START_GAME) {
            await runGame();
        } else if (chosenAction == MENU_CHOICES.MENU_CHOICE_SHOW_SETTINGS) {
            let settingsChoice = await showSettingsMenu();
            if (settingsChoice == 1) {
                language = DICTIONARY.no
            } else if (settingsChoice == 2) {

            }
        } else if (chosenAction == MENU_CHOICES.MENU_CHOICE_EXIT_GAME) {
            clearScreen();
            process.exit();
        }

    } while (true)

}

async function runGame() {

    let isPlaying = true;

    while (isPlaying) { 
        initializeGame();
        isPlaying = await playGame();
    }
}

async function showMenu() {

    let choice = -1;
    let validChoice = false;

    while (!validChoice) {
        clearScreen();
        print(ANSI.COLOR.YELLOW + "MENU" + ANSI.RESET);
        print("1. Play Game");
        print("2. Settings");
        print("3. Exit Game");
        print("4. Player vs computer");

        choice = await askQuestion("");

        
        if ([MENU_CHOICES.MENU_CHOICE_START_GAME, MENU_CHOICES.MENU_CHOICE_SHOW_SETTINGS, MENU_CHOICES.MENU_CHOICE_EXIT_GAME].includes(Number(choice))) {
            validChoice = true;
        } else if (choice === 4) {
            validChoice = true;
        }
        if (choice === 1) {
            await runGame(false);
        } else if (choice === 4) {
            await runGame(true);
        }
    }

    return choice;
}

async function showSettingsMenu() {
    let choice = -1;
    let validChoice = false;

    while (!validChoice) {
        clearScreen();
        print(ANSI.COLOR.YELLOW + "SETTINGS" + ANSI.RESET);
        print("1. Language");
        print("2. Back to Main Menu");

        choice = await askQuestion("");

        if ([1, 2].includes(Number(choice))) {

        }
    }
    return choice;
}

async function playGame(isAi = false) {
    
    let outcome;
    do {
        clearScreen();
        showGameBoardWithCurrentState();
        showHUD();

        if (currentPlayer === PLAYER_2 && isAi) {
            const aiMove = getAiMove();
            updateGameBoardState(aiMove);
        } else {
        let move = await getGameMoveFromCurrentPlayer();
        updateGameBoardState(move);
        outcome = evaluateGameState();
        }

      changeCurrentPlayer();
    } while (outcome == 0);

    showGameSummary(outcome);

    return await askWantToPlayAgain();
}

function getAiMove() {
    for (let row = 0; row < GAME_BOARD_SIZE; row++) {
        for (let col = 0; col < GAME_BOARD_SIZE; col++) {
            if (gameboard[row][col] === 0) {
                gameboard[row][col] = PLAYER_2;
                if (evaluateGameState() === PLAYER_2) {
                    gameboard[row][col] = 0;
                    return [row, col];
                }
                gameboard[row][col] = 0;
            }
        }
    }


for (let row = 0; row < GAME_BOARD_SIZE; row++) {
    for (let col = 0; col < GAME_BOARD_SIZE; col++) {
        if (gameboard[row][col] === 0) {
            gameboard[row][col] = PLAYER_1;
            if (evaluateGameState() === PLAYER_1) {
                gameboard[row][col] = 0;
                return [row, col];
            }
            gameboard[row][col] = 0;
        }
    }
}

const availableMoves = [];
for (let row = 0; row < GAME_BOARD_SIZE; row++) {
    for (let col = 0; col < GAME_BOARD_SIZE; col++) {
        if (gameboard[row][col] === 0) {
            availableMoves.push([row, col]);
            }
        }
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

async function askWantToPlayAgain() {
    let answer = await askQuestion(language.PLAY_AGAIN_QUESTION);
    let playAgain = true;
    if (answer && answer.toLowerCase()[0] != language.CONFIRM) {
        playAgain = false;
    }
    return playAgain;
}

function showGameSummary(outcome) {
    clearScreen();

    if (outcome === -2) {
        print("Its a draw");
    } else {
        let winningPlayer = (outcome > 0) ? 1 : 2;
        print("Winner is player " + winningPlayer);
    }
    showGameBoardWithCurrentState();
    print("GAME OVER");
}

function changeCurrentPlayer() {
    currentPlayer *= -1;
}

function evaluateGameState() {
    let winner = 0;
    let sum = 0;
    let gameDraw = true;

    for (let row = 0; row < GAME_BOARD_SIZE; row++) {
        for (let col = 0; col < GAME_BOARD_SIZE; col++) {
            if (gameboard[row][col] === 0) {
                gameDraw = false;
                break;
            }
        }
    }
    if (gameDraw) {
        return -2;
    }

    for (let row = 0; row < GAME_BOARD_SIZE; row++) {
        sum = 0;
        for (let col = 0; col < GAME_BOARD_SIZE; col++) {
            sum += gameboard[row][col];
        }

        if (Math.abs(sum) == 3) {
            winner = sum / 3;
            break;
        }
    }

if (winner === 0) {
    for (let col = 0; col < GAME_BOARD_SIZE; col++) {
        sum = 0;
        for (let row = 0; row < GAME_BOARD_SIZE; row++) {
            sum += gameboard[row][col];
        }
        if (Math.abs(sum) === 3) {
            winner = sum / 3;
            break;
        }
    }
}
if (winner === 0) {
    sum = 0;
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        sum += gameboard[i][i];
    }
    if (Math.abs(sum) === 3) {
        winner = sum / 3;
    }

    sum = 0;
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        sum += gameboard[i][GAME_BOARD_SIZE - 1 - i];
    }

    if (Math.abs(sum) === 3) {
        winner = sum / 3;
      }
    }
    return winner;
}

function updateGameBoardState(move) {
    const ROW_ID = 0;
    const COLUMN_ID = 1;
    gameboard[move[ROW_ID]][move[COLUMN_ID]] = currentPlayer;
}

async function getGameMoveFromCurrentPlayer() {
    let position = null;
    do {
        let rawInput = await askQuestion("Place your mark at: ");
        position = rawInput.split(" ");
    } while (isPositionValidOnBoard(position) == false)
    
    return [position[0] - 1, position[1] - 1];
}

function isPositionValidOnBoard(position) {

    if (position.length < 2) {
        return false;
    }

    const row = position[0] - 1;
    const col = position[1] - 1;

    if(row < 0 || row >= GAME_BOARD_SIZE || col < 0 || col >= GAME_BOARD_SIZE) {
        return false;
    }

    if (gameboard[row][col] !== 0) {
        return false;
    }
    return true;
}

function showHUD() {
    let playerDescription = "one (X)";
    if (PLAYER_2 == currentPlayer) {
        playerDescription = "two (O)";
    }
    print("Player " + playerDescription + " it's is your turn");
}

function showGameBoardWithCurrentState() {
    
    for (let currentRow = 0; currentRow < GAME_BOARD_SIZE; currentRow++) {
        let rowOutput = "";
        for (let currentCol = 0; currentCol < GAME_BOARD_SIZE; currentCol++) {
            let cell = gameboard[currentRow][currentCol];
            if (cell == 0) {
                rowOutput += "[_] ";
            }
            else if (cell > 0) {
                rowOutput += ANSI.COLOR.GREEN + "[X] " + ANSI.RESET;
            } else {
                rowOutput += ANSI.COLOR.RED + "[O] " + ANSI.RESET;
            }
        }

        print(rowOutput);
    }
}

function initializeGame() {
    gameboard = createGameBoard();
    currentPlayer = PLAYER_1;
}

function createGameBoard() {

    let newBoard = new Array(GAME_BOARD_SIZE);

    for (let currentRow = 0; currentRow < GAME_BOARD_SIZE; currentRow++) {
        let row = new Array(GAME_BOARD_SIZE);
        for (let currentColumn = 0; currentColumn < GAME_BOARD_SIZE; currentColumn++) {
            row[currentColumn] = 0;
        }
        newBoard[currentRow] = row;
    }

    return newBoard;

}

function clearScreen() {
    console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME, ANSI.RESET);
}


//#endregion

