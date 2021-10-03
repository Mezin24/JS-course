'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//// XMLHTTPRequest

function displayCountry(country, isNeighbor = false) {
  const population = new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'long',
    maximumFractionDigits: 1,
  }).format(country.population);

  const language = Object.values(country.languages)[0];
  const currencie = Object.values(country.currencies)[0].name;

  const html = `
        <article class="country ${isNeighbor ? 'neighbour' : ''}">
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

function getCountryData(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.response);

    displayCountry(data);
    countriesContainer.style.opacity = 1;

    const neighbours = data.borders;

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
          displayCountry(data, true);
        });
      }
    });
  });
}

// getCountryData('turkey');
getCountryData('russia');
