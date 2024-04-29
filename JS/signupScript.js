// script.js

// Function to handle user registration (signup)
function register() {
    // Get user input
    const username = document.getElementById('sName').value;
    const email = document.getElementById('sEmail').value;
    const password = document.getElementById('sPassword').value;
    const confirmPassword = document.getElementById('sConfirmPassword').value;

    // Validate user input
    if (!username || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
    }

    // Prepare data to send to the server
    const userData = {
        username: username,
        email: email,
        password: password
    };

    // Send a POST request to the server for user registration
    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed.');
        }
        return response.json();
    })
    .then(data => {
        showMessage(data.message, 'success');
        // Optionally, you can redirect the user to another page after successful registration
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
