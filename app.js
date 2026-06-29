const MOCK_BOOKS = [
  {
    id: "1",
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    rating: 4.7,
    reviews: 3821,
    price: 39.99,
    categories: ["Technology", "Programming"],
    isbn: "978-0135957059",
    publisher: "Addison-Wesley",
    year: 2019,
    pages: 352,
    description: "A classic guide to software craftsmanship, covering topics from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse.",
    coverUrl: null,
    editions: [
      { format: "Hardcover", year: 2019, isbn: "978-0135957059", price: 39.99 },
      { format: "Paperback", year: 2020, isbn: "978-0135957058", price: 29.99 },
      { format: "Kindle",    year: 2019, isbn: "978-0135957057", price: 19.99 },
    ],
    listings: [
      { seller: "Amazon.com",      condition: "new",         price: 39.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "Thrift Books",    condition: "used",        price: 18.50, shipping: "R$ 12,00",     url: "https://amazon.com" },
      { seller: "Book Warehouse",  condition: "refurbished", price: 24.00, shipping: "Grátis",       url: "https://amazon.com" },
    ]
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 4.5,
    reviews: 6540,
    price: 34.99,
    categories: ["Technology", "Programming"],
    isbn: "978-0132350884",
    publisher: "Prentice Hall",
    year: 2008,
    pages: 431,
    description: "A handbook of agile software craftsmanship that helps programmers write better code. Martin covers principles, patterns, and practices, providing exercises to improve your skills.",
    coverUrl: null,
    editions: [
      { format: "Paperback", year: 2008, isbn: "978-0132350884", price: 34.99 },
      { format: "Kindle",    year: 2009, isbn: "978-0132350885", price: 22.99 },
    ],
    listings: [
      { seller: "Amazon.com",   condition: "new",  price: 34.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "eBay Seller",  condition: "used", price: 14.00, shipping: "R$ 8,00",      url: "https://amazon.com" },
    ]
  },
  {
    id: "3",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    rating: 4.6,
    reviews: 12000,
    price: 18.99,
    categories: ["History", "Science"],
    isbn: "978-0062316097",
    publisher: "Harper",
    year: 2015,
    pages: 443,
    description: "A sweeping narrative of humanity's creation and evolution that explores how Homo sapiens came to rule the world, covering the Cognitive, Agricultural, and Scientific Revolutions.",
    coverUrl: null,
    editions: [
      { format: "Paperback", year: 2015, isbn: "978-0062316097", price: 18.99 },
      { format: "Hardcover", year: 2015, isbn: "978-0062316096", price: 28.99 },
      { format: "Kindle",    year: 2015, isbn: "978-0062316095", price: 12.99 },
      { format: "Audiobook", year: 2017, isbn: "978-0062316094", price: 24.99 },
    ],
    listings: [
      { seller: "Amazon.com",     condition: "new",  price: 18.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "Powell's Books", condition: "new",  price: 20.00, shipping: "R$ 10,00",     url: "https://amazon.com" },
      { seller: "AbeBooks",       condition: "used", price: 8.00,  shipping: "R$ 6,00",      url: "https://amazon.com" },
    ]
  },
  {
    id: "4",
    title: "Design Patterns",
    author: "Gang of Four",
    rating: 4.4,
    reviews: 2900,
    price: 44.99,
    categories: ["Technology", "Programming"],
    isbn: "978-0201633610",
    publisher: "Addison-Wesley",
    year: 1994,
    pages: 395,
    description: "The classic reference on object-oriented design patterns. This book describes 23 patterns that help software developers design flexible, elegant, and ultimately reusable software.",
    coverUrl: null,
    editions: [
      { format: "Hardcover", year: 1994, isbn: "978-0201633610", price: 44.99 },
      { format: "Kindle",    year: 2012, isbn: "978-0201633611", price: 29.99 },
    ],
    listings: [
      { seller: "Amazon.com",  condition: "new",  price: 44.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "ThriftBooks", condition: "used", price: 22.00, shipping: "Grátis",       url: "https://amazon.com" },
    ]
  },
  {
    id: "5",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    rating: 4.6,
    reviews: 18500,
    price: 16.99,
    categories: ["Psychology", "Science", "Business"],
    isbn: "978-0374533557",
    publisher: "Farrar, Straus and Giroux",
    year: 2013,
    pages: 499,
    description: "A groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    coverUrl: null,
    editions: [
      { format: "Paperback", year: 2013, isbn: "978-0374533557", price: 16.99 },
      { format: "Hardcover", year: 2011, isbn: "978-0374275631", price: 26.99 },
      { format: "Kindle",    year: 2011, isbn: "978-0374275632", price: 13.99 },
    ],
    listings: [
      { seller: "Amazon.com",  condition: "new",  price: 16.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "Bookshop.org",condition: "new",  price: 17.50, shipping: "R$ 5,00",      url: "https://amazon.com" },
    ]
  },
  {
    id: "6",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    rating: 4.3,
    reviews: 4100,
    price: 89.99,
    categories: ["Technology", "Mathematics"],
    isbn: "978-0262033848",
    publisher: "MIT Press",
    year: 2009,
    pages: 1292,
    description: "Affectionately known as CLRS, this comprehensive text covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.",
    coverUrl: null,
    editions: [
      { format: "Hardcover", year: 2009, isbn: "978-0262033848", price: 89.99 },
      { format: "Paperback", year: 2022, isbn: "978-0262046305", price: 79.99 },
    ],
    listings: [
      { seller: "Amazon.com",  condition: "new",  price: 89.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "Chegg",       condition: "used", price: 42.00, shipping: "R$ 12,00",     url: "https://amazon.com" },
      { seller: "AbeBooks",    condition: "used", price: 38.00, shipping: "R$ 15,00",     url: "https://amazon.com" },
    ]
  },
  {
    id: "7",
    title: "The Lean Startup",
    author: "Eric Ries",
    rating: 4.3,
    reviews: 9800,
    price: 17.99,
    categories: ["Business", "Entrepreneurship"],
    isbn: "978-0307887894",
    publisher: "Currency",
    year: 2011,
    pages: 336,
    description: "A methodology for developing businesses and products that aims to shorten product development cycles and rapidly discover if a proposed business model is viable.",
    coverUrl: null,
    editions: [
      { format: "Paperback", year: 2011, isbn: "978-0307887894", price: 17.99 },
      { format: "Hardcover", year: 2011, isbn: "978-0307887895", price: 25.99 },
      { format: "Kindle",    year: 2011, isbn: "978-0307887896", price: 11.99 },
    ],
    listings: [
      { seller: "Amazon.com",    condition: "new",  price: 17.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "Walmart Books", condition: "new",  price: 19.00, shipping: "Grátis",       url: "https://amazon.com" },
    ]
  },
  {
    id: "8",
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    reviews: 43000,
    price: 14.99,
    categories: ["Self-Help", "Psychology", "Business"],
    isbn: "978-0735211292",
    publisher: "Avery",
    year: 2018,
    pages: 320,
    description: "A proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    coverUrl: null,
    editions: [
      { format: "Hardcover", year: 2018, isbn: "978-0735211292", price: 14.99 },
      { format: "Paperback", year: 2019, isbn: "978-0735211293", price: 11.99 },
      { format: "Kindle",    year: 2018, isbn: "978-0735211294", price: 8.99  },
      { format: "Audiobook", year: 2018, isbn: "978-0735211295", price: 19.99 },
    ],
    listings: [
      { seller: "Amazon.com",   condition: "new",  price: 14.99, shipping: "Grátis Prime", url: "https://amazon.com" },
      { seller: "Target Books", condition: "new",  price: 15.99, shipping: "Grátis",       url: "https://amazon.com" },
      { seller: "ThriftBooks",  condition: "used", price: 7.50,  shipping: "Grátis",       url: "https://amazon.com" },
    ]
  },
];

