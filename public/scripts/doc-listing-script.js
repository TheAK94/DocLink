function selectDate(selectedBtn) {
  const buttons = document.querySelectorAll('#days button');
  buttons.forEach(button => button.classList.remove('active'));
  
  selectedBtn.classList.add('active');
}
function selectSlot(selectedBtn) {
    const buttons = document.querySelectorAll('#timeSlots button');
    buttons.forEach(button => button.classList.remove('active'));
    
    selectedBtn.classList.add('active');
  }

document.getElementById("scrollTimeLeft").addEventListener("click", function () {
    document.getElementById("timeContainer").scrollBy({ left: -100, behavior: "smooth" });
});

document.getElementById("scrollTimeRight").addEventListener("click", function () {
    document.getElementById("timeContainer").scrollBy({ left: 100, behavior: "smooth" });
});
