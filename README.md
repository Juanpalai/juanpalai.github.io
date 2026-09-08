# Juan Pablo Lagos, Robotics Simulation Engineer

Live at https://juanpalai.github.io/

Portfolio site for Juan Pablo Lagos, a robotics software engineer specialized in simulation. The site presents my experience building autonomous-driving and delivery simulators in Unity and Unreal, ROS 2 / Autoware work, side projects in data science and software, and my background in game development.

## Design

Built from scratch with a "mission console" visual identity: a technical grid background, an animated hero that draws an autonomous navigation path over an occupancy map, and a dark palette with teal and amber accents. No template, no trackers.

## Features

- **Single page, no dependencies**: semantic HTML, one hand-written stylesheet (`css/site.css`), and one vanilla JavaScript file (`js/site.js`). No Bootstrap, jQuery, or build step.
- **Sections**: Experience timeline, Projects, Skills, Education, About, and Contact, with a fixed top navigation that highlights the active section.
- **Accessibility**: skip link, visible keyboard focus, `prefers-reduced-motion` support (the hero renders statically), and AA contrast.
- **Responsive**: works from mobile to desktop, with an accessible hamburger menu on small screens.
- **SEO**: meta description, Open Graph and Twitter cards, JSON-LD structured data, canonical URL, sitemap, and robots.txt.

## Project structure

```text
index.html        Page markup (content + inline SVG)
css/site.css      All styles (design tokens, layout, responsive)
js/site.js        Vanilla JS: nav state, mobile menu, hero animation
images/           Project images, skill logos, favicon
```

## Setup

This is a static site. To run it locally:

1. Clone the repository: `git clone https://github.com/Juanpalai/juanpalai.github.io.git`
2. Serve it from the project folder, for example:

   ```bash
   python3 -m http.server 8000
   ```

3. Open http://localhost:8000/ in a browser.

## Deploy

Push to the `main` branch and GitHub Pages publishes the site automatically.

## Contact

- LinkedIn: [Juan Pablo Lagos Idrobo](https://www.linkedin.com/in/juanpalai/)
- GitHub: [Juanpalai](https://github.com/Juanpalai/)
- Email: [juan.pablo.lagosi@gmail.com](mailto:juan.pablo.lagosi@gmail.com)
- Website: https://juanpalai.github.io/
