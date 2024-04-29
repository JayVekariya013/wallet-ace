const { text } = require("body-parser");

let login = document.getElementById('login');
let signup = document.getElementById('signup');
let shade = document.getElementById('switch');

login.addEventListener('click', function () {
    shade.classList.remove('toRight');
    shade.classList.add('toLeft');
});

signup.addEventListener('click', function () {
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

// script.js

const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    content.classList.toggle('active');
});

// Dashboard Js


const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const message = document.getElementById("message");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("sName").value;
        const email = document.getElementById("sEmail").value;
        const password = document.getElementById("sPassword").value;
        const cpassword = document.getElementById("sConfirmPassword").value;

        if (password == cpassword) {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.status === 201) {
                   
                message.textContent = data.message;
                message.classList.remove('hidden');
            } else {
                message.textContent = 'Signup failed. Please try again.';
                message.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error:', error);
            message.textContent = 'An error occurred. Please try again later.';
            message.classList.remove('hidden');
        }
    }
        else {
            message.textContent = 'Please check both passwords.';
            message.classList.remove('hidden');
        }
        
    });
});
