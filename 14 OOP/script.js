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

// function Car(make, speed) {
//   this.make = make;
//   this.speed = speed;
// }

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is accelerating by ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is breakin by ${this.speed} km/h`);
// };

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is accelerating by ${this.speed} km/h`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is breakin by ${this.speed} km/h`);
//   }
// }

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// console.log(bmw);
// console.log(mercedes);
// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.accelerate();

// const acc = {
//   owner: 'Pavel mezencev',
//   movements: [100, 200, 400, 300],

//   get latest() {
//     return [...this.movements].pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(acc.latest);
// console.log(acc);
// acc.latest = 50;
// console.log(acc.latest);
// console.log(acc);

class PersonCl {
  constructor(fullname, birthYear) {
    this.fullname = fullname;
    this.birthYear = birthYear;
  }

  greet() {
    console.log(`Hello, I am ${this.fullname}`);
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  set fullname(name) {
    if (name.includes(' ')) {
      this._fullname = name
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
    } else {
      alert(`${name} is not a fullname!`);
      this._fullname = 'Incognito';
    }
  }

  get fullname() {
    return this._fullname;
  }
}

class StudentCl extends PersonCl {
  constructor(fullname, birthYear, course) {
    super(fullname, birthYear);
    this.course = course;
  }
  greet() {
    console.log(`${this.fullname} study as a ${this.course}`);
  }
}

const pavel = new StudentCl('pavel mezencev', 1987, 'manager');
// console.log(pavel);
// pavel.greet();
// const ksu = new PersonCl('Ksu', 1980);

// pavel.greet();
// console.log(pavel.age);
// console.log(pavel.fullname);

// ksu.greet();
// console.log(ksu.age);
// console.log(ksu.fullname);

// const personProto = {
//   calcAge() {
//     return new Date().getFullYear() - this.birthYear;
//   },

//   init(name, birthYear) {
//     this.name = name;
//     this.birthYear = birthYear;
//   },
// };

// const pavel = Object.create(personProto, {
//   name: {
//     value: 'Pavel',
//     enumerable: true,
//     configurable: true,
//     writable: true,
//   },
//   birthYear: {
//     value: 1987,
//   },
// });
// console.log(pavel);
// pavel.init('Pavel', 1987);
// console.log(pavel);
///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is accelerating by ${this.speed} km/h`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is breakin by ${this.speed} km/h`);
//   }
//   get speedUS() {
//     return `${this.speed / 1.6} mi/h `;
//   }

//   set speedUS(val) {
//     this.speed = val * 1.6;
//   }
// }

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);
// const ford = new Car('Ford', 120);

// ford.accelerate();
// ford.accelerate();
// console.log(ford.speedUS);
// ford.accelerate();
// ford.brake();
// ford.accelerate();
// ford.speedUS = 100;
// ford.accelerate();
// console.log(ford.speedUS);

// function Person(name, birthYear) {
//   this.name = name;
//   this.birthYear = birthYear;
// }

// Person.prototype.calcAge = function () {
//   return new Date().getFullYear() - this.birthYear;
// };

// function Student(name, birthYear, course) {
//   Person.call(this, name, birthYear);
//   this.course = course;
// }

// Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;

// const pavel = new Student('Pavel', 1987, 'manager');
// console.log(pavel);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// function Car(make, speed) {
//   this.make = make;
//   this.speed = speed;
// }

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is accelerating by ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is breakin by ${this.speed} km/h`);
// };

// function EV(make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// }
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = Car;
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// console.log(tesla);
// tesla.chargeBattery(90);
// tesla.accelerate();

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;

    this._movements = [];
    this.local = navigator.language;

    // console.log(`Thanks for opening an account, ${owner}`);
  }

  getMovement() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
    return this;
  }
  withdrawal(val) {
    this.deposit(-val);
    return this;
  }
  _approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// console.log(acc1);

// acc1.deposit(250);
// acc1.withdrawal(140);
// console.log(acc1.getMovement());

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is accelerating ${this.speed} km\h`);
    return this;
  }
  breake() {
    this.speed -= 10;
    console.log(`${this.make} is breaking ${this.speed} km\h`);
    return this;
  }
}

class Ev extends Car {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 10;
    this.#charge -= 1;
    console.log(
      `${this.make} is accelerating ${this.speed} km\h and charge is ${
        this.#charge
      }`
    );
    return this;
  }
  chargeBattery(val) {
    this.#charge = val;
    console.log(`Charge: ${this.#charge}%`);
    return this;
  }
}

const rivian = new Ev('Rivian', 120, 23);
console.log(rivian);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .breake()
  .chargeBattery(70)
  .accelerate();
