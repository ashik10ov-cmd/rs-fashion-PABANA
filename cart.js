
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addCart(name, price, size) {
    if (!size) {
        size = 'M'; // Default size
    }
    let product = {
        name: name,
        price: price,
        size: size
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " (" + size + ") added to cart");
    updateCartCount();
}

/* Show Cart */
function showCart() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartBox = document.getElementById("cartItems");
    let total = 0;

    cartBox.innerHTML = ''; // Clear previous

    cartItems.forEach(function(item, index) {
        let div = document.createElement("div");
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} (${item.size}) - ${item.price} Tk</span>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartBox.appendChild(div);
        total += item.price;
    });

    document.getElementById("total").innerText = "Total: " + total + " Tk";
    updateCartCount();
}

/* Remove Item */
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

/* Clear Cart */
function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    showCart();
}

/* Update Cart Count */
function updateCartCount() {
    let count = cart.length;
    let cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.innerText = count;
    }
}

/* Dark Mode Toggle */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

/* Order Now Function */
function orderNow(name, price, size) {
    if (!size) {
        size = 'M';
    }
    let product = {
        name: name,
        price: price,
        size: size
    };
    
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
    // Redirect to order page
    window.location.href = 'order.html';
}

/* Load Dark Mode */
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    updateCartCount();
});

