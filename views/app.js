// Function to handle role selection
function selectRole(role) {
    // Set the hidden input fields with the selected role for both forms
    document.getElementById('roleInput').value = role;
    document.getElementById('roleInputRegister').value = role;
    
    // Update the modal title with the chosen role (capitalize first letter)
    document.getElementById('roleLabel').textContent =
      role.charAt(0).toUpperCase() + role.slice(1);
    
    // Check if the selected role is 'admin'
    if (role === 'admin') {
        // For admin, show only the login form and hide the register toggle link
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('toggleFormText').style.display = 'none';
    } else {
        // For non-admin roles, show the login form with the toggle text
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('toggleFormText').style.display = 'block';
        document.getElementById('toggleFormText').innerHTML =
            "Don't have an account? <a href='#' id='toggleFormLink' onclick='toggleForms(event)'>Register here</a>";
    }
    
    // Hide the role selection section and show the authentication section
    document.getElementById('roleSelection').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
}
  
  // Function to toggle between login and register forms
function toggleForms(event) {
    event.preventDefault();
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleText = document.getElementById('toggleFormText');
    
    if (loginForm.style.display === 'none') {
      // Switch to login form
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        toggleText.innerHTML =
            "Don't have an account? <a href='#' id='toggleFormLink' onclick='toggleForms(event)'>Register here</a>";
    } else {
        // Switch to register form
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        toggleText.innerHTML =
            "Already have an account? <a href='#' id='toggleFormLink' onclick='toggleForms(event)'>Login here</a>";
    }
}
  
  // Get the modal element
  const loginModalEl = document.getElementById('loginModal');
  
  // Listen for when the modal is fully hidden to reset its state
loginModalEl.addEventListener('hidden.bs.modal', function () {
    // Reset to the initial state: show role selection and hide the auth section
    document.getElementById('roleSelection').style.display = 'block';
    document.getElementById('authSection').style.display = 'none';
    
    // Reset the forms: show the login form and hide the register form
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    
    // Reset the toggle text to the default
    document.getElementById('toggleFormText').innerHTML =
      "Don't have an account? <a href='#' id='toggleFormLink' onclick='toggleForms(event)'>Register here</a>";
});

