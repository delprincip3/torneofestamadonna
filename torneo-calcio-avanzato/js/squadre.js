// Dati delle squadre
const squadre = [
    {
        id: 1,
        nome: "Real Madrid",
        logo: "../images/real-madrid.png",
        descrizione: "Il Real Madrid è una delle squadre più titolate al mondo, con 14 Champions League vinte.",
        vittorie: 0,
        pareggi: 0,
        sconfitte: 0,
        golFatti: 0,
        golSubiti: 0,
        partiteGiocate: 0,
        giocatori: [
            { nome: "Vinicius Junior", gol: 0 },
            { nome: "Rodrygo", gol: 0 },
            { nome: "Jude Bellingham", gol: 0 },
            { nome: "Joselu", gol: 0 },
            { nome: "Brahim Diaz", gol: 0 }
        ]
    },
    {
        id: 2,
        nome: "Barcelona",
        logo: "../images/barcelona.png",
        descrizione: "Il Barcellona è famoso per il suo stile di gioco offensivo e per la sua accademia La Masia.",
        vittorie: 0,
        pareggi: 0,
        sconfitte: 0,
        golFatti: 0,
        golSubiti: 0,
        partiteGiocate: 0,
        giocatori: [
            { nome: "Robert Lewandowski", gol: 0 },
            { nome: "Joao Felix", gol: 0 },
            { nome: "Ferran Torres", gol: 0 },
            { nome: "Raphinha", gol: 0 },
            { nome: "Gavi", gol: 0 }
        ]
    },
    {
        id: 3,
        nome: "Juventus",
        logo: "../images/juventus.png",
        descrizione: "La Juventus è la squadra più titolata d'Italia, con 36 scudetti vinti.",
        vittorie: 0,
        pareggi: 0,
        sconfitte: 0,
        golFatti: 0,
        golSubiti: 0,
        partiteGiocate: 0,
        giocatori: [
            { nome: "Dusan Vlahovic", gol: 0 },
            { nome: "Federico Chiesa", gol: 0 },
            { nome: "Moise Kean", gol: 0 },
            { nome: "Adrien Rabiot", gol: 0 },
            { nome: "Manuel Locatelli", gol: 0 }
        ]
    },
    {
        id: 4,
        nome: "Milan",
        logo: "../images/milan.png",
        descrizione: "Il Milan è una delle squadre più prestigiose d'Italia, con 7 Champions League vinte.",
        vittorie: 0,
        pareggi: 0,
        sconfitte: 0,
        golFatti: 0,
        golSubiti: 0,
        partiteGiocate: 0,
        giocatori: [
            { nome: "Olivier Giroud", gol: 0 },
            { nome: "Rafael Leao", gol: 0 },
            { nome: "Christian Pulisic", gol: 0 },
            { nome: "Noah Okafor", gol: 0 },
            { nome: "Luka Jovic", gol: 0 }
        ]
    }
];

// Funzione per aggiornare le statistiche
function updateStats() {
    const totalTeams = squadre.length;
    const totalPlayers = squadre.reduce((sum, squadra) => sum + squadra.giocatori.length, 0);
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
                    <span>${squadra.giocatori.length} giocatori</span>
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

// Funzione per filtrare le squadre
function filterTeams(searchTerm) {
    return squadre.filter(squadra => 
        squadra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        squadra.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Funzione per ordinare le squadre
function sortTeams(squadre, criteria) {
    return [...squadre].sort((a, b) => {
        if (criteria === 'nome') {
            return a.nome.localeCompare(b.nome);
        } else if (criteria === 'giocatori') {
            return b.giocatori.length - a.giocatori.length;
        }
        return 0;
    });
}

// Funzione per aggiornare la griglia delle squadre
function updateTeamsGrid(squadreDaMostrare = squadre) {
    const container = document.getElementById('teams-container');
    container.innerHTML = '';

    squadreDaMostrare.forEach(squadra => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
        card.innerHTML = `
            <a href="squadra-dettaglio.html?id=${squadra.id}" class="block">
                <div class="p-6">
                    <div class="flex items-center justify-center mb-4">
                        <img src="${squadra.logo}" alt="${squadra.nome}" class="w-24 h-24 object-contain">
                    </div>
                    <h3 class="text-xl font-bold text-center mb-2">${squadra.nome}</h3>
                    <p class="text-gray-400 text-center mb-4">${squadra.descrizione}</p>
                    <div class="flex justify-center">
                        <span class="bg-primary text-white px-4 py-2 rounded-full">${squadra.giocatori.length} giocatori</span>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
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

function updateSquadre() {
    const container = document.getElementById('squadre-container');
    container.innerHTML = '';

    squadre.forEach(squadra => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
        card.innerHTML = `
            <a href="squadra-dettaglio.html?id=${squadra.id}" class="block">
                <div class="p-6">
                    <div class="flex items-center justify-center mb-4">
                        <img src="${squadra.logo}" alt="${squadra.nome}" class="w-24 h-24 object-contain">
                    </div>
                    <h3 class="text-xl font-bold text-center mb-2">${squadra.nome}</h3>
                    <p class="text-gray-400 text-center mb-4">${squadra.descrizione}</p>
                    <div class="flex justify-center">
                        <span class="bg-primary text-white px-4 py-2 rounded-full">${squadra.giocatori.length} giocatori</span>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
    });
} 