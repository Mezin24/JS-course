'use strict';

///////////////////////////////////////
// Modal window

// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.btn--close-modal');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const openModal = function () {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = function (e) {
  e.preventDefault();
  // document.body.style.position = 'fixed';
  document.body.style.overflow = 'hidden';
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  // document.body.style.position = '';
  document.body.style.overflow = '';
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

overlay.addEventListener('click', closeModal);

//////////////////////
// Cookie message
/////////////////////

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality and analitics <button class="btn">Got it!</btn>';
header.before(message);

const closeCookie = document.querySelector('.cookie-message .btn');

closeCookie.addEventListener('click', () => message.remove());

message.style.backgroundColor = 'darkgrey';
message.style.height = parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const html =
//   '<div class="cookie-message">We use cookied for improved functionality and analitics <button class="btn">Got it!</btn>';
// header.insertAdjacentHTML('beforebegin', html);

// const closeCookie = document.querySelector('.cookie-message .btn');

// closeCookie.addEventListener('click', () => {
//   closeCookie.parentElement.remove();
// });

//////////////////////
// SMOOTH SCROLLING
/////////////////////

const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnLearnMore.addEventListener('click', function () {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
});
