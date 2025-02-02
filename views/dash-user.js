// Grab the buttons and sections
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