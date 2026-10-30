const productsContainer = document.getElementById('products-container');
const noProductsSection = document.getElementById('no-products-section');

const MAX_WORDS = 20;

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

        renderProducts(products);
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
        const { title, price, description, image } = product;
        const shortDescription = truncateWords(description, MAX_WORDS);

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${image}" alt="${title}" class="product-image">
                <button class="favorite-btn" aria-label="Add to favorites">
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
                <span>$${price}</span>
            </div>

            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        const favBtn = card.querySelector('.favorite-btn');
        favBtn.addEventListener('click', () => {
            favBtn.classList.toggle('active');
        });

        productsContainer.appendChild(card);
    });
}

fetchProducts();