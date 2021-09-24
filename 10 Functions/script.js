'use strict';
/*
const oneWord = function (str) {
  return str.replace(/ /g, '');
};
console.log(oneWord('Pavel Mezencev'));

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

console.log(upperFirstWord('Pavel Mezencev'));

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best language', upperFirstWord);
transformer('JavaScript is the best language', oneWord);
*/

/*
const greet = phrase => name => console.log(`${phrase} ${name}`);

const greetHey = greet('Hey');
const greetWelcome = greet('Welcome');
greetHey('Pavel');
greetWelcome('Pavel');
greetHey('Ivan');

const urlAdress = extension => domain =>
  console.log(`https://${domain}.${extension}`);
const ruUrl = urlAdress('ru');
const comUrl = urlAdress('com');

ruUrl('mail');
comUrl('google');
*/

// const manager = {
//   name: 'Pavel',
//   age: 34,
//   salaries: [],
//   recieved(sum, date) {
//     console.log(`${this.name} recieved ${sum} in ${date}`);
//     this.salaries.push(sum);
//   },
// };
// const trainer = {
//   name: 'Ksu',
//   age: 39,
//   salaries: [],
// };
// const cleaner = {
//   name: 'TP',
//   age: 50,
//   salaries: [],
// };

// manager.recieved(35, '1.09.21');
// manager.recieved(3, '12.10.21');
// manager.recieved.call(trainer, 40, '12.09.21');
// manager.recieved.call(cleaner, ...[20, '12.09.21']);

// const lufthansa = {
//   name: 'LH',
//   planes: 0,
//   buyPlane() {
//     console.log(this);
//     this.planes++;
//     console.log(this.planes);
//   },
// };

// lufthansa.buyPlane();
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//  Patrial application
// const addTax = (rate, value) => value + value * rate;
// const addTaxRus = addTax.bind(null, 0.13);

// console.log(addTax(0.13, 1));
// console.log(addTaxRus(2));

// const addTax = rate => value => value + value * rate;
// const addTaxRus = addTax(0.13);
// console.log(addTaxRus(2));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/*
const poll = {
  question: "What's your favourite programming language?",
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = +prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    );
    if (answer >= 0 && answer <= 3) {
      this.answers[answer]++;
      this.displayResults('string');
    } else {
      console.log(`${answer} is a wrong value!`);
    }
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers || this);
    } else if (type === 'string') {
      console.log(
        `Poll results are ${this.answers?.join(', ') || this.join(', ')}`
      );
    }
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call([5, 2, 3]);
poll.displayResults.call([1, 5, 3, 9, 6, 1]);
poll.displayResults.call([5, 2, 3], 'string');
poll.displayResults.call([1, 5, 3, 9, 6, 1], 'string');
*/
let a = 1;
//CLOSERS
const counter = function () {
  let count = 0;
  return function () {
    return ++count;
  };
};
const counter1 = counter();
const counter2 = counter();

console.dir(counter);
console.dir(counter1);
