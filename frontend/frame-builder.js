// Frame Builder JavaScript - Frameholic
// Menangani semua fungsionalitas customize frame

// Global variables
let currentFrame = {
    width: 25,
    height: 35,
    frameModel: 'Carlit White',
    frameType: 'wood',
    matWidth: 2,
    matColor: 'white',
    glassType: 'acrylic',
    quantity: 1,
    basePrice: 80000,
    matPrice: 15000,
    glassPrice: 0
};

let cart = JSON.parse(localStorage.getItem('frameholic_cart')) || [];
let frameModels = [
    { name: 'Carlit White', type: 'wood', description: 'Premium Wood Frame', basePrice: 80000 },
    { name: 'Athena Black', type: 'aluminum', description: 'Aluminum Frame', basePrice: 75000 },
    { name: 'Arcalod Gold', type: 'wood', description: 'Minimalist Gold', basePrice: 90000 },
    { name: 'Camara Natural', type: 'wood', description: 'Scandinavian Living', basePrice: 85000 }
];
let currentFrameIndex = 0;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateFramePreview();
    updatePricing();
    updateCartCount();
    loadCartItems();
    
    // Set completion date (7 days from now)
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + 7);
    document.getElementById('completionDate').textContent = completionDate.toLocaleDateString('en-GB');
});

// Frame Size Functions
function selectSize(width, height, type) {
    currentFrame.width = width;
    currentFrame.height = height;
    
    // Update custom inputs
    document.getElementById('customWidth').value = width;
    document.getElementById('customHeight').value = height;
    
    // Update active button
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    updateFramePreview();
    updatePricing();
}

function updateCustomSize() {
    const width = parseInt(document.getElementById('customWidth').value) || 25;
    const height = parseInt(document.getElementById('customHeight').value) || 35;
    
    // Validation
    if (width < 10 || width > 100 || height < 10 || height > 100) {
        alert('Ukuran frame harus antara 10-100 cm');
        return;
    }
    
    currentFrame.width = width;
    currentFrame.height = height;
    
    // Update preset buttons
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    
    updateFramePreview();
    updatePricing();
}

// Frame Model Functions
function previousFrame() {
    currentFrameIndex = currentFrameIndex > 0 ? currentFrameIndex - 1 : frameModels.length - 1;
    updateFrameModel();
}

function nextFrame() {
    currentFrameIndex = currentFrameIndex < frameModels.length - 1 ? currentFrameIndex + 1 : 0;
    updateFrameModel();
}

function updateFrameModel() {
    const model = frameModels[currentFrameIndex];
    currentFrame.frameModel = model.name;
    currentFrame.frameType = model.type;
    currentFrame.basePrice = model.basePrice;
    
    document.getElementById('frameModel').textContent = model.name;
    document.getElementById('frameDescription').textContent = model.description;
    
    updateFramePreview();
    updatePricing();
}

