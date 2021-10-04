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

const getJSON = function (country, errMsg = 'Country does not exists') {
  return fetch(`https://restcountries.com/v3.1/name/${country}`).then(
    response => {
      if (!response.ok) throw new Error(`${err.errMsg} ${response.status}`);

      return response.json();
    }
  );
};

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
      console.log(data[0]?.borders);
      const neighbour = data[0]?.borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(neighbour);
    })
    .then(response => response.json())
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

btn.addEventListener('click', function () {
  getCountryData('russia');
});

getCountryData('australia');
