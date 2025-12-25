const products = [
  {
    name: 'Glide Runner X',
    price: 160,
    tag: 'New',
    category: 'running',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    colors: ['Bone', 'Carbon'],
  },
  {
    name: 'Cityline Apex',
    price: 140,
    tag: 'Best seller',
    category: 'urban',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    colors: ['Clay', 'Night'],
  },
  {
    name: 'Orbit Knit 2.0',
    price: 120,
    tag: 'Hot',
    category: 'sneakers',
    image: 'https://images.unsplash.com/photo-1549298916-42b42dc44697?auto=format&fit=crop&w=800&q=80',
    colors: ['Ice', 'Graphite'],
  },
  {
    name: 'Pulse Rise',
    price: 130,
    tag: 'Limited',
    category: 'running',
    image: 'https://images.unsplash.com/photo-1549298916-9d89a9d15ede?auto=format&fit=crop&w=800&q=80',
    colors: ['Seafoam', 'Black'],
  },
  {
    name: 'Dune Scout',
    price: 150,
    tag: 'New color',
    category: 'urban',
    image: 'https://images.unsplash.com/photo-1509631171560-7e0c4baf1d5a?auto=format&fit=crop&w=800&q=80',
    colors: ['Sand', 'Olive'],
  },
  {
    name: 'Featherstep Pro',
    price: 110,
    tag: 'Comfort',
    category: 'sneakers',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    colors: ['Cloud', 'Shadow'],
  },
];

const reviews = [
  {
    name: 'Morgan T.',
    role: 'Product designer',
    message: 'Every pair feels premium. The cushioning is unreal and the packaging looks luxe.',
    stars: 5,
  },
  {
    name: 'Alex P.',
    role: 'Runner & commuter',
    message: 'The Glide Runner X has become my daily pair — breathable, light, and stylish.',
    stars: 5,
  },
  {
    name: 'Sasha W.',
    role: 'Retail manager',
    message: 'Fast delivery and easy returns. The monochrome pack goes with literally everything.',
    stars: 5,
  },
  {
    name: 'Jamie L.',
    role: 'Content creator',
    message: 'Love the focus on recycled materials. The colors and shapes feel straight out of the future.',
    stars: 4,
  },
];

const grid = document.getElementById('product-grid');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const searchInput = document.getElementById('search-input');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');
const reviewContainer = document.getElementById('reviews');
let cartTotal = 0;

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card__media">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <span class="card__badge">${product.tag}</span>
    </div>
    <div class="card__body">
      <h4>${product.name}</h4>
      <div class="card__meta">
        <span><i class="fa-solid fa-palette"></i> ${product.colors.join(' · ')}</span>
        <span><i class="fa-solid fa-tag"></i> ${product.category}</span>
      </div>
      <div class="price">
        <strong>$${product.price}</strong>
        <button class="btn btn--ghost add-to-cart" aria-label="Add ${product.name} to cart">
          <i class="fa-solid fa-cart-plus"></i>
          Add to cart
        </button>
      </div>
    </div>
  `;
  card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product.name));
  return card;
}

function renderProducts(filter = 'all', query = '') {
  grid.innerHTML = '';
  const normalizedQuery = query.toLowerCase();
  const filtered = products.filter((product) => {
    const matchesFilter = filter === 'all' || product.category === filter;
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  if (!filtered.length) {
    grid.innerHTML = '<p class="muted">No products match your search.</p>';
    return;
  }

  filtered.forEach((product) => grid.appendChild(createProductCard(product)));
}

function addToCart(name) {
  cartTotal += 1;
  cartCount.textContent = cartTotal;
  showToast(`${name} added to cart`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 2000);
}

function renderReviews() {
  reviewContainer.innerHTML = '';
  reviews.forEach((review) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-card__head">
        <div>
          <strong>${review.name}</strong>
          <div class="muted">${review.role}</div>
        </div>
      </div>
      <div class="review-card__stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
      <p>${review.message}</p>
    `;
    reviewContainer.appendChild(card);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderProducts(btn.dataset.filter, searchInput.value);
  });
});

searchInput.addEventListener('input', (event) => {
  const activeFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter ?? 'all';
  renderProducts(activeFilter, event.target.value);
});

renderProducts();
renderReviews();
