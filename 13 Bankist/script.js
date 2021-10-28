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
header.append(message);

const closeCookie = document.querySelector('.cookie-message .btn');

closeCookie.addEventListener('click', () => message.remove());

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
  const s1Coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   top: window.pageYOffset + s1Coords.top,
  //   left: window.pageXOffset + s1Coords.left,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
  // section1.scrollIntoView({ block: 'end', behavior: 'smooth' });
});

//////////////////////
// mouse events
/////////////////////

// const h1 = document.querySelector('h1');

// const h1Message = function () {
//   console.log('You came into h1 :D');
//   this.removeEventListener('mouseenter', h1Message);
// };

// h1.addEventListener('mouseenter', h1Message);

//////////////////////
// EVENTS PROPOGATION
/////////////////////

/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener(
    'click',
    function (e) {
      e.preventDefault();
      this.style.backgroundColor = randomColor();
      // e.stopPropagation();
      // console.log(e.currentTarget === this);
    }
    // true
  );
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
*/

//////////////////////
// PAGE NAVIGATION
/////////////////////
/*
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

nav.addEventListener('click', function (e) {
  navLinks.forEach((nav, i) => {
    if (e.target === nav) {
      e.preventDefault();
      document.querySelector(`#section--${i + 1}`);
      // .scrollIntoView({ behavior: 'smooth' });

      const sCoords = document
        .querySelector(`#section--${i + 1}`)
        .getBoundingClientRect();

      window.scrollTo({
        top: window.pageYOffset + sCoords.top,
        left: window.pageXOffset + sCoords.left,
        behavior: 'smooth',
      });
    }
  });
});
*/

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    e.preventDefault();

    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////
// DOM TRAVELING
/////////////////////

/*
// Children Els
const h1 = document.querySelector('h1');
// console.log(h1.childNodes);
// console.log(h1.children);
h1.lastElementChild.style.backgroundColor = 'orange';
h1.firstElementChild.style.color = 'orangered';

// Parents

// console.log(h1.parentElement);
// h1.parentElement.style.backgroundColor = 'orange';
h1.closest('.header').style.backgroundColor = 'orange';

// Sibilings

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

//////////////////////
// TABS
/////////////////////

const tabContainer = document.querySelector('.operations__tab-container');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  [...tabContainer.children].forEach((el, i) => {
    el.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');
  document.querySelectorAll('.operations__content').forEach(el => {
    el.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////
// Menu fade animation
/////////////////////

const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  const link = e.target;

  if (e.target.classList.contains('nav__link')) {
    const sibilings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibilings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////
// Sticky navigation (old and new ways)
/////////////////////
/*
const s1Coords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (window.scrollY > s1Coords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsObj = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsObj);
// observer.observe(section1);

/*
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: -navHeight + 'px',
});

headerObserver.observe(header);
*/

const navHeigth = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeigth}px`,
});

headerObserver.observe(header);

//////////////////////
// Scrolling
/////////////////////

const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//////////////////////
// LAZY LOADING IMAGES
/////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImage = function (entries, observer) {
  const [entry] = entries;
  const current = entry.target;

  if (!entry.isIntersecting) return;

  current.setAttribute('src', current.dataset.src);
  current.addEventListener('load', () => {
    current.classList.remove('lazy-img');
  });
  observer.unobserve(current);
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

//////////////////////
// SLIDER
/////////////////////

const slides = document.querySelectorAll('.slide');
const btnNext = document.querySelector('.slider__btn--right');
const btnPrev = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (dot) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  dot.classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
  document.querySelectorAll('.dots__dot').forEach((dot, i) => {
    if (i === curSlide) activateDot(dot);
  });
};
const nextSlide = function () {
  if (curSlide < slides.length - 1) {
    curSlide++;
  } else {
    curSlide = 0;
  }
  goToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

createDots();
goToSlide(0);

btnNext.addEventListener('click', nextSlide);

btnPrev.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log(e.target);
    const current = e.target.dataset.slide;
    curSlide = current;
    goToSlide(curSlide);
    activateDot(e.target);
  }
});
