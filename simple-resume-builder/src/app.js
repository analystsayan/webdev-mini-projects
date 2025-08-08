// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener to the form
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission (page reload)

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validate inputs
        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        // Optional: Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Send data to the backend
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }), // Convert data to JSON
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to signup');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Log response from the backend
                alert("Signup Successful!");
            })
            .catch((error) => {
                console.error('Error:', error); // Log errors
                alert("Signup failed. Please try again.");
            });
    });
});
