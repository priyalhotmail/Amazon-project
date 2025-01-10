// Define and initialize cart array
export const cart = [];

/**
 * @description Function to add the product to the cart
 * @param productId - The product ID to add to the cart
 */
export function addToCart(productId){
    // Define and initialize matchingItem variable to store if any matching item found in the cart
    let matchingItem;
  
    // Loop through each item in the cart array to check if the product is already in the cart
    cart.forEach((item) => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  
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
  }