const languages = [
  ["DE", "German"], ["EN", "English"], ["EL", "Greek"],
  ["RO", "Romanian"], ["RU", "Russian"], ["ES", "Spanish"], ["FR", "French"]
];

const field = (id, label, type = "text", options = {}) => ({ id, label, type, ...options });

const sections = [
  { id: "organization", icon: "🏠", title: "Organization & record identity", open: true, fields: [
    field("organization_id", "Organization ID", "text", {required:true, hint:"For example, SC for SunCats."}),
    field("organization_name", "Organization name", "text", {required:true}),
    field("country_code", "Country code", "text", {required:true, hint:"ISO code, for example EL, DE or RO."}),
    field("country_name", "Country"),
    field("profile_number", "Sequential record number", "number", {required:true, readonly:true, hint:"Assigned sequentially on this device and formatted with three digits."}),
    field("id", "Automatically generated animal ID", "text", {required:true, readonly:true, hint:"Built from country, organization, collection and sequence number."}),
    field("interface_language", "Interface language", "select", {options: languages}),
    field("content_language", "Original content language", "select", {options: languages, hint:"The language used for the original story, observations and other source text. The original wording is preserved."}),
    field("output_languages", "Requested output languages", "checks", {options: languages, wide:true, hint:"Select every language needed later for adoption profiles, website content or social media. Multiple languages are possible."})
  ]},
  { id: "basic", icon: "🐾", title: "Basic information", open: true, fields: [
    field("name", "Animal name", "text", {required:true, hint:"The animal's call name. If no name is known yet, enter “Unknown” temporarily."}),
    field("species", "Species", "select", {required:true, options:[["cat","Cat"],["dog","Dog"],["horse","Horse"],["bird","Bird"],["wildlife","Wildlife"],["other","Other"]]}),
    field("slug", "Automatic filename / slug", "text", {readonly:true, hint:"Generated automatically from the name, for example “Mia Sophie” → “mia-sophie”. It provides a web-friendly filename and folder name."}),
    field("status", "Current status", "select", {required:true, options:[["intake","Intake"],["in_treatment","In treatment"],["in_foster_care","In foster care"],["seeking_a_home","Seeking a home"],["reserved","Reserved"],["adopted","Adopted"],["deceased","Deceased"]]}),
    field("gender", "Gender", "select", {options:[["female","Female"],["male","Male"],["unknown","Unknown"]]}),
    field("age", "Age / date of birth", "text", {hint:"As accurately as known, for example “3 years”, “about 10–12 years” or “born May 14, 2022”."}),
    field("breed", "Breed / mix", "text", {hint:"For example “European Shorthair”, “Labrador mix”, “mixed breed” or “unknown”."}),
    field("color_marks", "Color / distinctive marks", "text", {hint:"Coat color and identifying features, for example “black and white, white front paw, notch in right ear” or “scar on nose”."}),
    field("location", "Current location", "text", {required:true}),
    field("special_features", "Special features", "textarea", {wide:true, hint:"One feature per line."})
  ]},
  { id: "story", icon: "❤️", title: "Story & Heart Note", fields: [
    field("original_story", "Original story", "textarea", {required:true, wide:true, hint:"The source text from the rescuer or organization remains unchanged."}),
    field("heart_note", "Heart Note", "textarea", {wide:true, hint:"Three to five empathetic sentences. AI may suggest this later, with the organization approving the final text."}),
    field("slogans", "Slogans", "textarea", {wide:true, hint:"One slogan per line."})
  ]},
  { id: "timeline", icon: "🗓️", title: "Timeline", fields: [
    field("first_sighting", "First sighting"), field("first_contact", "First contact"),
    field("rescue_intake", "Rescue / intake"), field("veterinary_visit", "Veterinary visit"),
    field("current_situation", "Current situation", "textarea", {wide:true}),
    field("timeline_more", "Further events", "textarea", {wide:true, hint:"One per line: date | event | note"})
  ]},
  { id: "character", icon: "✨", title: "Character", fields: [
    field("personality", "Personality", "textarea", {wide:true}),
    field("with_people", "With people"), field("with_children", "With children"),
    field("with_animals", "With other animals"), field("activity_level", "Activity level"),
    field("likes", "Likes", "textarea"), field("fears", "Fears / insecurities", "textarea")
  ]},
  { id: "health", icon: "🩺", title: "Health & veterinary care", fields: [
    field("neutered", "Neutered / spayed", "select", {options:[["yes","Yes"],["no","No"],["unknown","Unknown"]]}),
    field("vaccinated", "Vaccinated", "select", {options:[["yes","Yes"],["no","No"],["partial","Partially"],["unknown","Unknown"]]}),
    field("microchipped", "Microchipped", "select", {options:[["yes","Yes"],["no","No"],["unknown","Unknown"]]}),
    field("dewormed", "Dewormed", "select", {options:[["yes","Yes"],["no","No"],["unknown","Unknown"]]}),
    field("tested", "Tests — overview"), field("health_status", "Current health status", "textarea"),
    field("special_care", "Special care", "textarea"), field("clinic", "Veterinarian / clinic"),
    field("clinic_location", "Clinic location"), field("clinic_contact", "Contact", "text", {internal:true}),
    field("last_visit", "Last veterinary visit"), field("next_appointment", "Next appointment"),
    field("conditions", "Important conditions / diagnoses", "textarea", {wide:true, hint:"One per line: diagnosis | period | severity | status | notes"}),
    field("treatments", "Treatments / examinations", "textarea", {wide:true, hint:"One per line: date | treatment | reason | result | clinic | next step"}),
    field("medication", "Medication", "textarea", {wide:true, hint:"One per line: medication | dosage | start | end | reason | notes"}),
    field("vaccinations", "Vaccinations", "textarea"), field("tests", "Tests (FIV, FeLV, Giardia, others)", "textarea"),
    field("procedures", "Surgery / procedures", "textarea"), field("microchip_number", "Microchip number", "text", {internal:true}),
    field("veterinary_notes", "Special veterinary notes", "textarea", {wide:true, internal:true})
  ]},
  { id: "adoption", icon: "🏡", title: "Adoption & sponsorship", fields: [
    field("adoption_status", "Adoption status"), field("looking_for", "Home needed", "textarea"),
    field("not_suitable_for", "Not suitable for", "textarea"), field("special_requirements", "Special requirements", "textarea"),
    field("available_from", "Available from"), field("adoption_fee_contract", "Adoption fee / contract"),
    field("sponsorship_possible", "Sponsorship possible", "select", {options:[["yes","Yes"],["no","No"]]}),
    field("sponsorship_status", "Sponsorship status"), field("monthly_need", "Monthly need"),
    field("support_needed", "Special support needed", "textarea", {wide:true})
  ]},
  { id: "media", icon: "📷", title: "Media", fields: [
    field("image_upload", "Upload images", "files", {wide:true, kind:"image", accept:"image/*", hint:"The first image becomes the main image. Multiple images are supported."}),
    field("main_image", "Main image", "text", {readonly:true, hint:"Filled automatically after upload."}),
    field("images", "Additional images", "textarea", {readonly:true, hint:"Image paths are added automatically."}),
    field("video_upload", "Upload videos", "files", {wide:true, kind:"video", accept:"video/*", hint:"Add videos by drag and drop or file selection. Large videos require corresponding memory while the ZIP is created; compressed files are recommended for this prototype."}),
    field("videos", "Video files", "textarea", {readonly:true}),
    field("audio_upload", "Upload audio and voice notes", "files", {wide:true, kind:"audio", accept:"audio/*", hint:"For example, voice notes from a foster home."}),
    field("audio", "Audio files", "textarea", {readonly:true})
  ]},
  { id: "publishing", icon: "🌍", title: "Website & social media", fields: [
    field("instagram", "Instagram copy", "textarea", {wide:true, hint:"The export creates language sections for the selected output languages."}),
    field("facebook", "Facebook copy", "textarea", {wide:true}),
    field("hashtags", "Hashtags", "textarea", {wide:true}),
    field("website", "Website copy", "textarea", {wide:true})
  ]},
  { id: "collector", icon: "🏅", title: "Collector card (optional)", fields: [
    field("collection_id", "Collection ID"), field("collection_name", "Collection name"),
    field("character_class", "Character class"), field("accessory", "Accessory"),
    field("guiding_phrase", "Guiding phrase"), field("rarity", "Rarity"),
    field("card_number", "Card number"), field("edition", "Edition")
  ]},
  { id: "internal", icon: "🔒", title: "Internal notes & status history", fields: [
    field("organization_notes", "Organization notes", "textarea", {wide:true, internal:true}),
    field("foster_notes", "Foster home notes", "textarea", {wide:true, internal:true}),
    field("important_contacts", "Important contacts", "textarea", {wide:true, internal:true}),
    field("status_history", "Status history", "textarea", {wide:true, internal:true, hint:"One per line: date | status | note"}),
    field("last_updated", "Last updated", "date", {internal:true})
  ]}
];

