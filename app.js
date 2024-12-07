// 修改 API 地址為您的 Azure 後端 URL
const API_BASE_URL = 'https://dessertshop-a3a2d2cnh6akepar.eastasia-01.azurewebsites.net';

// Login logic
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('登入成功');
            window.location.href = 'products.html';
        } else {
            alert('帳號或密碼錯誤');
        }
    } catch (error) {
        console.error('登入請求失敗:', error);
        alert('網路錯誤，請稍後再試');
    }
});

// Load products
const loadProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
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
    } catch (error) {
        console.error('載入商品失敗:', error);
        alert('無法載入商品，請稍後再試');
    }
};

// Add to cart
const addToCart = (productId) => {
    // 假設購物車存儲於 localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('已加入購物車');
};

// 如果在 products.html 頁面，自動載入商品
if (document.getElementById('productList')) {
    loadProducts();
}
