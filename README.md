# GraceWays

**Open-source animal records for rescue organizations worldwide.**

[Live prototype](https://graceways.dev) · [Build Week demo](https://youtu.be/c-0G_HkuSFE)

GraceWays helps small animal shelters and rescue organizations turn information scattered across messages, notes, spreadsheets, photographs and devices into structured, portable animal records.

This repository contains the browser-based prototype created for OpenAI Build Week 2026.

## What the prototype does

- creates a universal, species-independent animal profile
- generates an organization- and country-aware record ID automatically
- creates a safe file name from the animal's name
- records the animal's story, character, health information, status and internal notes
- accepts images, videos and audio by drag and drop
- updates a live Markdown preview while the record is completed
- includes a complete example record for the cat Sissi
- downloads a readable Markdown file
- exports the record and its media in an organized ZIP folder
- stores drafts and ID sequences locally in the browser

No account, database or proprietary file format is required for this prototype. Uploaded media remains in the browser until the user creates an export. The organization retains control of its data.

## Architecture

The prototype is a static web application built with:

- HTML
- CSS
- JavaScript
- Markdown with YAML frontmatter as the portable source of truth
- JSZip for complete local exports
- Cloudflare Pages for deployment

The application has no backend and no build step. All record generation and export processing takes place locally in the browser.

## Run locally

You can open `index.html` directly in a modern browser. For a local web server, run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

The project can be deployed as a static site. For Cloudflare Pages Direct Upload, upload the extracted project folder. No build command is required.

## Build Week

GraceWays was designed and developed with Codex and GPT-5.6. Codex helped translate requirements from real animal-welfare work into the data model and working application, including automatic IDs, safe file names, media handling, live previews and Markdown and ZIP exports. The project owner supplied the domain knowledge, reviewed the decisions and tested the generated records and downloads.

SunCats can become the first pilot organization. The longer-term goal is a modular open-source platform with organization workspaces, team roles, multilingual publishing, adoption and sponsorship workflows, and customizable websites for independent rescue organizations.

## License

This project is released under the MIT License. See `LICENSE`.
