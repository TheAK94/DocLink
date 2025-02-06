// Navbar buttons
const dashboardBtn = document.getElementById('dashboardBtn');
const profileBtn = document.getElementById('profileBtn');
const dashboardSection = document.getElementById('dashboard');
const profileSection = document.getElementById('profile');

// Function to switch sections
function showSection(sectionToShow) {
  // Hide all sections
  dashboardSection.classList.remove('active');
  profileSection.classList.remove('active');
  // Show the selected section
  sectionToShow.classList.add('active');
}

// Event listeners for button clicks
dashboardBtn.addEventListener('click', () => {
  showSection(dashboardSection);
});

profileBtn.addEventListener('click', () => {
  showSection(profileSection);
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
