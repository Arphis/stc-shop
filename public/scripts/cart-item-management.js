//General Selectors

const cartItemUpdateFormElement = document.querySelectorAll('.cart-item-management')
const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

//Front End Code

async function updateCartItem(event) {
   let response
    event.preventDefault();//prevent of the browser automatically sending the request
const form = event.target;
        const productId = form.dataset.productid;//identify yhe product which we want to update
        const csrfToken = form.dataset.csrf;
        const quantity = form.firstElementChild.value;

//here, we use ajax post request, with which we LOAD data FROM the server(a response body, an entity to be created), thats why we call it response
// then, we use req.body.productId in the controller function to get access to those elements in response body in browser
// then we send another response from the controller function.
// so Ajax Post/patch/put request with a response body from server => triggers the controller which does some actions and creates another response
// we can access the properties of the controller function since we parse JSON to json() via middleware and they use the same route 
//JSON is used for front-end browser code, json() for the server-side
        try {
           response = await fetch('/cart/items', {//the URL route to which we send the request and response, has to be the same as the controller function that we wanna trigger with eventListener
                method:'PATCH',//
                body: JSON.stringify({
                    productId:productId,
                    quantity:quantity,//here, the keys are the arguments from the cart controller function of the same route
                    _csrf:csrfToken
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
        } catch (error) {
            alert('Something wen wrong!') 
            return
        }
        
if(!response.ok) {
    alert('Something wen wrong!') 
    return
}
const responseData = await response.json();

if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove()
} else {
    const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-product-price');
    cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
}
//We take data from response body above in controller function, we update the data on the backend and then we display it via DOM
//Get access to the backend post logic via json() to display the updated properties via DOM





cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
}
cartBadgeElements.textContent = responseData.updatedCartData.newTotalQuantity;
}

for(const formElement of cartItemUpdateFormElement) {
    formElement.addEventListener('submit', updateCartItem);//will be triggered whenever form is submitted by clicking
}
