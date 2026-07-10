LwLAT Events Product Starter

Upload the whole folder or zip to Netlify.

Core structure:
- app/      shared platform code
- events/   event data
- media/    logos and event images
- data/     platform and event indexes
- netlify/  future functions and integrations

To add a new event:
1. Duplicate events/eduhub-2027
2. Edit event.json
3. Add hero.jpg and card.jpg to media/events/<event-id>
4. Add the event to data/events.json

Pages:
- index.html
- event.html?id=eduhub-2027
- check-in.html
- admin.html


WEB EVENT MANAGER
Open /admin/ after connecting the project to GitHub and enabling Netlify Identity + Git Gateway.

The manager allows browser-based event editing and media uploads.
See GITHUB-CMS-SETUP.txt for the full setup.


BRANDED BACKDROP
The platform now uses:
media/backgrounds/LwLAT confernce backdrop.png

The image is applied across the homepage, event, admin and check-in views.
A restrained overlay and light sweep preserve readability.


LATEST CHANGES
- Header text forced to white
- LwLAT PNG logo converted to transparent background
- Temporary admin code set to 1234


LATEST UPDATE
- Removed the LwLAT logo from event tiles
- Updated tagline to:
  Winning hearts and inspiring minds to learn without limits


HOMEPAGE TILE REDESIGN
- Large featured event card
- Cleaner image-led cards
- No LwLAT logo inside event tiles
- Simplified event information
- Animated View event arrow
- Mobile responsive layout
