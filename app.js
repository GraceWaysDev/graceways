const languages = [
  ["DE", "Deutsch"], ["EN", "English"], ["EL", "Ελληνικά"],
  ["RO", "Română"], ["RU", "Русский"], ["ES", "Español"], ["FR", "Français"]
];

const field = (id, label, type = "text", options = {}) => ({ id, label, type, ...options });

const sections = [
  { id: "organization", icon: "🏠", title: "Organisation & Aktenidentität", open: true, fields: [
    field("organization_id", "Organisations-ID", "text", {required:true, hint:"Zum Beispiel SC für SunCats."}),
    field("organization_name", "Name der Organisation", "text", {required:true}),
    field("country_code", "Ländercode", "text", {required:true, hint:"ISO-Code, zum Beispiel EL, DE oder RO."}),
    field("country_name", "Land"),
    field("profile_number", "Laufende Aktennummer", "number", {required:true, readonly:true, hint:"Wird auf diesem Gerät automatisch fortlaufend vergeben und dreistellig formatiert."}),
    field("id", "Automatisch erzeugte Tierakten-ID", "text", {required:true, readonly:true, hint:"Entsteht automatisch aus Land, Verein, Kollektion und laufender Nummer."}),
    field("interface_language", "Sprache der Eingabemaske", "select", {options: languages}),
    field("content_language", "Sprache der Originalangaben", "select", {options: languages, hint:"Die Sprache, in der Geschichte, Beobachtungen und weitere Originaltexte eingetragen werden. Der ursprüngliche Wortlaut bleibt erhalten."}),
    field("output_languages", "Gewünschte Ausgabesprachen", "checks", {options: languages, wide:true, hint:"Wähle alle Sprachen, in denen später Vermittlungs-, Website- oder Social-Media-Texte ausgegeben werden sollen. Mehrere Sprachen sind möglich."})
  ]},
  { id: "basic", icon: "🐾", title: "Grundinformationen", open: true, fields: [
    field("name", "Name des Tieres", "text", {required:true, hint:"Der Rufname des Tieres. Ist noch kein Name bekannt, kann vorläufig „Unbekannt“ eingetragen werden."}),
    field("species", "Tierart", "select", {required:true, options:[["cat","Katze"],["dog","Hund"],["horse","Pferd"],["bird","Vogel"],["wildlife","Wildtier"],["other","Andere"]]}),
    field("slug", "Automatischer Dateiname / Slug", "text", {readonly:true, hint:"Wird automatisch aus dem Namen erzeugt, zum Beispiel „Mia Sophie“ → „mia-sophie“. Er dient als eindeutiger, webfreundlicher Datei- und Ordnername."}),
    field("status", "Aktueller Status", "select", {required:true, options:[["aufgenommen","Aufgenommen"],["in_behandlung","In Behandlung"],["pflegestelle","Auf Pflegestelle"],["sucht_zuhause","Sucht ein Zuhause"],["reserviert","Reserviert"],["vermittelt","Vermittelt"],["verstorben","Verstorben"]]}),
    field("gender", "Geschlecht", "select", {options:[["female","Weiblich"],["male","Männlich"],["unknown","Unbekannt"]]}),
    field("age", "Alter / Geburtsdatum", "text", {hint:"So genau wie bekannt, zum Beispiel „3 Jahre“, „ca. 10–12 Jahre“ oder „geboren am 14.05.2022“."}),
    field("breed", "Rasse / Mischung", "text", {hint:"Zum Beispiel „Europäisch Kurzhaar“, „Labrador-Mix“, „Mischling“ oder „unbekannt“."}),
    field("color_marks", "Farbe / besondere Kennzeichen", "text", {hint:"Fellfarbe und unverwechselbare Merkmale, zum Beispiel „schwarz-weiß, weiße Vorderpfote, Kerbe im rechten Ohr“ oder „Narbe auf der Nase“."}),
    field("location", "Aktueller Aufenthaltsort", "text", {required:true}),
    field("special_features", "Besondere Merkmale", "textarea", {wide:true, hint:"Ein Merkmal pro Zeile."})
  ]},
  { id: "story", icon: "❤️", title: "Geschichte & Heart Note", fields: [
    field("original_story", "Original Story", "textarea", {required:true, wide:true, hint:"Der ursprüngliche Text der rettenden Person oder Organisation bleibt unverändert."}),
    field("heart_note", "Heart Note", "textarea", {wide:true, hint:"3–5 einfühlsame Sätze. Kann später mit KI vorgeschlagen und vom Verein bestätigt werden."}),
    field("slogans", "Slogans", "textarea", {wide:true, hint:"Ein Slogan pro Zeile."})
  ]},
  { id: "timeline", icon: "🗓️", title: "Zeitverlauf", fields: [
    field("first_sighting", "Erste Sichtung"), field("first_contact", "Erster Kontakt"),
    field("rescue_intake", "Rettung / Aufnahme"), field("veterinary_visit", "Tierarztbesuch"),
    field("current_situation", "Aktuelle Situation", "textarea", {wide:true}),
    field("timeline_more", "Weitere Ereignisse", "textarea", {wide:true, hint:"Je Zeile: Datum | Ereignis | Notiz"})
  ]},
  { id: "character", icon: "✨", title: "Charakter", fields: [
    field("personality", "Persönlichkeit", "textarea", {wide:true}),
    field("with_people", "Mit Menschen"), field("with_children", "Mit Kindern"),
    field("with_animals", "Mit anderen Tieren"), field("activity_level", "Aktivitätsniveau"),
    field("likes", "Vorlieben", "textarea"), field("fears", "Ängste / Unsicherheiten", "textarea")
  ]},
  { id: "health", icon: "🩺", title: "Gesundheit & Tierarzt", fields: [
    field("neutered", "Kastriert", "select", {options:[["yes","Ja"],["no","Nein"],["unknown","Unbekannt"]]}),
    field("vaccinated", "Geimpft", "select", {options:[["yes","Ja"],["no","Nein"],["partial","Teilweise"],["unknown","Unbekannt"]]}),
    field("microchipped", "Gechippt", "select", {options:[["yes","Ja"],["no","Nein"],["unknown","Unbekannt"]]}),
    field("dewormed", "Entwurmt", "select", {options:[["yes","Ja"],["no","Nein"],["unknown","Unbekannt"]]}),
    field("tested", "Tests – Überblick"), field("health_status", "Aktueller Gesundheitszustand", "textarea"),
    field("special_care", "Besondere Versorgung", "textarea"), field("clinic", "Tierarzt / Klinik"),
    field("clinic_location", "Ort der Klinik"), field("clinic_contact", "Kontakt", "text", {internal:true}),
    field("last_visit", "Letzter Tierarztbesuch"), field("next_appointment", "Nächster Termin"),
    field("conditions", "Wichtige Erkrankungen / Diagnosen", "textarea", {wide:true, hint:"Je Zeile: Diagnose | Zeitraum | Schweregrad | Status | Notizen"}),
    field("treatments", "Behandlungen / Untersuchungen", "textarea", {wide:true, hint:"Je Zeile: Datum | Behandlung | Grund | Ergebnis | Klinik | nächster Schritt"}),
    field("medication", "Medikamente", "textarea", {wide:true, hint:"Je Zeile: Medikament | Dosierung | Beginn | Ende | Grund | Notizen"}),
    field("vaccinations", "Impfungen", "textarea"), field("tests", "Tests (FIV, FeLV, Giardia, weitere)", "textarea"),
    field("procedures", "Operationen / Eingriffe", "textarea"), field("microchip_number", "Mikrochipnummer", "text", {internal:true}),
    field("veterinary_notes", "Besondere tierärztliche Hinweise", "textarea", {wide:true, internal:true})
  ]},
  { id: "adoption", icon: "🏡", title: "Vermittlung & Patenschaft", fields: [
    field("adoption_status", "Vermittlungsstatus"), field("looking_for", "Gesuchtes Zuhause", "textarea"),
    field("not_suitable_for", "Nicht geeignet für", "textarea"), field("special_requirements", "Besondere Voraussetzungen", "textarea"),
    field("available_from", "Vermittelbar ab"), field("adoption_fee_contract", "Schutzgebühr / Vertrag"),
    field("sponsorship_possible", "Patenschaft möglich", "select", {options:[["yes","Ja"],["no","Nein"]]}),
    field("sponsorship_status", "Patenschaftsstatus"), field("monthly_need", "Monatlicher Bedarf"),
    field("support_needed", "Besondere Unterstützung", "textarea", {wide:true})
  ]},
  { id: "media", icon: "📷", title: "Medien", fields: [
    field("image_upload", "Bilder hochladen", "files", {wide:true, kind:"image", accept:"image/*", hint:"Das erste Bild wird als Hauptbild verwendet. Mehrere Bilder sind möglich."}),
    field("main_image", "Hauptbild", "text", {readonly:true, hint:"Wird beim Hochladen automatisch eingetragen."}),
    field("images", "Weitere Bilder", "textarea", {readonly:true, hint:"Bildpfade werden automatisch übernommen."}),
    field("video_upload", "Videos hochladen", "files", {wide:true, kind:"video", accept:"video/*", hint:"Videos per Drag-and-drop oder Dateiauswahl hinzufügen. Große Videos benötigen beim Erstellen des ZIP-Pakets entsprechend viel Arbeitsspeicher; für den Prototyp möglichst komprimierte Dateien verwenden."}),
    field("videos", "Videodateien", "textarea", {readonly:true}),
    field("audio_upload", "Audio und Sprachnotizen hochladen", "files", {wide:true, kind:"audio", accept:"audio/*", hint:"Zum Beispiel Sprachnotizen der Pflegestelle."}),
    field("audio", "Audiodateien", "textarea", {readonly:true})
  ]},
  { id: "publishing", icon: "🌍", title: "Website & Social Media", fields: [
    field("instagram", "Instagram-Texte", "textarea", {wide:true, hint:"Sprachfassungen werden im Export nach den gewählten Ausgabesprachen angelegt."}),
    field("facebook", "Facebook-Texte", "textarea", {wide:true}),
    field("hashtags", "Hashtags", "textarea", {wide:true}),
    field("website", "Website-Texte", "textarea", {wide:true})
  ]},
  { id: "collector", icon: "🏅", title: "Sammlerkarte (optional)", fields: [
    field("collection_id", "Collection-ID"), field("collection_name", "Name der Kollektion"),
    field("character_class", "Charakterklasse"), field("accessory", "Accessoire"),
    field("guiding_phrase", "Leitsatz"), field("rarity", "Seltenheit"),
    field("card_number", "Kartennummer"), field("edition", "Edition")
  ]},
  { id: "internal", icon: "🔒", title: "Interne Notizen & Statusverlauf", fields: [
    field("organization_notes", "Notizen der Organisation", "textarea", {wide:true, internal:true}),
    field("foster_notes", "Notizen der Pflegestelle", "textarea", {wide:true, internal:true}),
    field("important_contacts", "Wichtige Kontakte", "textarea", {wide:true, internal:true}),
    field("status_history", "Statusverlauf", "textarea", {wide:true, internal:true, hint:"Je Zeile: Datum | Status | Notiz"}),
    field("last_updated", "Zuletzt aktualisiert", "date", {internal:true})
  ]}
];

