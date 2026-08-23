/* =========================================================
   SHOPSPHERE — script.js
   Vanilla JS: product catalog, search, filter, sort,
   cart drawer, wishlist, quick view, checkout, localStorage.
   ========================================================= */

/* ---------------------------------------------------------
   1. PRODUCT DATA
--------------------------------------------------------- */
const products = [
  { id: 1,  name: "Wireless Headphones",  category: "Electronics", price: 2499, oldPrice: 3999, rating: 4.5, reviews: 312, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80", description: "Over-ear wireless headphones with active noise cancellation, 30-hour battery life and plush memory-foam ear cushions." },
  { id: 2,  name: "Smart Watch",          category: "Electronics", price: 4999, oldPrice: 6999, rating: 4.6, reviews: 208, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80", description: "Fitness-focused smartwatch with heart-rate monitoring, sleep tracking, GPS and a week-long battery life." },
  { id: 3,  name: "Running Shoes",        category: "Sports",      price: 3299, oldPrice: 4499, rating: 4.4, reviews: 176, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80", description: "Lightweight running shoes with responsive cushioning and a breathable knit upper for all-day comfort." },
  { id: 4,  name: "Casual T-Shirt",       category: "Fashion",     price: 599,  oldPrice: 999,  rating: 4.2, reviews: 421, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80", description: "100% combed cotton t-shirt with a relaxed fit, pre-shrunk fabric and reinforced stitching." },
  { id: 5,  name: "Laptop Backpack",      category: "Accessories", price: 1799, oldPrice: 2599, rating: 4.7, reviews: 289, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80", description: "Water-resistant backpack with a padded 15.6\" laptop sleeve, USB charging port and anti-theft zippers." },
  { id: 6,  name: "Smartphone",           category: "Electronics", price: 14999, oldPrice: 18999, rating: 4.5, reviews: 543, image: "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=500&q=80", description: "6.5-inch AMOLED display, triple camera system, 128GB storage and all-day battery life." },
  { id: 7,  name: "Coffee Maker",         category: "Home",        price: 2199, oldPrice: 2999, rating: 4.3, reviews: 156, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80", description: "12-cup programmable drip coffee maker with a reusable filter and keep-warm hot plate." },
  { id: 8,  name: "Sunglasses",           category: "Fashion",     price: 899,  oldPrice: 1499, rating: 4.1, reviews: 98,  image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80", description: "Polarized UV400 sunglasses with a lightweight acetate frame, available in a classic silhouette." },
  { id: 9,  name: "Bluetooth Speaker",    category: "Electronics", price: 1699, oldPrice: 2499, rating: 4.4, reviews: 267, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80", description: "Portable waterproof speaker with 360° sound, 12-hour battery and built-in speakerphone." },
  { id: 10, name: "Gaming Mouse",         category: "Electronics", price: 1299, oldPrice: 1899, rating: 4.6, reviews: 334, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80", description: "Ergonomic gaming mouse with a 16,000 DPI optical sensor, 7 programmable buttons and RGB lighting." },
  { id: 11, name: "Hoodie",               category: "Fashion",     price: 1399, oldPrice: 1999, rating: 4.3, reviews: 187, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80", description: "Brushed fleece hoodie with a relaxed fit, kangaroo pocket and adjustable drawstring hood." },
  { id: 12, name: "Smart LED Lamp",       category: "Home",        price: 999,  oldPrice: 1499, rating: 4.2, reviews: 142, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80", description: "Wi-Fi enabled LED lamp with 16 million colors, voice-assistant support and scheduled routines." },
  { id: 13, name: "Yoga Mat",             category: "Sports",      price: 799,  oldPrice: 1199, rating: 4.5, reviews: 203, image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=500&q=80", description: "Extra-thick non-slip yoga mat made from eco-friendly TPE material, includes a carry strap." },
  { id: 14, name: "Skincare Gift Set",    category: "Beauty",      price: 1599, oldPrice: 2299, rating: 4.6, reviews: 165, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80", description: "A curated 5-piece skincare set featuring cleanser, toner, serum, moisturizer and sunscreen." },
  { id: 15, name: "Leather Wallet",       category: "Accessories", price: 1099, oldPrice: 1599, rating: 4.4, reviews: 231, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80", description: "Slim genuine-leather bifold wallet with RFID-blocking lining and 6 card slots." },
];

const dealProductIds = [1, 2, 6, 9];

const categoryMeta = [
  { name: "Electronics", icon: "fa-solid fa-headphones" },
  { name: "Fashion",     icon: "fa-solid fa-shirt" },
  { name: "Home",        icon: "fa-solid fa-couch", label: "Home & Living" },
  { name: "Accessories", icon: "fa-solid fa-bag-shopping" },
  { name: "Beauty",      icon: "fa-solid fa-spa" },
  { name: "Sports",      icon: "fa-solid fa-dumbbell" },
];

/* ---------------------------------------------------------
   2. STATE
--------------------------------------------------------- */
let cart = [];
let wishlist = [];
let activeCategory = "All";
let searchTerm = "";
let maxPrice = 15000;
let minRating = 0;
let sortBy = "default";
let quickViewProduct = null;
let quickViewQty = 1;

/* ---------------------------------------------------------
   3. LOCALSTORAGE PERSISTENCE
--------------------------------------------------------- */
function saveCart() {
  localStorage.setItem("shopsphere_cart", JSON.stringify(cart));
}
function loadCart() {
  const saved = localStorage.getItem("shopsphere_cart");
  cart = saved ? JSON.parse(saved) : [];
}
function saveWishlist() {
  localStorage.setItem("shopsphere_wishlist", JSON.stringify(wishlist));
}
function loadWishlist() {
  const saved = localStorage.getItem("shopsphere_wishlist");
  wishlist = saved ? JSON.parse(saved) : [];
}

/* ---------------------------------------------------------
   4. HELPERS
--------------------------------------------------------- */
function formatPrice(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
function getProductById(id) {
  return products.find((p) => p.id === id);
}
function discountPercent(p) {
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}
function starHtml(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = "";
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  const empty = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast" + (type === "error" ? " toast-error" : "");
  const icon = type === "error" ? "fa-solid fa-circle-exclamation" : "fa-solid fa-circle-check";
  toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => toast.remove(), 260);
  }, 2600);
}

/* ---------------------------------------------------------
   5. RENDER: CATEGORIES
--------------------------------------------------------- */
function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = categoryMeta
    .map((cat) => {
      const count = products.filter((p) => p.category === cat.name).length;
      const isActive = activeCategory === cat.name;
      return `
        <button class="category-card${isActive ? " active-cat" : ""}" data-category="${cat.name}">
          <div class="cat-icon"><i class="${cat.icon}"></i></div>
          <h3>${cat.label || cat.name}</h3>
          <p>${count} products</p>
        </button>`;
    })
    .join("");

  grid.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      const cat = card.dataset.category;
      activeCategory = activeCategory === cat ? "All" : cat;
      syncChips();
      renderCategories();
      renderProducts();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function syncChips() {
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active-chip", chip.dataset.filter === activeCategory);
  });
}

/* ---------------------------------------------------------
   6. FILTER + SEARCH + SORT PIPELINE
--------------------------------------------------------- */
function getFilteredProducts() {
  let list = products.slice();

  if (activeCategory !== "All") {
    list = list.filter((p) => p.category === activeCategory);
  }

  if (searchTerm.trim() !== "") {
    const term = searchTerm.trim().toLowerCase();
    list = list.filter(
      (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
    );
  }

  list = list.filter((p) => p.price <= maxPrice);
  list = list.filter((p) => p.rating >= minRating);

  switch (sortBy) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "name-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }
  return list;
}

/* ---------------------------------------------------------
   7. RENDER: PRODUCTS
--------------------------------------------------------- */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const noProducts = document.getElementById("noProducts");
  const resultsMeta = document.getElementById("resultsMeta");
  const list = getFilteredProducts();

  resultsMeta.textContent = `Showing ${list.length} of ${products.length} products`;

  const searchCountEl = document.getElementById("searchCount");
  if (searchTerm.trim() !== "") {
    searchCountEl.hidden = false;
    searchCountEl.textContent = `${list.length} found`;
  } else {
    searchCountEl.hidden = true;
  }

  if (list.length === 0) {
    grid.innerHTML = "";
    noProducts.hidden = false;
    return;
  }
  noProducts.hidden = true;

  grid.innerHTML = list
    .map((p) => {
      const inWishlist = wishlist.includes(p.id);
      return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="product-badge">-${discountPercent(p)}%</span>
          <button class="wishlist-toggle${inWishlist ? " active-wish" : ""}" data-action="wishlist" data-id="${p.id}" aria-label="Toggle wishlist for ${p.name}">
            <i class="${inWishlist ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
          <button class="quick-view-btn" data-action="quickview" data-id="${p.id}">Quick View</button>
        </div>
        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-rating">${starHtml(p.rating)} <span>${p.rating} (${p.reviews})</span></div>
          <div class="product-price-row">
            <span class="product-price">${formatPrice(p.price)}</span>
            <span class="product-old-price">${formatPrice(p.oldPrice)}</span>
          </div>
          <div class="product-actions">
            <button class="add-to-cart-btn" data-action="add" data-id="${p.id}"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
          </div>
        </div>
      </article>`;
    })
    .join("");

  grid.querySelectorAll("[data-action='add']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      addToCart(id, 1);
      const original = e.currentTarget.innerHTML;
      e.currentTarget.classList.add("added");
      e.currentTarget.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      setTimeout(() => {
        e.currentTarget.classList.remove("added");
        e.currentTarget.innerHTML = original;
      }, 1200);
    })
  );
  grid.querySelectorAll("[data-action='wishlist']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      toggleWishlist(id);
    })
  );
  grid.querySelectorAll("[data-action='quickview']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      openQuickView(id);
    })
  );
}

/* ---------------------------------------------------------
   8. RENDER: DEALS + COUNTDOWN
--------------------------------------------------------- */
function renderDeals() {
  const grid = document.getElementById("dealGrid");
  grid.innerHTML = dealProductIds
    .map((id) => {
      const p = getProductById(id);
      return `
      <div class="deal-card">
        <div class="deal-media"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <h3 class="deal-name">${p.name}</h3>
        <div class="deal-price-row">
          <span class="deal-price">${formatPrice(p.price)}</span>
          <span class="deal-old-price">${formatPrice(p.oldPrice)}</span>
          <span class="deal-discount">-${discountPercent(p)}%</span>
        </div>
        <button class="deal-shop-btn" data-action="dealshop" data-id="${p.id}">Shop Deal</button>
      </div>`;
    })
    .join("");

  grid.querySelectorAll("[data-action='dealshop']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      openQuickView(id);
    })
  );
}

let saleEndTime = Date.now() + ((2 * 24 + 14) * 60 + 35) * 60 * 1000 + 20 * 1000;
function tickCountdown() {
  const remaining = Math.max(0, saleEndTime - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  document.getElementById("cdDays").textContent = pad(days);
  document.getElementById("cdHours").textContent = pad(hours);
  document.getElementById("cdMinutes").textContent = pad(minutes);
  document.getElementById("cdSeconds").textContent = pad(seconds);
  if (remaining <= 0) {
    saleEndTime = Date.now() + 24 * 60 * 60 * 1000; // restart a fresh 24h "sale" cycle
  }
}

/* ---------------------------------------------------------
   9. CART LOGIC
--------------------------------------------------------- */
function addToCart(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return;
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart();
  renderCart();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function updateQuantity(productId, newQty) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  if (newQty < 1) newQty = 1;
  item.qty = newQty;
  saveCart();
  renderCart();
}

function calculateCartTotal() {
  let subtotal = 0;
  let originalSubtotal = 0;
  cart.forEach((item) => {
    const p = getProductById(item.id);
    if (!p) return;
    subtotal += p.price * item.qty;
    originalSubtotal += p.oldPrice * item.qty;
  });
  const discount = Math.max(0, originalSubtotal - subtotal);
  return { subtotal, discount, total: subtotal };
}

function cartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
  const body = document.getElementById("cartBody");
  const cartCountEl = document.getElementById("cartCount");
  cartCountEl.textContent = cartItemCount();

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.<br>Start adding some products you love!</p>
      </div>`;
  } else {
    body.innerHTML = cart
      .map((item) => {
        const p = getProductById(item.id);
        if (!p) return "";
        const subtotal = p.price * item.qty;
        return `
        <div class="cart-item" data-id="${p.id}">
          <div class="cart-item-img"><img src="${p.image}" alt="${p.name}"></div>
          <div class="cart-item-info">
            <span class="cart-item-name">${p.name}</span>
            <span class="cart-item-price">${formatPrice(p.price)} each</span>
            <div class="cart-item-row">
              <div class="qty-stepper">
                <button data-action="dec" data-id="${p.id}" ${item.qty <= 1 ? "disabled" : ""} aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button data-action="inc" data-id="${p.id}" aria-label="Increase quantity">+</button>
              </div>
              <span class="cart-item-subtotal">${formatPrice(subtotal)}</span>
            </div>
            <button class="remove-item-btn" data-action="remove" data-id="${p.id}">Remove</button>
          </div>
        </div>`;
      })
      .join("");
  }

  const { subtotal, discount, total } = calculateCartTotal();
  document.getElementById("cartSubtotal").textContent = formatPrice(subtotal + discount);
  document.getElementById("cartDiscount").textContent = "−" + formatPrice(discount);
  document.getElementById("cartTotal").textContent = formatPrice(total);
  document.getElementById("checkoutTotal").textContent = formatPrice(total);

  body.querySelectorAll("[data-action='inc']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const item = cart.find((i) => i.id === id);
      updateQuantity(id, item.qty + 1);
    })
  );
  body.querySelectorAll("[data-action='dec']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const item = cart.find((i) => i.id === id);
      if (item.qty > 1) updateQuantity(id, item.qty - 1);
    })
  );
  body.querySelectorAll("[data-action='remove']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      removeFromCart(id);
      showToast("Item removed from cart.");
    })
  );
}

function clearCart() {
  if (cart.length === 0) return;
  const confirmed = window.confirm("Are you sure you want to clear your entire cart?");
  if (!confirmed) return;
  cart = [];
  saveCart();
  renderCart();
  showToast("Cart cleared.");
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ---------------------------------------------------------
   10. WISHLIST LOGIC
--------------------------------------------------------- */
function toggleWishlist(productId) {
  const product = getProductById(productId);
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`${product.name} removed from wishlist.`);
  } else {
    wishlist.push(productId);
    showToast(`${product.name} added to wishlist!`);
  }
  saveWishlist();
  renderProducts();
  renderWishlist();
  if (quickViewProduct && quickViewProduct.id === productId) {
    updateQuickViewWishlistBtn();
  }
}

function renderWishlist() {
  const body = document.getElementById("wishlistBody");
  const wishlistCountEl = document.getElementById("wishlistCount");
  wishlistCountEl.textContent = wishlist.length;

  if (wishlist.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <i class="fa-regular fa-heart"></i>
        <p>Your wishlist is empty.<br>Tap the heart icon on any product to save it here.</p>
      </div>`;
    return;
  }

  body.innerHTML = wishlist
    .map((id) => {
      const p = getProductById(id);
      if (!p) return "";
      return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="cart-item-info">
          <span class="cart-item-name">${p.name}</span>
          <span class="cart-item-price">${formatPrice(p.price)}</span>
          <div class="cart-item-row">
            <button class="btn btn-outline" data-action="wl-add" data-id="${p.id}" style="padding:8px 14px;font-size:0.78rem;">Add to Cart</button>
          </div>
          <button class="remove-item-btn" data-action="wl-remove" data-id="${p.id}">Remove</button>
        </div>
      </div>`;
    })
    .join("");

  body.querySelectorAll("[data-action='wl-add']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      addToCart(id, 1);
    })
  );
  body.querySelectorAll("[data-action='wl-remove']").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      toggleWishlist(id);
    })
  );
}

