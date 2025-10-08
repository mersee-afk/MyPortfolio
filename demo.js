// Typing Effect
const texts = ["Java Developer", "Frontend Learner", "Problem Solver"];
let i = 0, j = 0, currentText = "", isDeleting = false;
const typingElement = document.querySelector(".typing");

function type() {
  if (!typingElement) return;

  if (i < texts.length) {
    currentText = texts[i].substring(0, j);
    typingElement.textContent = currentText;

    if (!isDeleting && j < texts[i].length) {
      j++;
      setTimeout(type, 100);
    } else if (isDeleting && j > 0) {
      j--;
      setTimeout(type, 60);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) i = (i + 1) % texts.length;
      setTimeout(type, 1000);
    }
  }
}
type();

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});