const form = document.querySelector("#animalForm");
const preview = document.querySelector("#markdownPreview");
const stateKey = "graceways-animal-profile-draft-v1";
const sequenceStateKey = "graceways-id-sequences-v1";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

function renderField(f) {
  const classes = ["field", f.wide ? "wide" : "", f.required ? "required" : ""].filter(Boolean).join(" ");
  const internal = f.internal ? '<span class="internal-badge">INTERN</span>' : "";
  const hint = f.hint ? `<small>${escapeHtml(f.hint)}</small>` : "";
  let input;
  if (f.type === "textarea") input = `<textarea id="${f.id}" name="${f.id}" ${f.readonly ? "readonly" : ""}></textarea>`;
  else if (f.type === "select") input = `<select id="${f.id}" name="${f.id}"><option value="">Bitte auswählen</option>${f.options.map(([v,l]) => `<option value="${v}">${l}</option>`).join("")}</select>`;
  else if (f.type === "checks") input = `<div class="check-grid">${f.options.map(([v,l]) => `<label class="check-option"><input type="checkbox" name="${f.id}" value="${v}"><span>${l}</span></label>`).join("")}</div>`;
  else if (f.type === "files") {
    const title = f.kind === "video" ? "Videos hierher ziehen oder anklicken" : f.kind === "audio" ? "Audio hierher ziehen oder anklicken" : "Fotos hierher ziehen oder anklicken";
    const formats = f.kind === "video" ? "MP4, WebM oder MOV" : f.kind === "audio" ? "MP3, M4A, WAV oder OGG" : "JPG, PNG oder WebP";
    input = `<div class="drop-zone" id="${f.id}DropZone"><input id="${f.id}" name="${f.id}" type="file" accept="${f.accept}" multiple><label for="${f.id}"><strong>${title}</strong><span>${formats} · mehrere Dateien möglich</span></label></div><div class="image-previews" id="${f.id}Previews"></div>`;
  }
  else input = `<input id="${f.id}" name="${f.id}" type="${f.type}" ${f.required ? "required" : ""} ${f.readonly ? "readonly" : ""}>`;
  return `<div class="${classes}"><label ${f.type === "checks" ? "" : `for="${f.id}"`}>${f.label}${internal}</label>${input}${hint}</div>`;
}

