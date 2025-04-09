// Dati di esempio per i marcatori
const marcatori = [
    {
        posizione: 1,
        nome: "Mario Rossi",
        squadra: "Real Madrid",
        gol: 15,
        partite: 10,
        media: 1.5
    },
    {
        posizione: 2,
        nome: "Luca Bianchi",
        squadra: "Barcelona",
        gol: 12,
        partite: 8,
        media: 1.5
    },
    {
        posizione: 3,
        nome: "Giuseppe Verdi",
        squadra: "Juventus",
        gol: 10,
        partite: 9,
        media: 1.11
    },
    {
        posizione: 4,
        nome: "Antonio Gialli",
        squadra: "Milan",
        gol: 8,
        partite: 7,
        media: 1.14
    }
];

// Funzione per aggiornare la tabella dei marcatori
function updateMarcatori() {
    const tbody = document.getElementById('marcatori-body');
    tbody.innerHTML = '';

    marcatori.forEach(marcatore => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-700 transition-colors';
        
        row.innerHTML = `
            <td class="px-6 py-4">${marcatore.posizione}</td>
            <td class="px-6 py-4">${marcatore.nome}</td>
            <td class="px-6 py-4 text-center">${marcatore.squadra}</td>
            <td class="px-6 py-4 text-center">${marcatore.gol}</td>
            <td class="px-6 py-4 text-center">${marcatore.partite}</td>
            <td class="px-6 py-4 text-center">${marcatore.media.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Funzione per aggiornare le statistiche
function updateStats() {
    const totalGoals = marcatori.reduce((sum, m) => sum + m.gol, 0);
    const totalMatches = marcatori.reduce((sum, m) => sum + m.partite, 0);
    const avgGoals = totalGoals / totalMatches;

    document.getElementById('total-goals').textContent = totalGoals;
    document.getElementById('avg-goals').textContent = avgGoals.toFixed(1);
    
    // Aggiorna il capocannoniere
    const topScorer = marcatori[0];
    document.getElementById('top-scorer').textContent = topScorer.nome;
    document.getElementById('top-scorer-goals').textContent = `${topScorer.gol} gol`;
}

// Funzione per filtrare i marcatori
function filterMarcatori(searchTerm) {
    const filtered = marcatori.filter(m => 
        m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.squadra.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const tbody = document.getElementById('marcatori-body');
    tbody.innerHTML = '';

    filtered.forEach(marcatore => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-700 transition-colors';
        
        row.innerHTML = `
            <td class="px-6 py-4">${marcatore.posizione}</td>
            <td class="px-6 py-4">${marcatore.nome}</td>
            <td class="px-6 py-4 text-center">${marcatore.squadra}</td>
            <td class="px-6 py-4 text-center">${marcatore.gol}</td>
            <td class="px-6 py-4 text-center">${marcatore.partite}</td>
            <td class="px-6 py-4 text-center">${marcatore.media.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Funzione per ordinare i marcatori
function sortMarcatori(criteria) {
    switch(criteria) {
        case 'gol':
            marcatori.sort((a, b) => b.gol - a.gol);
            break;
        case 'partite':
            marcatori.sort((a, b) => b.partite - a.partite);
            break;
        case 'media':
            marcatori.sort((a, b) => b.media - a.media);
            break;
    }
    
    // Aggiorna le posizioni
    marcatori.forEach((m, index) => {
        m.posizione = index + 1;
    });
    
    updateMarcatori();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateMarcatori();
    updateStats();
    
    // Gestione ricerca
    document.getElementById('search-player').addEventListener('input', (e) => {
        filterMarcatori(e.target.value);
    });
    
    // Gestione ordinamento
    document.getElementById('sort-by').addEventListener('change', (e) => {
        sortMarcatori(e.target.value);
    });
}); 