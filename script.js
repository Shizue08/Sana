// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Product data
    let products = JSON.parse(localStorage.getItem("products")) || [
        {
            id: 1,
            name: 'Americano Roasted Coffee',
            price: 18.99,
            image: 'images/m4.png',
            description: 'It is a long established fact that a reader will be distracted by the readable.'
        },
        {
            id: 2,
            name: 'Americano Roasted Coffee',
            price: 18.99,
            image: 'images/m1.png',
            description: 'It is a long established fact that a reader will be distracted by the readable.'
        },
        {
            id: 3,
            name: 'Americano Roasted Coffee',
            price: 18.99,
            image: 'images/m2.png',
            description: 'It is a long established fact that a reader will be distracted by the readable.'
        },
        {
            id: 4,
            name: 'Americano Roasted Coffee',
            price: 18.99,
            image: 'images/m3.png',
            description: 'It is a long established fact that a reader will be distracted by the readable.'
        }
    ];

    // Retrieve the cart array from localStorage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Retrieve user information from localStorage
        function getUser() {
            const userString = localStorage.getItem('user');
            return userString ? JSON.parse(userString) : null;
        }

        // Save user information to localStorage
        function saveUser(username, email, password) {
            const user = { username, email, password };
            localStorage.setItem('user', JSON.stringify(user));
        }

    // Admin panel functionality
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    const adminLoginBtn = document.getElementById("admin-login-btn");
    const adminPanel = document.getElementById("admin-panel");
    const productList = document.getElementById("product-list");
    const addProductForm = document.getElementById("add-product-form");
    const addProductBtn = document.getElementById("add-product-btn");
    const saveProductBtn = document.getElementById("save-product-btn");
    const cancelProductBtn = document.getElementById("cancel-product-btn");

    if (adminLoginBtn && adminPanel && productList && addProductForm && addProductBtn && saveProductBtn && cancelProductBtn) {
        adminLoginBtn.addEventListener("click", () => {
            const email = document.getElementById("admin-email").value;
            const password = document.getElementById("admin-password").value;

            if (email === adminEmail && password === adminPassword) {
                adminPanel.style.display = "block";
                renderProductList();
            } else {
                alert("Invalid email or password");
            }
        });

        function renderProductList() {
            productList.innerHTML = "";
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-item");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                    <div class="product-actions">
                        <button class="edit-product">Edit</button>
                        <button class="delete-product">Delete</button>
                    </div>
                `;
                productList.appendChild(productElement);
            });
        }

        addProductBtn.addEventListener("click", () => {
            addProductForm.style.display = "block";
        });

        saveProductBtn.addEventListener("click", () => {
            const name = document.getElementById("product-name").value;
            const price = parseFloat(document.getElementById("product-price").value);
            const image = document.getElementById("product-image").value;
            const description = document.getElementById("product-description").value;

            if (name && price && image && description) {
                const newProduct = {
                    id: Date.now(),
                    name,
                    price,
                    image,
                    description
                };

                products.push(newProduct);
                localStorage.setItem("products", JSON.stringify(products));
                renderProductList();
                addProductForm.style.display = "none";
                addProductForm.reset();
            } else {
                alert("Please fill in all the required fields.");
            }
        });

        cancelProductBtn.addEventListener("click", () => {
            addProductForm.style.display = "none";
            addProductForm.reset();
        });

        

        productList.addEventListener("click", (event) => {
            if (event.target.classList.contains("edit-product")) {
                const productItem = event.target.closest(".product-item");
                const productIndex = Array.from(productList.children).indexOf(productItem);
                const product = products[productIndex];

                addProductForm.style.display = "block";
                document.getElementById("product-name").value = product.name;
                document.getElementById("product-price").value = product.price;
                document.getElementById("product-image").value = product.image;
                document.getElementById("product-description").value = product.description;

                saveProductBtn.addEventListener("click", () => {
                    const name = document.getElementById("product-name").value;
                    const price = parseFloat(document.getElementById("product-price").value);
                    const image = document.getElementById("product-image").value;
                    const description = document.getElementById("product-description").value;

                    if (name && price && image && description) {
                        product.name = name;
                        product.price = price;
                        product.image = image;
                        product.description = description;
                        localStorage.setItem("products", JSON.stringify(products));
                        renderProductList();
                        addProductForm.style.display = "none";
                        addProductForm.reset();
                    } else {
                        alert("Please fill in all the required fields.");
                    }
                });

                cancelProductBtn.addEventListener("click", () => {
                    addProductForm.style.display = "none";
                    addProductForm.reset();
                });
            } else if (event.target.classList.contains("delete-product")) {
                const productItem = event.target.closest(".product-item");
                const productIndex = Array.from(productList.children).indexOf(productItem);

                if (confirm("Are you sure you want to delete this product?")) {
                    products.splice(productIndex,
                        1);
                        localStorage.setItem("products", JSON.stringify(products));
                        renderProductList();
                    }
                }
            });
        }
    
        // Retrieve user information from localStorage
        function getUser() {
            const userString = localStorage.getItem('user');
            return userString ? JSON.parse(userString) : null;
        }
    
        // Save user information to localStorage
        function saveUser(username, email, password) {
            const existingUser = getUser();
            if (existingUser && (existingUser.username === username || existingUser.email === email)) {
                alert("Username or email already exists. Please choose a different one.");
                return;
            }
    
            const user = { username, email, password };
            localStorage.setItem('user', JSON.stringify(user));
        }
    
        // Event listener for the user information update form submission
        const userUpdateForm = document.getElementById('user-update-form');
        if (userUpdateForm) {
            userUpdateForm.addEventListener('submit', (event) => {
                event.preventDefault();
    
                const newUsername = document.getElementById('new-username').value;
                const newEmail = document.getElementById('new-email').value;
                const newPassword = document.getElementById('new-password').value;
    
                if (newUsername && newEmail && newPassword) {
                    saveUser(newUsername, newEmail, newPassword);
                    alert('User information updated successfully!');
                    // Update the user link in the navigation bar
                    const userLink = document.querySelector('.Navigation-Bar a[href="user.html"]');
                    if (userLink) {
                        userLink.textContent = `User: ${newUsername}`;
                    }
                    // Redirect to the menu page or any other page
                    window.location.href = 'menu.html';
                } else {
                    alert('Please fill in all the required fields.');
                }
            });
        }
    
        // Event listener for the user deletion
        const deleteUserBtn = document.getElementById('delete-user-btn');
        if (deleteUserBtn) {
            deleteUserBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete your account?')) {
                    localStorage.removeItem('user');
                    alert('Your account has been deleted.');
                    // Remove the user link from the navigation bar
                    const userLink = document.querySelector('.Navigation-Bar a[href="user.html"]');
                    if (userLink) {
                        userLink.remove();
                    }
                    // Add login and register links to the navigation bar
                    const navigationBar = document.querySelector('.Navigation-Bar');
                    const loginLink = document.createElement('a');
                    loginLink.href = 'index.html';
                    loginLink.textContent = 'Login';
                    navigationBar.appendChild(loginLink);
    
                    const registerLink = document.createElement('a');
                    registerLink.href = 'register.html';
                    registerLink.textContent = 'Register';
                    navigationBar.appendChild(registerLink);
    
                    // Redirect to the login page or any other page
                    window.location.href = 'index.html';
                }
            });
        }
    
        // Render user information on the user page
        function renderUserInfo() {
            const userInfo = document.getElementById('user-info');
            const loggedInUser = getUser();
    
            if (loggedInUser) {
                userInfo.innerHTML = `
                    <p>Username: ${loggedInUser.username}</p>
                    <p>Email: ${loggedInUser.email}</p>
                    <button id="logout-btn">Logout</button>
                `;
    
                // Add event listener for the logout button
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', logoutUser);
                }
            } else {
                userInfo.innerHTML = '<p>You are not logged in.</p>';
            }
    
            // Update the navigation bar
            updateNavigationBar();
        }
    
        // Render user information on the user page
        if (window.location.pathname.includes('user.html')) {
            renderUserInfo();
        }
    
        // Logout function for the logged-in user
        function logoutUser() {
            console.log('Logging out user');
            localStorage.removeItem('user');
            updateNavigationBar();
            window.location.href = 'index.html';
        }
    
        function updateNavigationBar() {
            const navigationBar = document.querySelector('.Navigation-Bar');
            const loggedInUser = getUser();
    
            // Clear the navigation bar
            navigationBar.innerHTML = '';
    
            if (loggedInUser) {
                // User is logged in
                const userLink = document.createElement('a');
                userLink.href = 'user.html';
                userLink.textContent = `User: ${loggedInUser.username}`;
                navigationBar.appendChild(userLink);
            } else {
                // User is not logged in
                const loginLink = document.createElement('a');
                loginLink.href = 'index.html';
                loginLink.textContent = 'Login';
                navigationBar.appendChild(loginLink);
    
                const registerLink = document.createElement('a');
                registerLink.href = 'register.html';
                registerLink.textContent = 'Register';
                navigationBar.appendChild(registerLink);
            }
        }


                            // Retrieve user information from localStorage
            function getUser() {
                const userString = localStorage.getItem('user');
                return userString ? JSON.parse(userString) : null;
            }

            // Event listener for the login form submission
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                loginForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const email = document.getElementById('login-email').value;
                    const password = document.getElementById('login-password').value;
                    const user = getUser();

                    // Strict login validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,}$/;

                    if (user && user.email === email) {
                        if (user.password === password) {
                            // Email and password match
                            if (emailRegex.test(email) && passwordRegex.test(password)) {
                                // Login successful
                                alert('Login successful!');
                                updateNavigationBar();
                                window.location.href = 'menu.html';
                            } else {
                                // Invalid email or password format
                                alert('Invalid email or password format. Please check the requirements.');
                            }
                        } else {
                            // Incorrect password
                            alert('Incorrect password. Please try again.');
                        }
                    } else {
                        // Invalid email
                        alert('Invalid email or password.');
                    }
                });
            }


            
                /// Event listener for the registration form submission
            const registerForm = document.getElementById('register-form');
            if (registerForm) {
                registerForm.addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent the default form submission

                    // Get the entered username, email, and password
                    const username = document.getElementById('register-username').value;
                    const email = document.getElementById('register-email').value;
                    const password = document.getElementById('register-password').value;

                    // Strict registration validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,}$/;

                    if (!emailRegex.test(email)) {
                        alert('Please enter a valid email address.');
                        return;
                    }

                    if (!passwordRegex.test(password)) {
                        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
                        return;
                    }

                    // Save the user information to localStorage
                    saveUser(username, email, password);

                    // Redirect the user to the homepage or another page
                    window.location.href = 'index.html';
                });
            }
    
        // Event listener for the navigation links
        document.querySelectorAll('.Navigation-Bar a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default link behavior
    
                // Get the target URL from the clicked link
                const targetUrl = link.getAttribute('href');
    
                // Redirect to the target URL
                window.location.href = targetUrl;
            });
        });
    
        // Render products on the menu page
        const productsContainer = document.getElementById("products-container");
        if (productsContainer) {
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("menu-item", "flex");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="menu-img">
                    <div class="menuItem-details">
                        <h4 class="menuItem-topic">${product.name}</h4>
                        <p class="menuItem-des" style="display: none;">${product.description}</p>
                    </div>
                    <div class="menuItem-price flex">
                        <span class="discount-price">${product.price.toFixed(2)}</span>
                    </div>
                    <button class="add-to-cart-btn" id="${product.id}">Add to Cart</button>
                `;
    
                // Toggle product description on hover
                const productDescription = productElement.querySelector('.menuItem-des');
                productElement.addEventListener('mouseenter', () => {
                    productDescription.style.display = 'block';
                });
                productElement.addEventListener('mouseleave', () => {
                    productDescription.style.display = 'none';
                });
    
                productsContainer.appendChild(productElement);
            });
        }

                // Function to add items to the cart
        function addToCart(name, image, description, price) {
            const item = {
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name: name,
                image: image,
                description: description,
                price: price,
                quantity: 1
            };
            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(item);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
            
        // Function to update cart UI
        function updateCartUI() {
            const cartList = document.getElementById("cart-list");
            const cartContainer = document.querySelector('.cart-container');
            if (cartList && cartContainer) {
                cartList.innerHTML = "";
                let totalPrice = 0;
                if (cart.length > 0) {
                    cartContainer.style.display = 'block';
                    cart.forEach(item => {
                        totalPrice += item.price * item.quantity;
                        const cartItemElement = document.createElement("div");
                        cartItemElement.classList.add("cart-item", "flex");
                        cartItemElement.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="menu-img">
                            <div class="cart-item-details">
                                <h4 class="menuItem-topic">${item.name}</h4>
                                <p class="menuItem-des">${item.description}</p>
                            </div>
                            <div class="menu-item-quantity flex">
                                <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="remove-item" data-id="${item.id}">${item.quantity > 1 ? 'Remove' : 'Delete'}</button>
                            </div>
                            <div class="menuItem-price flex">
                                <span class="discount-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `;
                         // Toggle product description on hover
                    const productDescription = cartItemElement.querySelector('.menuItem-des');
                    cartItemElement.addEventListener('mouseenter', () => {
                        productDescription.style.display = 'block';
                    });
                    cartItemElement.addEventListener('mouseleave', () => {
                        productDescription.style.display = 'none';
                    });

                    cartList.appendChild(cartItemElement);
                });
            } else {
                cartContainer.style.display = 'none';
            }
            document.getElementById("total-price").textContent = totalPrice.toFixed(2);
        }
    }



                // Function to display the checkout items
            function checkout() {
                window.location.href = 'checkout.html';
            }

            // Function to handle placing an order
            function placeOrder() {
                alert('Your order has been placed!');
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                // Optionally, redirect to a different page
                // window.location.href = 'order-confirmation.html';
            }

            // Initialize cart items on page load
            document.addEventListener('DOMContentLoaded', function() {
                if (document.querySelector('.cart-section') || document.querySelector('.checkout-section')) {
                    updateCartUI();
                }

                const placeOrderBtn = document.getElementById('place-order-btn');
                if (placeOrderBtn) {
                    placeOrderBtn.addEventListener('click', placeOrder);
                }
            });

            // Event listener for quantity change and remove item
            document.addEventListener('click', function(event) {
                if (event.target.classList.contains('remove-item')) {
                    const id = event.target.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== id);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartUI();
                    updateTotalPrice();
                }
            });

            document.addEventListener('input', function(event) {
                if (event.target.classList.contains('item-quantity')) {
                    const id = event.target.getAttribute('data-id');
                    const quantity = parseInt(event.target.value);
                    const item = cart.find(item => item.id === id);
                    if (item) {
                        item.quantity = quantity;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartUI();
                        updateTotalPrice();
                    }
                }
            });
    
        // Function to retrieve cart items
        function getCartItems() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const products = JSON.parse(localStorage.getItem("products")) || [];
            return cart.map(cartItem => {
                const product = products.find(p => p.id === cartItem.id);
                return {
                    ...product,
                    quantity: cartItem.quantity
                };
            });
        }
    
        // Add to Cart button click event
        document.querySelectorAll(".add-to-cart-btn").forEach(button => {
            button.addEventListener("click", () => {
                const itemId = button.id;
                const item = products.find(product => product.id === parseInt(itemId));
                const existingItem = cart.find(cartItem => cartItem.id === item.id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ ...item, quantity: 1 });
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
                updateTotalPrice();
            });
        });
    
        // Remove Item button click event
        const cartList = document.getElementById("cart-list");
        if (cartList) {
            cartList.addEventListener("click", event => {
                if (event.target.classList.contains("remove-item")) {
                    const itemId = event.target.dataset.id;
                    const existingItem = cart.find(item => item.id === parseInt(itemId));
                    if (existingItem) {
                        if (existingItem.quantity > 1) {
                            existingItem.quantity--;
                        } else {
                            cart = cart.filter(item => item.id !== parseInt(itemId));
                        }
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartUI();
                    updateTotalPrice();
                }
            });
        }
    
      
    
        // Checkout process
        const checkoutBtn = document.getElementById("checkout-btn");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", () => {
                // Render cart items on the checkout page
                renderCartItemsOnCheckout();
    
                // Hide the cart items container on the checkout page
                const cartItemsContainer = document.getElementById('checkout-cart-items');
                cartItemsContainer.classList.add('hidden-cart');
    
                // Navigate to the checkout page
                window.location.href = 'checkout.html';
            });
        }
    
        // Render cart items on the checkout page
        function renderCartItemsOnCheckout() {
            const cartItems = getCartItems();
            const cartContainer = document.getElementById('checkout-cart-items');
            cartContainer.innerHTML = ''; // Clear previous items
    
            if (cartItems.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'Your cart is empty.';
                cartContainer.appendChild(emptyMessage);
            } else {
                cartItems.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('menu-item', 'flex');
    
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="menu-img">
                        <div class="menuItem-details">
                            <h4 class="menuItem-topic">${item.name}</h4>
                            <p class="menuItem-des">${item.description}</p>
                        </div>
                        <div class="menuItem-price flex">
                            <span class="discount-price">${item.price.toFixed(2)}</span>
                        </div>
                        <div class="menu-item-quantity flex">
                            <span>Quantity: ${item.quantity}</span>
                        </div>
                    `;
    
                   // Toggle product description on hover
                const productDescription = cartItem.querySelector('.menuItem-des');
                cartItem.addEventListener('mouseenter', () => {
                    productDescription.style.display = 'block';
                });
                cartItem.addEventListener('mouseleave', () => {
                    productDescription.style.display = 'none';
                });

                cartContainer.appendChild(cartItem);
            });
        }

        updateTotalPrice();
    }
    
        // Update total price on the checkout page
        function updateTotalPrice() {
            const cartItems = getCartItems();
            let totalPrice = 0;
            cartItems.forEach(item => {
                totalPrice += item.price * item.quantity;
            });
            document.getElementById("total-price").textContent = totalPrice.toFixed(2);
        }

        // Event listener for quantity change
    document.addEventListener('input', function(event) {
        if (event.target.classList.contains('item-quantity')) {
            const itemId = event.target.dataset.id;
            const quantity = parseInt(event.target.value);
            const item = cart.find(item => item.id === parseInt(itemId));
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                updateTotalPrice();
            }
        }
    });
    
        // Event listener for the checkout form submission
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (event) => {
                event.preventDefault();
    
                const fullName = document.getElementById('full-name').value;
                const address = document.getElementById('address').value;
                const phone = document.getElementById('phone').value;
                const paymentMethod = document.getElementById('payment-method').value;
    
                if (fullName && address && phone && paymentMethod) {
                    alert('Thank You For Ordering, Your Order Will Now Be Delivered');
                    // Clear the cart and reset the form
                    localStorage.removeItem('cart');
                    checkoutForm.reset();
                    // Redirect to the menu page or any other page
                    window.location.href = 'menu.html';
                } else {
                    alert('Please fill in all the required fields.');
                }
            });
        }
    
         // Initial render
    document.addEventListener('DOMContentLoaded', function() {
        renderCartItems();
        updateTotalPrice();

        // Show the cart items container on the checkout page
        const cartItemsContainer = document.getElementById('checkout-cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.classList.remove('hidden-cart');
        }
    });
});

// Event listener for the login/register form toggle
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

if (wrapper && loginLink && registerLink && btnPopup && iconClose) {
    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
    });

    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });
}

        // Array to hold cart items
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Function to add items to the cart
        function addToCart(name, image, description, price) {
            const item = {
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name: name,
                image: image,
                description: description,
                price: price,
                quantity: 1
            };
            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(item);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }

        // Function to update cart UI
        function updateCartUI() {
            const cartList = document.getElementById("cart-list");
            const cartContainer = document.querySelector('.cart-container');
            if (cartList && cartContainer) {
                cartList.innerHTML = "";
                let totalPrice = 0;
                if (cart.length > 0) {
                    cartContainer.style.display = 'block';
                    cart.forEach(item => {
                        totalPrice += item.price * item.quantity;
                        const cartItemElement = document.createElement("div");
                        cartItemElement.classList.add("cart-item", "flex");
                        cartItemElement.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="menu-img">
                            <div class="cart-item-details">
                                <h4 class="menuItem-topic">${item.name}</h4>
                                <p class="menuItem-des">${item.description}</p>
                            </div>
                            <div class="menu-item-quantity flex">
                                <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="remove-item" data-id="${item.id}">${item.quantity > 1 ? 'Remove' : 'Delete'}</button>
                            </div>
                            <div class="menuItem-price flex">
                                <span class="discount-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `;
                        // Toggle product description on hover
                    const productDescription = cartItemElement.querySelector('.menuItem-des');
                    cartItemElement.addEventListener('mouseenter', () => {
                        productDescription.style.display = 'block';
                    });
                    cartItemElement.addEventListener('mouseleave', () => {
                        productDescription.style.display = 'none';
                    });

                    cartList.appendChild(cartItemElement);
                });
            } else {
                cartContainer.style.display = 'none';
            }
            document.getElementById("total-price").textContent = totalPrice.toFixed(2);
        }
        }

        // Function to display the checkout items
        function checkout() {
            window.location.href = 'cart.html';
        }

        // Function to handle placing an order
        function placeOrder() {
            alert('Your order has been placed!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            // Optionally, redirect to a different page
            // window.location.href = 'order-confirmation.html';
        }

        // Initialize cart items on page load
        document.addEventListener('DOMContentLoaded', function() {
            if (document.querySelector('.cart-section') || document.querySelector('.checkout-section')) {
                updateCartUI();
            }

            const placeOrderBtn = document.getElementById('place-order-btn');
            if (placeOrderBtn) {
                placeOrderBtn.addEventListener('click', placeOrder);
            }
        });

        // Event listener for quantity change and remove item
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-item')) {
                const id = event.target.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                updateTotalPrice();
            }
        });

        document.addEventListener('input', function(event) {
            if (event.target.classList.contains('item-quantity')) {
                const id = event.target.getAttribute('data-id');
                const quantity = parseInt(event.target.value);
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity = quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartUI();
                    updateTotalPrice();
                }
            }
        });
         