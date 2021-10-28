'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function createNickname(accs) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
}
createNickname(accounts);

///////////////////////
/// UPDATE UI

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const sumIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const sumOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + Math.abs(cur), 0);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, cur) => acc + Math.abs(cur), 0);

  labelSumIn.textContent = `${sumIn}€`;
  labelSumOut.textContent = `${sumOut}€`;
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};
///////////////////////
/// LOGIN
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount && currentAccount.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '1';
    updateUI(currentAccount);
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

///////////////////////
/// TRANSFER MONEY

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const transferTo = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const amount = +inputTransferAmount.value;

  if (
    transferTo &&
    transferTo !== currentAccount &&
    amount > 0 &&
    amount <= currentAccount.balance
  ) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);

    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
});

///////////////////////
/// REQUEST LOAN

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  const isApproved = currentAccount.movements
    .filter(mov => mov > 0)
    .some(mov => mov > amount * 0.1);

  if (amount > 0 && isApproved) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

///////////////////////
/// CLOSE ACCOUNT

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc === currentAccount);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

///////////////////////
/// SORT
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  const sortMov = [...currentAccount.movements].sort((a, b) => a - b);
  if (!sorted) {
    displayMovements(sortMov);
    sorted = !sorted;
  } else {
    displayMovements(currentAccount.movements);
    sorted = !sorted;
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach((value, key) => {
//   console.log(`${key}: ${value}`);
// });

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const sorted = [...movements].sort((a, b) => a - b);
// console.log(sorted);
// console.log(movements);
// const movUunique = new Set(movements).forEach(el => console.log(el));

/////////////////////////////////////////////////
// movements.forEach(mov => {
//   mov > 0
//     ? console.log(`Deposit ${mov}`)
//     : console.log(`Credit ${Math.abs(mov)}`);
// });
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);
// const movTotal = movs => movs.reduce((acc, cur) => acc + cur, 0);
// console.log(movTotal(movements));

// const maxValue = movements.reduce((acc, cur) => {
//   return (acc = cur > acc ? cur : acc);
// }, -Infinity);
// const minValue = movements.reduce(
//   (acc, cur) => (cur < acc ? cur : acc),
//   Infinity
// );

// console.log(maxValue);
// console.log(minValue);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(dogAge =>
//     dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
//   );
//   const adultDogs = humanAges.filter(age => age >= 18);
//   // const average = Math.round(
//   //   adultDogs.reduce((acc, cur) => acc + cur, 0) / adultDogs.length
//   // );
//   const average = adultDogs.reduce(
//     (acc, cur, i, arr) => acc + cur / arr.length,
//     0
//   );
//   return average;
// };

// const calcAverageHumanAge = function (ages) {
//   return ages
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// const ueToUsd = 1.1;
// const totalDepositInUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * ueToUsd)
//   .reduce((acc, cur) => acc + cur, 0);

// console.log(totalDepositInUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const totalSum = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, cur) => acc + cur, 0);

// console.log(totalSum);

// const arr = Array.from({ length: 4 }, (x, i) => i + 1);
// console.log(arr);

// const arr = Array.from({ length: 100 }, (_, i) => i + 1);
// console.log(arr);

// document.querySelector('.logo').addEventListener('click', () => {
//   const total = [...document.querySelectorAll('.movements__value')]
//     .map(el => parseInt(el.textContent))
//     .reduce((acc, cur) => acc + cur, 0);
//   // const total = Array.from(document.querySelectorAll('.movements__value'))
//   //   .map(el => parseInt(el.textContent))
//   //   .reduce((acc, cur) => acc + cur, 0);
//   console.log(total);
// });

// const bankTotal = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 0)
//   .reduce((acc, cur) => acc + cur, 0);
// // console.log(bankTotal);

// const depGreateThen1000 = accounts
//   .flatMap(el => el.movements)
//   .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);

// // const depGreateThen1000 = accounts
// //   .flatMap(el => el.movements)
// //   .filter(el => el > 1000).length;
// // console.log(depGreateThen1000);

// const sum = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, cur) => {
//       if (cur > 0) {
//         acc.deposit++;
//         acc.depositSum += cur;
//         return acc;
//       } else {
//         acc.withdrawal++;
//         acc.withdrawalSum += Math.abs(cur);
//         return acc;
//       }
//     },
//     {
//       deposit: 0,
//       withdrawal: 0,
//       depositSum: 0,
//       withdrawalSum: 0,
//     }
//   );
// console.log(sum);

// console.log(accounts.flatMap(acc => acc.movements).length);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.


GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1
dogs.forEach(
  dog => (dog.recommendedFood = Math.round(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(
//   sarahsDog.curFood > sarahsDog.recommendedFood * 0.9 &&
//     sarahsDog.curFood < sarahsDog.recommendedFood * 1.1
// );

// 3
const { tooMuch, tooLittle } = dogs.reduce(
  (acc, cur) => {
    if (cur.recommendedFood * 0.9 > cur.curFood) {
      acc.tooLittle.push(cur);
      return acc;
    } else if (cur.curFood > cur.recommendedFood * 1.1) {
      acc.tooMuch.push(cur);
      return acc;
    } else {
      return acc;
    }
  },
  { tooMuch: [], tooLittle: [] }
);
const ownersEatTooLittle = tooLittle.flatMap(dog => dog.owners);
const ownersEatTooMuch = tooMuch.flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);
// console.log(ownersEatTooMuch);

// 4

// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too much!`);

// 5
console.log(dogs.find(dog => dog.curFood === dog.recommendedFood) || false);
console.log(
  dogs.find(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  ) && true
);

// 7

const dogsOK = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);

console.log(dogsOK);

// 8
const recomendRating = [...dogs].sort(
  (a, b) => a.recommendedFood - b.recommendedFood
);
console.log(recomendRating);
