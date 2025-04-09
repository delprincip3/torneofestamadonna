// Gestione del menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    // Verifica se l'elemento esiste prima di procedere
    if (!mobileMenuButton) {
        console.warn('Elemento mobile-menu-button non trovato');
        return;
    }
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed top-16 left-0 w-full bg-gray-800 shadow-lg transform -translate-y-full transition-transform duration-300 ease-in-out z-40';
    
    mobileMenu.innerHTML = `
        <div class="container mx-auto px-4 py-4">
            <div class="flex flex-col space-y-4">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="classifica.html" class="nav-link">Classifica</a>
                <a href="marcatori.html" class="nav-link">Marcatori</a>
                <a href="risultati.html" class="nav-link">Risultati</a>
                <a href="calendario.html" class="nav-link">Calendario</a>
                <a href="squadre.html" class="nav-link">Squadre</a>
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