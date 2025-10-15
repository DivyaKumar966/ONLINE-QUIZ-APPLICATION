// signup.js
// Client-side signup that stores users in localStorage under 'quizUsers'

function qs(id) { return document.getElementById(id); }

function showAlert(msg) {
    alert(msg);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = qs('signupForm');
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

        const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRe.test(email)) {
            showAlert('Please enter a valid email address');
            return;
        }

        if (password.length < 4) {
            showAlert('Password should be at least 4 characters');
            return;
        }

        // Load existing users
        const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');

        // Prevent duplicate emails
        const exists = users.some(u => u.email.toLowerCase() === email);
        if (exists) {
            showAlert('An account with this email already exists. Please login.');
            window.location.href = 'index.html';
            return;
        }

        // Add new user
        users.push({ name, email, password });
        localStorage.setItem('quizUsers', JSON.stringify(users));

        showAlert('Account created successfully. You can now login.');
        window.location.href ='index.html';
    });
});
