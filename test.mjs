
//#region imports
import { createInterface } from 'readline/promises';
import {stdin as input, stdout as output} from 'process';
import { ANSI } from './Ansi.mjs';
//Drawing hangman
import { HANGMAN_UI } from './graphics.mjs';

//#endregion


//Chose a word
const wordOptions = ['cat', 'dog', 'rat', 'zebra', 'lizard', 'horse'];
let chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
let hiddenWord = Array(chosenWord.length).fill('_');
let numberOfAttempt = 12;
let guessedLetters = [];
let wrongGuesses = [];
let totalGuesses = 0;

const rl = createInterface({input, output});



console.log('Now we are going to play hangman, lets go!');
console.log('Here is your word: ' + hiddenWord.join(' ') + '\n');

const promptUser = async() => {
    const choice = await rl.question('Guess either a [word] or a [letter].');

    if (choice.toLowerCase() === 'letter') {
        await promptLetterGuess();
    } else if(choice.toLowerCase()=== 'word'){
        await promptWordGuess();
    } else {
        console.log('Enter either a [word] or [letter].')
        await promptUser();
    }
};

const promptLetterGuess = async () => {
    const letter = await rl.question('Guess a letter: ');

    if(letter.length !== 1 || !letter.match(/[a-z]/)) {
        console.log('The letter needs to be from the alphabet. (a-z)');
        return await promptLetterGuess();
    }

    totalGuesses++;

    if(guessedLetters.includes(letter)){
        console.log('Sorry, you have already guessed this letter.');
        return await promptLetterGuess();
    }

    guessedLetters.push(letter);

    if (chosenWord.includes(letter)){
        console.log('You chose the correct letter!');
        for (let i = 0; i < chosenWord.length; i++){
            if (chosenWord[i] === letter){
                hiddenWord[i] = letter;
            }
        }
    } else {
        numberOfAttempt--;
        wrongGuesses.push(letter);
        console.log('You guessed wrong, you have ' + numberOfAttempt + ' attempts left.');
        console.log(hangmanStages[12 - numberOfAttempt]);
    }
    
    console.log(hiddenWord.join(' ')+ '\n');
    if (!hiddenWord.includes('_')){
        console.log('Congratz, you guessed the correct word! Your full word was: ' + chosenWord)
        displayStats();
        return rl.close();
    }

    if (numberOfAttempt === 0){
        console.log('Hangman! The correct word is: ' + chosenWord);
        console.log(hangmanStages[12]);
        displayStats();
        return rl.close();
    }

    await promptUser();
};

const promptWordGuess = async() => {
    const wordGuess = await rl.question('Guess a word: ');

    totalGuesses++;

    if (wordGuess.toLowerCase() === chosenWord){
         console.log('Congratz! You guessed the correct word! Your full word was: ' + chosenWord);
         displayStats();
         rl.close();
    }else{
        numberOfAttempt--;
        wrongGuesses.push(wordGuess);
        console.log('You guessed wrong.');
        console.log(hangmanStages[10 - numberOfAttempt])

        if (numberOfAttempt === 0) {
            console.log('Hangman! The correct word is: ' + chosenWord);
            console.log(hangmanStages[10]);
            displayStats();
            rl.close();
        } else {
            await promptUser();
        }

    }
       
};

const displayStats = () => {
    console.log('\nGame Statistics: ');
    console.log('Total Guesses: ' + totalGuesses);
    console.log('Total false guesses: ' + wrongGuesses);
    console.log( 'Total false letters/words guessed: ' + wrongGuesses.join(', '));

};

promptUser(); //start game.