function renderForm() {
  form.innerHTML = sections.map(s => `<details class="form-section" id="section-${s.id}" ${s.open ? "open" : ""}><summary><span class="section-icon">${s.icon}</span>${s.title}</summary><div class="section-fields">${s.fields.map(renderField).join("")}</div></details>`).join("");
  document.querySelector("#progressNav").innerHTML = sections.map(s => `<button class="progress-link" data-target="section-${s.id}" type="button">${s.title}</button>`).join("");
}

function values() {
  const data = {};
  sections.flatMap(s => s.fields).forEach(f => {
    if (f.type === "files") return;
    if (f.type === "checks") data[f.id] = [...form.querySelectorAll(`[name="${f.id}"]:checked`)].map(el => el.value);
    else data[f.id] = form.elements[f.id]?.value.trim() ?? "";
  });
  return data;
}

const uploadedMedia = { image: [], video: [], audio: [] };
function cleanCode(value, fallback) {
  return (value || fallback).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z0-9]/g, "").slice(0, 5);
}
function generatedId(d) {
  const country = cleanCode(d.country_code, "XX");
  const organization = cleanCode(d.organization_id, "ORG");
  const collection = cleanCode(d.collection_id, "GEN");
  const number = String(Math.max(1, Number.parseInt(d.profile_number, 10) || 1)).padStart(3, "0");
  return `${country}-${organization}-${collection}-${number}`;
}

