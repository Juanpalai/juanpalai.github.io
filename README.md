# Juan Pablo Lagos, Robotics Simulation Engineer

Live at https://juanpalai.github.io/

Portfolio site for Juan Pablo Lagos, a robotics software engineer specialized in simulation. The site presents my experience building autonomous-driving and delivery simulators in Unity and Unreal, ROS 2 / Autoware work, selected simulation and robotics projects, and my background in game development.

## Design

Built from scratch with a "mission console" visual identity: a technical grid background, an animated hero that draws an autonomous navigation path over an occupancy map, and a dark palette with teal and amber accents. Selected projects are presented as case studies with inline SVG data-flow diagrams. No template, no trackers.

## Features

- **Single page, no dependencies**: semantic HTML, one hand-written stylesheet (`css/site.css`), and one vanilla JavaScript file (`js/site.js`). No Bootstrap, jQuery, or build step.
- **Sections**: Experience timeline, Projects (Selected work case studies plus a compact list of earlier projects), Skills (led by Robotics & autonomy), Education, About, and Contact, with a fixed top navigation that highlights the active section.
- **Self-hosted fonts**: Inter and Space Grotesk served as local variable woff2 files with `font-display: swap`; no third-party font requests.
- **Optimized images**: project thumbnails and the about photo ship as right-sized WebP with 1x/2x `srcset` and explicit dimensions.
- **Resume**: hosted at `files/resume.pdf` and linked from the topbar, hero, and About.
- **Accessibility**: skip link, visible keyboard focus, `prefers-reduced-motion` support (the hero renders statically), AA contrast, and `font-size-adjust` for stable font fallbacks.
- **Responsive**: works from mobile to desktop, with an accessible hamburger menu on small screens.
- **SEO**: meta description, Open Graph and Twitter cards (with image dimensions and alt text), JSON-LD structured data, canonical URL, sitemap, and robots.txt.

## Brand assets

`images/skills/ros-mark.svg` follows the official ROS nine-dot mark (Open Robotics brand guidance: ROS 2 is the ROS mark plus the version in the label, so both chips share it). `images/skills/autoware-mark.svg` is extracted from the Autoware Foundation's official repository assets, and `images/skills/nav2-logo.png` comes from the `ros-navigation/navigation2` repository.

## Project structure

```text
index.html        Page markup (content + inline SVG)
css/site.css      All styles (design tokens, layout, responsive)
js/site.js        Vanilla JS: nav state, mobile menu, hero animation
fonts/            Self-hosted Inter and Space Grotesk (variable woff2)
images/           WebP images, skill marks, favicon
files/            Hosted resume PDF
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
