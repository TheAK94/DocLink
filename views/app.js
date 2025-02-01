function toggleForms(event) {
    event.preventDefault();
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('loginModalLabel');
    const toggleLink = document.getElementById('toggleFormLink');
    const toggleText = document.getElementById('toggleFormText');

    if (loginForm.style.display === 'none') {
        // Switch to Login
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        modalTitle.textContent = 'Login';
        toggleLink.textContent = 'Register here';
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleFormLink" onclick="toggleForms(event)">Register here</a>';
    } else {
        // Switch to Register
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        modalTitle.textContent = 'Register';
        toggleLink.textContent = 'Login instead';
        toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleFormLink" onclick="toggleForms(event)">Login instead</a>';
    }
}