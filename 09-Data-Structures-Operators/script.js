'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
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
    console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`)
  }
};


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

/*
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

