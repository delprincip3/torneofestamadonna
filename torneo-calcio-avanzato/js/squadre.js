// Dati di esempio per le squadre
const squadre = [
    {
        nome: "Real Madrid",
        allenatore: "Carlo Ancelotti",
        fondazione: 1902,
        giocatori: 10,
        mediaEta: 27,
        punti: 15,
        golFatti: 20,
        coloreMaglia: "#FEBE10",
        logo: "https://via.placeholder.com/150"
    },
    {
        nome: "Barcelona",
        allenatore: "Xavi Hernandez",
        fondazione: 1899,
        giocatori: 10,
        mediaEta: 26,
        punti: 12,
        golFatti: 15,
        coloreMaglia: "#A50044",
        logo: "https://via.placeholder.com/150"
    },
    {
        nome: "Juventus",
        allenatore: "Massimiliano Allegri",
        fondazione: 1897,
        giocatori: 10,
        mediaEta: 29,
        punti: 9,
        golFatti: 12,
        coloreMaglia: "#000000",
        logo: "https://via.placeholder.com/150"
    },
    {
        nome: "Milan",
        allenatore: "Stefano Pioli",
        fondazione: 1899,
        giocatori: 10,
        mediaEta: 28,
        punti: 6,
        golFatti: 8,
        coloreMaglia: "#FB090B",
        logo: "https://via.placeholder.com/150"
    }
];

// Funzione per aggiornare le statistiche
function updateStats() {
    const totalTeams = squadre.length;
    const totalPlayers = squadre.reduce((sum, squadra) => sum + squadra.giocatori, 0);
    const avgAge = Math.round(squadre.reduce((sum, squadra) => sum + squadra.mediaEta, 0) / totalTeams);

    document.getElementById('total-teams').textContent = totalTeams;
    document.getElementById('total-players').textContent = totalPlayers;
    document.getElementById('avg-age').textContent = avgAge;
}

// Funzione per creare una card squadra
function createTeamCard(squadra) {
    const card = document.createElement('div');
    card.className = 'bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105';
    
    card.innerHTML = `
        <div class="p-4 md:p-6">
            <div class="flex items-center justify-center mb-3 md:mb-4">
                <img src="${squadra.logo}" alt="${squadra.nome}" class="w-16 h-16 md:w-24 md:h-24 object-contain">
            </div>
            <h3 class="text-lg md:text-xl font-bold text-center mb-2 md:mb-3">${squadra.nome}</h3>
            <div class="space-y-1 md:space-y-2 text-sm md:text-base">
                <p class="flex items-center">
                    <i class="fas fa-user-tie mr-2 text-gray-400 w-4 md:w-5"></i>
                    <span class="truncate">${squadra.allenatore}</span>
                </p>
                <p class="flex items-center">
                    <i class="fas fa-calendar-alt mr-2 text-gray-400 w-4 md:w-5"></i>
                    <span>Fondazione: ${squadra.fondazione}</span>
                </p>
                <p class="flex items-center">
                    <i class="fas fa-users mr-2 text-gray-400 w-4 md:w-5"></i>
                    <span>${squadra.giocatori} giocatori</span>
                </p>
                <p class="flex items-center">
                    <i class="fas fa-chart-line mr-2 text-gray-400 w-4 md:w-5"></i>
                    <span>${squadra.punti} punti</span>
                </p>
                <p class="flex items-center">
                    <i class="fas fa-futbol mr-2 text-gray-400 w-4 md:w-5"></i>
                    <span>${squadra.golFatti} gol fatti</span>
                </p>
            </div>
            <div class="mt-3 md:mt-4 flex justify-center">
                <span class="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm" style="background-color: ${squadra.coloreMaglia}20; color: ${squadra.coloreMaglia}">
                    Colore Maglia
                </span>
            </div>
        </div>
    `;
    
    return card;
}

// Funzione per aggiornare la griglia delle squadre
function updateTeamsGrid(squadreDaMostrare = squadre) {
    const container = document.getElementById('teams-container');
    container.innerHTML = '';
    
    squadreDaMostrare.forEach(squadra => {
        const card = createTeamCard(squadra);
        container.appendChild(card);
    });
}

// Funzione per filtrare le squadre
function filterTeams(searchTerm) {
    return squadre.filter(squadra => 
        squadra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        squadra.allenatore.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Funzione per ordinare le squadre
function sortTeams(squadre, criteria) {
    return [...squadre].sort((a, b) => {
        if (criteria === 'nome') {
            return a.nome.localeCompare(b.nome);
        } else if (criteria === 'punti') {
            return b.punti - a.punti;
        } else if (criteria === 'gol') {
            return b.golFatti - a.golFatti;
        }
        return 0;
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateTeamsGrid();
    updateStats();
    
    // Gestione ricerca
    document.getElementById('search-team').addEventListener('input', (e) => {
        const filtered = filterTeams(e.target.value);
        updateTeamsGrid(filtered);
    });
    
    // Gestione ordinamento
    document.getElementById('sort-by').addEventListener('change', (e) => {
        const sorted = sortTeams(squadre, e.target.value);
        updateTeamsGrid(sorted);
    });
}); 