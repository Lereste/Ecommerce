// Navigation menu open

const navOpen = document.querySelector('.nav__hamburger svg');
const navClose = document.querySelector('.close__toggle');
const navList = document.querySelector('.nav__list');
const menu = document.querySelector('.nav__menu');
const navContainer = document.querySelector('.nav__menu');


navOpen.addEventListener('click', () => {
   menu.classList.add('open');
   document.body.classList.add('active')
   navList.style.display = 'block';
});

navClose.addEventListener('click', () => {
   menu.classList.remove('open');
   document.body.classList.remove('active');
   navList.style.display = 'none';
});

// Fix nav bar
window.addEventListener('scroll', event => {
   const scrollHeight = window.pageYOffset;
   const navHeight = navBar.getBoundingClientRect().height;

   if (scrollHeight > navHeight) {
      navBar.classList.add('fix__nav');
   } else {
      navBar.classList.remove('fix__nav');
   }

   if (scrollHeight > 300) {
      goToTop.classList.add('show-top');
   } else {
      goToTop.classList.remove('show-top');
   }
});

const navBar = document.querySelector('.navigation');
const goToTop = document.querySelector('.goto-top');
const scrollLink = document.querySelectorAll('.scroll-link');

/* 
-----------------------------------
   All Products
-----------------------------------
*/

// Get Products 
const getProducts = async() => {
   try {
      const results = await fetch('./data/products.json');
      const data = await results.json();
      // console.log(data.products);
      const products = data.products;
      return products;
   } catch (error) {
      console.log(error);
   }
};
// getProducts();

// Load products
window.addEventListener('DOMContentLoaded', async() => {
   const products = await getProducts();
   // console.log(products);
   displayProductItems(products);

   // let menuCategory = products.filter(product => {
   //    return product.category === 'Trending Products';
   // });
   // displayProductItems(menuCategory);
});

const categoryCenter = document.querySelector('.category__center');

// Display Products
const displayProductItems = items => {
   let displayProduct = items.map(product =>
      `
      <div class="product category__product">
      <div class="product__header">
         <img src="${product.image}">
      </div>
      <div class="product__footer">
         <h3>${product.title}</h3>
         <div class="rating">
            <svg>
               <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
               <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
               <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
               <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
               <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
         </div>
         <div class="product__price">
            <h4>$${product.price}</h4>
            <a href="#"><button type="button" class="product__btn">Add To Cart</button></a>
         </div>
         <ul>
            <a href="">
               <svg>
                  <use xlink:href="./images/sprite.svg#icon-eye"></use>
               </svg>
            </a>
            <a href="">
               <svg>
                  <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
               </svg>
            </a>
            <a href="">
               <svg>
                  <use xlink:href="./images/sprite.svg#icon-loop2"></use>
               </svg>
            </a>
         </ul>
      </div>
   </div>
      `
      );
   
   displayProduct = displayProduct.join('');
   if(categoryCenter) {
      categoryCenter.innerHTML = displayProduct;
   }
};

// Filtering
const filterBtn = document.querySelectorAll('.filter-btn');
const categoryContainer =document.getElementById('category');

if(categoryContainer) {
   categoryContainer.addEventListener('click', async event => {
      const target = event.target.closest('.section__title');
      // console.log(target);
      if(!target) {
         return;
      }

      const id = target.dataset.id;
      // console.log(id);
      const products = await getProducts();

      if(id) {
         // Remove active from buttons
         Array.from(filterBtn).forEach(btn => {
            btn.classList.remove('active');
         });
         target.classList.add('active');

         // Load products
         let menuCategory = products.filter(product => {
            if(product.category === id) {
               return product;
            }
         });

         // Check All Products
         if(id === 'All Products') {
            displayProductItems(products);
         } else {
            displayProductItems(menuCategory);
         }
      }
   });
}

AOS.init();