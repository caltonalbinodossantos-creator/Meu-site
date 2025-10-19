// Script para alternar entre temas claro e escuro

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se há uma preferência de tema salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Adiciona o botão de alternar tema ao header
    const header = document.querySelector('.header');
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('title', 'Alternar tema');
    header.appendChild(themeToggle);
    
    // Adiciona estilos para o botão de tema
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            margin-left: 1rem;
            transition: color 0.3s ease;
        }
        
        .theme-toggle:hover {
            color: var(--accent);
        }
        
        .theme-toggle i {
            transition: transform 0.3s ease;
        }
        
        .theme-toggle:hover i {
            transform: rotate(30deg);
        }
    `;
    document.head.appendChild(style);
    
    // Função para alternar o tema
    const toggleTheme = () => {
        const lightThemeLink = document.getElementById('light-theme-css');
        
        // Se o link do tema claro não existe, está no tema escuro (padrão)
        if (!lightThemeLink) {
            // Cria o link para o tema claro
            const link = document.createElement('link');
            link.id = 'light-theme-css';
            link.rel = 'stylesheet';
            link.href = 'assets/css/light-theme.css';
            document.head.appendChild(link);
            
            // Atualiza o ícone do botão
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            
            // Salva a preferência
            localStorage.setItem('theme', 'light');
        } else {
            // Remove o link do tema claro
            lightThemeLink.remove();
            
            // Atualiza o ícone do botão
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            
            // Salva a preferência
            localStorage.setItem('theme', 'dark');
        }
    };
    
    // Adiciona o evento de clique ao botão
    themeToggle.addEventListener('click', toggleTheme);
    
    // Aplica o tema salvo ou o tema preferido do sistema
    if (savedTheme === 'light') {
        toggleTheme();
    } else if (savedTheme !== 'dark' && prefersDarkScheme.matches) {
        // Se não há tema salvo e o sistema prefere tema escuro, mantém o tema escuro (padrão)
    } else if (savedTheme !== 'dark' && !prefersDarkScheme.matches) {
        // Se não há tema salvo e o sistema prefere tema claro, muda para o tema claro
        toggleTheme();
    }
});

