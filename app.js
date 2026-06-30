// =================================================================
// BOOKFINDER - INTEGRAÇÃO COMPLETA COM API FLASK + MYSQL
// =================================================================

// ─── CONFIGURAÇÃO ──────────────────────────────────────────────
const API_URL = 'http://127.0.0.1:5000/api';
let BOOKS_DATA = [];
let _loadBooksPromise = null;

// ─── MAPEAMENTO: API -> APP ──────────────────────────────────
function mapApiBookToAppBook(apiBook) {
    return {
        id: apiBook.ISBN || `book-${Math.random()}`,
        title: apiBook.titulo || 'Título não disponível',
        author: apiBook.nome_autor || 'Autor desconhecido',
        rating: parseFloat(apiBook.avaliacao) || 0,
        reviews: Math.floor(Math.random() * 10000) + 100,
        price: parseFloat(apiBook.preco_estimado) || 0,
        categories: apiBook.nome_categoria ? [apiBook.nome_categoria] : ['Geral'],
        isbn: apiBook.ISBN || '',
        publisher: apiBook.editora || 'Editora não disponível',
        year: new Date().getFullYear(),
        pages: 0,
        description: 'Descrição não disponível',
        coverUrl: apiBook.url_imagem || null,
        editions: [],
        listings: [
            {
                seller: apiBook.nome_vendedor || 'Amazon',
                condition: 'new',
                price: parseFloat(apiBook.preco_estimado) || 0,
                shipping: 'Grátis Prime',
                url: `https://www.amazon.com/dp/${apiBook.ISBN || ''}`
            }
        ]
    };
}

// ─── FUNÇÕES DE CARREGAMENTO DA API ──────────────────────────
async function fetchBooksFromAPI() {
    try {
        // Tenta carregar todas as rotas em paralelo
        const [basico, completo, categoria, avaliacao, elite] = await Promise.all([
            fetch(`${API_URL}/apresentaLivroBasico`).then(r => r.json()).catch(() => []),
            fetch(`${API_URL}/apresentaLivroCompleto`).then(r => r.json()).catch(() => []),
            fetch(`${API_URL}/livroCategoria`).then(r => r.json()).catch(() => []),
            fetch(`${API_URL}/livroAvaliacao`).then(r => r.json()).catch(() => []),
            fetch(`${API_URL}/categoriaAvaliacao`).then(r => r.json()).catch(() => [])
        ]);

        console.log('📚 Dados carregados da API:');
        console.log(`  - Livros básicos: ${basico.length}`);
        console.log(`  - Livros completos: ${completo.length}`);
        console.log(`  - Livros por categoria: ${categoria.length}`);
        console.log(`  - Livros acima da média: ${avaliacao.length}`);
        console.log(`  - Categorias elite: ${elite.length}`);

        // Combina os dados (usa completo como base)
        let combinedData = [...completo];

        // Se não veio nada do completo, usa o básico
        if (combinedData.length === 0) {
            combinedData = [...basico];
        }

        // Mapeia para o formato do app
        const mappedData = combinedData.map(mapApiBookToAppBook);
        
        // Armazena dados adicionais para uso nas rotas específicas
        window._apiData = { basico, completo, categoria, avaliacao, elite };

        return mappedData;
    } catch (error) {
        console.error('❌ Erro ao buscar dados da API:', error);
        console.log('🔄 Usando MOCK_BOOKS como fallback...');
        return MOCK_BOOKS;
    }
}

function loadBooks() {
    if (!_loadBooksPromise) {
        _loadBooksPromise = fetchBooksFromAPI()
            .then(data => {
                BOOKS_DATA = Array.isArray(data) ? data : [];
                return BOOKS_DATA;
            })
            .catch(err => {
                console.error('Falha ao carregar livros:', err);
                BOOKS_DATA = [];
                throw err;
            });
    }
    return _loadBooksPromise;
}

// ─── ROTAS ESPECÍFICAS PARA O INDEX ──────────────────────────

