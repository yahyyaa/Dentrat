# DENTRAT — Dental Anomaly Detection System

[![Deploy on Replit](https://replit.com/badge?url=https://github.com/yahyyaa/Dentrat)](https://replit.com)

AI-powered dental OPG X-ray analysis using Faster R-CNN (ResNet50).

**Live design reference:** [Figma DENTRAT prototype](https://ochre-cart-09418239.figma.site/login)

---

## Quick Start (Replit)

1. **Fork / clone** this repository
2. Upload your trained model to `models/dental_model_v2.pth`
3. Click **Run** on Replit
4. Open the web URL → login with `admin` / `admin123`
5. Upload an X-ray and click **Run Analysis**

Verify backend: visit `/health` — should show `"model_loaded": true`

---

## Project Structure

```
├── training/colab_train.ipynb   # Google Colab fine-tuning notebook
├── backend/                     # Flask API + model inference
├── frontend/                    # DENTRAT web app (replica of Figma site)
│   ├── index.html
│   ├── css/styles.css
│   └── js/                      # auth, api, app (SPA router)
├── models/                      # Place dental_model_v2.pth here
├── .replit                      # Replit auto-run config
└── README.md
```

---

## Pages

| Route | Page |
|-------|------|
| `/login` | Sign in (admin / admin123) |
| `/` | Analysis — select conditions + upload X-ray |
| `/results` | Detection results with bounding boxes |
| `/help` | Documentation |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Server + model status |
| GET | `/stats` | Dashboard statistics |
| GET | `/history` | Upload history |
| POST | `/upload` | Upload X-ray, get detections |

---

## GitHub Setup

```bash
# Repository: https://github.com/yahyyaa/Dentrat

cd dental-anomaly-detection
git init
git add .
git commit -m "Initial commit: DENTRAT dental anomaly detection system"
git branch -M main
git remote add origin https://github.com/yahyyaa/Dentrat.git
git push -u origin main
```

> **Important:** Model files (`.pth`) are gitignored because they're too large. Upload `dental_model_v2.pth` directly to Replit's `models/` folder after deploying.

---

## Model File

| Question | Answer |
|----------|--------|
| Where to put the model? | `models/dental_model_v2.pth` |
| How to update? | Replace file and restart server |
| Where are uploads stored? | `/tmp/dental_uploads/` |

---

## Detected Classes

1. Caries · 2. Impacted Teeth · 3. Broken Crown/Root · 4. Infection · 5. Fractured · 6. Periodontal Bone Loss · 7. Other

---

## Local Development

```bash
pip install -r backend/requirements.txt
# Place model in models/dental_model_v2.pth
cd backend && python app.py
# Open http://localhost:5000
```

---

## Training (Google Colab)

See `training/colab_train.ipynb` — upload pre-trained model + Dataset_Batch2.rar, run all cells, download `dental_model_v2.pth`.

---

Final Year Project — DENTRAT © 2026
