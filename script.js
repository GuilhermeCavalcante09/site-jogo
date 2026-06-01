// =============================================
// GAMEZONE - script.js (Final Polished)
// =============================================

// ---- Dados dos Jogos (Iniciados com 0) ----
const games = [{
        id: 1,
        name: "Projeto - Guilherme",
        url: "https://projetojogoguilherme.netlify.app",
        icon: "🎮",
        desc: "Um jogo MetroidVania",
        likes: 0,
        views: 0
    },
    {
        id: 2,
        name: "Projeto - Diego",
        url: "https://chimerical-shortbread-6ee684.netlify.app",
        icon: "🍪",
        desc: "Um jogo de cartas",
        likes: 0,
        views: 0
    },
    {
        id: 3,
        name: "Em Breve: Jogo 3",
        url: "#",
        icon: "🚀",
        desc: "O próximo grande jogo está a chegar. Fica atento!",
        likes: 0,
        views: 0
    },
    {
        id: 4,
        name: "Em Breve: Jogo 4",
        url: "#",
        icon: "🕹️",
        desc: "Mais diversão a caminho da nossa arena.",
        likes: 0,
        views: 0
    },
    {
        id: 5,
        name: "Em Breve: Jogo 5",
        url: "#",
        icon: "👾",
        desc: "Prepara-te para novos desafios intergalácticos.",
        likes: 0,
        views: 0
    },
    {
        id: 6,
        name: "Em Breve: Jogo 6",
        url: "#",
        icon: "🏆",
        desc: "O último lugar da nossa lista de elite.",
        likes: 0,
        views: 0
    }
];

// ---- Inicialização ----
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    renderGames();
    updateHighlights();
    initTicker();
});

// ---- Partículas ----
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (Math.random() * 10 + 6) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.width = p.style.height = (Math.random() * 6 + 3) + 'px';
        p.style.opacity = Math.random() * 0.6 + 0.2;
        container.appendChild(p);
    }
}

// ---- Ticker ----
function initTicker() {
    const ticker = document.getElementById('ticker-text');
    if (ticker) {
        const msgs = ['🎮 Bem-vindo à GameZone!', '🏆 Bate os recordes!', '🕹️ 6 jogos disponíveis!', '⚡ Divirte-te!', '🚀 Novidades em breve!'];
        let ti = 0;
        setInterval(() => { ticker.textContent = msgs[ti++ % msgs.length]; }, 2500);
    }
}

// ---- Renderizar Jogos ----
function renderGames() {
    const container = document.getElementById('games-container');
    if (!container) return;
    container.innerHTML = '';

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
      <div class="game-icon">${game.icon}</div>
      <h3>${game.name}</h3>
      <p>${game.desc}</p>
      <div class="game-stats">
        <span>👁️ <span id="view-count-${game.id}">${game.views}</span> acessos</span>
        <span>❤️ <span id="like-count-${game.id}">${game.likes}</span> likes</span>
      </div>
      <div class="game-btns">
        <a href="${game.url}" target="_blank" class="play-btn" onclick="registerAccess(${game.id})">JOGAR AGORA</a>
        <button class="btn-like" id="like-btn-${game.id}" onclick="toggleLike(${game.id})">❤️</button>
      </div>
    `;
        container.appendChild(card);
    });
}

// ---- Lógica de Likes ----
function toggleLike(id) {
    const game = games.find(g => g.id === id);
    const btn = document.getElementById(`like-btn-${id}`);
    const countEl = document.getElementById(`like-count-${id}`);

    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        game.likes--;
    } else {
        btn.classList.add('liked');
        game.likes++;
        showNotif(`Curtiu ${game.name}! ❤️`);
    }

    countEl.textContent = game.likes;
    updateHighlights();
}

// ---- Lógica de Acessos ----
function registerAccess(id) {
    const game = games.find(g => g.id === id);
    if (game.url !== "#") {
        game.views++;
        const viewEl = document.getElementById(`view-count-${id}`);
        if (viewEl) viewEl.textContent = game.views;
        updateHighlights();
    }
}

// ---- Atualizar Destaques ----
function updateHighlights() {
    // Ordenar para encontrar os melhores
    const mostAccessed = [...games].sort((a, b) => b.views - a.views)[0];
    const mostLiked = [...games].sort((a, b) => b.likes - a.likes)[0];

    const accEl = document.getElementById('top-accessed-name');
    const likEl = document.getElementById('top-liked-name');

    if (accEl) accEl.textContent = mostAccessed.views > 0 ? mostAccessed.name : "Nenhum ainda";
    if (likEl) likEl.textContent = mostLiked.likes > 0 ? mostLiked.name : "Nenhum ainda";
}

// ---- Modal e Scroll ----
function openQRModal() { document.getElementById('qrModal').classList.add('active'); }

function closeQRModal() { document.getElementById('qrModal').classList.remove('active'); }

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        window.scrollTo({
            top: el.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('qrModal');
    if (event.target == modal) closeQRModal();
}

// ---- Notificação ----
function showNotif(msg) {
    const n = document.createElement('div');
    n.style.position = 'fixed';
    n.style.bottom = '30px';
    n.style.right = '20px';
    n.style.background = 'var(--neon-green)';
    n.style.color = '#000';
    n.style.padding = '12px 25px';
    n.style.borderRadius = '8px';
    n.style.fontFamily = 'Orbitron';
    n.style.fontWeight = 'bold';
    n.style.zIndex = '10000';
    n.style.boxShadow = '0 0 20px rgba(0,255,136,0.4)';
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 2500);
}