const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve tutti i file statici dalla root del progetto

// Middleware per gestire gli errori
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Errore interno del server' });
});

// Route per ottenere tutti i dati
app.get('/api/data', async (req, res) => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        res.status(500).json({ error: 'Errore nel caricamento dei dati' });
    }
});

// Route per salvare i dati
app.post('/api/data', async (req, res) => {
    try {
        const { key, value } = req.body;
        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
        data[key] = value;
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Errore nel salvataggio dei dati:', error);
        res.status(500).json({ error: 'Errore nel salvataggio dei dati' });
    }
});

// Route per verificare l'autenticazione
app.post('/api/auth', async (req, res) => {
    try {
        const { password } = req.body;
        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
        const isValid = password === data.auth.password;
        res.json({ isValid });
    } catch (error) {
        console.error('Errore nella verifica dell\'autenticazione:', error);
        res.status(500).json({ error: 'Errore nella verifica dell\'autenticazione' });
    }
});

// Route per servire le pagine HTML
app.get('*', (req, res) => {
    // Se la richiesta è per la root, serviamo index.html
    if (req.path === '/') {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        // Altrimenti serviamo il file richiesto dalla directory pages
        res.sendFile(path.join(__dirname, 'pages', req.path));
    }
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
}); 