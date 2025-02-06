// Function to handle role selection
function selectRole(role) {
    document.getElementById('roleInput').value = role;
    document.getElementById('roleInputRegister').value = role;
    
    document.getElementById('roleLabel').textContent =
      role.charAt(0).toUpperCase() + role.slice(1);
    
    if (role === 'admin') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('toggleFormText').style.display = 'none';
    } else {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('toggleFormText').style.display = 'block';
        document.getElementById('toggleFormText').innerHTML =
            "Don't have an account? <a href='#' id='toggleFormLink' onclick='toggleForms(event)'>Register here</a>";
    }
    
    document.getElementById('roleSelection').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
}
  
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
  
// Login/Register Modal
const loginModalEl = document.getElementById('loginModal');

// Listen for when the modal is fully hidden to reset its state
loginModalEl.addEventListener('hidden.bs.modal', function () {
    document.getElementById('roleSelection').style.display = 'block';
    document.getElementById('authSection').style.display = 'none';
    
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    
    document.getElementById('toggleFormText').innerHTML =
      "Don't have an account? <a href='#' id='toggleFormLink' onclick='toggleForms(event)'>Register here</a>";
});


// Chat Function
const chatPopup = document.getElementById('chatPopup');
const chatOpen = document.getElementById('chatOpen');
const chatClose = document.getElementById('chatClose');

// Show the chat popup when the Chat button is clicked
chatOpen.addEventListener('click', () => {
  chatPopup.style.display = 'flex';
  chatOpen.classList.add('hidden');
});

// Hide the chat popup when the Close button is clicked
chatClose.addEventListener('click', () => {
  chatPopup.style.display = 'none';
  chatOpen.classList.remove('hidden');
});