document.getElementById('signin-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    // Get the form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare data for the POST request
    const data = {
        email: email,
        password: password
    };

    try {
        // Send data to the backend via POST request
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Sign in successful!');
            // Optionally, redirect to home page or dashboard
            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(result.user));  // Save user data in localStorage
            localStorage.setItem('authToken', result.token);  // Save token if provided by the backend

            // Redirect user to a new page after successful sign-in
            window.location.href = 'index.html';  // or wherever you want to redirect
        } else {
            alert(result.message || 'Failed to sign in.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing in.');
    }
});
