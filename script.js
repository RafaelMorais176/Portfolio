/* script.js */

/*
* Funcionalidade de rolagem suave para links de âncora
* Garante que o clique nos links do menu leve a uma rolagem suave para a seção correspondente.
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/*
* Funcionalidade do Menu Responsivo (Hambúrguer)
* Controla a abertura e fechamento do menu de navegação em dispositivos móveis.
* O menu é togglado ao clicar no ícone do hambúrguer e fechado ao clicar em um item do menu.
*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('active'); // Adicionar classe para animar o hambúrguer
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

/*
* Lógica para alternar Tema Claro/Escuro
* Gerencia a mudança entre os temas claro e escuro, persistindo a escolha do usuário no localStorage.
*/
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

// Carregar tema salvo no localStorage ou padrão (claro)
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Adicionar evento de clique para alternar o tema
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});

/*
* Lógica de Validação e Envio do Formulário de Contato
* Valida os campos do formulário (vazios e formato de e-mail) e simula o envio.
* Exibe mensagens de sucesso ou erro ao usuário.
*/
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Limpa mensagens anteriores
    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');

    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Por favor, preencha todos os campos.';
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return;
    }

    // Validação de formato de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Por favor, insira um endereço de e-mail válido.';
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return;
    }

    // Simular envio (você pode integrar com um serviço de backend aqui)
    console.log('Formulário enviado:', { name, email, message });

    // Limpa o formulário e exibe mensagem de sucesso
    contactForm.reset();
    formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
    formMessage.classList.add('success');
    formMessage.style.display = 'block';
});
