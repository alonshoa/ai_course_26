# AI & CS High-School Course Theme

A standalone GitHub Pages theme for an Artificial Intelligence & Computer Science course. The site is designed to be accessible (color-blind-safe), responsive, and easy to extend with lessons, slides, assignments, notebooks, and projects.

## Features
- Custom header and footer with responsive navigation
- Light/dark mode with automatic detection and manual toggle (persists via `localStorage`)
- Color-blind-safe palette with WCAG-friendly contrast
- Modular content structure for lessons, slides, assignments, notebooks, and projects
- Lesson template layout to keep weekly materials consistent

## Repository Structure
```
assets/
  css/style.css      # Theme styles
  js/theme-toggle.js # Theme + navigation interactions
  images/            # Place logos/screenshots here
content/
  lessons/           # Lesson pages (use the template to start)
  slides/            # Slide links or embeds
  assignments/       # Homework and practice tasks
  notebooks/         # Colab or Jupyter links
  projects/          # Final project guidelines and updates
_layouts/            # Layouts for pages (default + lesson)
_includes/           # Reusable header and footer
index.md             # Home page (syllabus, structure, quick links)
```

## Adding New Content
1. **Lessons:** Copy `content/lessons/lesson-template.md`, rename it, and edit the front matter fields (title, description, duration, objectives, agenda, practice, resources, homework).
2. **Slides / Assignments / Notebooks:** Add a markdown file under the relevant folder with `layout: default` and link it from `index.md` or the navigation.
3. **Projects:** Update `content/projects/index.md` with new checkpoints, rubrics, and resources.
4. **Branding:** Replace the emoji logo in `_includes/header.html` and add an image to `assets/images/` if desired.

## Running Locally with GitHub Pages / Jekyll
1. Install Ruby and Bundler if needed.
2. Add `gem "github-pages"` to a `Gemfile` (if not already present).
3. From the project root, run:
   ```bash
   bundle install
   bundle exec jekyll serve --livereload
   ```
4. Open `http://localhost:4000` to preview the site. Changes to markdown, layouts, CSS, and JS will hot reload.

## Theme Customization
- Update colors in `assets/css/style.css` to adjust the palette while keeping contrast in mind.
- Edit navigation links in `_includes/header.html` to reflect new sections.
- Extend layouts or create new ones in `_layouts/` for specialized content types.

## Versioning
Content is updated continuously during the school year. Encourage students to refresh the site regularly and check Git history for recent changes.
