
async function loadEvents() {
  const response = await fetch('data/events.json');
  const data = await response.json();

  const events = await Promise.all(
    data.events.map(async item => {
      const eventResponse = await fetch(item.path || item.data);
      return eventResponse.json();
    })
  );

  renderEvents(events);
}

function renderEvents(events) {
  const grid = document.getElementById('event-grid');

  grid.innerHTML = events.map(event => {
    const isEduHub = event.category === 'Professional Learning';
    const logo = isEduHub && event.eventLogo
      ? `<img class="clean-card-logo" src="${escapeHtml(event.eventLogo)}" alt="${escapeHtml(event.title)}">`
      : '';

    return `
      <a class="clean-opportunity-card ${isEduHub ? 'training-card' : ''}" href="event.html?id=${encodeURIComponent(event.id)}">
        <div class="clean-card-media">
          ${logo || `<span class="clean-media-word">${escapeHtml(event.category || 'Event')}</span>`}
          <span class="clean-card-type">${escapeHtml(event.category || 'Event')}</span>
        </div>
        <div class="clean-opportunity-body">
          <h3>${escapeHtml(event.title)}</h3>
          <div class="clean-opportunity-meta">
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