function slugFromName(name) {
  return String(name || "")
    .trim()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/(^-|-$)/g, "");
}

function idNamespace(d) {
  return [cleanCode(d.country_code, "XX"), cleanCode(d.organization_id, "ORG"), cleanCode(d.collection_id, "GEN")].join("-");
}

function sequences() {
  try { return JSON.parse(localStorage.getItem(sequenceStateKey)) || {}; } catch { return {}; }
}

function nextProfileNumber(d) {
  return String((sequences()[idNamespace(d)] || 0) + 1);
}

function reserveCurrentId(d) {
  const all = sequences();
  const namespace = idNamespace(d);
  all[namespace] = Math.max(all[namespace] || 0, Number.parseInt(d.profile_number, 10) || 1);
  localStorage.setItem(sequenceStateKey, JSON.stringify(all));
}

function mediaPath(name, kind, usedPaths = new Set()) {
  const folder = kind === "image" ? "images" : "media";
  const safeName = String(name || "file")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "file";
  const dot = safeName.lastIndexOf(".");
  const stem = dot > 0 ? safeName.slice(0, dot) : safeName;
  const extension = dot > 0 ? safeName.slice(dot) : "";
  let candidate = `${folder}/${safeName}`;
  let suffix = 2;
  while (usedPaths.has(candidate)) candidate = `${folder}/${stem}-${suffix++}${extension}`;
  usedPaths.add(candidate);
  return candidate;
}

function renderMedia(kind) {
  const fieldId = `${kind}_upload`;
  const box = document.querySelector(`#${fieldId}Previews`);
  if (!box) return;
  box.innerHTML = uploadedMedia[kind].map((item, index) => kind === "image"
    ? `<div class="image-preview"><img src="${item.url}" alt="Vorschau ${index + 1}"><span>${escapeHtml(item.file.name)}</span><button type="button" data-remove-media="${index}" aria-label="Bild entfernen">×</button></div>`
    : `<div class="media-preview">${kind === "video" ? `<video src="${item.url}" controls aria-label="Videovorschau"></video>` : `<audio src="${item.url}" controls aria-label="Audiovorschau"></audio>`}<strong>${escapeHtml(item.file.name)}</strong><button type="button" data-remove-media="${index}" aria-label="Datei entfernen">×</button></div>`).join("");
  box.querySelectorAll("[data-remove-media]").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.removeMedia); URL.revokeObjectURL(uploadedMedia[kind][index].url); uploadedMedia[kind].splice(index, 1); syncMediaFields(kind);
  }));
}

function syncMediaFields(kind) {
  const paths = uploadedMedia[kind].map(item => item.path);
  if (kind === "image") {
    form.elements.main_image.value = paths[0] || "";
    form.elements.images.value = paths.slice(1).join("\n");
  } else form.elements[kind === "video" ? "videos" : "audio"].value = paths.join("\n");
  renderMedia(kind); update();
}

function addMedia(files, kind) {
  const usedPaths = new Set(Object.values(uploadedMedia).flat().map(item => item.path));
  [...files].filter(file => file.type.startsWith(`${kind}/`)).forEach(file => uploadedMedia[kind].push({
    file,
    url: URL.createObjectURL(file),
    path: mediaPath(file.name, kind, usedPaths)
  }));
  syncMediaFields(kind);
}

function yamlValue(value) {
  if (!value) return "";
  return `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}
function lines(value) { return value ? value.split("\n").map(v => v.trim()).filter(Boolean) : []; }
function bullets(value) { const list = lines(value); return list.length ? list.map(v => `- ${v}`).join("\n") : "- "; }
function val(value) { return value || ""; }

function languageBlocks(title, content, selected) {
  const active = selected.length ? selected : ["DE", "EN"];
  return `## ${title}\n\n${active.map(code => `### ${code}\n\n${code === "DE" ? val(content) : "<!-- Übersetzung wird nach Prüfung ergänzt. -->"}`).join("\n\n")}`;
}

