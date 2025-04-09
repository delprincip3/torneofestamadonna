// Dati di esempio
const squadre = [
    {
        posizione: 1,
        nome: "Squadra A",
        punti: 15,
        partiteGiocate: 5,
        vittorie: 5,
        pareggi: 0,
        sconfitte: 0,
        golFatti: 20,
        golSubiti: 5,
        differenzaReti: 15
    },
    {
        posizione: 2,
        nome: "Squadra B",
        punti: 12,
        partiteGiocate: 5,
        vittorie: 4,
        pareggi: 0,
        sconfitte: 1,
        golFatti: 15,
        golSubiti: 8,
        differenzaReti: 7
    },
    {
        posizione: 3,
        nome: "Squadra C",
        punti: 9,
        partiteGiocate: 5,
        vittorie: 3,
        pareggi: 0,
        sconfitte: 2,
        golFatti: 12,
        golSubiti: 10,
        differenzaReti: 2
    },
    {
        posizione: 4,
        nome: "Squadra D",
        punti: 6,
        partiteGiocate: 5,
        vittorie: 2,
        pareggi: 0,
        sconfitte: 3,
        golFatti: 8,
        golSubiti: 15,
        differenzaReti: -7
    }
];

// Funzione per aggiornare la classifica
function updateClassifica(squadreDaMostrare = squadre) {
    const tbody = document.getElementById('classifica-body');
    tbody.innerHTML = '';

    // Calcola i punti per ogni squadra
    squadreDaMostrare.forEach(squadra => {
        const punti = (squadra.vittorie * 3) + (squadra.pareggi * 1);
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-700 transition-colors';
        tr.innerHTML = `
            <td class="text-center font-bold">${squadra.posizione}</td>
            <td class="font-medium">${squadra.nome}</td>
            <td class="text-center font-bold">${punti}</td>
            <td class="text-center">${squadra.partiteGiocate}</td>
            <td class="text-center text-green-400">${squadra.vittorie}</td>
            <td class="text-center text-yellow-400">${squadra.pareggi}</td>
            <td class="text-center text-red-400">${squadra.sconfitte}</td>
            <td class="text-center">${squadra.golFatti}</td>
            <td class="text-center">${squadra.golSubiti}</td>
            <td class="text-center ${squadra.differenzaReti > 0 ? 'text-green-400' : squadra.differenzaReti < 0 ? 'text-red-400' : ''}">
                ${squadra.differenzaReti > 0 ? '+' : ''}${squadra.differenzaReti}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Funzione per aggiornare le statistiche
function updateStats() {
    // Trova la squadra con più punti
    const primaSquadra = squadre.reduce((prev, current) => 
        (prev.punti > current.punti) ? prev : current
    );

    // Trova la squadra con più gol fatti
    const migliorAttacco = squadre.reduce((prev, current) => 
        (prev.golFatti > current.golFatti) ? prev : current
    );

    // Trova la squadra con meno gol subiti
    const migliorDifesa = squadre.reduce((prev, current) => 
        (prev.golSubiti < current.golSubiti) ? prev : current
    );

    document.getElementById('first-team').textContent = primaSquadra.nome;
    document.getElementById('best-attack').textContent = migliorAttacco.nome;
    document.getElementById('best-defense').textContent = migliorDifesa.nome;
}

// Funzione per filtrare le squadre
function filterTeams(searchTerm) {
    return squadre.filter(squadra => 
        squadra.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Funzione per ordinare le squadre
function sortTeams(squadre, sortBy) {
    return [...squadre].sort((a, b) => {
        if (sortBy === 'posizione') return a.posizione - b.posizione;
        if (sortBy === 'punti') return b.punti - a.punti;
        if (sortBy === 'golFatti') return b.golFatti - a.golFatti;
        if (sortBy === 'golSubiti') return b.golSubiti - a.golSubiti;
        return 0;
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza la classifica
    updateClassifica();
    updateStats();

    // Gestione della ricerca
    const searchInput = document.getElementById('search-team');
    searchInput.addEventListener('input', (e) => {
        const filteredTeams = filterTeams(e.target.value);
        updateClassifica(filteredTeams);
    });

    // Gestione dell'ordinamento
    const sortSelect = document.getElementById('sort-by');
    sortSelect.addEventListener('change', (e) => {
        const sortedTeams = sortTeams(squadre, e.target.value);
        updateClassifica(sortedTeams);
    });
}); 