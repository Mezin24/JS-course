'use strict';
const btnsOpen = document.querySelectorAll('.show-modal');
const btnClose = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

const closeModal = () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};

btnsOpen.forEach(btn => {
  btn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  });
});

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
