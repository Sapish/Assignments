// Hello.
// This is a set of exercises.
// The idea is to practice a few things at a time.
// You do this by writing your answer after a task is given (see the example).
// Use the concepts from our sylabus. 

// DO NOT change the provided code unless the task specifically says to do so.

/* -----------------------------------------------------------------------------
    Task: Example
    Write code to print all the names in the list, one name per line
*/
console.log("Task: Example");
const people = ["Tony", "Christian", "Håkon"]

for (let index = 0; index < people.length; index++) {
    let person = people[index];
    console.log(person);
}

/* -----------------------------------------------------------------------------
    Task: A
    create a function that "draws" a tree of a given height.
    Example the following is a tree of height 5

           5        *
           4       ***
           3      *****
           2     *******
           1        x
*/
console.log("Task: A");

function drawTree(height) {
    for (let i = 1; i <= height; i++) {
        let leaves = '';
        let spaces = '';

        for (let j = 0; j < height - i; j++) {
            spaces += ' ';
        }
        for (let k = 0; k < (2 * i - 1); k++) {
            leaves += '*';
        }
        console.log(spaces + leaves);
    }
    let treeStump = '';
    for (let j = 0; j < height - 1; j++) {
        treeStump += ' ';
    }
    console.log(treeStump + 'x');
}
drawTree(5);

/* -----------------------------------------------------------------------------
    Task: B

    Write a function that "draws" an arrow of a given size.
    Example: This is an arrow of size 3.

    *
    * *
    * * *
    * *
    * 
*/
console.log("Task: B");

function drawArrow(size) {
    for (let i = 1; i <= size; i++) {
        let stars = '';

    for (let j = 1; j <= i; j++) {
        stars += '*';
        if (j < i) {
            stars += ' ';
        }
    }
    console.log(stars);
    }

for (let i = size - 1; i >= 1; i--) {
    let stars = '';

    for (let j = 1; j <= i; j++) {
        stars += '*';
        if (j < i) {
            stars += ' ';
        }
    }
    console.log(stars);
  }
}
drawArrow(3);
/* -----------------------------------------------------------------------------
    Task: C
    Write a function that draws a box of n by m dimensions. Take into acount the diffrence in aspectratio.

    Example: This is a aproximatly a 2 by 2 box. 
    +--------+
    |        |
    |        |
    +--------+
*/
console.log("Task: C");



/* -----------------------------------------------------------------------------
    Task: D
    Write a function that returns true if a word is a Heterogram.   
*/
console.log("Task: D");



/* -----------------------------------------------------------------------------
    Task: E
    Write a function that returns true if two words are Anagrams.
*/
console.log("Task: E");