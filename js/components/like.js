import { isLiked, toggleLiked } from './wishlist.js';
import { addToCart } from './cart.js';

const productsContainer = document.getElementById('products-container');
const noProductsSection = document.getElementById('no-products-section');

const MAX_WORDS = 20;

let allProducts = [];

function truncateWords(text, maxWords) {
    const words = text.trim().split(/\s+/);

    if (words.length <= maxWords) {
        return text;
    }

    return words.slice(0, maxWords).join(' ') + '...';
}

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const products = await response.json();

        if (!products || products.length === 0) {
            showEmptyState();
            return;
        }

        allProducts = products;
        fillCategories(allProducts);
        renderProducts(allProducts);
    } catch (error) {
        console.error('API не работает:', error);
        showEmptyState();
    }
}

function showEmptyState() {
    productsContainer.innerHTML = '';
    noProductsSection.style.display = 'block';
}

function renderProducts(products) {
    noProductsSection.style.display = 'none';
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const { id, title, price, description, image } = product;
        const shortDescription = truncateWords(description, MAX_WORDS);

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${image}" alt="${title}" class="product-image">
                <button class="favorite-btn ${isLiked(id) ? 'active' : ''}" aria-label="Add to favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-heart">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                </button>
            </div>

            <div class="product-content">
                <h3>${title}</h3>
                <p>${shortDescription}</p>
                <span>$${Number(price).toFixed(2)}</span>
            </div>

            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        const favBtn = card.querySelector('.favorite-btn');
        favBtn.addEventListener('click', () => {
            const nowLiked = toggleLiked({ id, title, price, image });
            favBtn.classList.toggle('active', nowLiked);
        });

        const cartBtn = card.querySelector('.add-to-cart-btn');
        cartBtn.addEventListener('click', () => {
            addToCart({ id, title, price, image });
            cartBtn.textContent = 'Added ✓';
            setTimeout(() => {
                cartBtn.textContent = 'Add to Cart';
            }, 1000);
        });

        productsContainer.appendChild(card);
    });
}

const searchInput = document.querySelector('.search_input input');
const filterBtn = document.querySelector('.filter button');
const searchBlock = document.querySelector('.search');

let categorySelect;
let minInput;
let maxInput;
let sortSelect;

function initFilters() {
    if (!searchInput || !filterBtn || !searchBlock) return;

    const panel = document.createElement('div');
    panel.className = 'filter_panel';
    panel.hidden = true;
    panel.innerHTML = `
        <select id="filter-category"><option value="">All categories</option></select>
        <input type="number" id="filter-min" placeholder="Min price" min="0">
        <input type="number" id="filter-max" placeholder="Max price" min="0">
        <select id="filter-sort">
            <option value="">Sort by</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
        </select>
        <button type="button" id="filter-reset">Reset</button>
    `;
    searchBlock.after(panel);

    categorySelect = panel.querySelector('#filter-category');
    minInput = panel.querySelector('#filter-min');
    maxInput = panel.querySelector('#filter-max');
    sortSelect = panel.querySelector('#filter-sort');
    const resetBtn = panel.querySelector('#filter-reset');

    filterBtn.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
    });

    searchInput.addEventListener('input', applyFilters);
    categorySelect.addEventListener('change', applyFilters);
    minInput.addEventListener('input', applyFilters);
    maxInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = '';
        minInput.value = '';
        maxInput.value = '';
        sortSelect.value = '';
        applyFilters();
    });
}

function fillCategories(products) {
    if (!categorySelect) return;

    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const min = minInput.value === '' ? 0 : Number(minInput.value);
    const max = maxInput.value === '' ? Infinity : Number(maxInput.value);
    const sort = sortSelect.value;

    const result = allProducts.filter(p => {
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchCategory = !category || p.category === category;
        const matchPrice = p.price >= min && p.price <= max;
        return matchTitle && matchCategory && matchPrice;
    });

    if (sort === 'asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'desc') result.sort((a, b) => b.price - a.price);

    if (result.length === 0) {
        showEmptyState();
        return;
    }

    renderProducts(result);
}

if (productsContainer && noProductsSection) {
    initFilters();
    fetchProducts();
}