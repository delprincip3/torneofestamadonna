// Funzione per creare l'header dinamico
function createDynamicHeader() {
    const header = document.createElement('header');
    header.className = 'bg-gray-800 text-white py-4 fixed w-full top-0 z-50';
    
    // Ottieni il percorso base corretto
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : './';
    
    header.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <a href="${basePath}index.html" class="text-2xl font-bold text-primary">Torneo Calcio</a>
                </div>
                <div class="flex items-center space-x-4">
                    <button id="mobile-menu-button" class="md:hidden text-white hover:text-primary transition-colors">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                    <nav class="hidden md:flex space-x-6">
                        <a href="${basePath}index.html" class="nav-link">Home</a>
                        <a href="${basePath}pages/classifica.html" class="nav-link">Classifica</a>
                        <a href="${basePath}pages/marcatori.html" class="nav-link">Marcatori</a>
                        <a href="${basePath}pages/risultati.html" class="nav-link">Risultati</a>
                        <a href="${basePath}pages/calendario.html" class="nav-link">Calendario</a>
                        <a href="${basePath}pages/squadre.html" class="nav-link">Squadre</a>
                    </nav>
                </div>
            </div>
        </div>
    `;
    
    // Sostituisci l'header esistente con quello nuovo
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
        existingHeader.replaceWith(header);
    } else {
        document.body.insertBefore(header, document.body.firstChild);
    }
    
    return header;
}

// Gestione del menu mobile
document.addEventListener('DOMContentLoaded', () => {
    // Crea l'header dinamico
    const header = createDynamicHeader();
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    // Verifica se l'elemento esiste prima di procedere
    if (!mobileMenuButton) {
        console.warn('Elemento mobile-menu-button non trovato');
        return;
    }
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed top-16 left-0 w-full bg-gray-800 shadow-lg transform -translate-y-full transition-transform duration-300 ease-in-out z-40';
    
    // Ottieni il percorso base corretto
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : './';
    
    mobileMenu.innerHTML = `
        <div class="container mx-auto px-4 py-4">
            <div class="flex flex-col space-y-4">
                <a href="${basePath}index.html" class="nav-link">Home</a>
                <a href="${basePath}pages/classifica.html" class="nav-link">Classifica</a>
                <a href="${basePath}pages/marcatori.html" class="nav-link">Marcatori</a>
                <a href="${basePath}pages/risultati.html" class="nav-link">Risultati</a>
                <a href="${basePath}pages/calendario.html" class="nav-link">Calendario</a>
                <a href="${basePath}pages/squadre.html" class="nav-link">Squadre</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    let isMenuOpen = false;
    
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Impedisce la propagazione dell'evento
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('-translate-y-full');
            mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        } else {
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        }
    });
    
    // Chiudi il menu quando si clicca su un link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            isMenuOpen = false;
        });
    });
    
    // Chiudi il menu quando si clicca fuori
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && isMenuOpen) {
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            isMenuOpen = false;
        }
    });
});

// Animazione dello scroll
document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
});

// Gestione del tema attivo nel menu
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Funzione per formattare le date
function formatDate(dateString) {
    const options = { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('it-IT', options);
}

// Funzione per gestire il cambio tema (chiaro/scuro)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Carica il tema salvato
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}); 