// Funzione per leggere i dati dal file JSON
async function loadData(key) {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data[key] || null;
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        return null;
    }
}

// Funzione per salvare i dati nel file JSON
async function saveData(key, value) {
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key, value })
        });
        return await response.json();
    } catch (error) {
        console.error('Errore nel salvataggio dei dati:', error);
        return null;
    }
}

// Funzione per verificare l'autenticazione
async function checkAuth(password) {
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password })
        });
        return await response.json();
    } catch (error) {
        console.error('Errore nella verifica dell\'autenticazione:', error);
        return false;
    }
} 