// Mat Functions
function selectMatWidth(width) {
    currentFrame.matWidth = width;
    currentFrame.matPrice = width === 0 ? 0 : 15000 + (width - 2) * 5000;
    
    // Update active button
    document.querySelectorAll('.mat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    updateFramePreview();
    updatePricing();
}

function selectMatColor(color) {
    currentFrame.matColor = color;
    
    // Update active button
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    updateFramePreview();
}

// Glass Functions
function updateGlass() {
    const selectedGlass = document.querySelector('input[name="glass"]:checked').value;
    currentFrame.glassType = selectedGlass;
    
    switch(selectedGlass) {
        case 'acrylic':
            currentFrame.glassPrice = 0;
            break;
        case 'premium':
            currentFrame.glassPrice = 50000;
            break;
        case 'none':
            currentFrame.glassPrice = -25000;
            break;
    }
    
    updatePricing();
}

// Quantity Functions
function changeQuantity(change) {
    const newQty = currentFrame.quantity + change;
    if (newQty >= 1 && newQty <= 50) {
        currentFrame.quantity = newQty;
        document.getElementById('quantity').value = newQty;
        updatePricing();
    }
}

function updateQuantity() {
    const qty = parseInt(document.getElementById('quantity').value) || 1;
    if (qty >= 1 && qty <= 50) {
        currentFrame.quantity = qty;
        updatePricing();
    } else {
        alert('Jumlah pesanan harus antara 1-50');
        document.getElementById('quantity').value = currentFrame.quantity;
    }
}

// Preview Functions
function updateFramePreview() {
    const frameVisual = document.getElementById('frameVisual');
    const matBorder = document.getElementById('matBorder');
    const frameBorder = document.getElementById('frameBorder');
    
    // Update title
    document.getElementById('frameTitle').textContent = 
        `Customizing your frame to fit ${currentFrame.width} x ${currentFrame.height} cm artwork.`;
    
    // Update frame border style based on frame type
    if (currentFrame.frameType === 'wood') {
        frameBorder.style.background = '#8B4513';
        frameBorder.style.border = '8px solid #654321';
    } else {
        frameBorder.style.background = '#2C3E50';
        frameBorder.style.border = '6px solid #34495E';
    }
    
    // Update mat
    if (currentFrame.matWidth > 0) {
        matBorder.style.display = 'block';
        matBorder.style.padding = `${currentFrame.matWidth * 3}px`;
        
        switch(currentFrame.matColor) {
            case 'white':
                matBorder.style.background = '#ffffff';
                break;
            case 'cream':
                matBorder.style.background = '#f5f5dc';
                break;
            case 'black':
                matBorder.style.background = '#2c3e50';
                break;
            case 'gray':
                matBorder.style.background = '#95a5a6';
                break;
        }
    } else {
        matBorder.style.display = 'none';
    }
    
    // Update final frame size
    const finalWidth = currentFrame.width + (currentFrame.matWidth * 2) + 4;
    const finalHeight = currentFrame.height + (currentFrame.matWidth * 2) + 4;
    document.getElementById('finalFrameSize').textContent = `${finalWidth} x ${finalHeight} cm`;
}

// Pricing Functions
function updatePricing() {
    const basePrice = currentFrame.basePrice;
    const matPrice = currentFrame.matPrice;
    const glassPrice = currentFrame.glassPrice;
    const subtotal = basePrice + matPrice + glassPrice;
    const total = subtotal * currentFrame.quantity;
    
    // Update price display
    document.getElementById('basePrice').textContent = `IDR ${basePrice.toLocaleString()}`;
    document.getElementById('matPrice').textContent = `IDR ${matPrice.toLocaleString()}`;
    document.getElementById('glassPrice').textContent = `IDR ${glassPrice.toLocaleString()}`;
    document.getElementById('subtotal').textContent = `IDR ${subtotal.toLocaleString()}`;
    document.getElementById('totalPrice').textContent = `IDR ${total.toLocaleString()}`;
    document.getElementById('qtyDisplay').textContent = currentFrame.quantity;
}

// Cart Functions
function addToCart() {
    // Validation
    if (!validateFrame()) {
        return;
    }
    
    const frameItem = {
        id: Date.now(),
        width: currentFrame.width,
        height: currentFrame.height,
        frameModel: currentFrame.frameModel,
        frameType: currentFrame.frameType,
        matWidth: currentFrame.matWidth,
        matColor: currentFrame.matColor,
        glassType: currentFrame.glassType,
        quantity: currentFrame.quantity,
        unitPrice: currentFrame.basePrice + currentFrame.matPrice + currentFrame.glassPrice,
        totalPrice: (currentFrame.basePrice + currentFrame.matPrice + currentFrame.glassPrice) * currentFrame.quantity,
        dateAdded: new Date().toISOString()
    };
    
    cart.push(frameItem);
    localStorage.setItem('frameholic_cart', JSON.stringify(cart));
    
    updateCartCount();
    loadCartItems();
    
    // Show success message
    alert('Frame berhasil ditambahkan ke cart!');
    
    // Optionally open cart
    toggleCart();
}

function validateFrame() {
    if (currentFrame.width < 10 || currentFrame.width > 100) {
        alert('Lebar frame harus antara 10-100 cm');
        return false;
    }
    
    if (currentFrame.height < 10 || currentFrame.height > 100) {
        alert('Tinggi frame harus antara 10-100 cm');
        return false;
    }
    
    if (currentFrame.quantity < 1 || currentFrame.quantity > 50) {
        alert('Jumlah pesanan harus antara 1-50');
        return false;
    }
    
    return true;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Cart kosong</p>';
        cartTotal.textContent = 'IDR 0';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.totalPrice;
        cartHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <h4>${item.frameModel}</h4>
                    <p>${item.width}x${item.height}cm, Mat: ${item.matWidth}cm, ${item.glassType}</p>
                    <p>Qty: ${item.quantity} x IDR ${item.unitPrice.toLocaleString()}</p>
                </div>
                <div class="item-actions">
                    <span class="item-price">IDR ${item.totalPrice.toLocaleString()}</span>
                    <button class="remove-item" onclick="removeFromCart(${index})">×</button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    cartTotal.textContent = `IDR ${total.toLocaleString()}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('frameholic_cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Checkout Functions
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Cart kosong! Tambahkan item terlebih dahulu.');
        return;
    }
    
    document.getElementById('checkoutModal').style.display = 'block';
    loadCheckoutItems();
}

function loadCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.totalPrice;
        itemsHTML += `
            <div class="checkout-item">
                <span>${item.frameModel} (${item.width}x${item.height}cm) x${item.quantity}</span>
                <span>IDR ${item.totalPrice.toLocaleString()}</span>
            </div>
        `;
    });
    
    checkoutItemsContainer.innerHTML = itemsHTML;
    checkoutTotal.textContent = `IDR ${total.toLocaleString()}`;
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrder();
        });
    }
});

async function submitOrder() {
    const formData = new FormData(document.getElementById('checkoutForm'));
    
    // Validation
    if (!validateCheckoutForm(formData)) {
        return;
    }
    
    const orderData = {
        customer: {
            name: formData.get('customerName'),
            email: formData.get('customerEmail'),
            phone: formData.get('customerPhone'),
            address: formData.get('customerAddress')
        },
        payment_method: formData.get('paymentMethod'),
        items: cart,
        total_amount: cart.reduce((sum, item) => sum + item.totalPrice, 0),
        order_date: new Date().toISOString(),
        status: 'pending'
    };
    
    try {
        // Show loading
        const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Send to Laravel backend
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            const result = await response.json();
            
            // Clear cart
            cart = [];
            localStorage.removeItem('frameholic_cart');
            updateCartCount();
            
            // Show success
            alert(`Pesanan berhasil! Order ID: ${result.order_id}`);
            
            // Close modal
            closeCheckout();
            toggleCart();
            
            // Redirect to success page or reload
            window.location.href = '/order-success?id=' + result.order_id;
            
        } else {
            throw new Error('Failed to submit order');
        }
        
    } catch (error) {
        console.error('Error submitting order:', error);
        alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
    } finally {
        // Reset button
        const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function validateCheckoutForm(formData) {
    const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'customerAddress', 'paymentMethod'];
    
    for (let field of requiredFields) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            alert(`${field.replace('customer', '').replace('Method', ' Method')} harus diisi!`);
            return false;
        }
    }
    
    // Email validation
    const email = formData.get('customerEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return false;
    }
    
    // Phone validation
    const phone = formData.get('customerPhone');
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        alert('Format nomor telepon tidak valid!');
        return false;
    }
    
    return true;
}

// Utility Functions
function editSize() {
    window.location.href = 'framing.html';
}

function uploadImage() {
    // Implement image upload functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const artworkArea = document.getElementById('artworkArea');
                artworkArea.innerHTML = `<img src="${e.target.result}" alt="Uploaded artwork" style="width: 100%; height: 100%; object-fit: cover;">`;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Switch tab content (implement if needed)
    if (tab === 'preview') {
        // Show preview mode
        console.log('Switching to preview mode');
    } else {
        // Show customize mode
        console.log('Switching to customize mode');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('checkoutModal');
    if (event.target === modal) {
        closeCheckout();
    }
}
