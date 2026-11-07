SELIPAR RUMBLE v1.0 - installable web app

PUT IT ONLINE (free, about 2 minutes)
1. Go to https://app.netlify.com/drop and drag this whole folder onto the page.
   (GitHub Pages or any normal web host works too. It must be served over https.)
2. Open the link it gives you on your phone.
3. On the intro screen, tap INSTALL APP.
   - Android / Chrome: the install prompt appears straight away.
   - iPhone / iPad: follow the steps shown (Share, then Add to Home Screen).

SHIPPING AN UPDATE
1. In index.html change  const APP_VERSION='1.0';  to the new number (e.g. '1.1').
2. In sw.js change  const VERSION='1.0';  to the same number.
3. In version.json change "version" to the same number (the Android app reads this).
4. Upload the folder again to the same site.
Players get it automatically: the game checks for a new version when it opens,
when they switch back to it, and every 20 minutes. If they're on the menu it
updates right away; if they're mid-match it waits until the match ends.

FILES
index.html             the game
manifest.webmanifest   app name, icons, full-screen setting
sw.js                  offline copy + automatic updates
version.json           tells the Android app which game version is newest
icon-*.png             home-screen icons
