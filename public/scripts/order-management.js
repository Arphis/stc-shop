const updateOrderFormElements = document.querySelectorAll(
    '.order-actions form'
  );
  
  async function updateOrder(event) {
    event.preventDefault();//because we want to create an ajax request manually, no need for automatic browser http req
    const form = event.target;
  
    const formData = new FormData(form);//helper object to extract a data from forms via names
    const newStatus = formData.get('status');//status selector
    const orderId = formData.get('orderid');
    const csrfToken = formData.get('_csrf');

    let response;
  
    try {
      response = await fetch(`/admin/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          newStatus: newStatus,//thats where we get access with req.body.newStatus
          _csrf: csrfToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      alert('Something went wrong - could not update order status.');
      return;
    }
  
    if (!response.ok) {
      alert('Something went wrong - could not update order status.');
      return;
    }
  
    const responseData = await response.json();
  
    form.parentElement.parentElement.querySelector('.badge').textContent =
      responseData.newStatus.toUpperCase();//select article of the form item
  }
  
  for (const updateOrderFormElement of updateOrderFormElements) {
    updateOrderFormElement.addEventListener('submit', updateOrder);
  }