// Maps the "tool" field from projects.json to a label + accent color for the chip.
const TOOL_META = {
  figma: { label: "Figma", color: "var(--accent-violet)" },
  canva: { label: "Canva", color: "var(--accent-coral)" },
};

function getToolMeta(tool) {
  const key = String(tool || "").toLowerCase();
  return TOOL_META[key] || { label: tool || "Project", color: "var(--accent-teal)" };
}

function createCard(project, index) {
  const { title, image, link, description, tool } = project;
  const meta = getToolMeta(tool);

  const card = document.createElement("article");
  card.className = "card";
  card.style.setProperty("--delay", `${index * 80}ms`);

  const media = document.createElement("div");
  media.className = "card-media";

  const img = document.createElement("img");
  img.src = image || "";
  img.alt = title ? `Preview of ${title}` : "Project preview";
  img.loading = "lazy";
  media.appendChild(img);

  const chip = document.createElement("span");
  chip.className = "tag-chip";
  chip.style.setProperty("--chip", meta.color);
  chip.textContent = meta.label;
  media.appendChild(chip);

  const body = document.createElement("div");
  body.className = "card-body";

  const h3 = document.createElement("h3");
  h3.textContent = title || "Untitled project";

  const desc = document.createElement("p");
  desc.textContent = description || "";

  const a = document.createElement("a");
  a.className = "card-link";
  a.href = link || "#";
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.innerHTML = `Open project <span aria-hidden="true">&rarr;</span>`;

  body.append(h3, desc, a);
  card.append(media, body);

  return card;
}

async function loadProjects() {
  const grid = document.getElementById("cardGrid");
  const loadingState = document.getElementById("loadingState");
  const emptyState = document.getElementById("emptyState");
  const errorState = document.getElementById("errorState");

  try {
    const res = await fetch("projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const projects = await res.json();
    loadingState.hidden = true;

    if (!Array.isArray(projects) || projects.length === 0) {
      emptyState.hidden = false;
      return;
    }

    const fragment = document.createDocumentFragment();
    projects.forEach((project, i) => fragment.appendChild(createCard(project, i)));
    grid.appendChild(fragment);
  } catch (err) {
    console.error("Failed to load projects.json:", err);
    loadingState.hidden = true;
    errorState.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);