// ─── Utility: get all categories from data ───────────────────────────────────
function getAllCategories(books) {
  const cats = new Set();
  books.forEach(b => b.categories.forEach(c => cats.add(c)));
  return [...cats].sort();
}

// ─── Utility: render star SVGs ────────────────────────────────────────────────
function renderStars(rating, container) {
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    use.setAttribute("points", "10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7");
    use.classList.add(i <= Math.round(rating) ? 'star-filled' : 'star-empty');
    svg.appendChild(use);
    container.appendChild(svg);
  }
}

// ─── Utility: format price ────────────────────────────────────────────────────
function fmtPrice(p) {
  return `$${Number(p).toFixed(2)}`;
}

// ─── Search / filter logic ────────────────────────────────────────────────────
function filterBooks({ books, query = '', categories = [], sortBy = 'relevance', priceMin = 0, priceMax = Infinity }) {
  let result = [...books];

  // text filter
  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.categories.some(c => c.toLowerCase().includes(q))
    );
  }

  // category filter
  if (categories.length > 0) {
    result = result.filter(b => categories.some(c => b.categories.includes(c)));
  }

  // price filter
  result = result.filter(b => b.price >= priceMin && b.price <= priceMax);

  // sort
  switch (sortBy) {
    case 'price-asc':   result.sort((a, b) => a.price - b.price);       break;
    case 'price-desc':  result.sort((a, b) => b.price - a.price);       break;
    case 'rating':      result.sort((a, b) => b.rating - a.rating);     break;
    case 'title':       result.sort((a, b) => a.title.localeCompare(b.title)); break;
    default: break; // relevance = original order
  }

  return result;
}

// ─── Persist search state via sessionStorage ───────────────────────────────────
function saveSearch(query) {
  sessionStorage.setItem('bk_query', query || '');
}

function loadSearch() {
  return sessionStorage.getItem('bk_query') || '';
}

function getBookById(id) {
  return MOCK_BOOKS.find(b => b.id === id) || null;
}
