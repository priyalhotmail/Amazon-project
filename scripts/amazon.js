// JavaScript for the Amazon page
// This script is loaded by amazon.html
// It displays the products and handles adding them to the cart

import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// Define productHTML variable for ptoducts html
let productsHTML = '';

// Define Timeout ID variable for added message
let addedMsgTimeoutId;

// Loop through each product in the products array
products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

// Set the inner HTML of the products grid to the productsHTML
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//console.log(productsHTML);

/**
 * @description Function to show the added message
 * @param productId - The product ID to show the added message
 */
function showAddedMessage(productId){
  // Display the added message
  // Locate the added message element
  const addedMsgElement = document.querySelector(`.js-added-to-cart-${productId}`);

  // Add visible class to the added message element
  addedMsgElement.classList.add('added-to-cart-visible');

  // Clear the timeout if it is already set
  if(addedMsgTimeoutId) {
      clearTimeout(addedMsgTimeoutId);
  }

  // Set the timeout to hide the added message after 2 seconds
  const timeoutId = setTimeout(() => {
      addedMsgElement.classList.remove('added-to-cart-visible');
  }, 2000);

  // Store the timeout ID in the addedMsgTimeoutId variable
  addedMsgTimeoutId = timeoutId;
}

/**
 * @description Function to update the cart quantity in the header
 */
function updateCartQty() {
  // Update the cart quantity in the header
  // Define and initialize cartQuantity variable to store the total quantity of the cart
  let cartQuantity = 0;

  // Loop through each item in the cart array to calculate the total quantity
  cart.forEach((item) => {
      cartQuantity += item.quantity;
  });

  // Set the inner HTML of the cart quantity to the cartQuantity
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// Interact with Add to Cart button
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  // Add event listener to each button
  button.addEventListener('click', () => {
      
    // Get the product ID from the button's data-product-id attribute
    const productId = button.dataset.productId;

    // call addToCart function to add the product to the cart
    addToCart(productId);

    // call showAddedMessage function to show the added message
    showAddedMessage(productId);

    // call updateCartQty function to update the cart quantity
    updateCartQty();
  });    
});
