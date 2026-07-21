# GraceWays

**Open-source animal records for rescue organizations worldwide.**

[Live prototype](https://graceways.dev) · [Build Week demo](https://youtu.be/c-0G_HkuSFE)

GraceWays helps small animal shelters and rescue organizations turn information scattered across messages, notes, spreadsheets, photographs, and devices into structured, portable animal records.

This repository contains the browser-based prototype submitted to OpenAI Build Week 2026 in the **Work & Productivity** category.

## Try it in 60 seconds

1. Open the [live GraceWays prototype](https://graceways.dev).
2. Select **“Beispielakte Sissi ansehen”** to load the complete example record.
3. Optionally add an image, video, or audio file in the **Medien** section.
4. Review the live Markdown preview on the right.
5. Select **“Komplette Tierakte herunterladen”**.
6. Extract the downloaded ZIP file. It contains the Markdown animal record and all added media in organized folders.

No account or test credentials are required. The demo is free to use in a current desktop or mobile browser.

## What the prototype does

- creates a universal, species-independent animal profile
- generates an organization- and country-aware record ID automatically
- creates a safe file name from the animal's name
- records the animal's story, character, health information, status, and internal notes
- accepts images, videos, and audio by drag and drop or file selection
- updates a live Markdown preview while the record is completed
- includes a complete example record for the cat Sissi
- downloads a readable Markdown file
- exports the record and its media in an organized ZIP folder
- prevents equally named media files from overwriting one another in the export
- stores text drafts and ID sequences locally in the browser

The prototype requires no account, backend, database, or proprietary file format. Uploaded media stays in browser memory until the page is closed or the user creates an export. The rescue organization retains control of its files.

## Project timeline and Build Week scope

The GraceWays concept and animal-record data model existed before Build Week. Initial work began on July 8, 2026 and included defining the animal-welfare problem, writing the project vision and manifesto, outlining the broader architecture, and designing the Markdown and YAML-based animal-record structure. There was no working public web application at that point.

During the OpenAI Build Week submission period, July 13–21, 2026, the concept was meaningfully extended into the working browser prototype in this repository with Codex and GPT-5.6. The new Build Week work includes:

- the responsive public website and universal animal-record form
- live Markdown and YAML generation
- the complete Sissi example record
- automatic animal IDs and safe file names
- local browser draft storage and browser-local ID sequencing
- image, video, and audio upload with previews
- individual Markdown download and complete media ZIP export
- duplicate-media filename protection
- security headers and responsive layout
- public deployment at [graceways.dev](https://graceways.dev)
- browser-oriented validation and export tests

Pre-Build-Week work is therefore the concept, domain requirements, written vision, and initial data-model design. The runnable application, interaction design, implementation, testing, and deployment documented here are Build Week work. The repository commit history and the Codex project thread submitted through Devpost provide dated evidence of the implementation period.

## How I collaborated with Codex and GPT-5.6

I created GraceWays as an independent builder with practical knowledge of animal-welfare organizations, not as a professional software developer. I worked iteratively with Codex using GPT-5.6: I described the real workflows, reviewed proposed structures, made the product decisions, tested the application in the browser, and asked Codex to implement and debug each step.

### Where Codex accelerated the work

Codex helped turn a detailed domain concept into a working application within the Build Week window. In particular, it accelerated:

- translating rescue-work requirements into a structured universal form
- generating the Markdown/YAML output from more than 70 fields
- implementing automatic IDs, slugs, and browser-local sequence storage
- connecting drag-and-drop media to previews and export paths
- implementing a dependency-free client-side ZIP export
- diagnosing Content Security Policy, asynchronous clipboard, and duplicate-filename issues
- creating repeatable browser-oriented tests and preparing the static deployment
- refining the English README and separating prior concept work from Build Week implementation

### Product and design decisions I made

- **Rescue organizations remain autonomous.** GraceWays is intended as shared open infrastructure, not a central organization that owns their data or identity.
- **The workflow must be usable by small volunteer teams.** The prototype uses a guided form, plain-language hints, a complete example, and a visible live output.
- **One record should support many later outputs.** The animal record combines identity, story, character, medical information, media, adoption status, and publishing content.
- **Internal and public information must be distinguishable.** Sensitive working notes are clearly marked and are not automatically treated as publication copy.
- **The prototype should demonstrate the whole journey.** A judge can move from example data to a readable Markdown file and a complete media package without creating an account.
- **The visual language should feel calm and humane.** The water, bridge, and connected-heart imagery reflects GraceWays as infrastructure that helps independent organizations work together.

### Engineering decisions I made with Codex support

- **Markdown with YAML frontmatter is the source of truth** because it is human-readable, machine-readable, portable, searchable, and not tied to GraceWays.
- **The Build Week prototype is static and local-first.** HTML, CSS, JavaScript, browser APIs, and Cloudflare Pages make the demo easy to inspect and run without a backend.
- **Draft text stays in local browser storage.** This provides useful recovery without creating accounts or sending animal data to a GraceWays server.
- **Media is exported with the record.** Images are stored under `images/`; video and audio under `media/`; duplicate names receive numeric suffixes.
- **ZIP creation runs entirely in the browser.** The current implementation uses a small dependency-free ZIP writer rather than an external service or JSZip.
- **Prototype boundaries are documented honestly.** Browser-local IDs are not globally unique, large videos consume browser memory, and shared-computer users must clear saved drafts.

### How GPT-5.6 contributed

GPT-5.6 helped reason across product, design, and engineering at the same time. It helped compare architecture options, preserve the animal-welfare intent while reducing complexity, propose testable implementation steps, review generated files, and identify edge cases that were easy to miss manually. Codex then applied those decisions directly to the code and supported iterative testing. I retained final responsibility for the requirements, scope, wording, visual direction, testing decisions, and acceptance of each change.

## Architecture

GraceWays is a static, local-first web application:

| Layer | Implementation | Purpose |
|---|---|---|
| Interface | HTML and responsive CSS | Guided animal-record entry and live preview |
| Application logic | Vanilla JavaScript | Form generation, validation, IDs, slugs, drafts, and exports |
| Record format | Markdown with YAML frontmatter | Portable, readable source of truth |
| Draft storage | Browser `localStorage` | Restores text entries and browser-local ID sequences |
| Media handling | Browser `File`, `Blob`, and object URL APIs | Local previews and downloads without server upload |
| Package export | Dependency-free client-side ZIP writer | Exports Markdown and media together |
| Hosting | Cloudflare Pages | Public static demo and security headers |

All record generation and export processing takes place in the user's browser. The application has no backend, analytics, account system, or server-side animal database.

## Prototype boundaries and privacy

- Sequential IDs are unique only within the same browser and device in this prototype. A production team version needs a shared organization-level ID service.
- Text drafts, including fields marked internal, remain in that browser's local storage until **“Neue Tierakte beginnen”** is selected or site data is cleared. Do not leave a draft on a shared computer.
- Uploaded media is not restored after reloading the page and becomes durable only after downloading the complete ZIP package.
- ZIP generation happens in browser memory. Large video files may exceed the memory available on a phone or older computer, so compressed media is recommended for prototype testing.
- GraceWays is a documentation tool and does not replace veterinary systems, professional privacy review, or a backup strategy.

## Run locally

The simplest option is to open `index.html` directly in a modern browser. For behavior closest to the hosted version, start a local static server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

No dependencies, build command, API key, account, or database are required.

## Test

Manual smoke test:

1. Load the Sissi example and confirm that the ID is `EL-SC-BC-007`.
2. Add two media files with the same original filename.
3. Confirm that both previews appear and the Markdown lists distinct export paths.
4. Copy the Markdown preview.
5. Download and extract the complete ZIP package.
6. Confirm that it contains one Markdown record plus every selected media file without overwritten names.
7. Repeat the key flow in desktop Chrome and mobile Safari.

The repository also contains `test-browser.mjs`, a lightweight browser-oriented smoke test for form creation, example loading, automatic ID generation, clipboard copying, media-path uniqueness, and ZIP generation. Its test-only dependency can be installed and the test run with:

```bash
npm install
npm test
```

The production website itself has no npm or runtime dependencies.

## Repository structure

```text
.
├── index.html                         # public application
├── styles.css                        # responsive visual design
├── app.js                            # form, records, media, drafts, and exports
├── _headers                          # Cloudflare security headers
├── assets/                           # visual assets
├── GraceWays-Universalmaske.html     # optional self-contained offline file
├── build-standalone.mjs              # regenerates the offline file
├── test-browser.mjs                  # browser-oriented smoke test
├── package.json                      # test/build helper commands only
├── README.md
└── LICENSE
```

## What is next

The next stage is a modular open-source platform with organization workspaces, team roles, multilingual publishing, shared global ID management, adoption and sponsorship workflows, and customizable websites for independent rescue organizations. SunCats can become the first pilot organization, while each participating organization retains its own identity, domain, and data.

## License

GraceWays is released under the [MIT License](LICENSE).
