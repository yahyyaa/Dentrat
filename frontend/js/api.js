/**
 * DENTRAT API client — connects frontend to Flask backend.
 * Uses relative URLs since frontend and backend share the same Replit origin.
 */
const API = {
  async health() {
    const res = await fetch("/health");
    return res.json();
  },

  async stats() {
    const res = await fetch("/stats");
    if (!res.ok) throw new Error("Failed to load stats");
    return res.json();
  },

  async history(limit = 20) {
    const res = await fetch(`/history?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to load history");
    return res.json();
  },

  async upload(file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("image", file);

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });

      xhr.addEventListener("load", () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(data);
          } else {
            reject(new Error(data.error || data.detail || "Upload failed"));
          }
        } catch {
          reject(new Error("Invalid server response"));
        }
      });

      xhr.addEventListener("error", () => reject(new Error("Network error")));
      xhr.open("POST", "/upload");
      xhr.send(formData);
    });
  },
};

/** Dental conditions shown in UI — mapped to model class IDs */
const CONDITIONS = [
  {
    id: "caries",
    label: "Caries & Cavities",
    desc: "Detect tooth decay and cavity formations",
    classId: 1,
    color: "#ef4444",
    iconClass: "red",
  },
  {
    id: "impaction",
    label: "Impaction",
    desc: "Identify impacted teeth and positioning issues",
    classId: 2,
    color: "#f97316",
    iconClass: "orange",
  },
  {
    id: "bone_loss",
    label: "Bone Loss",
    desc: "Analyze periodontal bone density and loss",
    classId: 6,
    color: "#a855f7",
    iconClass: "purple",
  },
  {
    id: "fillings",
    label: "Fillings",
    desc: "Detect existing dental fillings and restorations",
    classId: null,
    color: "#3b82f6",
    iconClass: "blue",
    note: "Not yet supported by current model",
  },
  {
    id: "broken_crown",
    label: "Broken Down/Crown Tooth",
    desc: "Identify damaged crowns and broken tooth structures",
    classId: 3,
    color: "#eab308",
    iconClass: "yellow",
  },
  {
    id: "infection",
    label: "Infection",
    desc: "Detect signs of dental infections and abscesses",
    classId: 4,
    color: "#ec4899",
    iconClass: "pink",
  },
  {
    id: "fractured",
    label: "Fractured Teeth",
    desc: "Identify tooth fractures and structural cracks",
    classId: 5,
    color: "#22c55e",
    iconClass: "green",
  },
];

const CLASS_COLORS = {
  1: "#ef4444",
  2: "#f97316",
  3: "#eab308",
  4: "#ec4899",
  5: "#22c55e",
  6: "#a855f7",
  7: "#3b82f6",
};
