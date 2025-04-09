// Funzione per caricare i dettagli della squadra
function loadSquadraDetails() {
    // Ottieni l'ID della squadra dall'URL
    const urlParams = new URLSearchParams(window.location.search);
    const squadraId = parseInt(urlParams.get('id'));

    // Trova la squadra corrispondente
    const squadra = squadre.find(s => s.id === squadraId);

    if (squadra) {
        // Aggiorna le informazioni della squadra
        document.getElementById('squadra-nome').textContent = squadra.nome;
        document.getElementById('squadra-logo').src = squadra.logo;
        document.getElementById('squadra-descrizione').textContent = squadra.descrizione;

        // Calcola le statistiche
        const totalGoals = squadra.giocatori.reduce((sum, g) => sum + g.gol, 0);
        const avgGoals = (totalGoals / squadra.giocatori.length).toFixed(1);

        // Aggiorna le statistiche
        document.getElementById('gol-totali').textContent = totalGoals;
        document.getElementById('media-gol').textContent = avgGoals;

        // Aggiorna la tabella dei giocatori
        const tbody = document.getElementById('giocatori-body');
        tbody.innerHTML = '';

        // Ordina i giocatori per gol (decrescente)
        const giocatoriOrdinati = [...squadra.giocatori].sort((a, b) => b.gol - a.gol);

        giocatoriOrdinati.forEach(giocatore => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-700 transition-colors';
            row.innerHTML = `
                <td class="px-4 py-3">${giocatore.nome}</td>
                <td class="px-4 py-3 text-center">${giocatore.gol}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        // Se la squadra non viene trovata, reindirizza alla pagina delle squadre
        window.location.href = 'squadre.html';
    }
}

// Carica i dettagli della squadra quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadSquadraDetails); 