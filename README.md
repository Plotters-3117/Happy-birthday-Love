# A Little World Just For You ♡

A lightweight, single-page birthday website built with plain HTML, CSS and vanilla JavaScript.

## Run locally
Open `index.html` in a browser. No build step, package manager or backend is required.

## Deploy to Netlify
1. Keep `index.html`, `style.css`, `script.js` and the `assets` folder together.
2. Drag the project folder into Netlify Drop, or connect the folder's GitHub repository.
3. Leave the build command empty. Set the publish directory to `.` if Netlify asks.

## Personalise the website
Open `script.js` and edit the `SITE_CONTENT` object near the top:
- `birthdayParagraphs`: main birthday letter
- `letterParagraphs`: Letter 1
- `prayerParagraphs`: prayer
- `photos`: gallery captions and image paths

Add your photos to `assets/photos/`, then update the matching paths in `SITE_CONTENT.photos`.
The project includes no actual personal photos yet; the photo cards are placeholders until you add yours.

## Change the background later
Open `style.css` and find `--page-background` inside `:root`.
It currently uses a burgundy gradient. Replace its value with:
`url("assets/photos/your-background.jpg") center / cover fixed`
You can also add a translucent gradient layer over the image.

## Notes
- The site uses Google Fonts when an internet connection is available and falls back to system fonts otherwise.
- Animations use CSS and Intersection Observer.
- No third-party JavaScript libraries are used.