function markdown(d) {
  const langs = d.output_languages?.length ? d.output_languages : [];
  return `---
id: ${yamlValue(d.id)}
organization_id: ${yamlValue(d.organization_id)}
organization_name: ${yamlValue(d.organization_name)}
country_code: ${yamlValue(d.country_code)}
country_name: ${yamlValue(d.country_name)}
interface_language: ${yamlValue(d.interface_language)}
content_language: ${yamlValue(d.content_language)}
output_languages:${langs.length ? `\n${langs.map(l => `  - ${l}`).join("\n")}` : " []"}
name: ${yamlValue(d.name)}
species: ${yamlValue(d.species)}
slug: ${yamlValue(d.slug)}
status: ${yamlValue(d.status)}
gender: ${yamlValue(d.gender)}
age: ${yamlValue(d.age)}
location: ${yamlValue(d.location)}
collection_id: ${yamlValue(d.collection_id)}
collection_name: ${yamlValue(d.collection_name)}
card_number: ${yamlValue(d.card_number)}
edition: ${yamlValue(d.edition)}
---

# AnimalProfile: ${val(d.name) || "Name"}

## Original Story

> This section contains the original story from the rescue person, foster home or organization.  
> The original text should remain unchanged.

${val(d.original_story)}

---

## Heart Note

${val(d.heart_note)}

---

## Basic Information

**Name:** ${val(d.name)}  
**Species:** ${val(d.species)}  
**Gender:** ${val(d.gender)}  
**Age / Date of Birth:** ${val(d.age)}  
**Breed / Mix:** ${val(d.breed)}  
**Color / Special Marks:** ${val(d.color_marks)}  
**Location:** ${val(d.location)}  
**Current Status:** ${val(d.status)}

---

## Timeline

- **First Sighting:** ${val(d.first_sighting)}
- **First Contact:** ${val(d.first_contact)}
- **Rescue / Intake:** ${val(d.rescue_intake)}
- **Veterinary Visit:** ${val(d.veterinary_visit)}
- **Current Situation:** ${val(d.current_situation)}
${d.timeline_more ? `\n### Further Events\n\n${bullets(d.timeline_more)}` : ""}

---

## Character

**Personality:** ${val(d.personality)}  
**With People:** ${val(d.with_people)}  
**With Children:** ${val(d.with_children)}  
**With Other Animals:** ${val(d.with_animals)}  
**Activity Level:** ${val(d.activity_level)}  
**Likes:** ${val(d.likes)}  
**Fears / Insecurities:** ${val(d.fears)}

---

## Health Overview

**Neutered / Spayed:** ${val(d.neutered)}  
**Vaccinated:** ${val(d.vaccinated)}  
**Microchipped:** ${val(d.microchipped)}  
**Dewormed:** ${val(d.dewormed)}  
**Tested:** ${val(d.tested)}  
**Current Health Status:** ${val(d.health_status)}  
**Special Care Needed:** ${val(d.special_care)}

---

## Veterinary Information

### Veterinarian / Clinic

**Veterinarian / Clinic:** ${val(d.clinic)}  
**Location:** ${val(d.clinic_location)}  
**Contact:** ${val(d.clinic_contact)}  
**Last Veterinary Visit:** ${val(d.last_visit)}  
**Next Appointment:** ${val(d.next_appointment)}

### Important Medical Conditions

| Condition / Diagnosis | Date / Period | Severity | Current Status | Notes |
|---|---|---|---|---|
${lines(d.conditions).length ? lines(d.conditions).map(x => `| ${x.split("|").map(y=>y.trim()).join(" | ")} |`).join("\n") : "|  |  |  |  |  |"}

### Veterinary Treatments

| Date | Treatment / Examination | Reason | Result | Veterinarian / Clinic | Next Step |
|---|---|---|---|---|---|
${lines(d.treatments).length ? lines(d.treatments).map(x => `| ${x.split("|").map(y=>y.trim()).join(" | ")} |`).join("\n") : "|  |  |  |  |  |  |"}

### Medication

| Medication | Dosage | Start | End | Reason | Notes |
|---|---|---|---|---|---|
${lines(d.medication).length ? lines(d.medication).map(x => `| ${x.split("|").map(y=>y.trim()).join(" | ")} |`).join("\n") : "|  |  |  |  |  |  |"}

### Vaccinations / Tests

**Vaccinations:**
${bullets(d.vaccinations)}

**Tests:**
${bullets(d.tests)}

### Surgery / Procedures

${bullets(d.procedures)}

**Microchip Number:** ${val(d.microchip_number)}  
**Special Veterinary Notes:** ${val(d.veterinary_notes)}

---

## Special Features

${bullets(d.special_features)}

---

## Adoption

**Adoption Status:** ${val(d.adoption_status)}  
**Looking For:** ${val(d.looking_for)}  
**Not Suitable For:** ${val(d.not_suitable_for)}  
**Special Requirements:** ${val(d.special_requirements)}  
**Available For Adoption From:** ${val(d.available_from)}  
**Adoption Fee / Contract:** ${val(d.adoption_fee_contract)}

---

## Sponsorship

**Sponsorship Possible:** ${val(d.sponsorship_possible)}  
**Sponsorship Status:** ${val(d.sponsorship_status)}  
**Monthly Need:** ${val(d.monthly_need)}  
**Special Support Needed:** ${val(d.support_needed)}

---

## Slogans

${bullets(d.slogans)}

---

## Collector Card

**Collection ID:** ${val(d.collection_id)}  
**Collection Name:** ${val(d.collection_name)}  
**Character Class:** ${val(d.character_class)}  
**Accessory:** ${val(d.accessory)}  
**Guiding Phrase:** ${val(d.guiding_phrase)}  
**Rarity:** ${val(d.rarity)}  
**Card Number:** ${val(d.card_number)}  
**Edition:** ${val(d.edition)}

---

## Media

**Main Image:** ${val(d.main_image)}

**Images:**
${bullets(d.images)}

**Videos:**
${bullets(d.videos)}

**Audio / Voice Notes:**
${bullets(d.audio)}

---

${languageBlocks("Social Media · Instagram", d.instagram, langs)}

### Hashtags

${val(d.hashtags)}

---

${languageBlocks("Social Media · Facebook", d.facebook, langs)}

---

${languageBlocks("Website", d.website, langs)}

---

## Internal Notes

> Internal – not intended for automatic publication.

**Organization Notes:** ${val(d.organization_notes)}  
**Foster Home Notes:** ${val(d.foster_notes)}  
**Important Contacts:** ${val(d.important_contacts)}  
**Last Updated:** ${val(d.last_updated)}

---

## Status History

| Date | Status | Notes |
|---|---|---|
${lines(d.status_history).length ? lines(d.status_history).map(x => `| ${x.split("|").map(y=>y.trim()).join(" | ")} |`).join("\n") : "|  | aufgenommen |  |\n|  | in_behandlung |  |\n|  | sucht_zuhause |  |\n|  | reserviert |  |\n|  | vermittelt |  |"}
`;
}

function update() {
  const d = values();
  if (!d.profile_number) form.elements.profile_number.value = nextProfileNumber(d);
  const nextId = generatedId(d);
  if (form.elements.id.value !== nextId) form.elements.id.value = nextId;
  const nextSlug = slugFromName(d.name);
  if (form.elements.slug.value !== nextSlug) form.elements.slug.value = nextSlug;
  const fresh = values();
  preview.textContent = markdown(fresh);
  document.querySelector("#previewTitle").textContent = fresh.name || "AnimalProfile";
  document.querySelector("#previewStatus").textContent = fresh.status ? fresh.status.replaceAll("_", " ") : "Entwurf";
  const snapshotImage = uploadedMedia.image[0]?.url;
  document.querySelector("#animalSnapshot").innerHTML = fresh.name
    ? `<div class="snapshot-mark">${snapshotImage ? `<img class="snapshot-image" src="${snapshotImage}" alt="">` : fresh.species === "dog" ? "🐶" : fresh.species === "cat" ? "🐱" : "🐾"}</div><div><strong>${escapeHtml(fresh.name)}</strong><p>${escapeHtml([fresh.id, fresh.species, fresh.location].filter(Boolean).join(" · "))}</p></div>`
    : '<div class="snapshot-mark">🐾</div><div><strong>Noch kein Tier erfasst</strong><p>Die Vorschau wächst mit deinen Angaben.</p></div>';

  const required = sections.flatMap(s => s.fields).filter(f => f.required);
  const done = required.filter(f => fresh[f.id] && (Array.isArray(fresh[f.id]) ? fresh[f.id].length : true)).length;
  const percent = Math.round(done / required.length * 100);
  document.querySelector("#progressNumber").textContent = `${percent} %`;
  sections.forEach(s => {
    const hasValue = s.fields.some(f => Array.isArray(fresh[f.id]) ? fresh[f.id].length : fresh[f.id]);
    document.querySelector(`[data-target="section-${s.id}"]`)?.classList.toggle("complete", hasValue);
  });
  localStorage.setItem(stateKey, JSON.stringify(fresh));
}

function showMessage(message, success = false) {
  const box = document.querySelector("#formMessage");
  box.hidden = false; box.textContent = message; box.classList.toggle("success", success);
}

function validateRequired() {
  form.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
  const missing = [];
  sections.forEach(section => section.fields.filter(f => f.required).forEach(f => {
    const value = f.type === "checks" ? [...form.querySelectorAll(`[name="${f.id}"]:checked`)] : form.elements[f.id];
    const empty = Array.isArray(value) ? value.length === 0 : !value?.value?.trim();
    if (empty) {
      missing.push(f.label);
      if (!Array.isArray(value) && value) value.classList.add("invalid");
      document.querySelector(`#section-${section.id}`).open = true;
    }
  }));
  if (missing.length) {
    showMessage(`Bitte ergänze zuerst: ${missing.join(", ")}.`);
    form.querySelector(".invalid")?.scrollIntoView({behavior:"smooth", block:"center"});
    return false;
  }
  return true;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function zipDate(date = new Date()) {
  return { time:(date.getHours()<<11)|(date.getMinutes()<<5)|(date.getSeconds()>>1), date:((date.getFullYear()-1980)<<9)|((date.getMonth()+1)<<5)|date.getDate() };
}

