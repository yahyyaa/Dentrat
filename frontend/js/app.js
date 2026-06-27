/**
 * DENTRAT — Main Application (SPA)
 * Replicates the Figma site: Login, Analysis, Results, Help
 */

// ─── SVG Icons ───
const Icons = {
  pulse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="64" height="64"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  circle: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><circle cx="12" cy="12" r="8"/></svg>`,
  bone: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 8a3 3 0 1 0-4 4 3 3 0 0 0 4 4m8-8a3 3 0 1 0 4 4 3 3 0 0 0-4 4M8 16a3 3 0 1 0 4 4 3 3 0 0 0-4-4m8-8a3 3 0 1 0-4-4 3 3 0 0 0 4 4"/></svg>`,
  tooth: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C9 2 6 4 6 8c0 3 1 5 2 8 1 2 2 4 4 4s3-2 4-4c1-3 2-5 2-8 0-4-3-6-6-6z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2c1 4 4 6 4 10a4 4 0 1 1-8 0c0-2 2-4 4-10z"/></svg>`,
  crack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 3v18M8 8l4 4-4 4M16 8l-4 4 4 4"/></svg>`,
};

const conditionIcons = {
  caries: Icons.circle,
  impaction: Icons.pulse,
  bone_loss: Icons.bone,
  fillings: Icons.tooth,
  broken_crown: Icons.shield,
  infection: Icons.flame,
  fractured: Icons.crack,
};

// ─── Router ───
const Router = {
  routes: {},
  current: "",

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    history.pushState({}, "", path);
    this.render();
  },

  render() {
    const path = window.location.pathname;
    this.current = path;

    if (path === "/login") {
      if (Auth.isLoggedIn()) {
        history.replaceState({}, "", "/");
        this.render();
        return;
      }
      this.routes["/login"]?.();
      return;
    }

    if (!Auth.isLoggedIn()) {
      history.replaceState({}, "", "/login");
      this.routes["/login"]?.();
      return;
    }

    const handler = this.routes[path] || this.routes["/"];
    handler?.();
  },
};

// ─── State ───
const State = {
  selectedConditions: new Set(),
  uploadedFile: null,
  previewUrl: null,
  isAnalyzing: false,
  helpSection: "getting-started",
};

// ─── Utilities ───
function showToast(message, type = "error") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function saveResult(data, file, previewUrl, selectedIds) {
  const reader = new FileReader();
  reader.onload = () => {
    sessionStorage.setItem(
      "dentrat_last_result",
      JSON.stringify({
        ...data,
        imageDataUrl: reader.result,
        selectedConditions: [...selectedIds],
        analyzedAt: new Date().toISOString(),
      })
    );
  };
  reader.readAsDataURL(file);
}

function getLastResult() {
  try {
    return JSON.parse(sessionStorage.getItem("dentrat_last_result"));
  } catch {
    return null;
  }
}

function filterDetections(detections, selectedConditionIds) {
  const selectedClassIds = CONDITIONS.filter((c) => selectedConditionIds.includes(c.id) && c.classId)
    .map((c) => c.classId);
  if (selectedClassIds.length === 0) return detections;
  return detections.filter((d) => selectedClassIds.includes(d.class_id));
}

// ─── Shared Components ───
function renderNavbar(active) {
  return `
    <nav class="navbar">
      <a href="/" class="nav-brand" data-link>
        <div class="nav-logo">${Icons.pulse}</div>
        <div class="nav-brand-text">
          <h1>DENTRAT</h1>
          <p>Dental Radiography Analysis Tool</p>
        </div>
      </a>
      <div class="nav-links">
        <a href="/" class="nav-link ${active === "analysis" ? "active" : ""}" data-link>
          ${Icons.pulse}<span class="label">Analysis</span>
        </a>
        <a href="/results" class="nav-link ${active === "results" ? "active" : ""}" data-link>
          ${Icons.file}<span class="label">Results</span>
        </a>
        <a href="/help" class="nav-link ${active === "help" ? "active" : ""}" data-link>
          ${Icons.help}<span class="label">Help</span>
        </a>
        <button class="nav-link logout" id="logout-btn">
          ${Icons.logout}<span class="label">Logout</span>
        </button>
      </div>
    </nav>`;
}

