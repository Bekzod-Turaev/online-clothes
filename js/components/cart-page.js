import { getCart, changeQty, removeFromCart, clearCart } from './cart.js';

const cartRoot = document.getElementById('cart');
const TAX_RATE = 0.1;

function toCents(value) {
    return Math.round(value * 100);
}

function format(cents) {
    return (cents / 100).toFixed(2);
}

function renderEmpty() {
    cartRoot.innerHTML = `
        <div class="fish_list">
            <h1>Your Cart is Empty</h1>
            <p>Add some products to your cart to see them here.</p>
            <a href="../index.html"><button class="continue">Continue Shopping</button></a>
        </div>
    `;
}

function renderCart() {
    const items = getCart();

    if (items.length === 0) {
        renderEmpty();
        return;
    }

    const subtotal = items.reduce((sum, item) => sum + toCents(item.price) * item.qty, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;

    const rows = items.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">

            <div class="cart-item-info">
                <h3>${item.title}</h3>
                <p>$${format(toCents(item.price))}</p>

                <div class="cart-item-controls">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                    <button class="remove-item-btn" data-action="remove" data-id="${item.id}" aria-label="Remove item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <span class="cart-item-total">$${format(toCents(item.price) * item.qty)}</span>
        </div>
    `).join('');

    cartRoot.innerHTML = `
        <h1 class="cart-title">Shopping Cart</h1>

        <div class="cart-layout">
            <div class="cart-main">
                <div class="cart-list">${rows}</div>

                <div class="cart-buttons">
                    <button class="outline-btn" data-action="clear">Clear Cart</button>
                    <a href="../index.html"><button class="outline-btn">Continue Shopping</button></a>
                </div>
            </div>

            <aside class="order-summary">
                <h2>Order Summary</h2>

                <div class="summary-row"><span>Subtotal</span><span>$${format(subtotal)}</span></div>
                <div class="summary-row"><span>Shipping</span><span>Free</span></div>
                <div class="summary-row"><span>Tax</span><span>$${format(tax)}</span></div>

                <div class="summary-row summary-total"><span>Total</span><span>$${format(total)}</span></div>

                <button class="checkout-btn">
                    Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </button>
            </aside>
        </div>
    `;
}

if (cartRoot) {
    cartRoot.addEventListener('click', event => {
        const target = event.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const id = Number(target.dataset.id);

        if (action === 'increase') changeQty(id, 1);
        if (action === 'decrease') changeQty(id, -1);
        if (action === 'remove') removeFromCart(id);
        if (action === 'clear') clearCart();

        renderCart();
    });

    renderCart();
}