function write16(view, offset, value) { view.setUint16(offset, value, true); }
function write32(view, offset, value) { view.setUint32(offset, value >>> 0, true); }

function makeZip(files) {
  const encoder = new TextEncoder();
  const localParts = [], centralParts = []; let offset = 0;
  const stamp = zipDate();
  for (const file of files) {
    const name = encoder.encode(file.name); const data = file.data; const crc = crc32(data);
    const local = new Uint8Array(30 + name.length + data.length); const lv = new DataView(local.buffer);
    write32(lv,0,0x04034b50); write16(lv,4,20); write16(lv,6,0x0800); write16(lv,8,0); write16(lv,10,stamp.time); write16(lv,12,stamp.date); write32(lv,14,crc); write32(lv,18,data.length); write32(lv,22,data.length); write16(lv,26,name.length); write16(lv,28,0); local.set(name,30); local.set(data,30+name.length); localParts.push(local);
    const central = new Uint8Array(46 + name.length); const cv = new DataView(central.buffer);
    write32(cv,0,0x02014b50); write16(cv,4,20); write16(cv,6,20); write16(cv,8,0x0800); write16(cv,10,0); write16(cv,12,stamp.time); write16(cv,14,stamp.date); write32(cv,16,crc); write32(cv,20,data.length); write32(cv,24,data.length); write16(cv,28,name.length); write16(cv,30,0); write16(cv,32,0); write16(cv,34,0); write16(cv,36,0); write32(cv,38,0); write32(cv,42,offset); central.set(name,46); centralParts.push(central); offset += local.length;
  }
  const centralSize = centralParts.reduce((sum,p)=>sum+p.length,0); const end = new Uint8Array(22); const ev = new DataView(end.buffer);
  write32(ev,0,0x06054b50); write16(ev,4,0); write16(ev,6,0); write16(ev,8,files.length); write16(ev,10,files.length); write32(ev,12,centralSize); write32(ev,16,offset); write16(ev,20,0);
  return new Blob([...localParts, ...centralParts, end], {type:"application/zip"});
}

