/* ======== Simple Kanban with localStorage ======== */

const STORAGE_KEY = 'dark_kanban_tasks_v1';

let tasks = []; // will hold task objects

const statuses = ['todo', 'inprogress', 'review', 'done'];

function uid() { return 't_' + Date.now() + '_' + Math.floor(Math.random() * 9999) }

/* Load + Save */
function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
        tasks = raw ? JSON.parse(raw) : [];
    } catch (e) { tasks = []; }
}
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }

/* Render */
function render() {
    statuses.forEach(s => {
        const list = document.getElementById('list-' + s);
        list.innerHTML = '';
        const items = tasks.filter(t => t.status === s);
        items.forEach(t => {
            const card = document.createElement('div');
            card.className = 'card';
            card.draggable = true;
            card.dataset.id = t.id;
            card.innerHTML = `
                <h3>${escapeHtml(t.title)}</h3>
                <p>${escapeHtml(t.desc || '')}</p>
                <div class="meta">
                    <span class="chip">${new Date(t.createdAt).toLocaleString()}</span>
                    <div class="actions">
                        <button title="Mark Done" class="icon-btn mark-done"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg></button>
                        <button title="Duplicate" class="icon-btn duplicate"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M744-192H312q-29 0-50.5-21.5T240-264v-576q0-29 21.5-50.5T312-912h312l192 192v456q0 29-21.5 50.5T744-192ZM576-672v-168H312v576h432v-408H576ZM168-48q-29 0-50.5-21.5T96-120v-552h72v552h456v72H168Zm144-792v195-195 576-576Z"/></svg></button>
                        <button title="Delete" class="icon-btn delete"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></button>
                    </div>
                    </div>
            `;
            list.appendChild(card);

            /* Drag events */
            card.addEventListener('dragstart', onDragStart);
            card.addEventListener('dragend', onDragEnd);

            /* Actions */
            card.querySelector('.mark-done').addEventListener('click', e => {
                updateTask(t.id, { status: 'done' }); triggerConfetti();
            });
            card.querySelector('.duplicate').addEventListener('click', e => {
                const copy = { ...t, id: uid(), createdAt: Date.now(), title: t.title + ' (copy)' };
                tasks.push(copy); save(); render();
            });
            card.querySelector('.delete').addEventListener('click', e => {
                if (confirm('Delete this task?')) { tasks = tasks.filter(x => x.id !== t.id); save(); render(); }
            });

            /* In-place edit: double-click title */
            const titleEl = card.querySelector('h3');
            titleEl.addEventListener('dblclick', e => {
                const newTitle = prompt('Edit title', t.title);
                if (newTitle != null) { updateTask(t.id, { title: newTitle.trim() }); }
            });

            const descEl = card.querySelector('p');
            descEl.addEventListener('dblclick', e => {
                const newDesc = prompt('Edit title', t.desc);
                if (newDesc != null) { updateTask(t.id, { title: newDesc.trim() }); }
            });

            /* Right-click to quick edit desc */
            card.addEventListener('contextmenu', e => {
                e.preventDefault();
                if (confirm('Delete this task?')) { tasks = tasks.filter(x => x.id !== t.id); save(); render(); }
            });
        });

        // count
        document.getElementById('count-' + s).textContent = items.length;
    });
}