const form = document.querySelector("#animalForm");
const preview = document.querySelector("#markdownPreview");
const stateKey = "graceways-animal-profile-draft-v2-en";
const sequenceStateKey = "graceways-id-sequences-v1";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

function renderField(f) {
  const classes = ["field", f.wide ? "wide" : "", f.required ? "required" : ""].filter(Boolean).join(" ");
  const internal = f.internal ? '<span class="internal-badge">INTERNAL</span>' : "";
  const hint = f.hint ? `<small>${escapeHtml(f.hint)}</small>` : "";
  let input;
  if (f.type === "textarea") input = `<textarea id="${f.id}" name="${f.id}" ${f.readonly ? "readonly" : ""}></textarea>`;
  else if (f.type === "select") input = `<select id="${f.id}" name="${f.id}"><option value="">Please select</option>${f.options.map(([v,l]) => `<option value="${v}">${l}</option>`).join("")}</select>`;
  else if (f.type === "checks") input = `<div class="check-grid">${f.options.map(([v,l]) => `<label class="check-option"><input type="checkbox" name="${f.id}" value="${v}"><span>${l}</span></label>`).join("")}</div>`;
  else if (f.type === "files") {
    const title = f.kind === "video" ? "Drop videos here or click to select" : f.kind === "audio" ? "Drop audio here or click to select" : "Drop photos here or click to select";
    const formats = f.kind === "video" ? "MP4, WebM, MOV" : f.kind === "audio" ? "MP3, M4A, WAV, OGG" : "JPG, PNG, WebP";
    input = `<div class="drop-zone" id="${f.id}DropZone"><input id="${f.id}" name="${f.id}" type="file" accept="${f.accept}" multiple><label for="${f.id}"><strong>${title}</strong><span>${formats} · multiple files supported</span></label></div><div class="image-previews" id="${f.id}Previews"></div>`;
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
    ? `<div class="image-preview"><img src="${item.url}" alt="Preview ${index + 1}"><span>${escapeHtml(item.file.name)}</span><button type="button" data-remove-media="${index}" aria-label="Remove image">×</button></div>`
    : `<div class="media-preview">${kind === "video" ? `<video src="${item.url}" controls aria-label="Video preview"></video>` : `<audio src="${item.url}" controls aria-label="Audio preview"></audio>`}<strong>${escapeHtml(item.file.name)}</strong><button type="button" data-remove-media="${index}" aria-label="Remove file">×</button></div>`).join("");
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

function languageBlocks(title, content, selected, contentLanguage) {
  const active = selected.length ? selected : [contentLanguage || "EN"];
  return `## ${title}\n\n${active.map(code => `### ${code}\n\n${code === (contentLanguage || "EN") ? val(content) : "<!-- Translation to be added after review. -->"}`).join("\n\n")}`;
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

${languageBlocks("Social Media · Instagram", d.instagram, langs, d.content_language)}

### Hashtags

${val(d.hashtags)}

---

${languageBlocks("Social Media · Facebook", d.facebook, langs, d.content_language)}

---

${languageBlocks("Website", d.website, langs, d.content_language)}

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
${lines(d.status_history).length ? lines(d.status_history).map(x => `| ${x.split("|").map(y=>y.trim()).join(" | ")} |`).join("\n") : "|  | intake |  |\n|  | in_treatment |  |\n|  | seeking_a_home |  |\n|  | reserved |  |\n|  | adopted |  |"}
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
  document.querySelector("#previewStatus").textContent = fresh.status ? fresh.status.replaceAll("_", " ") : "Draft";
  const snapshotImage = uploadedMedia.image[0]?.url;
  document.querySelector("#animalSnapshot").innerHTML = fresh.name
    ? `<div class="snapshot-mark">${snapshotImage ? `<img class="snapshot-image" src="${snapshotImage}" alt="">` : fresh.species === "dog" ? "🐶" : fresh.species === "cat" ? "🐱" : "🐾"}</div><div><strong>${escapeHtml(fresh.name)}</strong><p>${escapeHtml([fresh.id, fresh.species, fresh.location].filter(Boolean).join(" · "))}</p></div>`
    : '<div class="snapshot-mark">🐾</div><div><strong>No animal added yet</strong><p>The preview grows as you enter information.</p></div>';

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
    showMessage(`Please complete these required fields first: ${missing.join(", ")}.`);
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
  showMessage(`Complete package created with ${files.length - 1} media file(s).`, true);
}

function applyData(data) {
  sections.flatMap(s => s.fields).forEach(f => {
    if (f.type === "checks") form.querySelectorAll(`[name="${f.id}"]`).forEach(el => el.checked = (data[f.id] || []).includes(el.value));
    else if (form.elements[f.id]) form.elements[f.id].value = data[f.id] || "";
  });
  update();
}

const demo = {
  organization_id:"SC", organization_name:"SunCats", country_code:"EL", country_name:"Greece",
  profile_number:"7", id:"EL-SC-BC-007", interface_language:"EN", content_language:"EN", output_languages:["EN","DE","EL"],
  name:"Sissi", species:"cat", status:"seeking_a_home", gender:"female", age:"about 2 years", location:"Corinth, Greece",
  collection_id:"BC", collection_name:"Bridge Cats", card_number:"007", edition:"First Edition",
  original_story:"Sissi was discovered near the bridge in Corinth. At first she kept her distance, but every day she came a little closer. She now seeks the company of people she trusts and is waiting for a permanent home.",
  heart_note:"Sissi carries a quiet strength. She has learned to trust again without losing her careful nature. Give her time, and she will become a gentle and loyal companion.",
  personality:"Gentle, attentive and initially cautious.", with_people:"Very affectionate after a short adjustment period", with_children:"Calm, considerate children", with_animals:"Compatible with friendly cats", activity_level:"Moderate", likes:"Sunny places\nGentle voices\nFishing-rod toys", fears:"Sudden movements and loud noises",
  current_situation:"Sissi lives at a managed feeding station and is waiting to move into foster care.",
  health_status:"General condition is good; final veterinary check is pending.", neutered:"yes", vaccinated:"partial", microchipped:"no", dewormed:"yes",
  adoption_status:"seeking_a_home", looking_for:"A quiet home with patient people.", sponsorship_possible:"yes",
  slogans:"Trust grows quietly.\nFrom the street into the heart.", main_image:"images/sissi-main.jpg",
  instagram:"Sissi is waiting in Corinth for people who will give her time and safety. Day by day, careful distance has grown into trust.",
  facebook:"Sissi is a gentle young cat from Corinth. We are looking for a quiet home where she can settle in at her own pace.",
  hashtags:"#GraceWays #SunCats #AdoptDontShop #AnimalRescue", website:"Sissi is looking for a quiet, loving home with patient people.",
  last_updated:new Date().toISOString().slice(0,10), status_history:`${new Date().toISOString().slice(0,10)} | seeking_a_home | Added as a Build Week example profile`
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
document.querySelector("#clearForm").addEventListener("click", () => { if (confirm("Clear all entries stored in this browser?")) { for (const kind of ["image", "video", "audio"]) { uploadedMedia[kind].forEach(item => URL.revokeObjectURL(item.url)); uploadedMedia[kind] = []; renderMedia(kind); } form.reset(); localStorage.removeItem(stateKey); update(); } });
document.querySelector("#downloadMarkdown").addEventListener("click", () => {
  if (!validateRequired()) return; const d = values(); reserveCurrentId(d); triggerDownload(new Blob([markdown(d)], {type:"text/markdown;charset=utf-8"}), `${d.slug || "animal-profile"}.md`); showMessage("Markdown animal record created.", true);
});
document.querySelector("#downloadPackage").addEventListener("click", downloadCompletePackage);
const copyMarkdownButton = document.querySelector("#copyMarkdown");
copyMarkdownButton.addEventListener("click", async () => {
  const old = copyMarkdownButton.textContent;
  try {
    await navigator.clipboard.writeText(preview.textContent);
    copyMarkdownButton.textContent = "Copied ✓";
    setTimeout(() => { copyMarkdownButton.textContent = old; }, 1400);
  } catch {
    showMessage("The Markdown preview could not be copied automatically. Please select the text and copy it manually.");
  }
});

try { const saved = JSON.parse(localStorage.getItem(stateKey)); saved ? applyData(saved) : update(); } catch { update(); }
