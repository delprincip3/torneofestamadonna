// Password di amministrazione
const ADMIN_PASSWORD = "admin123";

// Funzione per verificare se l'utente è autenticato
function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

// Funzione per autenticare l'utente
function authenticate(password) {
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
    }
    return false;
}

// Funzione per disconnettere l'utente
function logout() {
    localStorage.removeItem('isAuthenticated');
}

// Funzione per salvare i dati in JSON
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Funzione per caricare i dati da JSON
function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Funzione per inizializzare i dati se non esistono
function initializeData() {
    if (!loadData('teams')) {
        saveData('teams', []);
    }

    if (!loadData('matches')) {
        saveData('matches', []);
    }
}

// Inizializza i dati al caricamento della pagina
document.addEventListener('DOMContentLoaded', initializeData); 