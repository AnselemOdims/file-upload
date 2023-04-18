const url = '/api/v1/products';
const fileFormDOM = document.querySelector('.file-form');

const nameInputDOM = document.querySelector('#name');
const priceInputDOM = document.querySelector('#price');
const imageInputDOM = document.querySelector('#image');

const containerDOM = document.querySelector('.container');
let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })

imageInputDOM.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${url}/uploads`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    const {
      image: { src },
    } = data;
    imageValue = src;
  } catch (error) {
    imageValue = null;
    console.log(error);
  }
});

fileFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;
  try {
    const product = { name: nameValue, price: priceValue, image: imageValue };

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    fetchProducts();
  } catch (error) {
    console.log(error);
  }
});

async function fetchProducts() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const { products } = data;

    const productsDOM = products
      .map((product) => {
        return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`;
      })
      .join('');
    containerDOM.innerHTML = productsDOM;
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
