
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

function renderFeaturedEvent(event) {
  const target = document.getElementById('featured-event-card');
  if (!target || !event) return;

  target.innerHTML = `
    <a class="featured-event-card glass" href="event.html?id=${encodeURIComponent(event.id)}"
       style="background-image:
       linear-gradient(180deg, rgba(4,17,22,.08) 0%, rgba(4,17,22,.22) 34%, rgba(4,17,22,.88) 100%),
       url('${escapeHtml(event.cardImage || event.heroImage || '')}');
       background-size: cover;
       background-position: center;">
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
       style="background-image:
       linear-gradient(180deg, rgba(4,17,22,.10) 0%, rgba(4,17,22,.30) 45%, rgba(4,17,22,.86) 100%),
       url('${escapeHtml(event.cardImage || event.heroImage || '')}');
       background-size: cover;
       background-position: center;">
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
