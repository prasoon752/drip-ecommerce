const API = 'http://localhost:5000/api';
let cart = {};
let liked = {};
let activeFilters = new Set();
let activeCat = 'All';
let currentUser = null;
let authToken = localStorage.getItem('drip_token') || null;

window.addEventListener('DOMContentLoaded', () => {
  applyFilters();
});

function setCat(cat, el) {
  activeCat = cat;
  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

function toggleFilter(btn, f) {
  if (activeFilters.has(f)) { activeFilters.delete(f); btn.classList.remove('active'); }
  else { activeFilters.add(f); btn.classList.add('active'); }
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById('searchIn').value.toLowerCase();
  const sort = document.querySelector('.sort-select').value;
  let items = products.filter(p => {
    const catMatch = activeCat === 'All' || p.cat === activeCat || p.cat === 'All';
    const searchMatch = p.brand.toLowerCase().includes(search) || p.name.toLowerCase().includes(search);
    const filterMatch = (!activeFilters.has('new') || p.isNew) && (!activeFilters.has('sale') || p.isSale) && (!activeFilters.has('top') || p.isTop);
    return catMatch && searchMatch && filterMatch;
  });
  if (sort === 'low') items.sort((a, b) => a.price - b.price);
  if (sort === 'high') items.sort((a, b) => b.price - a.price);
  if (sort === 'disc') items.sort((a, b) => b.disc - a.disc);
  if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
  renderGrid(items);
}

function renderGrid(items) {
  const g = document.getElementById('grid');
  if (!items.length) { g.innerHTML = '<div style="grid-column:1/-1;padding:3rem;text-align:center;color:#aaa">No products found.</div>'; return; }
  g.innerHTML = items.map(p => `
    <div class="product-card">
      <div class="product-img" style="background:${p.bg}">
        <span>${p.emoji}</span>
        <div class="p-wish ${liked[p.id] ? 'on' : ''}" onclick="toggleLike(${p.id}, this)">${liked[p.id] ? '♥' : '♡'}</div>
        ${p.disc ? `<div class="discount-badge">${p.disc}% OFF</div>` : ''}
      </div>
      <div class="product-info">
        <div class="p-brand">${p.brand}</div>
        <div class="p-name">${p.name}</div>
        <div class="p-price-row">
          <span class="p-price">₹${p.price.toLocaleString('en-IN')}</span>
          ${p.old ? `<span class="p-old">₹${p.old.toLocaleString('en-IN')}</span><span class="p-disc">(${p.disc}% OFF)</span>` : ''}
        </div>
        <div class="p-rating">★ ${p.rating} <span style="opacity:0.75">(${p.reviews.toLocaleString()})</span></div>
      </div>
      <div class="bag-overlay">
        <div class="size-label">SELECT SIZE</div>
        <div class="size-row">${p.sizes.map(s => `<div class="size-chip" onclick="addToBag(${p.id}, '${s}')">${s}</div>`).join('')}</div>
        <button class="add-bag-btn" onclick="addToBag(${p.id}, '${p.sizes[0]}')">ADD TO BAG</button>
      </div>
    </div>
  `).join('');
}

function toggleLike(id, el) {
  liked[id] = !liked[id];
  el.textContent = liked[id] ? '♥' : '♡';
  el.classList.toggle('on', !!liked[id]);
  showToast(liked[id] ? 'Added to Wishlist ♥' : 'Removed from Wishlist');
}

function addToBag(id, size) {
  const p = products.find(x => x.id === id);
  const key = id + '_' + size;
  if (!cart[key]) cart[key] = { ...p, size, qty: 0 };
  cart[key].qty++;
  updateCartBadge();
  showToast('Added to bag! 🛍️');
}

function updateCartBadge() {
  const count = Object.values(cart).reduce((a, b) => a + b.qty, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;
  badge.style.display = count ? 'flex' : 'none';
  document.getElementById('cartCount').textContent = count;
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  renderCartDrawer();
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
}

function renderCartDrawer() {
  const items = Object.values(cart).filter(x => x.qty > 0);
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!items.length) {
    el.innerHTML = '<div class="empty-cart"><i class="ti ti-shopping-bag"></i><p style="font-size:15px;font-weight:700;margin-bottom:6px">Your bag is empty</p></div>';
    footer.innerHTML = '';
    return;
  }
  el.innerHTML = items.map(p => `
    <div class="cart-item">
      <div class="cart-item-img">${p.emoji}</div>
      <div class="cart-item-info">
        <div class="ci-brand">${p.brand}</div>
        <div class="ci-name">${p.name} · Size: ${p.size}</div>
        <div class="ci-price">₹${(p.price * p.qty).toLocaleString('en-IN')}</div>
        <div class="ci-qty">
          <button class="qty-btn" onclick="changeQty('${p.id}_${p.size}', -1)">−</button>
          <span class="qty-val">${p.qty}</span>
          <button class="qty-btn" onclick="changeQty('${p.id}_${p.size}', 1)">+</button>
          <span class="ci-remove" onclick="removeItem('${p.id}_${p.size}')">REMOVE</span>
        </div>
      </div>
    </div>
  `).join('');
  const subtotal = items.reduce((s, p) => s + p.price * p.qty, 0);
  const discount = items.reduce((s, p) => s + ((p.old || p.price) - p.price) * p.qty, 0);
  const delivery = subtotal > 999 ? 0 : 49;
  const total = subtotal + delivery;
  footer.innerHTML = `
    <div class="price-detail"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
    <div class="price-detail"><span>Discount</span><span style="color:#2d9c5f">−₹${discount.toLocaleString('en-IN')}</span></div>
    <div class="price-detail"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#2d9c5f">FREE</span>' : '₹' + delivery}</span></div>
    <div class="price-detail total"><span>Total Amount</span><span>₹${total.toLocaleString('en-IN')}</span></div>
    <button class="checkout-btn" onclick="proceedToCheckout(${total})">PLACE ORDER</button>
  `;
}

function changeQty(key, d) {
  cart[key].qty = Math.max(0, cart[key].qty + d);
  if (cart[key].qty === 0) delete cart[key];
  updateCartBadge();
  renderCartDrawer();
}

function removeItem(key) {
  delete cart[key];
  updateCartBadge();
  renderCartDrawer();
  showToast('Item removed from bag');
}

function proceedToCheckout(total) {
  if (!authToken) { showToast('Please login first!'); openAuth(); return; }
  showToast('Connecting to Razorpay...');
}

function openAuth() {
  document.getElementById('authModal').classList.add('open');
}

function closeAuth(e) {
  if (e.target === document.getElementById('authModal')) closeAuthDirect();
}

function closeAuthDirect() {
  document.getElementById('authModal').classList.remove('open');
}

function switchTab(tab, el) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('signupForm').style.display = tab === 'signup' ? 'block' : 'none';
}

async function doLogin() {
  const isLogin = document.getElementById('loginForm').style.display !== 'none';
  const endpoint = isLogin ? '/auth/login' : '/auth/register';
  const email = document.querySelector(`#${isLogin ? 'loginForm' : 'signupForm'} input[type="email"]`).value;
  const password = document.querySelector(`#${isLogin ? 'loginForm' : 'signupForm'} input[type="password"]`).value;
  const name = isLogin ? null : document.querySelector('#signupForm input[type="text"]').value;
  if (!email || !password) return showToast('Please fill all fields');
  try {
    const res = await fetch(`${API}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, ...(name && { name }) })
    });
    const data = await res.json();
    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('drip_token', authToken);
      closeAuthDirect();
      showToast(`Welcome, ${data.user.name}! 🎉`);
    } else {
      showToast(data.message || 'Something went wrong');
    }
  } catch (err) {
    showToast('Cannot connect to server!');
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}