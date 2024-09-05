import * as readlinePromises from 'node:readline/promises';
const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });

async function askQuestion(question) {
    return await rl.question(question);
}

import { ANSI } from './ansi.mjs';
import { HANGMAN_UI } from './graphics.mjs';

const RANDOM_WORDS = ["apple", "book", "cat", "dog", "elephant", "flower", "grape", "house", "ice", "jacket", "kite", "lamp",
     "moon", "notebook", "orange", "pencil", "queen", "river", "star", "tree"]
const PLAYER_TEXT = {
    YOU_WIN: "You won!",
    YOU_LOSE: "You lost!",
    MAKE_CHOICE: "Choose either a word or a letter: "
}
let correctWord = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)].toLowerCase();
let numberOfCharInWord = correctWord.length;
let guessedWord = "".padStart(correctWord.length, "_"); 
let wordDisplay = "";
let isGameOver = false;
let wasGuessCorrect = false;
let wrongGuesses = [];


function drawWordDisplay() {

    wordDisplay = "";

    for (let i = 0; i < numberOfCharInWord; i++) {
        if (guessedWord[i] != "_") {
            wordDisplay += ANSI.COLOR.GREEN;
        }
        wordDisplay = wordDisplay + guessedWord[i] + " ";
        wordDisplay += ANSI.RESET;
  
    }

    return wordDisplay;
}

function drawList(list, color) {
    let output = color;
    for (let i = 0; i < list.length; i++) {
        output += list[i] + " ";
    }

    return output + ANSI.RESET;
}


while (!isGameOver) {

    console.log(ANSI.CLEAR_SCREEN);
    console.log(drawWordDisplay());
    console.log(drawList(wrongGuesses, ANSI.COLOR.RED));
    console.log(HANGMAN_UI[wrongGuesses.length]);

    const answer = (await askQuestion(PLAYER_TEXT.MAKE_CHOICE)).toLowerCase();

    if (answer == correctWord) {
        isGameOver = true;
        wasGuessCorrect = true;
    } else if (ifPlayerGuessedLetter(answer)) {

        let guessedWordPlaceholder = guessedWord;
        guessedWord = "";

        let isCorrect = false;
        for (let i = 0; i < correctWord.length; i++) {
            if (correctWord[i] == answer) {
                guessedWord += answer;
                isCorrect = true;
            } else {
                
                guessedWord += guessedWordPlaceholder[i];
            }
        }

        if (!isCorrect) {
            wrongGuesses.push(answer);
        } else if (guessedWord == correctWord) {
            isGameOver = true;
            wasGuessCorrect = true;
        }
    }

  
    if (wrongGuesses.length == HANGMAN_UI.length-1) {
        isGameOver = true;
    }

}


console.log(ANSI.CLEAR_SCREEN);
console.log(drawWordDisplay());
console.log(drawList(wrongGuesses, ANSI.COLOR.RED));
console.log(HANGMAN_UI[wrongGuesses.length]);

const youWin = (PLAYER_TEXT.YOU_WIN);
if (wasGuessCorrect) {
    console.log(ANSI.COLOR.YELLOW + youWin);
}
console.log(PLAYER_TEXT.YOU_LOSE);
process.exit();

function ifPlayerGuessedLetter(answer) {
    return answer.length == 1
}


