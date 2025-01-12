// Define and initialize cart array
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){  
    cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
        },
        {
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 5,
        },        
    ];
}

/**
 * @description Function to save the cart to local storage
 */
export function saveToLocalStorage(){
    // Save the cart array to local storage 
    localStorage.setItem('cart', JSON.stringify(cart));
}

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

    // Save the cart array to local storage
    saveToLocalStorage();
  };

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(productId !== cartItem.productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;    

    saveToLocalStorage();
};