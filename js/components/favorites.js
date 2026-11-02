import { getLiked, toggleLiked, clearLiked } from './wishlist.js';

const wishlist = document.getElementById('wishlist');
const emptyBlock = document.querySelector('.fish_list');
const grid = document.getElementById('wishlist-grid');
const title = document.getElementById('wishlist-title');
const clearBtn = document.getElementById('clear-wishlist');

function render() {
    const items = getLiked();

    if (items.length === 0) {
        wishlist.style.display = 'none';
        emptyBlock.style.display = '';
        return;
    }

    emptyBlock.style.display = 'none';
    wishlist.style.display = 'block';
    title.textContent = `My Wishlist (${items.length} items)`;
    grid.innerHTML = '';

    items.forEach((product, index) => {
        const { id, title: name, price, image } = product;

        const card = document.createElement('div');
        card.className = 'product-card wishlist-card';
        card.style.animationDelay = `${index * 120}ms`;
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${image}" alt="${name}" class="product-image">
            </div>

            <div class="product-content">
                <h3>${name}</h3>
                <span>$${price}</span>
            </div>

            <div class="wishlist-actions">
                <button class="add-to-cart-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    Add to Cart
                </button>
                <button class="remove-btn" aria-label="Remove from wishlist">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        card.querySelector('.remove-btn').addEventListener('click', () => {
            toggleLiked({ id, title: name, price, image });
            render();
        });

        grid.appendChild(card);
    });
}

if (wishlist && emptyBlock && grid && title && clearBtn) {
    clearBtn.addEventListener('click', () => {
        clearLiked();
        render();
    });

    render();
}