// ROTA 1: Livro Destaque (melhor avaliado)
async function carregarLivroDestaque() {
    try {
        const resposta = await fetch(`${API_URL}/apresentaLivroBasico`);
        const dados = await resposta.json();
        const container = document.getElementById('book-highlight');
        if (!container || dados.length === 0) return;

        const livro = dados[0];
        container.innerHTML = `
            <div class="book-highlight-card">
                <div class="highlight-image">
                    <img src="${livro.url_imagem || 'https://via.placeholder.com/200x300/2c3e50/ecf0f1?text=Book'}" 
                         alt="${livro.titulo}" 
                         onerror="this.src='https://via.placeholder.com/200x300/2c3e50/ecf0f1?text=📚'">
                </div>
                <div class="highlight-info">
                    <span class="highlight-badge">⭐ Destaque</span>
                    <h2>${livro.titulo}</h2>
                    <p class="highlight-author">Por: ${livro.nome_autor || 'Autor desconhecido'}</p>
                    <div class="highlight-rating">⭐ ${livro.avaliacao || 'N/A'}</div>
                    <p class="highlight-desc">${livro.descricao || 'Sinopse não disponível.'}</p>
                </div>
            </div>
        `;
    } catch (erro) {
        console.error('Erro ao carregar destaque:', erro);
        const container = document.getElementById('book-highlight');
        if (container) {
            container.innerHTML = `<p style="color:#e74c3c;">⚠️ Não foi possível carregar o livro destaque.</p>`;
        }
    }
}

// ROTA 2: Catálogo Completo (vitrine)
async function carregarCatalogo() {
    try {
        const resposta = await fetch(`${API_URL}/apresentaLivroCompleto`);
        const dados = await resposta.json();
        const container = document.getElementById('books-grid');
        if (!container) return;

        // Se já existir conteúdo (ex: da busca), não sobrescreve
        if (container.children.length > 0) return;

        container.innerHTML = '';
        const livros = dados.slice(0, 12);

        livros.forEach(livro => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <div class="book-card-cover">
                    <img src="${livro.url_imagem || 'https://via.placeholder.com/150x200/2c3e50/ecf0f1?text=📚'}" 
                         alt="${livro.titulo}" 
                         onerror="this.src='https://via.placeholder.com/150x200/2c3e50/ecf0f1?text=📚'">
                </div>
                <div class="book-card-body">
                    <div class="book-title">${livro.titulo || 'Sem título'}</div>
                    <div class="book-author">${livro.nome_autor || 'Autor desconhecido'}</div>
                    <div class="stars">${renderStarsHTML(livro.avaliacao || 0)}</div>
                    <div class="book-price">${livro.moeda || 'R$'} ${parseFloat(livro.preco_estimado || 0).toFixed(2)}</div>
                    <div class="book-seller">${livro.nome_vendedor || 'Amazon'}</div>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `book.html?id=${livro.ISBN}`;
            });
            container.appendChild(card);
        });
    } catch (erro) {
        console.error('Erro ao carregar catálogo:', erro);
    }
}

// ROTA 3: Livros por Categoria (Ficção)
async function carregarFiccao() {
    try {
        const resposta = await fetch(`${API_URL}/livroCategoria`);
        const dados = await resposta.json();
        const container = document.getElementById('lista-ficcao');
        if (!container) return;

        container.innerHTML = '';
        dados.slice(0, 10).forEach(livro => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="book-title-list">${livro.titulo}</span>
                <span class="book-category-badge">${livro.nome_categoria}</span>
            `;
            container.appendChild(li);
        });
    } catch (erro) {
        console.error('Erro ao carregar ficção:', erro);
    }
}

// ROTA 4: Categorias Elite (> 4.5)
async function carregarCategoriasElite() {
    try {
        const resposta = await fetch(`${API_URL}/categoriaAvaliacao`);
        const dados = await resposta.json();
        const container = document.getElementById('lista-categorias');
        if (!container) return;

        container.innerHTML = '';
        dados.slice(0, 10).forEach(cat => {
            if (cat.quantidade_livros > 0) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="category-name">${cat.nome_categoria}</span>
                    <span class="category-count">${cat.quantidade_livros} livros ⭐</span>
                `;
                container.appendChild(li);
            }
        });
    } catch (erro) {
        console.error('Erro ao carregar categorias elite:', erro);
    }
}