function renderFooter() {
  return `<footer class="app-footer">
    © 2026 DENTRAT. All rights reserved.<span>•</span>HIPAA Compliant
  </footer>`;
}

function renderHipaaBanner() {
  return `
    <div class="hipaa-banner">
      ${Icons.info}
      <div>
        <h3>Privacy & HIPAA Compliance</h3>
        <p>All uploaded images are processed securely and encrypted. No patient data is stored on our servers without explicit consent. Analysis is performed in compliance with HIPAA regulations.</p>
      </div>
    </div>`;
}

function bindNavLinks() {
  document.querySelectorAll("[data-link]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      Router.navigate(el.getAttribute("href"));
    });
  });
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    Auth.logout();
    Router.navigate("/login");
  });
}

// ─── Login Page ───
function renderLogin() {
  document.title = "Sign In — DENTRAT";
  document.getElementById("app").innerHTML = `
    <div class="login-page">
      <div class="login-brand">
        <div class="login-logo">${Icons.pulse}</div>
        <h1>DENTRAT</h1>
        <p>Dental Radiography Analysis Tool</p>
      </div>
      <div class="login-card">
        <h2>Sign In</h2>
        <p class="subtitle">Access your dental analysis dashboard</p>
        <div id="login-error" class="login-error hidden"></div>
        <form id="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrap">
              <span class="input-icon">${Icons.user}</span>
              <input type="text" id="username" placeholder="Enter your username" required autocomplete="username" />
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrap">
              <span class="input-icon">${Icons.lock}</span>
              <input type="password" id="password" placeholder="Enter your password" required autocomplete="current-password" />
              <button type="button" class="toggle-password" id="toggle-pw" aria-label="Toggle password">${Icons.eye}</button>
            </div>
          </div>
          <button type="submit" class="btn-primary" id="login-btn">Sign In</button>
        </form>
      </div>
      <p class="login-footer">© 2026 DENTRAT. HIPAA Compliant • Secure Login</p>
    </div>`;

  const form = document.getElementById("login-form");
  const pwInput = document.getElementById("password");
  const togglePw = document.getElementById("toggle-pw");

  togglePw.addEventListener("click", () => {
    const isPassword = pwInput.type === "password";
    pwInput.type = isPassword ? "text" : "password";
    togglePw.innerHTML = isPassword ? Icons.eyeOff : Icons.eye;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("login-btn");
    const errEl = document.getElementById("login-error");
    const username = document.getElementById("username").value.trim();
    const password = pwInput.value;

    btn.disabled = true;
    btn.textContent = "Signing In...";
    errEl.classList.add("hidden");

    await new Promise((r) => setTimeout(r, 600));

    if (Auth.login(username, password)) {
      Router.navigate("/");
    } else {
      errEl.textContent = "Invalid username or password. Try admin / admin123";
      errEl.classList.remove("hidden");
      btn.disabled = false;
      btn.textContent = "Sign In";
    }
  });
}

