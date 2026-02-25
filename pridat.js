const SUPABASE_URL = 'https://empyrofcsvuvcitjljiz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcHlyb2Zjc3Z1dmNpdGpsaml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDQ1MjksImV4cCI6MjA4NTMyMDUyOX0.tSK20tp2eKId6imTRP4xfq-03yPEX0pdvk7GFsRu2mw';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const pojem = document.getElementById('term').value;
    const kategorie = document.getElementById('category').value;
    const vysvetleni = document.getElementById('explanation').value;
    const poznamka = document.getElementById('note').value;
    const autor = document.getElementById('autor').value;

    const { error } = await db.from('pojmy').insert([{ pojem, kategorie, vysvetleni, poznamka, autor }]);

    if (error) alert("Chyba při ukládání: " + error.message);
    else window.location.href = 'tabulka.html';
});