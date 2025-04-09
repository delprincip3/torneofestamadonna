// Funzione per popolare i select delle squadre
function populateSquadreSelects() {
    const squadraCasaSelect = document.getElementById('squadra-casa');
    const squadraOspiteSelect = document.getElementById('squadra-ospite');

    squadre.forEach(squadra => {
        const option = document.createElement('option');
        option.value = squadra.nome;
        option.textContent = squadra.nome;
        
        squadraCasaSelect.appendChild(option.cloneNode(true));
        squadraOspiteSelect.appendChild(option);
    });
}

// Funzione per creare un nuovo campo marcatore
function createMarcatoreField() {
    const container = document.createElement('div');
    container.className = 'grid grid-cols-1 md:grid-cols-3 gap-4';
    
    container.innerHTML = `
        <div>
            <select class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none squadra-marcatore" required>
                <option value="">Seleziona squadra</option>
            </select>
        </div>
        <div>
            <select class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none giocatore-marcatore" required>
                <option value="">Seleziona giocatore</option>
            </select>
        </div>
        <div>
            <input type="number" min="1" value="1" class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none gol-marcatore" required>
        </div>
    `;

    // Popola il select della squadra
    const squadraSelect = container.querySelector('.squadra-marcatore');
    squadre.forEach(squadra => {
        const option = document.createElement('option');
        option.value = squadra.nome;
        option.textContent = squadra.nome;
        squadraSelect.appendChild(option);
    });

    // Aggiorna i giocatori quando cambia la squadra
    squadraSelect.addEventListener('change', (e) => {
        const giocatoreSelect = container.querySelector('.giocatore-marcatore');
        giocatoreSelect.innerHTML = '<option value="">Seleziona giocatore</option>';
        
        const squadra = squadre.find(s => s.nome === e.target.value);
        if (squadra) {
            squadra.giocatori.forEach(giocatore => {
                const option = document.createElement('option');
                option.value = giocatore.nome;
                option.textContent = giocatore.nome;
                giocatoreSelect.appendChild(option);
            });
        }
    });

    return container;
}

// Funzione per gestire il submit del form
function handleSubmit(e) {
    e.preventDefault();

    const squadraCasa = document.getElementById('squadra-casa').value;
    const squadraOspite = document.getElementById('squadra-ospite').value;
    const golCasa = parseInt(document.getElementById('gol-casa').value);
    const golOspite = parseInt(document.getElementById('gol-ospite').value);
    const dataPartita = document.getElementById('data-partita').value;

    // Raccogli i marcatori
    const marcatori = [];
    document.querySelectorAll('#marcatori-container > div').forEach(container => {
        const squadra = container.querySelector('.squadra-marcatore').value;
        const giocatore = container.querySelector('.giocatore-marcatore').value;
        const gol = parseInt(container.querySelector('.gol-marcatore').value);

        if (squadra && giocatore && gol) {
            marcatori.push({
                nome: giocatore,
                squadra: squadra,
                gol: gol
            });
        }
    });

    // Crea il nuovo risultato
    const nuovoRisultato = {
        id: partite.length + 1,
        data: dataPartita,
        squadraCasa: squadraCasa,
        squadraOspite: squadraOspite,
        golCasa: golCasa,
        golOspite: golOspite,
        marcatori: marcatori
    };

    // Aggiungi il risultato e aggiorna le statistiche
    addPartita(nuovoRisultato);

    // Reindirizza alla pagina dei risultati
    window.location.href = 'risultati.html';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    populateSquadreSelects();

    // Gestione aggiunta marcatore
    document.getElementById('aggiungi-marcatore').addEventListener('click', () => {
        const container = document.getElementById('marcatori-container');
        container.appendChild(createMarcatoreField());
    });

    // Gestione submit form
    document.getElementById('risultato-form').addEventListener('submit', handleSubmit);
}); 