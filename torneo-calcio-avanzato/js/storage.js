// Funzione per salvare i dati nel localStorage
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Errore nel salvataggio dei dati:', error);
        return false;
    }
}

// Funzione per caricare i dati dal localStorage
function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        return null;
    }
} 