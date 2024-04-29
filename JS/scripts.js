let login = document.getElementById('login');
let signup = document.getElementById('signup');
let shade = document.getElementById('switch');

login.addEventListener('click', function(){
    shade.classList.remove('toRight');
    shade.classList.add('toLeft');
});

signup.addEventListener('click', function(){
    shade.classList.remove('toLeft');
    shade.classList.add('toRight');
});

// script.js

// Get reference to the button
const openButton = document.getElementById("openButton");

// Function to open the HTML file when the button is clicked
function openHTMLFile() {
    // Replace 'target.html' with the path to your HTML file
    // document.getElementById("openButton").style.display = "block";
    window.location.href = 'login.html';
}

// Add click event listener to the button
openButton.addEventListener("click", openHTMLFile);

// script.js

// Function to close the open window and redirect to the home page
function closeWindowAndRedirect() {
    window.close(); // Close the open window or tab
    window.location.href = "index.html"; // Redirect to the home page (adjust the URL as needed)
}

// Call the function when needed, for example, when a button is clicked
// For demonstration purposes, let's assume there's a button with the ID "closeButton" in your HTML
const closeButton = document.getElementById("closeButton");

if (closeButton) {
    closeButton.addEventListener("click", closeWindowAndRedirect);
}


// Dashboard Js


function mylogin() {
    window.location.href = "LO.html"
}

var a = document.addEventListener('click', mylogin);


// Get the form and error message element
var loginForm = document.getElementById('loginForm');
var errorMessage = document.getElementById('error-message');

// Event listener for form submission
loginForm.addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();

    // Get form input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Perform validation
    if(username === '' || password === '') {
        // Display error message if fields are empty
        errorMessage.textContent = 'Username and password are required.';
    } 
    else if (username != username || password != password ) {
        // Handle additional validation conditions
        errorMessage.textContent = 'Invalid username or password.';
    } 
    else {
        // Form is valid, you can proceed with form submission or other actions
        errorMessage.textContent = '';
        // Perform form submission logic here (e.g., send data to server)
    }
});
