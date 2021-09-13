const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = 
     `<div class="single-product">
      <div>
        <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Rating:
      <span class="text-success"> <strong> ${product.rating.rate}   </strong></span> Rated By:<span class="text-success"><strong> ${product.rating.count}</strong></span></p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};



//load details 
const loadDetails =(productId) =>{
  const url = `https://fakestoreapi.com/products/${productId}`; 
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
}
//show product details 
const showDetails= product =>{
  const detailsDiv = document.getElementById('product-details');
  detailsDiv.textContent = '';
  
  const div = document.createElement('div');
   
  div.innerHTML=`
  <div class="card mb-3 detail-card" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${product.image}" class="img-fluid rounded-start card-image" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title">${product.title}</h3>
        <p class="card-text">${product.description}</p>
        <p class="card-rating">Rating: <span class = "text-success"><strong>${product.rating.rate}</strong></span> Rated By: <span class = "text-success"><strong>${product.rating.count}</strong></span></p> 
      </div>
    </div>
  </div>
  </div>
  `;
  
  detailsDiv.appendChild(div);
  
  
}
