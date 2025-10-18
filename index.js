
/*
Funcionalidade de rolagem  para links
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


//Funcionalidade do Menu Responsivo (para telas menores que 768px)

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('active'); 
});

// Fechar o menu ao clicar em um link (apenas em mobile)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });
});

//Lógica para alternar Tema Claro/Escuro

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Função para aplicar o tema
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Adicionar evento para alternar o tema
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});
