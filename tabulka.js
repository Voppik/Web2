const SUPABASE_URL = 'https://empyrofcsvuvcitjljiz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcHlyb2Zjc3Z1dmNpdGpsaml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDQ1MjksImV4cCI6MjA4NTMyMDUyOX0.tSK20tp2eKId6imTRP4xfq-03yPEX0pdvk7GFsRu2mw';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const tableBody = document.querySelector('#data-table tbody');
let selectedRow = null;

async function loadData(search = '') {
    tableBody.innerHTML = '<tr><td colspan="4">Načítám data...</td></tr>';

    let query = db.from('pojmy').select('*').order('created_at', { ascending: false });
    if (search) {
        query = query.or(`pojem.ilike.%${search}%,kategorie.ilike.%${search}%,vysvetleni.ilike.%${search}%,poznamka.ilike.%${search}%,autor.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) return tableBody.innerHTML = `<tr><td colspan="4">Chyba: ${error.message}</td></tr>`;

    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.id = item.id;
        row.innerHTML = `
            <td><strong>${item.pojem || ''}</strong></td>
            <td>${item.kategorie || ''}</td>
            <td>${item.vysvetleni || ''}</td>
            <td>${item.poznamka || ''}</td>
            <td>${item.autor || ''}</td>
        `;
        row.addEventListener('click', () => {
            if (selectedRow) selectedRow.classList.remove('selected');
            if (selectedRow === row) selectedRow = null;
            else { selectedRow = row; selectedRow.classList.add('selected'); }
        });
        tableBody.appendChild(row);
    });
}

// ... (začátek s URL a KEY zůstává stejný)

// TLAČÍTKO PŘIDAT (Navigace na formulář)
document.getElementById('btn-add-nav').onclick = () => {
    window.location.href = 'pridat.html';
};

// TLAČÍTKO UPRAVIT (Navigace na formulář s ID)
document.getElementById('btn-edit').onclick = () => {
    if (!selectedRow) {
        alert('Musíš nejdříve kliknout na řádek v tabulce!');
        return;
    }
    window.location.href = `upravit.html?id=${selectedRow.dataset.id}`;
};

// TLAČÍTKO SMAZAT (Přímá akce)
document.getElementById('btn-remove').onclick = async () => {
    if (!selectedRow) {
        alert('Vyber v tabulce řádek, který chceš smazat.');
        return;
    }

    const potvrzeni = confirm(`Opravdu chceš smazat pojem: ${selectedRow.cells[0].innerText}?`);

    if (potvrzeni) {
        const { error } = await db.from('pojmy').delete().eq('id', selectedRow.dataset.id);

        if (error) {
            alert("Chyba při mazání: " + error.message);
        } else {
            selectedRow.remove();
            selectedRow = null;
            console.log("Záznam byl úspěšně odstraněn.");
        }
    }
};

// ... (funkce loadData a zbytek zůstává stejný)
// Úprava (přesměrování na formulář)
document.getElementById('btn-edit').onclick = () => {
    if (!selectedRow) return alert('Kliknutím v tabulce vyber řádek k úpravě.');
    window.location.href = `upravit.html?id=${selectedRow.dataset.id}`;
};

loadData();