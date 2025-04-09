// Dati di esempio per i risultati
const risultati = [
    {
        data: "2024-03-15",
        squadraCasa: "Real Madrid",
        golCasa: 3,
        squadraOspite: "Barcelona",
        golOspite: 1,
        marcatori: [
            { nome: "Mario Rossi", squadra: "Real Madrid", minuto: 15 },
            { nome: "Luca Bianchi", squadra: "Real Madrid", minuto: 32 },
            { nome: "Giuseppe Verdi", squadra: "Barcelona", minuto: 45 },
            { nome: "Mario Rossi", squadra: "Real Madrid", minuto: 78 }
        ]
    },
    {
        data: "2024-03-14",
        squadraCasa: "Juventus",
        golCasa: 2,
        squadraOspite: "Milan",
        golOspite: 2,
        marcatori: [
            { nome: "Antonio Gialli", squadra: "Milan", minuto: 12 },
            { nome: "Paolo Rossi", squadra: "Juventus", minuto: 28 },
            { nome: "Marco Bianchi", squadra: "Juventus", minuto: 65 },
            { nome: "Antonio Gialli", squadra: "Milan", minuto: 89 }
        ]
    },
    {
        data: "2024-03-13",
        squadraCasa: "Inter",
        golCasa: 4,
        squadraOspite: "Roma",
        golOspite: 0,
        marcatori: [
            { nome: "Francesco Totti", squadra: "Inter", minuto: 5 },
            { nome: "Francesco Totti", squadra: "Inter", minuto: 22 },
            { nome: "Alessandro Del Piero", squadra: "Inter", minuto: 45 },
            { nome: "Francesco Totti", squadra: "Inter", minuto: 67 }
        ]
    }
];

// Funzione per formattare la data
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
}

// Funzione per aggiornare la tabella dei risultati
function updateRisultati(risultatiDaMostrare = risultati) {
    const tbody = document.getElementById('risultati-body');
    tbody.innerHTML = '';

    risultatiDaMostrare.forEach(partita => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-700 transition-colors';
        
        row.innerHTML = `
            <td class="px-6 py-4">${formatDate(partita.data)}</td>
            <td class="px-6 py-4 text-center">${partita.squadraCasa}</td>
            <td class="px-6 py-4 text-center font-bold">${partita.golCasa} - ${partita.golOspite}</td>
            <td class="px-6 py-4 text-center">${partita.squadraOspite}</td>
            <td class="px-6 py-4 text-center">
                <button class="text-primary hover:text-blue-400 transition-colors" 
                        onclick="showMarcatori(${JSON.stringify(partita.marcatori)})">
                    <i class="fas fa-futbol"></i> Vedi Marcatori
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Funzione per aggiornare le statistiche
function updateStats() {
    const totalMatches = risultati.length;
    const totalGoals = risultati.reduce((sum, p) => sum + p.golCasa + p.golOspite, 0);
    const avgGoals = (totalGoals / totalMatches).toFixed(2);

    document.getElementById('total-matches').textContent = totalMatches;
    document.getElementById('total-goals').textContent = totalGoals;
    document.getElementById('avg-goals').textContent = avgGoals;
}

// Funzione per filtrare i risultati
function filterRisultati(date, team) {
    return risultati.filter(partita => {
        const matchDate = date ? partita.data === date : true;
        const matchTeam = team ? 
            partita.squadraCasa.toLowerCase().includes(team.toLowerCase()) ||
            partita.squadraOspite.toLowerCase().includes(team.toLowerCase()) : true;
        return matchDate && matchTeam;
    });
}

// Funzione per ordinare i risultati
function sortRisultati(risultati, criteria) {
    return [...risultati].sort((a, b) => {
        if (criteria === 'data') {
            return new Date(b.data) - new Date(a.data);
        } else if (criteria === 'gol') {
            const totalGolA = a.golCasa + a.golOspite;
            const totalGolB = b.golCasa + b.golOspite;
            return totalGolB - totalGolA;
        }
        return 0;
    });
}

// Funzione per mostrare i marcatori in un modal
function showMarcatori(marcatori) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Marcatori</h3>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        class="text-gray-400 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <ul class="space-y-2">
                ${marcatori.map(m => `
                    <li class="flex justify-between items-center">
                        <span>${m.nome} (${m.squadra})</span>
                        <span class="text-gray-400">${m.minuto}'</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    document.body.appendChild(modal);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateRisultati();
    updateStats();
    
    // Gestione filtri
    document.getElementById('date-filter').addEventListener('change', (e) => {
        const date = e.target.value;
        const team = document.getElementById('team-filter').value;
        const filtered = filterRisultati(date, team);
        updateRisultati(filtered);
    });
    
    document.getElementById('team-filter').addEventListener('input', (e) => {
        const team = e.target.value;
        const date = document.getElementById('date-filter').value;
        const filtered = filterRisultati(date, team);
        updateRisultati(filtered);
    });
    
    // Gestione ordinamento
    document.getElementById('sort-by').addEventListener('change', (e) => {
        const sorted = sortRisultati(risultati, e.target.value);
        updateRisultati(sorted);
    });
}); 