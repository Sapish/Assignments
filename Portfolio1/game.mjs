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
    MAKE_CHOICE: "Choose either a word or a letter: ",
    REPLAY: "If you want to play again, type [replay]. If you want to quit type [exit]: "
};

let correctWord = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)].toLowerCase();
let numberOfCharInWord = correctWord.length;
let guessedWord = "".padStart(correctWord.length, "_"); 
let wordDisplay = "";
let isGameOver = false;
let wasGuessCorrect = false;
let wrongGuesses = [];

let totalGuesses = 0;
let correctGuesses = 0;
let incorrectGuesses = 0;

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

function showStats() {
    console.log(ANSI.COLOR.CYAN + "\nGame Stats: ");
    console.log(`Word to guess: ${correctWord}`);
    console.log(`Total guesses: ${totalGuesses}`);
    console.log(`Correct guesses: ${correctGuesses}`);
    console.log(`Incorrect guesses: ${incorrectGuesses}`);
    console.log(ANSI.RESET);
}

while (!isGameOver) {

    console.log(ANSI.CLEAR_SCREEN);
    console.log(drawWordDisplay());
    console.log(drawList(wrongGuesses, ANSI.COLOR.RED));
    console.log(HANGMAN_UI[wrongGuesses.length]);

    const answer = (await askQuestion(PLAYER_TEXT.MAKE_CHOICE)).toLowerCase();

    totalGuesses++;

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
            incorrectGuesses++;
        } else {
            correctGuesses++;
         if (guessedWord == correctWord) {
            isGameOver = true;
            wasGuessCorrect = true;
        }
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


    if (wasGuessCorrect) {
        console.log(ANSI.COLOR.YELLOW + PLAYER_TEXT.YOU_WIN);
    } else {
        console.log(PLAYER_TEXT.YOU_LOSE);
}

showStats();

process.exit();

function ifPlayerGuessedLetter(answer) {
    return answer.length == 1
}


