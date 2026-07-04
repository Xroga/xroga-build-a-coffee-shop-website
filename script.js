// ----- HAMBURGER MENU -----
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ----- CART -----
let cart = [];

function updateCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalSpan = document.getElementById('cartTotal');
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p style="color:#7d6b5a;">Your cart is empty.</p>';
    cartTotalSpan.textContent = '$0.00';
    return;
  }
  
  let html = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    total += item.price;
    html += `<div class="cart-item">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)} <button class="remove-btn" data-index="${index}" style="background:none;border:none;color:#b35a3a;cursor:pointer;font-weight:700;margin-left:8px;">✕</button></span>
    </div>`;
  });
  
  cartItemsDiv.innerHTML = html;
  cartTotalSpan.textContent = `$${total.toFixed(2)}`;
  
  // Attach remove events
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Add to cart
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    cart.push({ name, price });
    updateCart();
    
    // Visual feedback
    btn.textContent = '✓ Added';
    setTimeout(() => {
      btn.textContent = 'Add';
    }, 800);
  });
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty! Add some items first.');
    return;
  }
  alert('Thank you for your order! ☕ We\'ll have it ready soon.');
  cart = [];
  updateCart();
});

// ----- LIGHTBOX -----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// ----- CONTACT FORM -----
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks for reaching out! We\'ll get back to you soon. ☕');
  e.target.reset();
});

// ----- SMOOTH SCROLL (fallback for older browsers) -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});