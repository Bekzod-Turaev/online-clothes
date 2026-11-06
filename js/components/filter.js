function initFilters() {
    if (!searchInput || !filterBtn) return;

    const overlay = document.createElement('div');
    overlay.className = 'filter_overlay';

    const panel = document.createElement('div');
    panel.className = 'filter_panel';
    panel.innerHTML = `
        <div class="filter_header">
            <h3>Filters</h3>
            <button type="button" class="filter_close" aria-label="Close">×</button>
        </div>
        <div class="filter_fields">
            <label>
                <span>Category</span>
                <select id="filter-category"><option value="">All categories</option></select>
            </label>
            <div class="filter_row">
                <label>
                    <span>Min price</span>
                    <input type="number" id="filter-min" placeholder="0" min="0">
                </label>
                <label>
                    <span>Max price</span>
                    <input type="number" id="filter-max" placeholder="1000" min="0">
                </label>
            </div>
            <label>
                <span>Sort by</span>
                <select id="filter-sort">
                    <option value="">Default</option>
                    <option value="asc">Price: low to high</option>
                    <option value="desc">Price: high to low</option>
                </select>
            </label>
        </div>
        <div class="filter_actions">
            <button type="button" class="filter_reset" id="filter-reset">Reset</button>
            <button type="button" class="filter_apply" id="filter-apply">Show results</button>
        </div>
    `;

    document.body.append(overlay, panel);

    categorySelect = panel.querySelector('#filter-category');
    minInput = panel.querySelector('#filter-min');
    maxInput = panel.querySelector('#filter-max');
    sortSelect = panel.querySelector('#filter-sort');

    const closeBtn = panel.querySelector('.filter_close');
    const applyBtn = panel.querySelector('#filter-apply');
    const resetBtn = panel.querySelector('#filter-reset');

    function openPanel() {
        overlay.classList.add('open');
        panel.classList.add('open');
        document.body.classList.add('no_scroll');
    }

    function closePanel() {
        overlay.classList.remove('open');
        panel.classList.remove('open');
        document.body.classList.remove('no_scroll');
    }

    filterBtn.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    applyBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closePanel();
    });

    searchInput.addEventListener('input', applyFilters);
    categorySelect.addEventListener('change', applyFilters);
    minInput.addEventListener('input', applyFilters);
    maxInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = '';
        minInput.value = '';
        maxInput.value = '';
        sortSelect.value = '';
        applyFilters();
    });
}