const CART_KEY = 'cartItems';

export function getCart() {
    try {
        const data = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        return data.filter(item => item && typeof item === 'object');
    } catch {
        return [];
    }
}

function saveCart(list) {
    localStorage.setItem(CART_KEY, JSON.stringify(list));
}

export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }

    saveCart(cart);
    updateCartCounter();
}

export function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find(entry => entry.id === id);

    if (!item) return;

    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
    updateCartCounter();
}

export function removeFromCart(id) {
    saveCart(getCart().filter(item => item.id !== id));
    updateCartCounter();
}

export function clearCart() {
    saveCart([]);
    updateCartCounter();
}

export function updateCartCounter() {
    const cartIcon = document.querySelector('.banch');
    if (!cartIcon) return;

    let counter = cartIcon.querySelector('.cart-count');

    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'cart-count';
        cartIcon.appendChild(counter);
    }

    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    counter.textContent = count;
    counter.classList.toggle('visible', count > 0);
}

updateCartCounter();