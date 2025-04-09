// Dati di esempio per il calendario
const partite = [
    {
        data: "2024-03-15",
        ora: "20:30",
        squadraCasa: "Real Madrid",
        squadraOspite: "Barcelona",
        campo: "Campo 1",
        stato: "Da Giocare"
    },
    {
        data: "2024-03-16",
        ora: "18:00",
        squadraCasa: "Juventus",
        squadraOspite: "Milan",
        campo: "Campo 2",
        stato: "Da Giocare"
    },
    {
        data: "2024-03-17",
        ora: "19:30",
        squadraCasa: "Inter",
        squadraOspite: "Roma",
        campo: "Campo 1",
        stato: "Da Giocare"
    },
    {
        data: "2024-03-18",
        ora: "20:00",
        squadraCasa: "Napoli",
        squadraOspite: "Lazio",
        campo: "Campo 2",
        stato: "Da Giocare"
    }
];

// Funzione per formattare la data
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
}

// Funzione per aggiornare la tabella del calendario
function updateCalendario(partiteDaMostrare = partite) {
    const tbody = document.getElementById('calendario-body');
    tbody.innerHTML = '';

    partiteDaMostrare.forEach(partita => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-700 transition-colors';
        
        row.innerHTML = `
            <td class="px-6 py-4">${formatDate(partita.data)}</td>
            <td class="px-6 py-4 text-center">${partita.ora}</td>
            <td class="px-6 py-4 text-center">${partita.squadraCasa}</td>
            <td class="px-6 py-4 text-center">${partita.squadraOspite}</td>
            <td class="px-6 py-4 text-center">${partita.campo}</td>
            <td class="px-6 py-4 text-center">
                <span class="px-2 py-1 rounded-full text-sm ${
                    partita.stato === 'Da Giocare' ? 'bg-yellow-500/20 text-yellow-500' :
                    partita.stato === 'In Corso' ? 'bg-blue-500/20 text-blue-500' :
                    partita.stato === 'Terminata' ? 'bg-green-500/20 text-green-500' :
                    'bg-gray-500/20 text-gray-500'
                }">
                    ${partita.stato}
                </span>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Funzione per aggiornare le statistiche
function updateStats() {
    const totalMatches = 30;
    const playedMatches = partite.filter(p => p.stato === 'Terminata').length;
    const remainingMatches = totalMatches - playedMatches;

    document.getElementById('played-matches').textContent = playedMatches;
    document.getElementById('remaining-matches').textContent = remainingMatches;
}

// Funzione per filtrare le partite
function filterPartite(date, team) {
    return partite.filter(partita => {
        const matchDate = date ? partita.data === date : true;
        const matchTeam = team ? 
            partita.squadraCasa.toLowerCase().includes(team.toLowerCase()) ||
            partita.squadraOspite.toLowerCase().includes(team.toLowerCase()) : true;
        return matchDate && matchTeam;
    });
}

// Funzione per ordinare le partite
function sortPartite(partite, criteria) {
    return [...partite].sort((a, b) => {
        if (criteria === 'data') {
            return new Date(a.data) - new Date(b.data);
        } else if (criteria === 'squadra') {
            return a.squadraCasa.localeCompare(b.squadraCasa);
        }
        return 0;
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCalendario();
    updateStats();
    
    // Gestione filtri
    document.getElementById('date-filter').addEventListener('change', (e) => {
        const date = e.target.value;
        const team = document.getElementById('team-filter').value;
        const filtered = filterPartite(date, team);
        updateCalendario(filtered);
    });
    
    document.getElementById('team-filter').addEventListener('input', (e) => {
        const team = e.target.value;
        const date = document.getElementById('date-filter').value;
        const filtered = filterPartite(date, team);
        updateCalendario(filtered);
    });
    
    // Gestione ordinamento
    document.getElementById('sort-by').addEventListener('change', (e) => {
        const sorted = sortPartite(partite, e.target.value);
        updateCalendario(sorted);
    });
}); 