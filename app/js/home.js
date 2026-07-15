
async function loadEvents() {
  try {
    const indexResponse = await fetch('data/events.json');
    const indexData = await indexResponse.json();

    const events = await Promise.all(
      indexData.events.map(async item => {
        const response = await fetch(item.path || item.data);
        return response.json();
      })
    );

    renderEvents(events);
  } catch (error) {
    document.getElementById('event-grid').innerHTML = `
      <article class="opportunity-card glass">
        <div class="opportunity-copy">
          <p class="eyebrow">Unavailable</p>
          <h3>Opportunities could not be loaded.</h3>
        </div>
      </article>
    `;
  }
}

function renderEvents(events) {
  const grid = document.getElementById('event-grid');

  grid.innerHTML = events.map(event => {
    const category = event.category || 'Event';
    const logo = event.eventLogo && category === 'Professional Learning'
      ? `<img class="opportunity-logo" src="${escapeHtml(event.eventLogo)}" alt="${escapeHtml(event.title)}">`
      : '';

    return `
      <a class="opportunity-card glass" href="event.html?id=${encodeURIComponent(event.id)}">
        <div class="opportunity-top">
          <span class="opportunity-type">${escapeHtml(category)}</span>
          <span class="status ${escapeHtml(event.statusClass || '')}">${escapeHtml(event.status || '')}</span>
        </div>
        ${logo}
        <div class="opportunity-copy">
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(event.subtitle || '')}</p>
          <div class="opportunity-meta">
            <span>${escapeHtml(event.date || '')}</span>
            <span>${escapeHtml(event.venue || '')}</span>
          </div>
          <strong>Find out more →</strong>
        </div>
      </a>
    `;
  }).join('');
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));
}

loadEvents();
