

const deleteProductButtonElements = document.querySelectorAll('.admin-btn-alt')

async function deleteProduct(event) {
    const buttonElement = event.target;//element on which event happens
    const productId = buttonElement.dataset.productid;//dataset = data property on the ejs element
const csrfToken = buttonElement.dataset.csrf;
   
const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'//we can use this feature to send delete request 
    });//available out of the box in browsers, here we DELETE the backend data with our admin-controller function deleteProduct
    //we need the url path (action property) and method to be the same as in our backend code in routes for post and delete methods

    if(!response.ok) {
    alert('Something went wrong!');
    return
}

buttonElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();//remove the front-end side element in ejs

}


for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener('click', deleteProduct);

}

