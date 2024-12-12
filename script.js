// Mock username and password for demo purposes
const validUsername = "admin";
const validPassword = "password123";

// Handle login validation
function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear any previous error messages
    errorMessage.textContent = "";

    // Basic validation
    if (username === "" || password === "") {
        errorMessage.textContent = "Both fields are required!";
        return false; // Prevent form submission
    }

    // Check credentials
    if (username === validUsername && password === validPassword) {
        // If valid, redirect to the home page
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
        return false; // Prevent form submission
    } else {
        errorMessage.textContent = "Invalid username or password!";
        return false; // Prevent form submission
    }
}

// Check if user is logged in (for home page)
window.onload = function() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    }
};

// Handle logout
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html"; // Redirect to login page after logout
}
