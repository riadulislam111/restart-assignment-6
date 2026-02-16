const loadAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    displayProducts(data);
};
loadAllProducts();

const displayProducts = (products) => {
    const container = document.getElementById('product-container');
    container.innerHTML = '';


    container.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList = "card";
        card.innerHTML = `
       
       <div class="product-card">
         <div class="image-box">
            <img src="${product.image}" alt="">
        </div>
        <div class="details">
        <div class="category-rating">
        <span class="category">${product.category}</span>
        <span class="rating">⭐ ${product.rating.rate} (${product.rating.count})</span>
        </div>
        <h3 class="product-title">${product.title.slice(0, 20)} ...</h3>
        <p class="price">$${product.price}</p>
        <div class="button-group">
            <button onclick="details(${product.id})" class="btn-details">👁️ Details</button>
            <button class="btn-add">🛒 Add</button>
        </div>
        </div>
        `;
        container.appendChild(card);
    })
}

const loadByCategorys = async (categoryName) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
    const data = await response.json();
    displayProducts(data);
}

const loadCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();
    displayCategories(categories);
};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');

    categories.forEach(category => {
        const button = document.createElement('button');

        button.innerHTML = category.chartAt(0).toUpperCase() + category.slice(1);
        button.classList = "btn btn-outline btn-primary mx-2 capitalize";


        button.onclick = () => {
            loadProductsByCategory(category);
        
        };

        categoryContainer.appendChild(button);
    });
};
loadCategories();

const loadProductsByCategory = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    displayProducts(data);
};