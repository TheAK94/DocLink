// List of field IDs to edit
const fields = ['speciality', 'experience', 'qualifications', 'languages', 'location', 'availability'];

// List of specialities
const specialities = [
  'Cardiac Health', 'Cancer Care', 'Neurosciences', 'Gastro Sciences', 
  'Orthopaedics', 'Renal Care', 'Liver Transplant', 'Bone Marrow Transplant', 
  'Dermatology', 'Endocrinology', 'ENT', 'General Surgery', 
  'Ophthalmology', 'Pulmonology', 'Rheumatology', 'Urology'
];

const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const returnBtn = document.getElementById('returnBtn');
const editControls = document.getElementById('editControls');

editBtn.addEventListener('click', () => {
  // Make fields editable and store original values
  fields.forEach(field => {
    const span = document.getElementById(field);
    const originalValue = span.innerText.trim();

    // Save original value in a data attribute
    span.dataset.original = originalValue;

    if (field === 'speciality') {
      // Create a select dropdown for speciality
      let selectHTML = '<select class="form-control">';
      specialities.forEach(spec => {
        const selected = spec === originalValue ? 'selected' : '';
        selectHTML += `<option value="${spec}" ${selected}>${spec}</option>`;
      });
      selectHTML += '</select>';
      span.innerHTML = selectHTML;
    } else {
      span.innerHTML = `<input type="text" class="form-control" value="${originalValue}">`;
    }
  });

  // Show Save and Return buttons, hide Edit button
  editControls.style.display = 'block';
  editBtn.style.display = 'none';
});

saveBtn.addEventListener('click', () => {
  // Save the edited values
  fields.forEach(field => {
    const span = document.getElementById(field);
    if (field === 'speciality') {
      const select = span.querySelector('select');
      const value = select.value;
      span.innerText = value;
      span.dataset.original = value;
    } else {
      const input = span.querySelector('input');
      const value = input.value;
      span.innerText = value;
      span.dataset.original = value;
    }
  });

  // Hide Save and Return buttons, show Edit button
  editControls.style.display = 'none';
  editBtn.style.display = 'block';
});

returnBtn.addEventListener('click', () => {
  fields.forEach(field => {
    const span = document.getElementById(field);
    const originalValue = span.dataset.original;
    span.innerText = originalValue;
  });

  editControls.style.display = 'none';
  editBtn.style.display = 'block';
});




// Navbar Buttons
const dashboardBtn = document.getElementById('dashboardBtn');
const profileBtn = document.getElementById('profileBtn');
const dashboardSection = document.getElementById('dashboard');
const profileSection = document.getElementById('profile');
const editSlotsBtn = document.getElementById('editSlotsBtn');
const editSlotsSection = document.getElementById('editSlots');
const apptHistBtn = document.getElementById('apptHistBtn');
const apptHistSection = document.getElementById('apptHist');

// Function to switch sections
function showSection(sectionToShow) {
  // Hide all sections
  dashboardSection.classList.remove('active');
  profileSection.classList.remove('active');
  editSlotsSection.classList.remove('active');
  apptHistSection.classList.remove('active');
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

editSlotsBtn.addEventListener('click', () => {
  showSection(editSlotsSection);
});

apptHistBtn.addEventListener('click', () => {
  showSection(apptHistSection);
});


document.addEventListener('DOMContentLoaded', function() {
    const pagination = document.getElementById('pagination');
    const pages = {
      1: document.getElementById('page1'),
      2: document.getElementById('page2'),
      3: document.getElementById('page3')
    };
    let currentPage = 1;
    const totalPages = Object.keys(pages).length;
    
    // Function to show a specific page
    function showPage(pageNum) {
      // Hide all pages
      Object.values(pages).forEach(page => page.style.display = 'none');
      // Remove active class from all pagination items
      document.querySelectorAll('#pagination .page-item').forEach(item => {
        item.classList.remove('active');
      });
      // Show the requested page and add active class
      pages[pageNum].style.display = 'block';
      // Set the active class on the page item with data-page = pageNum
      document.querySelector(`#pagination a[data-page="${pageNum}"]`).parentElement.classList.add('active');
      currentPage = pageNum;
    }
    
    // Handle click events on pagination links
    pagination.addEventListener('click', function(e) {
      e.preventDefault();
      const target = e.target;
      
      // If the target is a span inside a link, get the parent link.
      const link = target.tagName.toLowerCase() === 'a' ? target : target.closest('a');
      if (!link) return;
      
      const page = link.getAttribute('data-page');
      
      // If it's a numbered page link, show that page.
      if (page) {
        showPage(parseInt(page));
      } else {
        // Handle previous and next buttons.
        if (link.parentElement.id === 'prevPage' && currentPage > 1) {
          showPage(currentPage - 1);
        } else if (link.parentElement.id === 'nextPage' && currentPage < totalPages) {
          showPage(currentPage + 1);
        }
      }
    });
    
    // Initially show page 1
    showPage(1);
  });



flatpickr("#slotTime", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true, // Use 24-hour format or remove for AM/PM
  minuteIncrement: 30
});

document.addEventListener('DOMContentLoaded', function() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('slotDate').setAttribute('min', today);
});


// Function to open the Mark as Done modal and set the appointment ID
function openMarkDoneModal(appointmentId) {
  document.getElementById('appointmentId').value = appointmentId;

  document.getElementById('remarks').value = '';

  var markDoneModal = new bootstrap.Modal(document.getElementById('markDoneModal'));
  markDoneModal.show();
}

function saveMarkDone() {
  const appointmentId = document.getElementById('appointmentId').value;
  const remarks = document.getElementById('remarks').value.trim();

  if (remarks === '') {
    alert('Please enter remarks before saving.');
    return;
  }

  console.log(`Appointment ${appointmentId} marked as done with remarks: ${remarks}`);

  const appointmentCard = document.getElementById(appointmentId);
  if (appointmentCard) {
    appointmentCard.classList.add('completed');
    const btn = appointmentCard.querySelector('.btn-outline-success');
    if (btn) {
      btn.textContent = 'Done';
      btn.disabled = true;
    }
  }

  var markDoneModalEl = document.getElementById('markDoneModal');
  var modalInstance = bootstrap.Modal.getInstance(markDoneModalEl);
  modalInstance.hide();

}