function triggerDownload(blob, name) {
  const url = URL.createObjectURL(blob); const link = Object.assign(document.createElement("a"), {href:url, download:name}); link.click(); setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

async function downloadCompletePackage() {
  if (!validateRequired()) return;
  const d = values(); const files = [{name:`${d.slug || "animal-profile"}.md`, data:new TextEncoder().encode(markdown(d))}];
  for (const kind of ["image", "video", "audio"]) for (const item of uploadedMedia[kind]) files.push({name:item.path, data:new Uint8Array(await item.file.arrayBuffer())});
  triggerDownload(makeZip(files), `${d.slug || "animal-profile"}-graceways.zip`); reserveCurrentId(d);
  showMessage(`Komplettpaket mit ${files.length - 1} Mediendatei(en) wurde erstellt.`, true);
}

function applyData(data) {
  sections.flatMap(s => s.fields).forEach(f => {
    if (f.type === "checks") form.querySelectorAll(`[name="${f.id}"]`).forEach(el => el.checked = (data[f.id] || []).includes(el.value));
    else if (form.elements[f.id]) form.elements[f.id].value = data[f.id] || "";
  });
  update();
}

const demo = {
  organization_id:"SC", organization_name:"SunCats", country_code:"EL", country_name:"Griechenland",
  profile_number:"7", id:"EL-SC-BC-007", interface_language:"DE", content_language:"DE", output_languages:["DE","EN","EL"],
  name:"Sissi", species:"cat", status:"sucht_zuhause", gender:"female", age:"ca. 2 Jahre", location:"Korinth, Griechenland",
  collection_id:"BC", collection_name:"Bridge Cats", card_number:"007", edition:"First Edition",
  original_story:"Sissi wurde nahe der Brücke von Korinth entdeckt. Anfangs hielt sie Abstand, doch sie kam jeden Tag ein wenig näher. Inzwischen sucht sie die Nähe vertrauter Menschen und wartet auf ein dauerhaftes Zuhause.",
  heart_note:"Sissi trägt eine stille Stärke in sich. Sie hat gelernt, wieder Vertrauen zu fassen, ohne ihre vorsichtige Art zu verlieren. Wer ihr Zeit schenkt, bekommt eine sanfte und treue Begleiterin.",
  personality:"Sanft, aufmerksam und zunächst vorsichtig.", with_people:"Nach kurzer Eingewöhnung sehr zugewandt", with_children:"Ruhige, verständige Kinder", with_animals:"Mit freundlichen Katzen verträglich", activity_level:"Mittel", likes:"Sonnenplätze\nLeise Ansprache\nSpielangeln", fears:"Schnelle Bewegungen und laute Geräusche",
  current_situation:"Sissi lebt an einer betreuten Futterstelle und soll auf eine Pflegestelle umziehen.",
  health_status:"Allgemeinzustand gut; tierärztliche Abschlusskontrolle ausstehend.", neutered:"yes", vaccinated:"partial", microchipped:"no", dewormed:"yes",
  adoption_status:"sucht_zuhause", looking_for:"Ruhiges Zuhause mit geduldigen Menschen.", sponsorship_possible:"yes",
  slogans:"Vertrauen wächst leise.\nVon der Straße in das Herz.", main_image:"images/sissi-main.jpg",
  instagram:"Sissi wartet in Korinth auf Menschen, die ihr Zeit und Sicherheit schenken. Aus vorsichtiger Entfernung wurde Tag für Tag ein kleines Stück Vertrauen.",
  facebook:"Sissi ist eine sanfte junge Katze aus Korinth. Für sie suchen wir ein ruhiges Zuhause, in dem sie in ihrem eigenen Tempo ankommen darf.",
  hashtags:"#GraceWays #SunCats #AdoptDontShop #Tierschutz", website:"Sissi sucht ein ruhiges und liebevolles Zuhause bei geduldigen Menschen.",
  last_updated:new Date().toISOString().slice(0,10), status_history:`${new Date().toISOString().slice(0,10)} | sucht_zuhause | Profil als Build-Week-Beispiel angelegt`
};

renderForm();
for (const kind of ["image", "video", "audio"]) {
  const input = document.querySelector(`#${kind}_upload`);
  const dropZone = document.querySelector(`#${kind}_uploadDropZone`);
  input.addEventListener("change", event => addMedia(event.target.files, kind));
  ["dragenter", "dragover"].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.add("dragging"); }));
  ["dragleave", "drop"].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.remove("dragging"); }));
  dropZone.addEventListener("drop", event => addMedia(event.dataTransfer.files, kind));
}
form.addEventListener("input", update);
form.addEventListener("change", update);
for (const fieldName of ["country_code", "organization_id", "collection_id"]) form.elements[fieldName].addEventListener("input", () => { form.elements.profile_number.value = nextProfileNumber(values()); });
document.querySelectorAll(".progress-link").forEach(btn => btn.addEventListener("click", () => { const target = document.querySelector(`#${btn.dataset.target}`); target.open = true; target.scrollIntoView({behavior:"smooth", block:"start"}); }));
document.querySelector("#loadDemo").addEventListener("click", () => applyData(demo));
document.querySelector("#clearForm").addEventListener("click", () => { if (confirm("Alle Eingaben in diesem Browser löschen?")) { for (const kind of ["image", "video", "audio"]) { uploadedMedia[kind].forEach(item => URL.revokeObjectURL(item.url)); uploadedMedia[kind] = []; renderMedia(kind); } form.reset(); localStorage.removeItem(stateKey); update(); } });
document.querySelector("#downloadMarkdown").addEventListener("click", () => {
  if (!validateRequired()) return; const d = values(); reserveCurrentId(d); triggerDownload(new Blob([markdown(d)], {type:"text/markdown;charset=utf-8"}), `${d.slug || "animal-profile"}.md`); showMessage("Markdown-Tierakte wurde erstellt.", true);
});
document.querySelector("#downloadPackage").addEventListener("click", downloadCompletePackage);
const copyMarkdownButton = document.querySelector("#copyMarkdown");
copyMarkdownButton.addEventListener("click", async () => {
  const old = copyMarkdownButton.textContent;
  try {
    await navigator.clipboard.writeText(preview.textContent);
    copyMarkdownButton.textContent = "Kopiert ✓";
    setTimeout(() => { copyMarkdownButton.textContent = old; }, 1400);
  } catch {
    showMessage("Die Markdown-Vorschau konnte nicht automatisch kopiert werden. Bitte markiere den Text und kopiere ihn manuell.");
  }
});

try { const saved = JSON.parse(localStorage.getItem(stateKey)); saved ? applyData(saved) : update(); } catch { update(); }
