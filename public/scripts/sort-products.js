
const productForm = document.getElementById('product-form')
const sortButton = document.querySelector('.sort-products-btn')
const allProducts = document.getElementById('product-grid')


const type = document.getElementById('type').value


// async function sortProducts(event) {
//     let response
// event.preventDefault();//because we want to create an ajax request manually, no need for automatic browser http req
// const form = event.target;
// const formData = new FormData(form)


//     try {

//         response =   await fetch('/products/:type', { 
//             method: 'GET',
//            body: JSON.stringify({
         
//            }),
           
//            headers: {
//            'Content-Type': 'application/json'
//            }
//            })
           
           
                   
//                } catch (error) {
          
//                }
           
//         //   const renderProducts = await fetch('/products' + '?type=' + type, {
//         //     method: 'PATCH',
//         //     body: JSON.stringify({
//         //     type:type,
//         //     }),
            
//         //     headers: {
//         //     'Content-Type': 'application/json'
//         //     }
//         //   } 

    
// }

async function renderProducts() {
if(type === 'Fatburners') {


    // we can change class od the products with that type to show , original display is set to none and we make it to flex
const Fatburners = document.getElementById('fatburner-product-grid')

Fatburners.classList.add('open')
allProducts.classList.add('close')
}
}

sortButton .addEventListener('click', renderProducts)



// //  })


// <%

// products.forEach(product => { %>
//    if( <%=product.type%> === 'Nootropic/Psychotropic ' ) { <ul id="product-grid">
 
  
//        <li>
//           <%- include('../../shared/includes/product-item', {product:product}) %>
//        </li>
     
 
//  </ul> <% }%>
//  <% else { %>




//  }
// <%})%>









