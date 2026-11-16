/* BrightFuture V1.2 — aprimoramentos progressivos de UX */
(() => {
    'use strict';

    const $ = (selector) => document.querySelector(selector);
    const storageKey = 'bf_visual_v11_dark';
    const searchSpecs = [
        { input: '#subjectSearch', list: '#subjectList', item: '.col-lg-6', name: 'disciplinas' },
        { input: '#taskSearch', list: '#taskList', item: '.col-md-6', name: 'atividades' },
        { input: '#noticeSearch', list: '#noticeList', item: '.app-card', name: 'comunicados' }
    ];

    // Preferência visual persistente; sem alterar os dados acadêmicos.
    function applyDarkMode() {
        let enabled = false;
        try { enabled = localStorage.getItem(storageKey) === '1'; } catch (_) {}
        document.body.classList.toggle('bf-dark', enabled);
        const toggle = $('#bfDarkMode');
        if (toggle) toggle.checked = enabled;
    }

    document.addEventListener('change', (event) => {
        if (event.target?.id !== 'bfDarkMode') return;
        const enabled = Boolean(event.target.checked);
        document.body.classList.toggle('bf-dark', enabled);
        try { localStorage.setItem(storageKey, enabled ? '1' : '0'); } catch (_) {}
    });

    function normalize(value) {
        return String(value || '').normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
    }

    // Pesquisa inclusiva: tolera acentos, ignora nós auxiliares e informa resultados.
    function filterList(spec) {
        const root = $(spec.list);
        const field = $(spec.input);
        if (!root || !field) return;

        const query = normalize(field.value);
        const items = Array.from(root.querySelectorAll(spec.item))
            .filter((node) => !node.classList.contains('bf-search-empty'));
        let visible = 0;

        items.forEach((node) => {
            const matches = !query || normalize(node.textContent).includes(query);
            node.hidden = !matches;
            node.classList.toggle('d-none', !matches);
            if (matches) visible++;
        });

        let empty = root.querySelector('.bf-search-empty');
        if (!empty) {
            empty = document.createElement('p');
            empty.className = 'bf-search-empty text-secondary py-3';
            empty.setAttribute('role', 'status');
            root.appendChild(empty);
        }
        empty.textContent = visible === 0
            ? `Nenhum resultado encontrado em ${spec.name}.`
            : '';
        empty.hidden = visible !== 0;
    }

    // Delegação funciona mesmo se o app.js recriar campos ou cartões.
    document.addEventListener('input', (event) => {
        const spec = searchSpecs.find((item) => event.target.matches?.(item.input));
        if (spec) filterList(spec);
    });

    // Observa apenas alterações na lista; evita ciclos ao alterar classes dos cartões.
    searchSpecs.forEach((spec) => {
        const root = $(spec.list);
        if (!root || !window.MutationObserver) return;
        const observer = new MutationObserver((records) => {
            const changed = records.some((record) =>
                Array.from(record.addedNodes).some((node) =>
                    node.nodeType === 1 && !node.classList.contains('bf-search-empty')
                ) || Array.from(record.removedNodes).some((node) =>
                    node.nodeType === 1 && !node.classList.contains('bf-search-empty')
                )
            );
            if (changed) filterList(spec);
        });
        observer.observe(root, { childList: true, subtree: false });
    });

    // Datas fictícias: somente atividades futuras entram no aviso de prazo.
    function refreshDeadline() {
        const alertBox = $('#homeDeadlineAlert');
        const message = alertBox?.querySelector('.small');
        if (!message) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const source = typeof tasks !== 'undefined' && Array.isArray(tasks) ? tasks : [];
        const upcoming = source
            .filter((task) => /^\d{4}-\d{2}-\d{2}$/.test(task.date))
            .map((task) => ({
                title: task.title,
                days: Math.round((new Date(`${task.date}T00:00:00`) - today) / 86400000)
            }))
            .filter((task) => task.days >= 0 && task.days <= 7)
            .sort((a, b) => a.days - b.days);

        message.textContent = upcoming.length
            ? `${upcoming[0].title}: ${upcoming[0].days === 0 ? 'prazo hoje' : `faltam ${upcoming[0].days} dia(s)`}. Data demonstrativa.`
            : 'Não há prazos demonstrativos nos próximos 7 dias. Consulte o calendário.';
    }

    // Mantém o foco do teclado visível e permite fechar sobreposições com Escape.
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        const close = document.querySelector('[data-bs-dismiss="modal"], [data-close-modal]');
        if (close && close.offsetParent !== null) close.click();
    });

    function initialize() {
        applyDarkMode();
        searchSpecs.forEach(filterList);
        refreshDeadline();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
})();