// ─── Analysis Page ───
function renderAnalysis() {
  document.title = "Analysis — DENTRAT";

  const conditionsHtml = CONDITIONS.map((c) => `
    <label class="condition-card ${State.selectedConditions.has(c.id) ? "selected" : ""}" data-condition="${c.id}">
      <input type="checkbox" ${State.selectedConditions.has(c.id) ? "checked" : ""} ${c.classId === null ? "" : ""} />
      <div class="condition-icon ${c.iconClass}">${conditionIcons[c.id] || Icons.circle}</div>
      <div class="condition-text">
        <h4>${c.label}</h4>
        <p>${c.desc}</p>
        ${c.note ? `<span class="condition-note">${c.note}</span>` : ""}
      </div>
    </label>`).join("");

  const canRun = State.selectedConditions.size > 0 && State.uploadedFile && !State.isAnalyzing;

  document.getElementById("app").innerHTML = `
    <div class="app-layout">
      ${renderNavbar("analysis")}
      <main class="main-content">
        ${renderHipaaBanner()}
        <div class="analysis-grid">
          <div class="panel">
            <div class="panel-header">
              <h2>Select Conditions to Analyze</h2>
              <p>Choose one or more dental conditions to detect</p>
            </div>
            <div class="conditions-list" id="conditions-list">${conditionsHtml}</div>
          </div>
          <div class="panel">
            <div class="panel-header">
              <h2>Upload OPG X-Ray</h2>
              <p>Supports JPEG, PNG, and DICOM formats</p>
            </div>
            <div class="upload-zone ${State.uploadedFile ? "has-file" : ""}" id="upload-zone">
              <input type="file" id="file-input" accept="image/*" hidden />
              ${State.previewUrl
                ? `<img src="${State.previewUrl}" class="upload-preview" alt="Preview" />
                   <p class="upload-filename">${escapeHtml(State.uploadedFile.name)}</p>
                   <p>Click to change file</p>`
                : `<div class="upload-circle">${Icons.upload}</div>
                   <h3>Drop your X-ray here or click to browse</h3>
                   <p>Maximum file size: 25MB</p>`}
            </div>
          </div>
        </div>
        <div class="ready-bar">
          <div>
            <h3>Ready to Analyze</h3>
            <p>Select condition(s) and upload an X-ray to begin</p>
          </div>
          <button class="btn-run" id="run-analysis" ${canRun ? "" : "disabled"}>
            ${Icons.pulse} Run Analysis
          </button>
        </div>
      </main>
      ${renderFooter()}
    </div>
    <div id="progress-overlay" class="progress-overlay hidden">
      <div class="progress-modal">
        <h3>Analyzing X-Ray</h3>
        <p>Running AI detection model...</p>
        <div class="progress-bar-track"><div class="progress-bar-fill" id="progress-fill"></div></div>
      </div>
    </div>`;

  bindNavLinks();
  bindAnalysisEvents();
}

function bindAnalysisEvents() {
  document.querySelectorAll("[data-condition]").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.tagName === "INPUT") return;
      const id = card.dataset.condition;
      const cb = card.querySelector("input");
      cb.checked = !cb.checked;
      if (cb.checked) State.selectedConditions.add(id);
      else State.selectedConditions.delete(id);
      card.classList.toggle("selected", cb.checked);
      updateRunButton();
    });
    card.querySelector("input").addEventListener("change", (e) => {
      const id = card.dataset.condition;
      if (e.target.checked) State.selectedConditions.add(id);
      else State.selectedConditions.delete(id);
      card.classList.toggle("selected", e.target.checked);
      updateRunButton();
    });
  });

  const zone = document.getElementById("upload-zone");
  const input = document.getElementById("file-input");

  zone.addEventListener("click", () => input.click());
  zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("dragover"); });
  zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("dragover");
    if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
  });
  input.addEventListener("change", (e) => {
    if (e.target.files[0]) handleFileSelect(e.target.files[0]);
  });

  document.getElementById("run-analysis").addEventListener("click", runAnalysis);
}

function handleFileSelect(file) {
  if (!file.type.startsWith("image/")) {
    showToast("Please upload a valid image file.");
    return;
  }
  if (file.size > 25 * 1024 * 1024) {
    showToast("File too large. Maximum size is 25MB.");
    return;
  }
  State.uploadedFile = file;
  State.previewUrl = URL.createObjectURL(file);
  renderAnalysis();
}

function updateRunButton() {
  const btn = document.getElementById("run-analysis");
  if (!btn) return;
  btn.disabled = !(State.selectedConditions.size > 0 && State.uploadedFile && !State.isAnalyzing);
}

