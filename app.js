// Login logic
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      alert('登入成功');
      window.location.href = 'products.html';
    } else {
      alert('帳號或密碼錯誤');
    }
  });
  
  // Load products
  const loadProducts = async () => {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
  
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
      <div class="product">
        <h3>${product.ProductName}</h3>
        <p>庫存: ${product.Stock}</p>
        <p>價格: $${product.Price}</p>
        <button onclick="addToCart(${product.ProductID})">加入購物車</button>
      </div>
    `).join('');
  };
  
  // Add to cart
  const addToCart = (productId) => {
    // 假設購物車存儲於 localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('已加入購物車');
  };
  