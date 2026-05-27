import { baseUrl } from "./utils.js";
const productsContainer = document.getElementById("productsContainer");

// Global state for cart
let cart = [];

async function fetchProducts() {
    console.log('fetchProducts called....')
    try {
        const response = await fetch(`${baseUrl}/products`);
        const products = await response.json();
        
        // Render product cards
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="img-zoom-container">
                    <img src="${product.imageUrl}" alt="${product.name}" class="zoom-img">
                    <div class="magnifier"></div>
                </div>
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="buy-btn add-to-cart-btn" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        data-image="${product.imageUrl}">
                    Add to Cart
                </button>
            </div>
        `).join('');
        
        initZoomAndModals();
        initCartLogic();

    } catch (error) {
        productsContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

function initZoomAndModals() {
    const containers = document.querySelectorAll('.img-zoom-container');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalTargetImg');
    const closeBtn = document.querySelector('.modal-close');

    containers.forEach(container => {
        const img = container.querySelector('.zoom-img');
        const magnifier = container.querySelector('.magnifier');

        magnifier.style.backgroundImage = `url('${img.src}')`;
        const zoomLevel = 2; 
        magnifier.style.backgroundSize = `${container.offsetWidth * zoomLevel}px ${container.offsetHeight * zoomLevel}px`;

        container.addEventListener('mousemove', (e) => {
            magnifier.style.display = "block";
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            magnifier.style.left = `${x - magnifier.offsetWidth / 2}px`;
            magnifier.style.top = `${y - magnifier.offsetHeight / 2}px`;

            const bgX = (x * zoomLevel) - (magnifier.offsetWidth / 2);
            const bgY = (y * zoomLevel) - (magnifier.offsetHeight / 2);
            magnifier.style.backgroundPosition = `-${bgX}px -${bgY}px`;
        });

        container.addEventListener('mouseleave', () => {
            magnifier.style.display = "none";
        });

        container.addEventListener('click', () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => { modal.style.display = "none"; });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = "none"; });
}

function initCartLogic() {
    const cartPanel = document.getElementById('cartPanel');
    const closeCartBtn = document.getElementById('closeCart');
    const viewCartBtn = document.getElementById('viewCartBtn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', () => cartPanel.classList.add('open'));
    }

    closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('open'));

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();

            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const imageUrl = button.getAttribute('data-image');

            addToCartArray(name, price, imageUrl);
            cartPanel.classList.add('open'); 
        });
    });
}

function addToCartArray(name, price, imageUrl) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, imageUrl, quantity: 1 });
    }
    renderCartItems();
}

function renderCartItems() {
    const cartContainer = document.getElementById('cartItemsContainer');
    const totalElement = document.getElementById('cartTotalVal');

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center; color:#888;'>Your cart is empty.</p>";
        totalElement.innerText = "0.00";
        return;
    }

    let total = 0;

    cartContainer.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item-btn" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }).join('');

    totalElement.innerText = total.toFixed(2);

    // Attach event listeners to the trash buttons
    const removeButtons = cartContainer.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            removeItemFromCart(index);
        });
    });
}

function removeItemFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    renderCartItems();
}

fetchProducts();