// login.js
// Client-side login that checks users saved in localStorage under 'quizUsers'

function qs(id) { return document.getElementById(id); }

function showAlert(msg) {
    // Simple UI fallback for alerts; replaceable with nicer UI later
    alert(msg);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = qs('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = qs('name').value.trim();
        const email = qs('email').value.trim().toLowerCase();
        const password = qs('password').value;

        if (!name || !email || !password) {
            showAlert('Please fill all fields');
            return;
        }

        // basic email validation
        const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRe.test(email)) {
            showAlert('Please enter a valid email address');
            return;
        }

        // Load users array from localStorage
        const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');

        // Find user by email (case-insensitive)
        const user = users.find(u => u.email.toLowerCase() === email);

        if (!user) {
            showAlert('No account found with that email. Please sign up first.');
            // Optionally redirect to create.html
            // window.location.href = 'create.html';
            return;
        }

        // Check password
        if (user.password !== password) {
            showAlert('Incorrect password. Please try again.');
            return;
        }

        // Success - store session (quizUser) without password
        localStorage.setItem('quizUser', JSON.stringify({ name: user.name, email: user.email }));

        // Redirect to quiz
        window.location.href = 'quiz.html';
    });
});