async function runAnalysis() {
  if (!State.uploadedFile || State.selectedConditions.size === 0) return;

  State.isAnalyzing = true;
  const overlay = document.getElementById("progress-overlay");
  const fill = document.getElementById("progress-fill");
  overlay.classList.remove("hidden");
  fill.style.width = "5%";

  let progress = 5;
  const timer = setInterval(() => {
    progress = Math.min(progress + Math.random() * 12, 85);
    fill.style.width = `${progress}%`;
  }, 300);

  try {
    const data = await API.upload(State.uploadedFile, (pct) => {
      fill.style.width = `${Math.max(pct, 10)}%`;
    });

    clearInterval(timer);
    fill.style.width = "100%";

    saveResult(data, State.uploadedFile, State.previewUrl, [...State.selectedConditions]);

    await new Promise((r) => setTimeout(r, 400));
    overlay.classList.add("hidden");
    State.isAnalyzing = false;

    showToast(`Analysis complete — ${data.detection_count} finding(s) detected`, "success");
    Router.navigate("/results");
  } catch (err) {
    clearInterval(timer);
    overlay.classList.add("hidden");
    State.isAnalyzing = false;
    showToast(err.message);
    renderAnalysis();
  }
}

// ─── Results Page ───
async function renderResults() {
  document.title = "Results — DENTRAT";
  const result = getLastResult();

  if (!result) {
    document.getElementById("app").innerHTML = `
      <div class="app-layout">
        ${renderNavbar("results")}
        <main class="main-content">
          <div class="empty-state">
            ${Icons.doc}
            <h3>No Analysis Results Available</h3>
            <p>Please run an analysis from the dashboard first</p>
            <a href="/" class="btn-secondary" data-link>${Icons.pulse} Go to Dashboard</a>
          </div>
        </main>
        ${renderFooter()}
      </div>`;
    bindNavLinks();
    return;
  }

  const filtered = filterDetections(result.detections || [], result.selectedConditions || []);
  let statsHtml = "";
  try {
    const stats = await API.stats();
    statsHtml = `
      <div class="stats-row">
        <div class="mini-stat"><div class="val">${stats.total_images || 0}</div><div class="lbl">Total Scans</div></div>
        <div class="mini-stat"><div class="val">${stats.total_detections || 0}</div><div class="lbl">Total Findings</div></div>
        <div class="mini-stat"><div class="val">${filtered.length}</div><div class="lbl">This Scan</div></div>
      </div>`;
  } catch { /* stats optional */ }

  document.getElementById("app").innerHTML = `
    <div class="app-layout">
      ${renderNavbar("results")}
      <main class="main-content">
        <div class="page-header">
          <div class="page-header-icon">${Icons.file}</div>
          <h2>Analysis Results</h2>
          <p>${escapeHtml(result.filename || "X-Ray")} — ${new Date(result.analyzedAt).toLocaleString()}</p>
        </div>
        ${statsHtml}
        <div class="results-grid">
          <div class="canvas-panel">
            <canvas id="result-canvas"></canvas>
          </div>
          <div class="findings-panel">
            <div class="summary-card">
              <div class="count">${filtered.length}</div>
              <div class="label">${filtered.length === 1 ? "Anomaly detected" : "Anomalies detected"}</div>
            </div>
            <ul class="findings-list" id="findings-list">
              ${filtered.length === 0
                ? `<li class="finding-item" style="border-left-color:#9ca3af"><div><h4>No matching anomalies</h4><p class="loc">Try selecting different conditions or uploading another X-ray.</p></div></li>`
                : filtered.map((d) => `
                  <li class="finding-item" style="border-left-color:${d.color || CLASS_COLORS[d.class_id]}">
                    <span class="dot" style="background:${d.color || CLASS_COLORS[d.class_id]}"></span>
                    <div>
                      <h4>${escapeHtml(d.class)}</h4>
                      <div class="conf">${Math.round(d.confidence * 100)}% confidence</div>
                      <div class="loc">📍 ${escapeHtml(d.location || "Unknown")}</div>
                    </div>
                  </li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="history-section" id="history-section"></div>
      </main>
      ${renderFooter()}
    </div>`;

  bindNavLinks();
  drawResultCanvas(result.imageDataUrl, filtered, result.image_width, result.image_height);
  loadHistoryTable();
}

function drawResultCanvas(dataUrl, detections, serverW, serverH) {
  const canvas = document.getElementById("result-canvas");
  if (!canvas) return;
  const img = new Image();
  img.onload = () => {
    const maxW = 640;
    const scale = Math.min(1, maxW / img.width);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const sx = canvas.width / (serverW || img.width);
    const sy = canvas.height / (serverH || img.height);

    detections.forEach((det) => {
      const [x, y, w, h] = det.bbox;
      const color = det.color || CLASS_COLORS[det.class_id] || "#ef4444";
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x * sx, y * sy, w * sx, h * sy);

      const label = `${det.class} ${Math.round(det.confidence * 100)}%`;
      ctx.font = "bold 12px Inter, sans-serif";
      const tw = ctx.measureText(label).width;
      const ly = Math.max(y * sy - 4, 14);
      ctx.fillStyle = color;
      ctx.fillRect(x * sx, ly - 14, tw + 8, 16);
      ctx.fillStyle = "#fff";
      ctx.fillText(label, x * sx + 4, ly - 2);
    });
  };
  img.src = dataUrl;
}

async function loadHistoryTable() {
  const section = document.getElementById("history-section");
  if (!section) return;
  try {
    const { history } = await API.history(10);
    if (!history.length) return;
    section.innerHTML = `
      <h3>Recent Upload History</h3>
      <table class="history-table">
        <thead><tr><th>Filename</th><th>Date</th><th>Findings</th></tr></thead>
        <tbody>${history.map((h) => `
          <tr>
            <td>${escapeHtml(h.filename)}</td>
            <td>${new Date(h.upload_date).toLocaleString()}</td>
            <td><span class="badge">${h.detection_count}</span></td>
          </tr>`).join("")}
        </tbody>
      </table>`;
  } catch { /* optional */ }
}

// ─── Help Page ───
const HELP_SECTIONS = {
  "getting-started": {
    title: "Getting Started",
    body: `
      <p>Welcome to DENTRAT — your AI-powered dental radiography analysis platform. Follow these steps to analyze an OPG X-ray:</p>
      <ol>
        <li>Sign in with your credentials</li>
        <li>Navigate to the <strong>Analysis</strong> page</li>
        <li>Select one or more dental conditions to detect</li>
        <li>Upload an OPG X-ray image (JPEG or PNG)</li>
        <li>Click <strong>Run Analysis</strong></li>
        <li>View results on the <strong>Results</strong> page</li>
      </ol>`,
  },
  upload: {
    title: "Uploading X-Rays",
    body: `
      <p>DENTRAT accepts the following image formats:</p>
      <ul>
        <li>JPEG / JPG</li>
        <li>PNG</li>
        <li>BMP, TIFF, WEBP</li>
      </ul>
      <h4>Requirements</h4>
      <ul>
        <li>Maximum file size: 25 MB (10 MB server limit on free tier)</li>
        <li>Recommended: OPG (panoramic) X-ray, 416×416 or higher resolution</li>
        <li>RGB color images work best</li>
      </ul>
      <p>Drag and drop your file onto the upload area, or click to browse.</p>`,
  },
  conditions: {
    title: "Detection Conditions",
    body: `
      <p>DENTRAT uses a Faster R-CNN model (ResNet50) trained to detect:</p>
      <ul>
        <li><strong>Caries & Cavities</strong> — tooth decay</li>
        <li><strong>Impaction</strong> — impacted teeth</li>
        <li><strong>Bone Loss</strong> — periodontal bone loss</li>
        <li><strong>Broken Down/Crown</strong> — damaged crowns</li>
        <li><strong>Infection</strong> — dental infections</li>
        <li><strong>Fractured Teeth</strong> — structural cracks</li>
      </ul>
      <p><em>Note: Fillings detection is shown in the UI but is not yet supported by the current model version.</em></p>`,
  },
  results: {
    title: "Understanding Results",
    body: `
      <p>After analysis, results include:</p>
      <ul>
        <li><strong>Annotated X-ray</strong> — color-coded bounding boxes around detected anomalies</li>
        <li><strong>Confidence score</strong> — model certainty (only results above 50% are shown)</li>
        <li><strong>Location</strong> — approximate quadrant (Upper/Lower, Left/Right)</li>
      </ul>
      <h4>Color Legend</h4>
      <ul>
        <li>Red — Caries</li>
        <li>Orange — Impaction</li>
        <li>Yellow — Broken Crown</li>
        <li>Pink — Infection</li>
        <li>Green — Fractured</li>
        <li>Purple — Bone Loss</li>
      </ul>`,
  },
  privacy: {
    title: "Privacy & Security",
    body: `
      <p>DENTRAT is designed with healthcare privacy in mind:</p>
      <ul>
        <li>Uploaded images are stored temporarily in server memory</li>
        <li>Detection metadata is stored in a local SQLite database</li>
        <li>No data is shared with third parties</li>
        <li>Always obtain patient consent before uploading clinical images</li>
      </ul>`,
  },
  faq: {
    title: "FAQ",
    body: `
      <h4>Where is the AI model stored?</h4>
      <p>The model file (<code>dental_model_v2.pth</code>) is placed in the <code>models/</code> folder on the server.</p>
      <h4>How do I update the model?</h4>
      <p>Replace the .pth file in <code>models/</code> and restart the server.</p>
      <h4>How do I check if the server is working?</h4>
      <p>Visit <code>/health</code> on your deployment URL.</p>
      <h4>What are the default login credentials?</h4>
      <p>Username: <strong>admin</strong>, Password: <strong>admin123</strong></p>`,
  },
};

function renderHelp() {
  document.title = "Help — DENTRAT";
  const section = HELP_SECTIONS[State.helpSection] || HELP_SECTIONS["getting-started"];

  const navItems = Object.entries(HELP_SECTIONS).map(([key, val]) => `
    <button class="help-nav-item ${State.helpSection === key ? "active" : ""}" data-help="${key}">
      ${Icons.file} ${val.title}
    </button>`).join("");

  document.getElementById("app").innerHTML = `
    <div class="app-layout">
      ${renderNavbar("help")}
      <main class="main-content">
        <div class="page-header">
          <div class="page-header-icon">${Icons.help}</div>
          <h2>Help & Documentation</h2>
          <p>Everything you need to know about using DENTRAT</p>
        </div>
        <div class="help-layout">
          <aside class="help-sidebar">
            <h3>Quick Guides</h3>
            ${navItems}
          </aside>
          <div class="help-content">
            <h3>${section.title}</h3>
            ${section.body}
          </div>
        </div>
      </main>
      ${renderFooter()}
    </div>`;

  bindNavLinks();
  document.querySelectorAll("[data-help]").forEach((btn) => {
    btn.addEventListener("click", () => {
      State.helpSection = btn.dataset.help;
      renderHelp();
    });
  });
}

// ─── Init ───
Router.register("/login", renderLogin);
Router.register("/", renderAnalysis);
Router.register("/results", renderResults);
Router.register("/help", renderHelp);

window.addEventListener("popstate", () => Router.render());

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path === "/" || path === "/results" || path === "/help") {
    if (!Auth.isLoggedIn() && path !== "/login") {
      history.replaceState({}, "", "/login");
    }
  }
  if (path === "/" && !Auth.isLoggedIn()) {
    history.replaceState({}, "", "/login");
  }
  Router.render();
});
