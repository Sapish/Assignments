/*
    Hello.
    This is a problem set for you to work on
    The idea is to practice a few things at a time.
    You do this by writing your answer after a task is given (see the example).

    DO NOT change the provided code unless the task specifically says you should.
*/

/*
    Task: Example
    Write the code to print all the names in the list, one name per line.
*/
console.log("Task: Example");
const people = ["Tony", "Christian", "Håkon"];

for (let index = 0; index < people.length; index++) {
    let person = people[index];
    console.log(person);
}

/*
    Task: A
    Create variables for:
    * Hours in a day
    * Minutes in an hour
    * Seconds in a minute
    * The ratio between water and juice when mixing juice
    * Days until your birthday
    * Millimeters of rain that falls
*/
const HOURS_IN_A_DAY = 24;
const MINUTES_IN_AN_HOUR = 60;
const SECONDS_IN_A_MINUTE = 60;

let waterToJuiceRatio = 1;
let daysUntilMyBirthday = 54;
let millimetersOfRain = 3;

console.log("Task: A");


/*
    Task: B
    Use your variables (do not redefine them) from task A and calculate:
    * How many seconds are in 2.5 hours?
    * How many minutes are in 123 days?
    Remember to assign the answers to their own variables.
    Example:
    // How many deciliters are in 4.5 cups?
    const dlInCups = 2.36588;
    const amountOfDL = dlInCups * 4.5;
*/

const totalSecondsIn150Minutes = 2.5 * HOURS_IN_A_DAY * MINUTES_IN_AN_HOUR * SECONDS_IN_A_MINUTE;
const totalMinutesIn123Days = 123 * HOURS_IN_A_DAY * MINUTES_IN_AN_HOUR;

console.log("123 days in minutes", totalMinutesIn123Days);
console.log("2.5 hours in seconds", totalSecondsIn150Minutes);


console.log("Task: B");


/*
    Task: C
    Use a loop (for) to print the numbers from 1 to 10.
*/

for (let i = 1; i <= 10; i++) {
    console.log(i);
}
console.log("Task: C");

/*
    Task: D
    Use a loop (for) to print the numbers from 10 to 1.
*/

for (let i = 10; i >= 1; i--) {
    console.log(i);
}
console.log("Task: D");

/*
    Task: E
    This one is a bit more difficult, but you can do it ;)
    Use a loop (for) to print the even numbers between 1 and 100.
*/

for (let i = 2; i <= 100; i += 2) {
    console.log(i);
}
console.log("Task: E");

/*
    Task: F
    Use a while loop to print all the numbers from 0 to 100;
*/

let i = 0;
while (i <= 100) {
    console.log(i);
    i++;
}
console.log("Task: F");


/*
    Task: G
    Fill in the code needed to make the following code print the expected result.
*/
console.log("Task: G");

const DICTIONARY_ML = {
    no: {
        hello: "Hello there",
        howAreYou: "How are you doing?"
    },
    en: {
        Hello: "Hi",
        howAreYou: "How are you?",
        goodQuestionsLatly: "Gotten any good questions lately?"
    }
};

console.log(`${DICTIONARY.en.hello} Christian ${DICTIONARY.en.howAreYou}`); //-> Hi Christian, how are you?
console.log(`${DICTIONARY.en.goodQuestionsLatly}`); //-> Gotten any good questions lately?