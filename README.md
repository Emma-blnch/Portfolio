# 🌐 Portfolio — Emma Blanchard

Personal portfolio website showcasing my work as a **front-end developer**, my skills, and selected projects.  
Designed and built to be **fast, accessible, responsive**, and easy to maintain.

👉 Live website: **https://emma-blnch.fr**

---

## 🚀 Project goals

- Present my profile as a **freelance front-end developer**
- Showcase selected **professional and personal projects**
- Provide a **clear and simple way to get in touch**
- Build a site that reflects my values:
  - performance
  - accessibility
  - clean UI
  - attention to details

---

## ✨ Features

✅ Fully responsive (mobile → desktop)  
✅ Clean UI with subtle animated background shapes  
✅ Light / Dark mode toggle  
✅ Bilingual navigation (FR / EN via separate pages)  
✅ Accessible HTML structure (semantic tags, focus, contrast)  
✅ SEO-ready (meta tags, Open Graph, Twitter Cards, canonical)  
✅ Project previews on hover  
✅ Secure contact form (PHP, rate limiting, honeypot, timestamp validation)  
✅ GDPR-compliant pages (Privacy Policy & Terms)  

---

## 🧠 What I focused on

- **UX & visual identity**  
  Subtle animations, soft background effects, readable typography, and a friendly tone.

- **Performance & simplicity**  
  No heavy frameworks — plain HTML, Tailwind CSS, and vanilla JavaScript.

- **Accessibility**  
  Semantic markup, keyboard navigation, readable contrasts, reduced-motion support.

- **Maintainability**  
  Clear structure, reusable components, and static pages easy to extend.

---

## 🛠 Tech stack

- **HTML5**
- **Tailwind CSS**
- **JavaScript (Vanilla)**
- **PHP** (contact form)
- **SVG** (background shapes & UI elements)

---

## 📁 Project structure
├── index.html # French homepage  
├── en/  
│ └── index.html # English version  
├── pages/  
│ ├── cgv.html # Terms & Conditions  
│ └── rgpd.html # Privacy policy (GDPR)  
├── assets/  
│ ├── img/  
│ │ ├── logo/  
│ │ ├── projects/  
│ │ └── preview.png  
│ ├── effects/  
│ │ └── noise-effect.png  
│ ├── font/  
│ └── favicon/  
├── dist/   
│ └── style.css # Compiled Tailwind CSS  
├── script.js # Interactions & animations  
├── contact.php # Secure contact form handler  
└── README.md  


---

## 🔐 Contact form security

The contact form includes:
- POST-only requests
- Timestamp validation (anti-bot)
- Honeypot field
- Rate limiting per IP
- Email header injection protection

No data is stored in a database.

---

## 📈 SEO & Social

- Open Graph metadata (`og:image`, `og:title`, `og:description`)
- Twitter Card (`summary_large_image`)
- Canonical URL
- `hreflang` for FR / EN
- Structured data (JSON-LD)

---

## 📄 Legal

- GDPR-compliant privacy policy
- Terms & Conditions (micro-entrepreneur — France)
- Hosted in France (LWS)

---

## 👩‍💻 Author

**Emma Blanchard**  
Front-end developer — freelance  

- 🌍 https://emma-blnch.fr  
- 💼 https://www.linkedin.com/in/emmablnch/  
- 🧑‍💻 https://github.com/Emma-blnch  

---

✨ Feel free to explore the code, fork it, or reach out for collaboration.
