// checklocal.js
document.addEventListener('DOMContentLoaded', function () {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');  // Replace 'userData' with your actual key

    // Get the signup and logout buttons
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout');

    if (userData) {
        // If user data exists, hide signup and show logout
        signupLink.style.display = 'none';
        logoutLink.style.display = 'block'; // Ensure the logout button is visible
    } else {
        // If no user data exists, show signup and hide logout
        signupLink.style.display = 'block';
        logoutLink.style.display = 'none';  // Hide the logout button
    }
});
