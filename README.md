# Endre Bartha - Portfolio Website

A sleek, modern portfolio website showcasing Salesforce certifications and professional experience.

## 🚀 Live Site

Visit: [endrebartha.com](https://endrebartha.com)

## 🛠️ Tech Stack

- Pure HTML5, CSS3, and JavaScript
- No frameworks or build tools required
- Hosted on GitHub Pages

## 📦 Deployment to GitHub Pages

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EnoUsa/endrebarthacom.git
   cd endrebarthacom
   ```

2. **Push your files:**
   ```bash
   git add .
   git commit -m "Initial portfolio website"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Configure Custom Domain:**
   - The `CNAME` file is already set to `endrebartha.com`
   - In your domain registrar (e.g., Namecheap, GoDaddy), add these DNS records:
     - **A Records** (point to GitHub Pages IPs):
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - **CNAME Record** (for www subdomain):
       - Host: `www`
       - Points to: `enousa.github.io`

5. **Enable HTTPS:**
   - In repository Settings → Pages
   - Check "Enforce HTTPS" (may take a few minutes to become available)

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript interactions
├── CNAME               # Custom domain configuration
├── Endre_Bartha_Resume.pdf  # Resume PDF
├── Certs/              # Certification images
│   ├── Cert*.jpg       # Individual certification files
│   └── ...
└── README.md           # This file
```

## ✏️ Customization

### Updating Content

- **About Section:** Edit the `#about` section in `index.html`
- **Experience:** Modify the `.experience-card` elements in `index.html`
- **Certifications:** Add or remove `.cert-card` elements
- **Contact Info:** Update links in the `#contact` section

### Styling

The design uses CSS custom properties for easy customization:

```css
:root {
    --color-bg: #000000;
    --color-text: #fafafa;
    --color-accent: #ffffff;
    /* ... see styles.css for all variables */
}
```

## 📱 Features

- Fully responsive design
- Smooth scroll navigation
- Animated section reveals
- Accessible (keyboard navigation, reduced motion support)
- SEO optimized with meta tags
- Fast loading (no external dependencies except fonts)

## 📄 License

MIT License - Feel free to use this template for your own portfolio.

