
async function loadEvents() {
  const indexResponse = await fetch('data/events.json');
  const indexData = await indexResponse.json();

  const events = await Promise.all(
    indexData.events.map(async item => {
      const response = await fetch(item.path || item.data);
      return response.json();
    })
  );

  const featured = events.find(event => event.featured) || events[0];
  const remaining = events.filter(event => event.id !== featured.id);

  renderFeaturedEvent(featured);
  renderMoreEvents(remaining);
}

function cardBackground(event, featured = false) {
  const overlay = featured
    ? 'linear-gradient(135deg, rgba(0,145,137,.92), rgba(111,39,137,.82))'
    : 'linear-gradient(135deg, rgba(0,145,137,.86), rgba(27,59,73,.92))';

  if (!event.cardImage) return overlay;

  return `${overlay}, url('${escapeHtml(event.cardImage)}')`;
}

function renderFeaturedEvent(event) {
  const target = document.getElementById('featured-event-card');
  if (!target || !event) return;

  target.innerHTML = `
    <a class="featured-event-card glass" href="event.html?id=${encodeURIComponent(event.id)}"
       style="background-image:${cardBackground(event, true)};background-size:cover;background-position:center;">
      <div class="featured-card-top">
        <span class="status ${escapeHtml(event.statusClass || '')}">${escapeHtml(event.status || '')}</span>
        <span class="featured-date">${escapeHtml(event.date || '')}</span>
      </div>

      <div class="featured-card-copy">
        <p class="event-kicker">Featured event</p>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.subtitle || '')}</p>
        <span class="event-link">View event <span aria-hidden="true">→</span></span>
      </div>
    </a>
  `;
}

function renderMoreEvents(events) {
  const grid = document.getElementById('event-grid');
  if (!grid) return;

  if (!events.length) {
    grid.innerHTML = `
      <article class="event-card glass placeholder-card">
        <div class="card-body">
          <p class="event-kicker">More events</p>
          <h3>Coming soon</h3>
          <p>Further LwLAT events will appear here.</p>
        </div>
      </article>
    `;
    return;
  }

  grid.innerHTML = events.map(event => `
    <a class="event-card glass" href="event.html?id=${encodeURIComponent(event.id)}"
       style="background-image:${cardBackground(event)};background-size:cover;background-position:center;">
      <div class="card-topline">
        <span class="status ${escapeHtml(event.statusClass || '')}">${escapeHtml(event.status || '')}</span>
      </div>

      <div class="card-body">
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.date || '')}</p>
        <span class="event-link">View event <span aria-hidden="true">→</span></span>
      </div>
    </a>
  `).join('');
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