function openWishlist() {
  document.getElementById("wishlistDrawer").classList.add("open");
  document.getElementById("wishlistOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeWishlist() {
  document.getElementById("wishlistDrawer").classList.remove("open");
  document.getElementById("wishlistOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------------------------------------------------------
   11. QUICK VIEW MODAL
--------------------------------------------------------- */
function openQuickView(productId) {
  const p = getProductById(productId);
  if (!p) return;
  quickViewProduct = p;
  quickViewQty = 1;

  document.getElementById("qvImage").src = p.image;
  document.getElementById("qvImage").alt = p.name;
  document.getElementById("qvDiscountBadge").textContent = `-${discountPercent(p)}%`;
  document.getElementById("qvCategory").textContent = p.category;
  document.getElementById("qvName").textContent = p.name;
  document.getElementById("qvRating").innerHTML = `${starHtml(p.rating)} <span>${p.rating} (${p.reviews} reviews)</span>`;
  document.getElementById("qvDesc").textContent = p.description;
  document.getElementById("qvPrice").textContent = formatPrice(p.price);
  document.getElementById("qvOldPrice").textContent = formatPrice(p.oldPrice);
  document.getElementById("qvQtyValue").textContent = quickViewQty;
  updateQuickViewWishlistBtn();

  const overlay = document.getElementById("quickViewOverlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateQuickViewWishlistBtn() {
  const btn = document.getElementById("qvWishlistBtn");
  const inWishlist = quickViewProduct && wishlist.includes(quickViewProduct.id);
  btn.classList.toggle("active-wish", !!inWishlist);
  btn.innerHTML = `<i class="${inWishlist ? "fa-solid" : "fa-regular"} fa-heart"></i>`;
}

function closeQuickView() {
  document.getElementById("quickViewOverlay").classList.remove("open");
  document.body.style.overflow = "";
  quickViewProduct = null;
}

/* ---------------------------------------------------------
   12. CHECKOUT
--------------------------------------------------------- */
function validateCheckoutForm(data) {
  const errors = {};
  if (!data.fullName || data.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "")) errors.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test((data.phone || "").replace(/\D/g, ""))) errors.phone = "Enter a valid 10-digit phone number.";
  if (!data.address || data.address.trim().length < 5) errors.address = "Please enter your full address.";
  if (!data.city || data.city.trim().length < 2) errors.city = "Please enter your city.";
  if (!data.state || data.state.trim().length < 2) errors.state = "Please enter your state.";
  if (!/^\d{6}$/.test(data.pincode || "")) errors.pincode = "Enter a valid 6-digit pincode.";
  return errors;
}

function displayFormErrors(errors) {
  const fields = ["fullName", "email", "phone", "address", "city", "state", "pincode"];
  fields.forEach((field) => {
    const input = document.getElementById(field);
    const errorEl = document.getElementById("err-" + field);
    if (errors[field]) {
      input.classList.add("invalid");
      errorEl.textContent = errors[field];
    } else {
      input.classList.remove("invalid");
      errorEl.textContent = "";
    }
  });
}

function generateOrderId() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return "SS-" + rand;
}

function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty.", "error");
    return;
  }
  closeCart();
  document.getElementById("checkoutForm").reset();
  document.getElementById("checkoutFormWrap").hidden = false;
  document.getElementById("checkoutSuccessWrap").hidden = true;
  const { total } = calculateCartTotal();
  document.getElementById("checkoutTotal").textContent = formatPrice(total);
  document.getElementById("checkoutOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  document.getElementById("checkoutOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value,
  };
  const errors = validateCheckoutForm(formData);
  displayFormErrors(errors);
  if (Object.keys(errors).length > 0) {
    showToast("Please fix the highlighted fields.", "error");
    return;
  }

  const orderId = generateOrderId();
  document.getElementById("orderIdDisplay").textContent = orderId;
  document.getElementById("checkoutFormWrap").hidden = true;
  document.getElementById("checkoutSuccessWrap").hidden = false;

  cart = [];
  saveCart();
  renderCart();
  showToast("Order placed successfully!");
}