/* Helpers */
function escapeHtml(s) { if (!s) return ''; return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
function findTask(id) { return tasks.find(t => t.id === id) }
function updateTask(id, patch) {
    const t = findTask(id);
    if (!t) return;
    Object.assign(t, patch);
    save();
    render();
}

/* Add */
document.getElementById('addTask').addEventListener('click', () => {
    const title = document.getElementById('newTitle').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    const status = document.getElementById('newStatus').value;
    if (!title) { alert('Please give a title'); return; }
    const task = { id: uid(), title, desc, status, createdAt: Date.now() };
    tasks.push(task);
    save(); render();
    document.getElementById('newTitle').value = ''; document.getElementById('newDesc').value = '';
});

/* Drag and drop handlers */
let draggedId = null;
function onDragStart(e) {
    const el = e.currentTarget;
    draggedId = el.dataset.id;
    el.classList.add('dragging');
    e.dataTransfer.setData('text/plain', draggedId);
    e.dataTransfer.effectAllowed = 'move';
}
function onDragEnd(e) {
    const el = e.currentTarget;
    el.classList.remove('dragging');
    draggedId = null;
}

/* Columns accept drops */
document.querySelectorAll('.column').forEach(col => {
    col.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        col.classList.add('over');
    });
    col.addEventListener('dragleave', e => { col.classList.remove('over') });
    col.addEventListener('drop', e => {
        e.preventDefault();
        col.classList.remove('over');
        const id = e.dataTransfer.getData('text/plain') || draggedId;
        const target = col.dataset.status;
        const t = findTask(id);
        if (!t) return;
        const prevStatus = t.status;
        t.status = target;
        save();
        render();
        if (target === 'done' && prevStatus !== 'done') triggerConfetti();
    });
});

/* Confetti sprinkle from top when DONE */
function triggerConfetti() {
    const root = document.getElementById('confettiRoot');
    const colors = ['#7c5cff', '#60a5fa', '#34d399', '#f97316', '#f472b6', '#ffd166'];
    const total = 30 + Math.floor(Math.random() * 20);
    const width = window.innerWidth;

    for (let i = 0; i < total; i++) {
        const piece = document.createElement('div');
        piece.className = 'piece';
        const size = 6 + Math.floor(Math.random() * 10);
        piece.style.width = size + 'px';
        piece.style.height = (size * 0.6) + 'px';
        piece.style.left = Math.floor(Math.random() * width) + 'px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.opacity = (0.85 + Math.random() * 0.15);
        const dur = 1200 + Math.floor(Math.random() * 1200);
        piece.style.animationDuration = dur + 'ms';
        piece.style.transform = `translateX(${(Math.random() - 0.5) * 80}px) rotate(${Math.random() * 360}deg)`;
        root.appendChild(piece);

        // cleanup after animation
        setTimeout(() => {
            piece.remove();
        }, dur + 200);
    }
}

/* Export / Import / Clear */
document.getElementById('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kanban-tasks.json'; document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
});

document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
});
document.getElementById('importFile').addEventListener('change', function () {
    const f = this.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const imported = JSON.parse(reader.result);
            if (!Array.isArray(imported)) throw new Error('Invalid file');
            // simple merge with new ids if collisions
            imported.forEach(it => {
                it.id = it.id || uid();
                it.createdAt = it.createdAt || Date.now();
            });
            tasks = tasks.concat(imported);
            save(); render();
            alert('Imported ' + imported.length + ' tasks');
        } catch (e) {
            alert('Failed to import: ' + e.message);
        }
    };
    reader.readAsText(f);
});

document.getElementById('clearAll').addEventListener('click', () => {
    if (confirm('Clear all tasks? This cannot be undone.')) {
        tasks = []; save(); render();
    }
});

/* keyboard: quickly add by Enter on title */
document.getElementById('newTitle').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('addTask').click(); }
});

/* init with sample if empty */
load();
if (tasks.length === 0) {
    tasks = [
    ];
    save();
}
render();

/* Accessibility: keyboard support for moving selected card with arrows (bonus) */
let selectedCard = null;
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        if (selectedCard) selectedCard.style.outline = '';
        selectedCard = card;
        card.style.outline = '2px solid rgba(124,92,255,0.2)';
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        if (selectedCard) selectedCard.style.outline = '';
        selectedCard = null;
    }
});
document.addEventListener('keydown', (e) => {
    if (!selectedCard) return;
    const id = selectedCard.dataset.id;
    const t = findTask(id);
    if (!t) return;
    if (e.key === 'ArrowRight') {
        const idx = statuses.indexOf(t.status);
        if (idx < statuses.length - 1) updateTask(id, { status: statuses[idx + 1] });
    } else if (e.key === 'ArrowLeft') {
        const idx = statuses.indexOf(t.status);
        if (idx > 0) updateTask(id, { status: statuses[idx - 1] });
    }
});