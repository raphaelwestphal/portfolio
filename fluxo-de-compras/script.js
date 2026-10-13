// Tema Claro/Escuro
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('fluxoComprasTheme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('fluxoComprasTheme', newTheme);
});

// Navegação entre abas (mostra/esconde conteúdo)
const navLinks = document.querySelectorAll('.nav a');
const tabContents = document.querySelectorAll('.tab-content');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active de todos os links
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Esconde todas as abas
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Mostra a aba clicada
        const tabName = link.getAttribute('data-tab');
        const targetTab = document.getElementById('tab-' + tabName);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    });
});
