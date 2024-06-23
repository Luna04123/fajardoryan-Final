document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const fullname = document.getElementById('Fullname').value;
            const email = document.getElementById('Email').value;
            const username = document.getElementById('Username').value;
            const password = document.getElementById('Password').value;
            const confirmPassword = document.getElementById('ConfirmPassword').value;


            if (!fullname || !email || !username || !password || !confirmPassword) {
                alert('All fields are required.');
                return;
            }


            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];


            if (users.find(user => user.username === username)) {
                alert('Username already exists.');
                return;
            }

            const newUser = {
                fullname: fullname,
                email: email,
                username: username,
                password: password
            };
            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful!');

            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const username = document.getElementById('login-Username').value;
            const password = document.getElementById('login-Password').value;

            if (!username || !password) {
                alert('Both fields are required.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }
});
