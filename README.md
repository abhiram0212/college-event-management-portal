# College Event Management Portal

## Project Description

The College Event Management Portal is a responsive front-end website built for a college environment. It helps students explore upcoming events, view details, filter by category, register for events, and review the event schedule in a clean and professional interface. The project demonstrates core FSD concepts such as semantic HTML, CSS layout, JavaScript interactivity, JSON-driven content, and form validation.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- Static web hosting compatible structure

## Project Structure

```text
college-event-management-portal/
├── index.html
├── styles.css
├── script.js
├── events.json
├── README.md
├── assets/
│   ├── gallery-workshop.svg
│   ├── gallery-culture.svg
│   ├── gallery-sports.svg
│   └── gallery-seminar.svg
└── .gitignore
```

## How to Run Locally

From the project folder, start a simple static web server:

```bash
python -m http.server 8000
```

Then open the site in a browser using the generated local address, commonly:

```text
http://localhost:8000
```

The site can also be served using any static hosting provider or a simple local HTTP server.

## How to Deploy

1. Upload all project files to a static hosting service such as GitHub Pages, Netlify, Vercel, or any static web host.
2. Ensure the project root contains the HTML, CSS, JavaScript, JSON, and assets folder.
3. Keep all links relative so the site works correctly when served over HTTPS.
4. Publish the project and confirm that the event JSON loads and all navigation links work.

## Public URL Placeholder

```text
https://your-github-username.github.io/college-event-management-portal/
```

## GitHub Ready

This project is designed for simple static hosting and GitHub-based deployment. It uses relative file references only and does not rely on any private credentials, local machine paths, or backend services.
