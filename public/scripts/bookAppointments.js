function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const images = document.getElementsByTagName("img");
  images.forEach(image => image.classList.toggle("dark-mode"));
}

function selectDate(selectedBtn) {
  const buttons = document.querySelectorAll('#days button');
  buttons.forEach(button => button.classList.remove('activeDate'));
  
  selectedBtn.classList.add('activeDate');
  const selectedDate = selectedBtn.innerHTML;
}
function selectSlot(selectedBtn) {
    const buttons = document.querySelectorAll('#timeSlots button');
    buttons.forEach(button => button.classList.remove('activeTime'));
    
    selectedBtn.classList.add('activeTime');
    const selectedTime = selectedBtn.innerHTML;
  }

document.getElementById("scrollTimeLeft").addEventListener("click", function () {
    document.getElementById("timeContainer").scrollBy({ left: -100, behavior: "smooth" });
});

document.getElementById("scrollTimeRight").addEventListener("click", function () {
    document.getElementById("timeContainer").scrollBy({ left: 100, behavior: "smooth" });
});
