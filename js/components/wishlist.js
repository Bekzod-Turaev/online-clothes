const STORAGE_KEY = 'likedProducts';

export function getLiked() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        return data.filter(item => item && typeof item === 'object');
    } catch {
        return [];
    }
}

function saveLiked(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function isLiked(id) {
    return getLiked().some(item => item.id === id);
}

export function toggleLiked(product) {
    const liked = getLiked();
    const index = liked.findIndex(item => item.id === product.id);
    let nowLiked;

    if (index === -1) {
        liked.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });
        nowLiked = true;
    } else {
        liked.splice(index, 1);
        nowLiked = false;
    }

    saveLiked(liked);
    updateCounter();
    return nowLiked;
}

export function clearLiked() {
    saveLiked([]);
    updateCounter();
}

export function updateCounter() {
    const heart = document.querySelector('.heart');
    if (!heart) return;

    let counter = heart.querySelector('.like-count');

    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'like-count';
        heart.appendChild(counter);
    }

    const count = getLiked().length;
    counter.textContent = count;
    counter.classList.toggle('visible', count > 0);
}

updateCounter();