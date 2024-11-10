document.getElementById('logout').addEventListener('click', function () {
    // Clear data from local storage
    localStorage.removeItem('user'); // Replace 'userData' with the actual key if different

    // Redirect to login page
    window.location.href = 'signin.html';
});
