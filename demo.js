// Typing effect
const text = ["Java Developer", "Frontend Learner", "Problem Solver"];
let i = 0, j = 0, currentText = "", isDeleting = false;

function type() {
  if (i < text.length) {
    if (!isDeleting && j <= text[i].length) {
      currentText = text[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentText = text[i].substring(0, j--);
    }
    document.querySelector(".typing").textContent = currentText;

    if (j === text[i].length + 1) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % text.length;
    }
    setTimeout(type, isDeleting ? 100 : 200);
  }
}
type();

// Dark mode toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const toggle = document.getElementById("theme-toggle");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});