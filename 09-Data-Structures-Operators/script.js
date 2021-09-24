'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

function displayMessage(msg) {

    msg
      .split('+')
      .map(el => {
          const [status, from, to, time] = el.split(';');
          return [
            status.split('_').map(el => el.startsWith('Delayed') ? `🔴 ${el}`: el).join(' ').trim(),
            `from ${from.slice(0, 3).toUpperCase()}`,
            `to ${to.slice(0, 3).toUpperCase()}`,
            `(${time.replace(':', 'h')})`
          ].join(' ').padStart(45)
      })
      .forEach(el => console.log(el))

}
displayMessage(flights)

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)



// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
};



/*
const passenger = 'jessica ann smith davis';
const redactPass = passenger
    .split(' ')
    // .map(el => el[0].toUpperCase() + el.slice(1))
    .map(el =>  el.toLowerCase().replace(el[0], el[0].toUpperCase()))
    .join(' ');
console.log(redactPass)

const maskCreditCard = function(number) {
  return String(number).slice(-4).padStart(String(number).length - 4, '+')
}
console.log(maskCreditCard(1234567812341234))

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  const text = document.querySelector('textarea').value


  text
    .split('\n')
    .map(el => el.trim().toLowerCase())
    .map(el => el.split('_')
    .map((word, i) => i !==0 ? word.replace(word[0], word[0].toUpperCase()) : word)
    .join(''))
    .forEach((str, i) => {
      console.log(str.padEnd(20, ' ') + '✅'.repeat(i + 1))
    })

})



///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

/*
///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (let [index, item] of menu.entries()) {
  console.log(`${index}: ${item}`)
}

///////////////////////////////////////
// Coding Challenge #1


We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/*
///////////////////////////////////////
// Coding Challenge #3


Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀


const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1
const events = [...new Set([...gameEvents.values()])];
console.log(events);

// 2
console.log(gameEvents);
gameEvents.delete(64);
console.log(gameEvents);

// 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4
for (let [time, event] of gameEvents) {
  console.log(
    `${time <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${time}: ${event}`
  );
}


// MAPs
const quezze = new Map([
  ['question', "What's the best langauge?"],
  [1, 'C++'],
  [2, 'PhP'],
  [3, 'JS'],
  ['answer', 3],
  [true, 'correct'],
  [false, 'wrong answer!'],
]);
console.log(quezze.get('question'));
const answer = +prompt('Yor answer?');

for (let [key, value] of quezze.entries()) {
  if (typeof key === 'number') {
    console.log(value);
  }
}

console.log(quezze.get(quezze.get('answer') === answer));
console.log(quezze);

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firemze, Italy');
rest.set(2, 'Lisbon, Portugal');
rest
  .set('categories', [1, 2, 3])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'we are closed');
console.log(rest);
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete('categories');
console.log(rest.has('categories'));
console.log(rest.size);
rest.clear();
console.log(rest.size);


// SETS
const orderSet = new Set(['pizza', 'pasta', 'pizza', 'rizotto', 'pasta']);

console.log(orderSet.size);
console.log(orderSet.has('pizza'));
console.log(orderSet.has('bread'));
orderSet.add('garlic').add('garlic');
console.log(orderSet);
orderSet.delete('pizza');
console.log(orderSet);
orderSet.clear();
console.log(orderSet);
for (let order of orderSet) {
  console.log(order);
}
orderSet.forEach(order => console.log(order));
const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];
console.log([...new Set(staff)]);
console.log(new Set(staff).size);
console.log(new Set('Hello my friends, it is an absolutly perfect').size);
console.log(new Set('Pavel Mezencev').size);


///////////// CHALLENGE 2
// 1
for (let [i, name] of game.scored.entries()) {
  // console.log(`Goal ${i + 1}: ${name}`)
}

// 2
let sum = 0;
for (let odd of Object.values(game.odds)) {
  sum += odd
}
console.log(`Average ${Math.round(sum / Object.values(game.odds).length)}`)

// 3
for (let [team, value] of Object.entries(game.odds)) {
  console.log(`Odd of victory ${game[team] || 'draw'}: ${value}`)
}

// 4
const scorers = {}
for (let [key, value] of game.scored.entries()) {
  scorers[value] ? scorers[value]++ : scorers[value] = 1
}
console.log(scorers)


// 1
const [players1, players2] = game.players;


// 2
const [gk, ...fieldPlayers] = players1;

// 3 
const allPlayers = [...players1, ...players2];

//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
console.log(players1Final);

// 5

const { odds: {team1, x: draw, team2} } = game;
console.log(team1, team2, draw)

// 6 
function printGoals(...players) {
  players.forEach((player, i) => {
    console.log(`${player} goal! ${i + 1}`)
  })
}

printGoals(...game.scored)
printGoals('Davies', 'Muller', 'Lewandowski','Kimmich')

// 7

team1 < team2 && console.log('team 1 is more likely to win')
team1 > team2 && console.log('team 2 is more likely to win')

///////////////
//SPREAD OPERATOR

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr)
const newArr = [1, 2, ...arr];
console.log(newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]

const str = 'Pavel';
const letters = [...str, 'S'];
console.log(letters);

// const ingridients = [prompt('Let\' s make pasta! ingridient 1?'), prompt('ingridient 2?'),  prompt('ingridient 3?')];
// restaurant.orderPasta(...ingridients);

// Object
const newRestaurant = {
  ...restaurant,
  founder: 'Pavel',
  founded: 2021
}
// console.log(newRestaurant)

const {sat: weakends, ...weakdays} = restaurant.openingHours;
// console.log(weakends)
// console.log(weakdays)

// Functions

const add = function(...numbers) {
  return rest.reduce((acc, cur) => acc + cur, 0)
}
// console.log(add(2, 3))
// console.log(add(5, 3, 7, 2))
// console.log(add(8, 2, 5, 3, 2, 1, 4))


///////////////
//ARRAY OBJECTS
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(tags)

const {
  menu = [],
  starterMenu: starter = []
} = restaurant;
console.log(starter)

// Nested objects
const {fri: {open, close}} = restaurant.openingHours;
console.log(open, close);



///////////////
//ARRAY DESTRUCTURING


const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a, b, c)


//reasign trick
let [main, ,secondary] = restaurant.categories;
console.log(main, secondary);
[main, secondary] = [secondary, main]
console.log(main, secondary);

// nested destructuring

const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j);
const [i, , [j, k]] = nested;
// console.log(i, j, k);

// Default values
const [p, q, r = 10] = [8, 9];
console.log(p, q, r)
*/
