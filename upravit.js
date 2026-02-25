const SUPABASE_URL = 'https://empyrofcsvuvcitjljiz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcHlyb2Zjc3Z1dmNpdGpsaml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDQ1MjksImV4cCI6MjA4NTMyMDUyOX0.tSK20tp2eKId6imTRP4xfq-03yPEX0pdvk7GFsRu2mw';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Získá ID z URL adresy (např. upravit.html?id=5)
const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get('id');

if (!recordId) {
    alert("Chyba: Nebyl vybrán žádný záznam!");
    window.location.href = 'tabulka.html';
}

// Načte stará data do formuláře
async function loadRecord() {
    const { data, error } = await db.from('pojmy').select('*').eq('id', recordId).single();
    if (error) return alert("Chyba načítání: " + error.message);

    document.getElementById('record-id').value = data.id;
    document.getElementById('term').value = data.pojem;
    document.getElementById('category').value = data.kategorie;
    document.getElementById('explanation').value = data.vysvetleni;
    document.getElementById('note').value = data.poznamka;
    document.getElementById('autor').value = data.autor;
}

// Uložení úprav
document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const updates = {
        pojem: document.getElementById('term').value,
        kategorie: document.getElementById('category').value,
        vysvetleni: document.getElementById('explanation').value,
        poznamka: document.getElementById('note').value,
        autor: document.getElementById('autor').value,
    };

    const { error } = await db.from('pojmy').update(updates).eq('id', recordId);

    if (error) alert("Chyba při úpravě: " + error.message);
    else window.location.href = 'tabulka.html';
});

loadRecord();