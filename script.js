const navLinks = document.querySelector('.nav-links');
const cartOverlay = document.querySelector('.cart-overlay');

// Function to toggle nav-links
function toggleNavLinks() {
    navLinks.classList.toggle('active');
}

// Close nav-links when clicking outside
cartOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

// Optional: Add a close button handler
document.querySelector('.close-nav')?.addEventListener('click', () => {
    navLinks.classList.remove('active');
});
