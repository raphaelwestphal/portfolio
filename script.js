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


/* ========================================
   MENU ATIVO
======================================== */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav a[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

});
