/*
========================================
   Install AOS: npm install aos --save
========================================
*/ 

// Navigation menu open

const navOpen = document.querySelector('.nav__hamburger svg');
const navClose = document.querySelector('.close__toggle');
const navList = document.querySelector('.nav__list');
const menu = document.querySelector('.nav__menu');
// const navContainer = document.querySelector('.nav__menu');


navOpen.addEventListener('click', () => {
   menu.classList.add('open');
   document.body.classList.add('active');
   navList.style.display = 'block';
});

navClose.addEventListener('click', () => {
   menu.classList.remove('open');
   document.body.classList.remove('active');
   navList.style.display = 'none';
});


/*
=======================
   Pop Up
=======================
*/

const popUp = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');

if(popUp) {
   closePopup.addEventListener('click', () => {
      popUp.classList.add('hide__popup');
   });

   // Pop Up will show in 1s when reload website
   window.addEventListener('load', () => {
      setTimeout(() => {
         popUp.classList.remove('hide__popup');
      }, 1000);
   });
}

// Cách 2:

// const popUp = document.querySelector('.popup');
// const closePopup = document.querySelector('.popup__close');

// closePopup.onclick = () => {
//    popUp.classList.add('hide__popup');
// }

/*
=======================
   Fixed Navigation
=======================
*/


// Smooth Scroll
const scrollLink = document.querySelectorAll('.scroll-link');

Array.from(scrollLink).map( link => {
   link.addEventListener('click', event => {
      event.preventDefault();

      const id = event.currentTarget.getAttribute('href').slice(1);
      const element = document.getElementById(id);
      const navHeight = navBar.getBoundingClientRect().height;
      const fixNav = navBar.classList.contains('fix__nav');
      let position = element.offsetTop - navHeight;

      if (!fixNav) {
         position = position - navHeight;
      }

      window.scrollTo({
         left: 0,
         top: position,
      });

      // menu tablet & mobile
      menu.classList.remove('open');
      document.body.classList.remove('active');

      const mediaQuery = window.matchMedia("(max-width: 1024px)");
      if (mediaQuery.matches) {
         navList.style.display = 'none';
      }
   });
});

// Fix nav bar
const navBar = document.querySelector('.navigation');
const goToTop = document.querySelector('.goto-top');

window.addEventListener('scroll', event => {
   const scrollHeight = window.pageYOffset;
   const navHeight = navBar.getBoundingClientRect().height;

   if (scrollHeight > navHeight) {
      navBar.classList.add('fix__nav');
   } else {
      navBar.classList.remove('fix__nav');
   }

   // add go to top button
   if (scrollHeight > 300) {
      goToTop.classList.add('show-top');
   } else {
      goToTop.classList.remove('show-top');
   }
});


