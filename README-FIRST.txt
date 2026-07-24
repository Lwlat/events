LWLAT EVENTS & PROFESSIONAL LEARNING — CLEAN REBUILD

This package is a complete replacement for the existing GitHub repository.
Do not merge it with earlier versions.

GITHUB
1. Delete all existing files in the repository.
2. Upload the CONTENTS of this ZIP to the root of the repository.
3. Confirm that index.html and netlify.toml are at the top level.
4. Commit directly to the main branch.

NETLIFY
1. Keep the existing site connected to this repository.
2. Trigger a clear-cache production deploy.
3. Enable Identity.
4. Set registration to Invite only.
5. Enable Git Gateway.
6. Invite each administrator by email.
7. Accept the invitation and log in at:
   https://lwlat-events-training.netlify.app/admin/

ADDING TRAINING
1. Open /admin/
2. Choose Training Manager.
3. Open EduHub Training Opportunities.
4. Press Add item.
5. Complete the fields.
6. Save.
7. Publish.

The public catalogue reads from data/trainings.json, so published changes appear automatically after Netlify rebuilds the site.

BOOKING EMAIL NOTIFICATIONS
In Netlify, open Forms and select:
eduhub-training-booking

Create submission notifications for:
kmadia@lwlat.org.uk
communications@lwlat.org.uk

IMPORTANT
There is deliberately no admin.html file and no /admin/* wildcard redirect.
Those were the sources of the earlier conflicts.

VERSION 1.1
The homepage now has two clear primary tiles: EduHub 27 and Professional Learning. Images use fixed aspect areas with contain/cover rules to prevent stretching or cropping of logos.


VERSION 1.2 — IDENTITY-READY REDEPLOYMENT

This package includes:
- Separate EduHub 27 and Professional Learning homepage tiles
- Standardised image sizing
- Netlify Identity widget on public pages and the admin page
- Invitation and password-recovery link handling
- Minimal redirects that do not interfere with /.netlify/identity
- Explicit YAML and no-cache headers for the CMS configuration

REDEPLOY:
1. Delete the existing repository files.
2. Upload the CONTENTS of this ZIP, not the enclosing folder.
3. Commit the files to the main branch.
4. In Netlify, use Deploys > Trigger deploy > Clear cache and deploy site.
5. Wait until the deployment says Published.
6. Visit https://lwlat-events-training.netlify.app/admin/
