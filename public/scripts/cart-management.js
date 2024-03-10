
const cartBadgeElements = document.querySelectorAll('.nav-items .badge')
const addToCartButtonElement = document.querySelector('#product-details button');

async function addToCart () {
let response;
    const productId = addToCartButtonElement.dataset.productid;//product.findById in 
  //product that we already have in database , so product that we have added to website
   
  const csrfToken = addToCartButtonElement.dataset.csrf;
  try {
 response = await  fetch('/cart/items' , { 
        method: 'POST',
     body: JSON.stringify({//data that we want to get as a response from server and post in in the browsers body
        productId: productId,
        _csrf: csrfToken
    }),

    headers: {
    'Content-Type': 'application/json'
}
});
} catch (error) {
    alert('Something went wrong!');
    return;
}

if (!response.ok) {
alert('Something went wrong!');
return;
}

const responseData = await response.json();//await the response prsing into js object
//we need to convert it back to json to write code in js 
const newTotalQuantity = responseData.newTotalItems;
for ( const cartBadgeElement of cartBadgeElements)
cartBadgeElement.textContent = newTotalQuantity;

}

addToCartButtonElement.addEventListener('click', addToCart);