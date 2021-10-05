'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function displayCountry(country, className = '') {
  const population = new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'long',
    maximumFractionDigits: 1,
  }).format(country.population);

  const language = Object.values(country.languages)[0];
  const currencie = Object.values(country.currencies)[0].name;

  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${country.flags.png}" />
          <div class="country__data">
              <h3 class="country__name">${country.name.common}</h3>
              <h4 class="country__region">${country.region}</h4>
              <p class="country__row"><span>👫</span>${population}</p>
              <p class="country__row"><span>🗣️</span>${language}</p>
              <p class="country__row"><span>💰</span>${currencie}</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}

const renderCountry = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

//// XMLHTTPRequest
/*
function getCountryData(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.response);

    displayCountry(data);
    countriesContainer.style.opacity = 1;

    const neighbours = data.borders;
    if (neighbours.language === 0) return;

    neighbours.forEach((country, i) => {
      if (i <= 3) {
        const secondRequest = new XMLHttpRequest();
        secondRequest.open(
          'GET',
          `https://restcountries.com/v3.1/alpha/${country}`
        );
        secondRequest.send();

        secondRequest.addEventListener('load', function () {
          const [data] = JSON.parse(this.response);
          displayCountry(data, 'neighbour');
        });
      }
    });
  });
}
*/

// getCountryData('turkey');
// getCountryData('russia');

////////////////////
// CALL BACK HELL

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//////////////////
//Promises

// const getJSON = function (country, errMsg = 'Country does not exists') {
//   return fetch(`https://restcountries.com/v3.1/name/${country}`).then(
//     response => {
//       if (!response.ok) throw new Error(`${err.errMsg} ${response.status}`);

//       return response.json();
//     }
//   );
// };

// function getCountryData(country) {
//   return fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country does not exists ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       displayCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => displayCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error('Some problems!');
//       renderCountry(`Something went wrong 🔥🔥🔥 ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// }
function getCountryData(country) {
  return getJSON(country)
    .then(data => {
      displayCountry(data[0]);
      const neighbour = data[0].borders && data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(neighbour);
    })
    .then(data => displayCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong 🔥🔥🔥 ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}
// getCountryData('portugal');

// btn.addEventListener('click', function () {
//   getCountryData('russia');
// });

// getCountryData('russia');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Reload too often!`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return getJSON(data.country.toLowerCase());
//     })
//     .then(country => {
//       displayCountry(country[0]);
//     })
//     .catch(err => console.error(`Somethins went wrong! ${err.message}`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// whereAmI('52.508', '13.381');
// whereAmI('19.037', '72.873');
// whereAmI('-33.933', '18.474');

/*
console.log('Test started');
setTimeout(() => console.log(`0 sec passed`), 0);
Promise.resolve('Promise 1 resolved').then(res => console.log(res));
Promise.resolve('Promise 2 resolved').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test finished');
*/

// new Promise((res, rej) => {
//   console.log('Lottery draw is happening 💎');

//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       res('YOU WIN!!!! 🏆💰');
//     } else {
//       rej(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// })
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// const wait = sec => new Promise(res => setTimeout(res, sec * 1000));

// wait(3)
//   .then(() => {
//     console.log('after 3 sec');
//     return wait(1);
//   })
//   .then(() => console.log('After 1 sec'));

// const delay = sec => new Promise(res => setTimeout(res, sec * 1000));

// delay(1)
//   .then(() => {
//     console.log('After 1 sec');
//     return delay(1);
//   })
//   .then(() => {
//     console.log('After 2 sec');
//     return delay(1);
//   })
//   .then(() => {
//     console.log('After 3 sec');
//     return delay(1);
//   })
//   .then(() => {
//     console.log('After 4 sec');
//   });

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

const getPosition = () => {
  // return new Promise((res, rej) => {
  //   navigator.geolocation.getCurrentPosition(
  //     position => res(position),
  //     err => rej(new Error(err.message))
  //   );
  // });
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

// btn.addEventListener('click', () => {
//   getPosition()
//     .then(pos => {
//       whereAmI(pos.coords.latitude, pos.coords.longitude);
//     })
//     .then(data => console.log(data));
// });

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
const imageContainer = document.querySelector('.images');
const wait = sec => new Promise(res => setTimeout(res, sec * 1000));

const createImage = function (imgPath) {
  return new Promise(function (res, rej) {
    img = document.createElement('img');
    img.setAttribute('src', imgPath);
    img.classList.add('images');
    // document.querySelector('.images').append(img);

    img.addEventListener('load', () => {
      imageContainer.append(img);
      res(img);
    });

    img.addEventListener('error', () => {
      rej(new Error('Img not found'));
    });
  });
};
let img;

createImage('img/img-1.jpg')
  .then(data => {
    return wait(2);
  })
  .then(() => {
    img.style.display = 'none';
    return wait(2);
  })
  .then(() => {
    createImage('img/img-2.jpg');
    return wait(2);
  })
  .then(() => (img.style.display = 'none'))
  .catch(err => console.error(`Something went wrong ${err.message}`));

*/

// const whereAmI = function (lat, lng) {
//   return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Reload too often!`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return getJSON(data.country.toLowerCase());
//     })
//     .then(country => {
//       displayCountry(country[0]);
//     })
//     .catch(err => console.error(`Somethins went wrong! ${err.message}`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

async function whereAmI() {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (resGeo.status === 403) throw new Error('Problem getting location data');

    const location = await resGeo.json();
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${location.state}`
    );
    const [data] = await response.json();
    displayCountry(data);
    return `You are in the ${location.city}, ${location.country}. `;
  } catch (err) {
    // console.error(err.message);
    renderCountry(`Something went wrong. ${err.message}`);
    return err;
  } finally {
    countriesContainer.style.opacity = 1;
  }
}

// (async function () {
//   try {
//     console.log('1: Will get location');
//     const city = await whereAmI();
//     console.log(`2:${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   } finally {
//     console.log(`3: Finished getting location`);
//   }
// })();

// whereAmI().then(city => console.log(city));
// console.log('3: Finished getting location');
// console.log('FIRST');

function getJSON(url) {
  return fetch(url).then(data => data.json());
}

async function getThreeCapitals(c1, c2, c3) {
  const data = await Promise.all([
    getJSON(`https://restcountries.com/v3.1/name/${c1}`),
    getJSON(`https://restcountries.com/v3.1/name/${c2}`),
    getJSON(`https://restcountries.com/v3.1/name/${c3}`),
  ]);
  return console.log(data.map(c => c[0].capital[0]));
}

getThreeCapitals('russia', 'germany', 'usa');
