document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    // Get the form values
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Prepare data for the POST request
    const data = {
        full_name: fullName,
        email: email,
        password: password
    };

    try {
        // Send data to the backend via POST request
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Account created successfully!');
            // Optionally, redirect to sign-in page
            window.location.href = 'signin.html';
        } else {
            alert(result.message || 'Failed to create account.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the account.');
    }
});
