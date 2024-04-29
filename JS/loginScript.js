// script.js

// Function to handle user login
function login() {
    // Get user input
    const email = document.getElementById('txtEmail').value;
    const password = document.getElementById('txtPass').value;

    // Validate user input
    if (!email || !password) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    // Prepare data to send to the server
    const loginData = {
        email: email,
        password: password
    };

    // Send a POST request to the server for user login
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed.');
        }
        return response.json();
    })
    .then(data => {
        showMessage(data.message, 'success');
        location.href = 'Dashboard.html';
        // Optionally, you can redirect the user to another page after successful login
    })
    .catch(error => {
        showMessage(error.message, 'error');
    });
}

// Function to display a message to the user
function showMessage(message, type) {
    const messageElement = document.getElementById('error-message');
    messageElement.textContent = message;
    messageElement.classList.remove('hidden');
    messageElement.classList.remove('success');
    messageElement.classList.remove('error');
    messageElement.classList.add(type);
}
