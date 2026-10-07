/* ========================================
   ÍCONES
======================================== */

lucide.createIcons();

/* ========================================
   MENU MOBILE
======================================== */

const menuMobile = document.getElementById("menuMobile");
const nav = document.querySelector(".nav");

menuMobile.addEventListener("click", () => {
    nav.classList.toggle("open");
});

/* ========================================
   FECHAR MENU AO CLICAR
======================================== */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});
