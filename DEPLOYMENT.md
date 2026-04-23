# Deployment Guide - World Cup Pool App

## Quick Deploy to Netlify (Recommended)

### Method 1: Drag & Drop (Easiest)

1. Build the app:
   ```bash
   npm run build
   ```

2. Go to https://app.netlify.com/drop

3. Drag the `dist/` folder into the upload area

4. Done! Your site is live at a URL like: `https://random-name-12345.netlify.app`

5. (Optional) Click "Site settings" to change the URL to something like `worldcup-pool-2026.netlify.app`

### Method 2: Netlify CLI (For Updates)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. Follow the prompts to login and authorize

## Updating Your Deployed Site

Whenever you make changes (add players, update matches, etc.):

1. Build the app:
   ```bash
   npm run build
   ```

2. Re-deploy:
   - **Drag & Drop**: Just drag the new `dist/` folder to Netlify again
   - **CLI**: Run `netlify deploy --prod --dir=dist`

## Important Notes

### LocalStorage Warning
- Each user's data (predictions, locks, results) is stored locally in their browser
- If a user clears their browser data, their predictions are lost
- Admin settings (locks, results) are also local to the admin's browser
- For production use with multiple devices, consider migrating to a backend

### Admin Password
- Default password is set in `src/utils/auth.js`
- Change it before deploying!
- The password is visible in the source code (it's client-side only)

### Sharing with Friends
Once deployed, share the URL with your friends:
- They can access the site and make predictions
- Only you (with the admin password) can manage results and locks
- Each person needs to use the same device/browser to see their predictions (due to LocalStorage)

## Alternative Hosting Options

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
1. Add to package.json:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/worldcup-pool",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Custom Domain (Optional)

All these services support custom domains for free:
1. Buy a domain (e.g., from Namecheap, Google Domains)
2. Point it to your Netlify/Vercel site
3. SSL certificate is automatically provided

## Need Help?

- Netlify docs: https://docs.netlify.com
- Vercel docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com
