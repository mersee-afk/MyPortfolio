/* ====================================================
   MERCY YESUDAS — PORTFOLIO INTERACTIVITY SCRIPT
   ==================================================== */

/* YEAR AUTO UPDATE */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================
   MOBILE MENU TOGGLE
   ============================ */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const visible = navLinks.style.display === "flex";
  navLinks.style.display = visible ? "none" : "flex";
});


/* ============================
   PROJECT MODAL POPUP
   ============================ */
let modal;

function createModal() {
  modal = document.createElement("div");
  modal.className = "modal";

  modal.style = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5000;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      padding: 1.8rem;
      border-radius: 20px;
      max-width: 520px;
      width: 90%;
      box-shadow: 0 20px 45px rgba(0,0,0,0.25);
      position: relative;
    ">
      <button id="closeModal" style="
        position:absolute;
        top:10px;
        right:10px;
        background:none;
        border:none;
        font-size:1.3rem;
        cursor:pointer;
      ">✕</button>

      <h2 id="modalTitle" style="margin-bottom:0.3rem;color:#1e293b;"></h2>
      <p id="modalDesc" style="color:#475569;margin-bottom:1.2rem;"></p>

      <a id="liveBtn" class="btn-primary" target="_blank" style="text-decoration:none;">Live Demo</a>
      <a id="codeBtn" class="btn-outline" target="_blank" style="margin-left:0.5rem;text-decoration:none;">Source Code</a>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("closeModal").onclick = () => modal.remove();
}

/* Open modal for project cards */
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (!modal) createModal();

    document.getElementById("modalTitle").innerText = card.dataset.title;
    document.getElementById("modalDesc").innerText = card.dataset.desc;
    document.getElementById("liveBtn").href = card.dataset.live;
    document.getElementById("codeBtn").href = card.dataset.code;
  });
});


/* ============================
   CONTACT FORM — LOCAL SAVE
   ============================ */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const entry = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    timestamp: new Date().toLocaleString(),
  };

  const stored = JSON.parse(localStorage.getItem("messages") || "[]");
  stored.push(entry);
  localStorage.setItem("messages", JSON.stringify(stored));

  alert("Message saved locally! (Demo only)");
  e.target.reset();
});