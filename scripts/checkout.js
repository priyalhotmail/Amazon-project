// Javascript file for the checkout page
// This script is loaded by checkout.html
// It displays the cart items and handles products in the cart

import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// Define cartSummaryHTML variable for cart html
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    // Define productId variable for cartItem productId
    const productId = cartItem.productId;

    // Define matchingProduct variable to find the cart item in the products list
    let matchingProduct;

    // Loop through each product in the products array to find the matching product for the cart item
    products.forEach((products) => {
        if(products.id === productId){
            matchingProduct = products;
        }
    });

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
});

document.querySelectorAll('.js-delete-link')
    .forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;
            
            removeFromCart(productId);
            console.log(cart);

             // Define container variable for the product container
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            
            // Remove deleted product container from the DOM
            container.remove();
        });
});