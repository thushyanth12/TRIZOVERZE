const posters = [
    // Anime Collection
    { id: 1, title: "Cyber Samurai", price: 499, category: "anime", image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Neon Evangelion", price: 499, category: "anime", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Spirit Away", price: 499, category: "anime", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Titan Fall", price: 499, category: "anime", image: "https://images.unsplash.com/photo-1605218427306-022ba951ddb2?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "Ghibli Sky", price: 499, category: "anime", image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1000&auto=format&fit=crop" },

    // Music Collection
    { id: 6, title: "Vinyl Vibes", price: 549, category: "music", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop" },
    { id: 7, title: "Rock Anthem", price: 549, category: "music", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000&auto=format&fit=crop" },
    { id: 8, title: "Jazz Night", price: 549, category: "music", image: "https://images.unsplash.com/photo-1511192336575-5a79af671694?q=80&w=1000&auto=format&fit=crop" },
    { id: 9, title: "Synthwave Beat", price: 549, category: "music", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop" },
    { id: 10, title: "Cassette Retro", price: 549, category: "music", image: "https://images.unsplash.com/photo-1594434533536-2d145fa97f6c?q=80&w=1000&auto=format&fit=crop" },

    // Aesthetic Collection
    { id: 11, title: "Vaporwave Statues", price: 449, category: "aesthetic", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop" },
    { id: 12, title: "Dreamy Clouds", price: 449, category: "aesthetic", image: "https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=1000&auto=format&fit=crop" },
    { id: 13, title: "Urban Solitude", price: 449, category: "aesthetic", image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop" },
    { id: 14, title: "Pastel Tokyo", price: 449, category: "aesthetic", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
    { id: 15, title: "Midnight Rain", price: 449, category: "aesthetic", image: "https://images.unsplash.com/photo-1515169067750-6715f01cb16e?q=80&w=1000&auto=format&fit=crop" },

    // Abstract Collection
    { id: 16, title: "Liquid Gold", price: 599, category: "abstract", image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop" },
    { id: 17, title: "Geometry Wars", price: 599, category: "abstract", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop" },
    { id: 18, title: "Color Chaos", price: 599, category: "abstract", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop" },
    { id: 19, title: "Noir Lines", price: 599, category: "abstract", image: "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=1000&auto=format&fit=crop" },
    { id: 20, title: "Fluid Dreams", price: 599, category: "abstract", image: "https://images.unsplash.com/photo-1454117096348-7820d7554981?q=80&w=1000&auto=format&fit=crop" }
];

const WHATSAPP_NUMBER = "918124125555";
const grid = document.getElementById('poster-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

let cart = []; // Cart State

// Size Pricing Multipliers
const sizeMultipliers = {
    'A4': 1,
    'A3': 1.5,
    'A2': 2.5
};

function renderPosters(category = 'all') {
    grid.innerHTML = '';

    const filteredPosters = category === 'all'
        ? posters
        : posters.filter(p => p.category === category);

    if (filteredPosters.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; opacity: 0.5;">No posters found in this category.</p>';
        return;
    }

    filteredPosters.forEach(poster => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="img-container">
                <img src="${poster.image}" alt="${poster.title}" class="card-img" loading="lazy" crossorigin="anonymous">
            </div>
            <div class="card-info">
                <h3 class="card-title">${poster.title}</h3>
                <span class="card-price" id="price-${poster.id}">₹${poster.price}</span>
            </div>
            <div class="controls">
                <select class="size-select" onchange="updatePrice(${poster.id}, this.value)">
                    <option value="A4">A4 (Standard)</option>
                    <option value="A3">A3 (Large)</option>
                    <option value="A2">A2 (Extra Large)</option>
                </select>
                <button class="buy-btn" onclick="addToCart(this, ${poster.id})">
                    Add to Cart
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function updatePrice(id, size) {
    const poster = posters.find(p => p.id === id);
    const priceElement = document.getElementById(`price-${id}`);
    const newPrice = Math.floor(poster.price * sizeMultipliers[size]);
    priceElement.innerText = `₹${newPrice}`;

    // Animate price change
    priceElement.style.color = '#fff';
    setTimeout(() => {
        priceElement.style.color = 'var(--accent)';
    }, 200);
}

// Cart Logic
function toggleCart() {
    document.querySelector('.cart-sidebar').classList.toggle('active');
    document.querySelector('.cart-overlay').classList.toggle('active');
}

function addToCart(btn, id) {
    const card = btn.closest('.card');
    const sizeSelect = card.querySelector('.size-select');
    const size = sizeSelect.value;
    const priceText = card.querySelector('.card-price').innerText;
    const price = parseInt(priceText.replace('₹', ''));
    const poster = posters.find(p => p.id === id);

    const existingItem = cart.find(item => item.id === id && item.size === size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            title: poster.title,
            image: poster.image,
            size: size,
            price: price, // Unit price
            quantity: 1
        });
    }

    updateCartUI();
    toggleCart(); // Open cart to show item added
}

function removeFromCart(id, size) {
    cart = cart.filter(item => !(item.id === id && item.size === size));
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total-price');
    const cartCount = document.querySelector('.cart-count');

    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-msg">Your walls look bare. Fix that.</p>';
        cartTotal.innerText = '₹0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-details">Size: ${item.size} | Qty: ${item.quantity}</p>
                    <p class="cart-item-details" style="color: var(--accent);">₹${itemTotal}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
            </div>
        `;
    }).join('');

    cartTotal.innerText = `₹${total}`;
}

function checkoutCart() {
    if (cart.length === 0) return;

    let message = `Halo Trizoverze! �\nI want to place an order for:\n\n`;
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. *${item.title}* (${item.size}) x${item.quantity} - ₹${itemTotal}\n`;
    });

    message += `\n*TOTAL: ₹${total}*\n\nPlease confirm my order.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function customCheckout() {
    const message = `Halo Trizoverze! 🎨\nI want to order a *Custom Poster*.\n\nI have a design/idea in mind.\nPlease guide me through the process.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class
        btn.classList.add('active');
        // Filter
        renderPosters(btn.dataset.category);
    });
});

// Initial render
document.addEventListener('DOMContentLoaded', () => renderPosters());
