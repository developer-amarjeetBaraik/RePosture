# 🧍 RePosture Bad Posture Detection App


## 👋 Overview

A full-stack web application that detects bad posture (squat or desk sitting) from a user-uploaded or webcam-recorded video using rule-based analysis powered by MediaPipe and OpenCV. Built with **React**, **Node.js**, and a **Python backend** for pose estimation.

🚀 Built for HR technical assessment by **Realfy**.

---

## 🚀 Live Demo

🌐 **Deployed App**: [https://reposture-frontend.onrender.com/](https://reposture-frontend.onrender.com/)  
🎥 **Demo Video**: [Watch on YouTube](https://youtu.be/example)


---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React.js, Tailwind CSS         |
| Backend      | Node.js (Express), Python      |
| AI/ML        | MediaPipe, OpenCV              |
| Deployment   | Render (Dockerized)            |
| Storage      | Local + In-memory              |

---

## 🔍 Key Features

- 🎥 Upload video or record directly from webcam
- 🧠 Analyze posture using rule-based logic (no ML training)
- 🖼️ Draw posture issue overlays on canvas synced with video playback
- ⏯️ Pause video and highlight bad frames with issue points and descriptions
- 📦 Fully dockerized for deployment on Render

---

## 🧠 How It Works

1. **Frontend (React + Canvas)**  
   - User uploads or records a video
   - Sends it to the backend for analysis
   - Shows analysis markers (dots + labels) on the canvas synced with video

2. **Backend (Node.js + Python)**  
   - Accepts video uploads
   - Passes the file to a Python script
   - Python uses MediaPipe + OpenCV to extract pose data
   - Rule-based analysis checks:
     - Squat: `Back angle < 150°`, `Knee > Toe`
   - Returns issues with pixel coordinates (x, y) for canvas

3. **Python Logic Includes:**
   - Confidence threshold filtering
   - Required landmarks visibility check
   - Frame skipping (every Nth frame)
   - Returns JSON with issues, coordinates, timestamps numbers

---

## 📁 Project Structure

```
/Backend
├── posture.py                # Logic to detect bad posture using MediaPipe
├── app.js                    # App entry point
├── Dockerfile                # Combined Node + Python Dockerfile
├── requirements.txt          # Requirements file for python
├── routes/
│   └── analysePosture.js     # Node.js to Python subprocess handler
├── uploads/                  # Temporary video storage
├── venv/                     # Virtual environment for pyton

/frontend
├── src/
│   └── components/
│     └── Footer.jsx
│     ├── PageNotFound.jsx
│     ├── Report.jsx
│     ├── UploadedVideoAndCanvasOverlay.jsx
│     ├── VideoUploadFromSystem.jsx
│     ├── WebcamRecorder.jsx
│     └── utils/
│       ├── AnalyzingSteps.jsx
│       ├── RecordingIndicator.jsx
│
├── pages/
│   └── Home.jsx
├── servives/
│   └── seekVideoTimelineAt.js
├── store/
│   └── AnalysisReportStore.jsx
├── main.jsx
├── index.html

/render.yaml                 # Render deployment config
/README.md                   # Readme file
```

---

## 🚀 How to Run Locally

1. **Clone repo**

```bash
git clone https://github.com/developer-amarjeetBaraik/RePosture.git
cd reposture
```

2. **Install Frontend**

```bash
cd frontend
npm install
npm start
```

3. **Install Backend Dependencies**

```bash
cd ../Backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
node app.js
```

4. **Environment Variables**

Create `.env` in `/Backend` and add:

```
PORT = 3000
NODE_ENV = devlopment        #it can be development, testing, production
PYTHON_PATH=python3
FRONTEND_URL = https://reposture-frontend.onrender.com/ (in my case)
```

---

## 🐳 Deploy `/Backend` on Render

### 1. Render Settings

- **Type**: Web Service
- **Runtime**: Docker
- **Root directory**: `Backend`

### 2. Add Environment Variables

| Key           | Value     |
|---------------|-----------|
| PORT          | 5000      |
| NODE_ENV      | production|
| PYTHON_PATH   | python3   |
| FRONTEND_UR   | https://reposture-frontend.onrender.com/ (in my case)|

### 3. Files Required

- `Dockerfile` (in `/Backend` root)
- `render.yaml` (in project root)

---

## 🧪 Dummy Test Response (for frontend testing)

```json
{
  "status": "success",
  "bad_postures": [
    { "timestamps": 1.10, "issue": "Knee ver toe", "point": [330, 440] },
    { "timestamps": 4.22, "issue": "Back angle < 150°", "point": [320, 420] }
  ]
}
```

---

## 📱 Responsiveness

- Custom Tailwind breakpoints
- Works on desktop, tablet, and mobile
- Dynamic canvas scaling based on video size

---

## 🎯 Evaluation Criteria Covered

| Criteria                                  | Implemented |
|-------------------------------------------|---------------|
| Rule-based posture detection              | ✅ Yes       |
| Upload + webcam support                   | ✅ Yes       |
| Per-frame feedback (visual)               | ✅ Yes       |
| Canvas highlights + pause on issue frame  | ✅ Yes       |
| Good code structure and comments          | ✅ Yes       |
| Clean UI + demo + deployment              | ✅ Yes       |

---


## 👨‍💻 Developer Info

Built with ❤️ by **Amarjeet Baraik**

[🌐 Portfolio](https://portfolio-amarjeet.onrender.com/) | [🐱 GitHub](https://github.com/developer-amarjeetBaraik) | [💼 LinkedIn](https://linkedin.com/in/amarjeet-chik-baraik) | [📧 Email](mailto:amarjeetofficial81@gamil.com) | [📸 Instagram](https://www.instagram.com/amarjeet_baraik_/)

---

## 📜 License

This project is licensed under the [![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat)](./LICENSE).