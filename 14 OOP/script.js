'use strict';

// function User(name, birthyear) {
//   this.name = name;
//   this.birthyear = birthyear;
// }
// User.prototype.sayHi = function () {
//   console.log(`Hello ${this.name}`);
// };
// User.prototype.calcAge = function () {
//   console.log(this);
//   this.age = new Date().getFullYear() - this.birthyear;
//   console.log(`My name is ${this.name} and I am ${this.age} years old!`);
// };

// class User {
//   constructor(name, birthYear) {
//     this.name = name;
//     this.birthYear = birthYear;
//   }
//   sayHi() {
//     console.log(`Hello ${this.name}`);
//   }
//   calcAge() {
//     console.log(this);
//     this.age = new Date().getFullYear() - this.birthYear;
//     console.log(`My name is ${this.name} and I am ${this.age} years old!`);
//   }
// }

// const pavel = new User('Pavel', 1987);
// console.log(pavel);
// pavel.sayHi();
// pavel.calcAge();
// console.log(pavel);

// Array.prototype.unique = function () {
//   return [...new Set(this)].sort((a, b) => a - b);
// };
// Array.prototype.doublePop = function () {
//   return this.splice(0, this.length - 2);
// };

// const arr = [1, 1, 1, 2, 2, 4, 4, 1, 2, 3, 4, 2, 3];
// const arr1 = [1, 2, 3, 4, 5];
// console.log(arr.unique());
// console.log(arr1.doublePop());

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is accelerating by ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is breakin by ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw);
console.log(mercedes);
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
mercedes.accelerate();