/* ---------------------------------------------------------
   13. SEARCH / FILTER / SORT UI BINDINGS
--------------------------------------------------------- */
function searchProducts(term) {
  searchTerm = term;
  renderProducts();
}
function filterProducts() {
  renderProducts();
}
function sortProducts(value) {
  sortBy = value;
  renderProducts();
}

/* ---------------------------------------------------------
   14. NAV / MOBILE MENU / SCROLL EFFECTS
--------------------------------------------------------- */
function toggleMobileNav() {
  const nav = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburgerBtn");
  const overlay = document.getElementById("navOverlay");
  const isOpen = nav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  overlay.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
}
function closeMobileNav() {
  document.getElementById("navLinks").classList.remove("open");
  document.getElementById("hamburgerBtn").classList.remove("open");
  document.getElementById("navOverlay").classList.remove("open");
}

function handleHeaderScroll() {
  const header = document.getElementById("siteHeader");
  header.classList.toggle("scrolled", window.scrollY > 40);
}

/* ---------------------------------------------------------
   15. NEWSLETTER
--------------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function handleNewsletterSubmit(e, inputId, msgId) {
  e.preventDefault();
  const input = document.getElementById(inputId);
  const msg = document.getElementById(msgId);
  if (!isValidEmail(input.value)) {
    msg.style.color = "#E8563F";
    msg.textContent = "Please enter a valid email address.";
    return;
  }
  msg.style.color = "";
  msg.textContent = "Thanks for subscribing! Check your inbox for your discount code.";
  input.value = "";
}

/* ---------------------------------------------------------
   16. SCROLL REVEAL
--------------------------------------------------------- */
function setupScrollReveal() {
  const sections = document.querySelectorAll(".categories, .products, .deals, .about, .newsletter");
  sections.forEach((s) => s.classList.add("reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------------------------------------------------------
   17. INIT — EVENT LISTENERS
--------------------------------------------------------- */
function init() {
  loadCart();
  loadWishlist();

  document.getElementById("year").textContent = new Date().getFullYear();

  renderCategories();
  renderProducts();
  renderDeals();
  renderCart();
  renderWishlist();
  setupScrollReveal();

  tickCountdown();
  setInterval(tickCountdown, 1000);

  // Header scroll effect
  window.addEventListener("scroll", handleHeaderScroll);

  // Mobile nav
  document.getElementById("hamburgerBtn").addEventListener("click", toggleMobileNav);
  document.getElementById("navOverlay").addEventListener("click", closeMobileNav);
  document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", closeMobileNav));

  // Search (desktop + mobile, synced)
  const searchInput = document.getElementById("searchInput");
  const searchInputMobile = document.getElementById("searchInputMobile");
  searchInput.addEventListener("input", (e) => {
    searchInputMobile.value = e.target.value;
    searchProducts(e.target.value);
  });
  searchInputMobile.addEventListener("input", (e) => {
    searchInput.value = e.target.value;
    searchProducts(e.target.value);
  });

  // Category filter chips
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.filter;
      syncChips();
      renderCategories();
      filterProducts();
    });
  });

  // Price range
  const priceRange = document.getElementById("priceRange");
  priceRange.addEventListener("input", (e) => {
    maxPrice = Number(e.target.value);
    document.getElementById("priceRangeVal").textContent = formatPrice(maxPrice);
    filterProducts();
  });

  // Rating filter
  document.getElementById("ratingFilter").addEventListener("change", (e) => {
    minRating = Number(e.target.value);
    filterProducts();
  });

  // Sort
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    sortProducts(e.target.value);
  });

  // Cart drawer
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);

  // Wishlist drawer
  document.getElementById("wishlistBtn").addEventListener("click", openWishlist);
  document.getElementById("closeWishlistBtn").addEventListener("click", closeWishlist);
  document.getElementById("wishlistOverlay").addEventListener("click", closeWishlist);

  // Quick view modal
  document.getElementById("closeQuickViewBtn").addEventListener("click", closeQuickView);
  document.getElementById("quickViewOverlay").addEventListener("click", (e) => {
    if (e.target.id === "quickViewOverlay") closeQuickView();
  });
  document.getElementById("qvQtyMinus").addEventListener("click", () => {
    if (quickViewQty > 1) quickViewQty--;
    document.getElementById("qvQtyValue").textContent = quickViewQty;
  });
  document.getElementById("qvQtyPlus").addEventListener("click", () => {
    quickViewQty++;
    document.getElementById("qvQtyValue").textContent = quickViewQty;
  });
  document.getElementById("qvAddToCartBtn").addEventListener("click", () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct.id, quickViewQty);
      closeQuickView();
    }
  });
  document.getElementById("qvWishlistBtn").addEventListener("click", () => {
    if (quickViewProduct) toggleWishlist(quickViewProduct.id);
  });

  // Checkout modal
  document.getElementById("closeCheckoutBtn").addEventListener("click", closeCheckout);
  document.getElementById("checkoutOverlay").addEventListener("click", (e) => {
    if (e.target.id === "checkoutOverlay") closeCheckout();
  });
  document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);
  document.getElementById("successCloseBtn").addEventListener("click", closeCheckout);

  // Newsletter forms
  document.getElementById("newsletterForm").addEventListener("submit", (e) =>
    handleNewsletterSubmit(e, "newsletterEmail", "newsletterMsg")
  );
  document.getElementById("footerNewsletterForm").addEventListener("submit", (e) =>
    handleNewsletterSubmit(e, "footerEmail", "footerNewsletterMsg")
  );

  // Escape key closes any open overlay
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeWishlist();
      closeQuickView();
      closeCheckout();
      closeMobileNav();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