// ROTA 5: Livros Acima da Média
async function carregarAcimaDaMedia() {
    try {
        const resposta = await fetch(`${API_URL}/livroAvaliacao`);
        const dados = await resposta.json();
        const container = document.getElementById('lista-acima-media');
        if (!container) return;

        container.innerHTML = '';
        dados.slice(0, 10).forEach(livro => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="book-title-list">${livro.titulo}</span>
                <span class="book-rating-badge">⭐ ${livro.avaliacao || 0}</span>
            `;
            container.appendChild(li);
        });
    } catch (erro) {
        console.error('Erro ao carregar acima da média:', erro);
    }
}

// ─── HELPERS ──────────────────────────────────────────────────
function renderStarsHTML(rating) {
    const full = Math.round(rating);
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                class="${i <= full ? 'star-filled' : 'star-empty'}" />
        </svg>`;
    }
    return html;
}

// ─── FUNÇÕES DO APP ORIGINAL (MANTIDAS) ─────────────────────
const MOCK_BOOKS = [
    // ... mantém seus MOCK_BOOKS aqui ou remove se não precisar mais
];

function getAllCategories(books = BOOKS_DATA) {
    const cats = new Set();
    (books || []).forEach(b => (b.categories || []).forEach(c => cats.add(c)));
    return [...cats].sort();
}

function filterBooks({ books = BOOKS_DATA, query = '', categories = [], sortBy = 'relevance', priceMin = 0, priceMax = Infinity }) {
    let result = [...(books || [])];
    if (query && query.trim()) {
        const q = query.toLowerCase();
        result = result.filter(b =>
            (b.title || '').toLowerCase().includes(q) ||
            (b.author || '').toLowerCase().includes(q) ||
            (b.categories || []).some(c => c.toLowerCase().includes(q))
        );
    }
    if (categories.length > 0) {
        result = result.filter(b => (b.categories || []).some(c => categories.includes(c)));
    }
    result = result.filter(b => {
        const price = b.price ?? 0;
        return price >= priceMin && price <= priceMax;
    });
    switch (sortBy) {
        case 'price-asc':  result.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
        case 'price-desc': result.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
        case 'rating':     result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
        case 'title':      result.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
        default: break;
    }
    return result;
}

function saveSearch(query) {
    sessionStorage.setItem('bk_query', query || '');
}

function loadSearch() {
    return sessionStorage.getItem('bk_query') || '';
}

function getBookById(id) {
    return (BOOKS_DATA || []).find(b => String(b.id) === String(id)) || null;
}

function fmtPrice(p) {
    return `R$ ${Number(p || 0).toFixed(2)}`;
}

// ─── EXPORTAR PARA O HTML ────────────────────────────────────
// As funções abaixo ficam disponíveis globalmente para o HTML
window.BOOKS_DATA = BOOKS_DATA;
window.loadBooks = loadBooks;
window.getAllCategories = getAllCategories;
window.filterBooks = filterBooks;
window.saveSearch = saveSearch;
window.loadSearch = loadSearch;
window.getBookById = getBookById;
window.fmtPrice = fmtPrice;
window.renderStarsHTML = renderStarsHTML;

// Funções de carregamento das rotas
window.carregarLivroDestaque = carregarLivroDestaque;
window.carregarCatalogo = carregarCatalogo;
window.carregarFiccao = carregarFiccao;
window.carregarCategoriasElite = carregarCategoriasElite;
window.carregarAcimaDaMedia = carregarAcimaDaMedia;