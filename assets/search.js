/* search.js — used only on /search/ */
(async function () {
  const params       = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';

  const input     = document.getElementById('search-input');
  const form      = document.getElementById('search-form');
  const resultsEl = document.getElementById('search-results');
  const countEl   = document.getElementById('search-count');

  input.value = initialQuery;

  let pages = [];
  try {
    const res = await fetch('/assets/search.json');
    pages = await res.json();
  } catch (e) {
    resultsEl.innerHTML = '<p class="search-empty">Search index could not be loaded. Please try again.</p>';
    return;
  }

  function scoreEntry(page, q) {
    const lq = q.toLowerCase();
    let s = 0;
    if (page.title.toLowerCase().includes(lq))       s += 10;
    if (page.category.toLowerCase().includes(lq))    s += 3;
    if (page.description.toLowerCase().includes(lq)) s += 2;
    page.tags.forEach(t => { if (t.toLowerCase().includes(lq)) s += 5; });
    return s;
  }

  function esc(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, q) {
    if (!q) return text;
    return text.replace(new RegExp(`(${esc(q)})`, 'gi'), '<mark>$1</mark>');
  }

  function render(query) {
    const q = query.trim();

    if (!q) {
      resultsEl.innerHTML = '';
      countEl.textContent = '';
      return;
    }

    const results = pages
      .map(p => ({ ...p, _score: scoreEntry(p, q) }))
      .filter(p => p._score > 0)
      .sort((a, b) => b._score - a._score);

    if (results.length === 0) {
      countEl.textContent = 'No results';
      resultsEl.innerHTML = `<p class="search-empty">No pages match <strong>"${q}"</strong>. Try a different term or <a href="/library/">browse the Library</a>.</p>`;
      return;
    }

    countEl.textContent = `${results.length} result${results.length === 1 ? '' : 's'}`;

    resultsEl.innerHTML = results.map(r => `
      <a href="${r.url}" class="search-result">
        <span class="search-result-category">${r.category}</span>
        <h3 class="search-result-title">${highlight(r.title, q)}</h3>
        <p class="search-result-desc">${highlight(r.description, q)}</p>
      </a>
    `).join('');
  }

  /* Initial render if ?q= was in the URL */
  if (initialQuery) render(initialQuery);

  /* Live search with debounce */
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value.trim();
      const url = q ? `/search/?q=${encodeURIComponent(q)}` : '/search/';
      history.replaceState(null, '', url);
      render(q);
    }, 180);
  });

  /* Prevent default form submit (live search handles it) */
  form.addEventListener('submit', e => {
    e.preventDefault();
    render(input.value.trim());
  });

  /* Auto-focus on load */
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
})();
