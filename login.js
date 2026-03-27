// 1. Inicializace
const SUPABASE_URL = 'https://empyrofcsvuvcitjljiz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcHlyb2Zjc3Z1dmNpdGpsaml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDQ1MjksImV4cCI6MjA4NTMyMDUyOX0.tSK20tp2eKId6imTRP4xfq-03yPEX0pdvk7GFsRu2mw';

// Vytvoření klienta s kontrolou, zda je knihovna načtená
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase klient inicializován");

// 2. Prvky
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const authMessage = document.getElementById('auth-message');

// 3. Kontrola session
async function checkSession() {
    console.log("Kontroluji session...");
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Chyba při kontrole session:", error);
        return;
    }

    if (session) {
        console.log("Uživatel přihlášen:", session.user.email);
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
        document.getElementById('user-email-display').textContent = session.user.email;
    } else {
        console.log("Nikdo není přihlášen");
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('user-section').style.display = 'none';
    }
}

// 4. Přihlášení
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Zabrání nechtěnému refreshování stránky
    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("Pokus o přihlášení...", email);
    authMessage.textContent = 'Pracuji na tom...';

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error("Chyba přihlášení:", error.message);
        authMessage.style.color = 'red';
        authMessage.textContent = error.message;
    } else {
        console.log("Přihlášení úspěšné!");
        authMessage.textContent = '';
        checkSession();
    }
});

// 5. Registrace
signupBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("Pokus o registraci...", email);
    authMessage.textContent = 'Registruji...';

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.error("Chyba registrace:", error.message);
        authMessage.style.color = 'red';
        authMessage.textContent = error.message;
    } else {
        console.log("Registrace hotova!");
        authMessage.style.color = 'green';
        authMessage.textContent = 'Úspěch! Pokud je zapnuté potvrzení e-mailu, zkontroluj si schránku.';
    }
});

// 6. Odhlášení
logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload();
});

// Spuštění
checkSession();