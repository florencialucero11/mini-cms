// js/main.js
const API_URL = "http://localhost:8000"; // Ajustar si deployas en otro host

// Referencias al DOM
const loginSection = document.getElementById("login-section");
const articlesSection = document.getElementById("articles-section");
const createSection = document.getElementById("create-section");
const loginForm = document.getElementById("login-form");
const createForm = document.getElementById("create-form");
const logoutBtn = document.getElementById("logout-btn");
const articlesContainer = document.getElementById("articles-container");
const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");

// Modal
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalBody = document.getElementById("modal-body");

// Estado
let token = localStorage.getItem("token") || null;

// ----------------- AUTENTICACIÓN -----------------
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Credenciales incorrectas");

    const data = await res.json();
    token = data.access_token;
    localStorage.setItem("token", token);

    loginSection.style.display = "none";
    logoutBtn.style.display = "inline-block";
    createSection.style.display = "block";
    loadArticles();
  } catch (err) {
    alert(err.message);
  }
});

logoutBtn.addEventListener("click", () => {
  token = null;
  localStorage.removeItem("token");
  loginSection.style.display = "block";
  logoutBtn.style.display = "none";
  createSection.style.display = "none";
});

// ----------------- ARTÍCULOS -----------------
async function loadArticles() {
  try {
    const res = await fetch(`${API_URL}/articles`);
    const articles = await res.json();

    articlesContainer.innerHTML = "";
    articles.forEach((article) => {
      const div = document.createElement("div");
      div.classList.add("article-card");
      div.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.content.substring(0, 100)}...</p>
        <button data-id="${article.id}" class="view-btn">Ver más</button>
      `;
      articlesContainer.appendChild(div);
    });

    // Eventos para abrir modal
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.id));
    });
  } catch (err) {
    console.error("Error cargando artículos:", err);
  }
}

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!token) return alert("Debes estar logueado");

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    const res = await fetch(`${API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) throw new Error("Error creando artículo");

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    loadArticles();
  } catch (err) {
    alert(err.message);
  }
});

// ----------------- MODAL -----------------
async function openModal(id) {
  try {
    const res = await fetch(`${API_URL}/articles/${id}`);
    const article = await res.json();

    modalBody.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.content}</p>
    `;

    modal.classList.remove("hidden");
  } catch (err) {
    console.error("Error cargando artículo:", err);
  }
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// ----------------- DARK MODE -----------------
toggleDarkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
// ==========================
// 🌙 Dark Mode con persistencia
// ==========================
const toggleBtn = document.getElementById("toggle-dark-mode");

// Al cargar la página, revisar si hay preferencia guardada
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Modo Claro";
} else {
  toggleBtn.textContent = "🌙 Modo Oscuro";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Modo Claro";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Modo Oscuro";
  }
});


// ----------------- INICIO -----------------
if (token) {
  loginSection.style.display = "none";
  logoutBtn.style.display = "inline-block";
  createSection.style.display = "block";
}
loadArticles();
