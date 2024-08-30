document.addEventListener('DOMContentLoaded', () => {
    // Dummy products data
    const products = [
        { id: 1, name: 'Product 1', price: 10.00 },
        { id: 2, name: 'Product 2', price: 20.00 },
        { id: 3, name: 'Product 3', price: 25.00 },
        { id: 4, name: 'Product 4', price: 30.00 },
        // Add more products as needed
    ];

    let cart = [];

    function displayProducts(productsToDisplay) {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productsContainer.appendChild(productElement);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });
    }

    function addToCart(product) {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalPrice += item.price * item.quantity;
        });

        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    }


    function filterProducts(filterValue) {
        let filteredProducts = products;
        if (filterValue === 'under-15') {
            filteredProducts = products.filter(product => product.price < 15);
        } else if (filterValue === '15-25') {
            filteredProducts = products.filter(product => product.price >= 15 && product.price <= 25);
        } else if (filterValue === 'over-25') {
            filteredProducts = products.filter(product => product.price > 25);
        }
        return filteredProducts;
    }

    function sortProducts(sortValue, productsToSort) {
        let sortedProducts = [...productsToSort];
        if (sortValue === 'price-asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
        return sortedProducts;
    }

    function addToCart(product) {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) {
            console.error('Cart items container not found.');
            return;
        }
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.innerHTML = `
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalPrice += item.price * item.quantity;
        });

        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    }

    // Event listeners for filtering and sorting
    const filterSelect = document.getElementById('filter');
    const sortSelect = document.getElementById('sort');

    if (filterSelect && sortSelect) {
        filterSelect.addEventListener('change', () => {
            const filterValue = filterSelect.value;
            const sortValue = sortSelect.value;
            let filteredProducts = filterProducts(filterValue);
            let finalProducts = sortProducts(sortValue, filteredProducts);
            displayProducts(finalProducts);
        });

        sortSelect.addEventListener('change', () => {
            const filterValue = filterSelect.value;
            const sortValue = sortSelect.value;
            let filteredProducts = filterProducts(filterValue);
            let finalProducts = sortProducts(sortValue, filteredProducts);
            displayProducts(finalProducts);
        });
    } else {
        console.log('Filter or sort select elements not found.');
    }

    // Checkout button
    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Thank you for your purchase!');
            cart = [];
            updateCart();
        });
    } else {
        console.log('Checkout button not found.');
    }

    // Handle Signup
    const signupButton = document.getElementById('signup-button');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            if (username && email && password) {
                // Save user data to localStorage
                localStorage.setItem('user', JSON.stringify({ username, email, password }));
                alert('Signup successful!');
                // Redirect to login page after signup
                window.location.href = 'login.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    } else {
        console.log('Signup button not found.');
    }

    // Handle Login
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Retrieve stored user data
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert('Login successful!');
                // Redirect to index.html
                window.location.href = 'index.html';
            } else {
                alert('Incorrect email or password.');
            }
        });
    } else {
        console.log('Login button not found.');
    }

    
    // Initial display of products
    displayProducts(products);
});
