
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


const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
     e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');

    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Por favor, preencha todos os campos.';
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Por favor, insira um endereço de e-mail válido.';
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return;
    }

const submitButton = contactForm.querySelector('button[type="submit"]');
submitButton.disabled = true;
submitButton.textContent = 'Enviando...';
formMessage.textContent = 'Aguarde...';
formMessage.style.display = 'block';
formMessage.classList.remove('success', 'error');

const formData = new FormData(contactForm);

fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json' 
    }
})
.then(response => {
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar Mensagem';
    
    if (response.ok) {
        contactForm.reset();
        formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
        formMessage.classList.add('success');
    } else {
        formMessage.textContent = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.';
        formMessage.classList.add('error');
    }
})
.catch(error => {
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar Mensagem';
    formMessage.textContent = 'Erro de conexão. Verifique sua rede e tente novamente.';
    formMessage.classList.add('error');
});
    console.log('Formulário enviado:', { name, email, message });

    contactForm.reset();
    formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
    formMessage.classList.add('success');
    formMessage.style.display = 'block';
});