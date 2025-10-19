// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Fecha o menu móvel após clicar em um link
                if (window.innerWidth <= 768 && navList) {
                    navList.classList.remove('active');
                }
            }
        });
    });
    
    // Atualiza o link ativo na navegação com base na seção visível
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Considera uma seção como "ativa" quando o scroll está a 200px do topo da seção
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Atualiza o link ativo no carregamento inicial e durante o scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Formulário de Contato
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Aqui você pode adicionar código para enviar os dados do formulário
            // Por exemplo, usando fetch para enviar para um backend ou serviço de email
            
            // Por enquanto, apenas exibe uma mensagem de sucesso
            alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            
            // Limpa o formulário
            contactForm.reset();
        });
    }
    
    // Animação de fade-in para elementos quando entram na viewport
    const fadeInElements = document.querySelectorAll('.project-card, .skill-item, .education-item');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(element);
    });
    
    // Adiciona a classe para elementos que entram na viewport
    document.addEventListener('scroll', () => {
        fadeInElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Função auxiliar para verificar se um elemento está na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

