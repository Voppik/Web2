const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Otevírání menu na mobilu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Zvýraznění aktivní stránky podle URL
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
        link.classList.add('active');
    }
    // Zavření menu po kliknutí (na mobilu)
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) sidebar.classList.remove('active');
    });
});

// Záchrana pro hlavní index (pokud je cesta prázdná nebo jen lomeno)
if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
    document.querySelector('a[href="index.html"]')?.classList.add('active');
}