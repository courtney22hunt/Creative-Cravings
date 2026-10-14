# Creative Cravings

New Jersey vending-services website with responsive Home and About pages, animated vending carousel, transparent machine images, and reduced-motion support.

## Website files

- `dist/index.html`: Home page
- `dist/about.html`: About Us page
- `dist/style.css`: shared styling
- `dist/app.js` and `dist/about.js`: interactions
- `dist/assets/`: images

## Local preview

Run `python3 -m http.server 8080 --directory dist` and open http://localhost:8080.

## Vercel

Import this repository, select Other as the framework, leave install and build commands empty, and use `dist` as the output directory. No environment variables are required. The included `vercel.json` configures the static output.

## Form

The consultation form reviews entries and downloads a draft; it does not send inquiries. Connect a submission service before accepting requests.

Images include generated illustrations of vending installations and service scenarios.
