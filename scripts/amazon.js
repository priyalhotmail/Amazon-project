// JavaScript for the Amazon page
// This script is loaded by amazon.html
// It displays the products and handles adding them to the cart

// Define productHTML variable for ptoducts html
let productsHTML = '';

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
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector${product.id}">
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

          <div class="added-to-cart">
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

// Interact with Add to Cart button
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    // Add event listener to each button
    button.addEventListener('click', () => {
        
        // Get the product ID from the button's data-product-id attribute
        const productId = button.dataset.productId;

        // Define and initialize matchingItem variable to store if any matching item found in the cart
        let matchingItem;

        // Loop through each item in the cart array to check if the product is already in the cart
        cart.forEach((item) => {
            if (item.productId === productId) {
                matchingItem = item;
            }
        });

        const quantitySelector = document.querySelector(`.js-quantity-selector${productId}`);

        // If the product is already in the cart, increment the quantity
        if(matchingItem) {
            matchingItem.quantity+= Number(quantitySelector.value);
        }else {
            // If the product is not in the cart, add it to the cart array
            cart.push(
                {
                    productId: productId,
                    quantity: Number(quantitySelector.value),
                }
            );
        }
        console.log(cart);

        // Update the cart quantity in the header
        // Define and initialize cartQuantity variable to store the total quantity of the cart
        let cartQuantity = 0;

        // Loop through each item in the cart array to calculate the total quantity
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        // Set the inner HTML of the cart quantity to the cartQuantity
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });

    
    
});
