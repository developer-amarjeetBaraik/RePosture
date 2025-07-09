# 🧍 Realfy Bad Posture Detection App

A full-stack web application that detects bad posture (squat or desk sitting) from a user-uploaded or webcam-recorded video using rule-based analysis powered by MediaPipe and OpenCV. Built with **React**, **Node.js**, and a **Python backend** for pose estimation.

---

## 🚀 Live Demo

🌐 **Deployed App**: [https://realfy-posture.vercel.app](https://realfy-posture.vercel.app)  
🎥 **Demo Video**: [Watch on YouTube](https://youtu.be/example)

---

## 📸 Features

- ✅ Upload or record posture videos (supports webcam)
- ✅ Analyze posture using rule-based logic (no ML training)
- ✅ Detect common issues like:
  - "Back angle < 150°"
  - "Knee over toe"
- ✅ Highlights problem points on a canvas overlay as video plays
- ✅ Frame skipping for faster processing
- ✅ Handles incorrect videos (non-human, blurry, partial views)
- ✅ Fully responsive, mobile-friendly UI

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
   - Returns JSON with issues, coordinates, frame numbers

---

## 📂 Project Structure

```
📦 Realfy-Posture-Detection-App
├── frontend/              # React App (Vite)
│   ├── components/        # Upload, Webcam, Report, Overlay
│   └── store/             # Context store for shared state
├── backend/               # Node.js API server
│   ├── routes/
│   └── analyze.py         # Python script for MediaPipe + OpenCV
```

---

## ⚙️ Tech Stack

### Frontend
- React (with Context API)
- Tailwind CSS (customized styling)
- HTML5 Canvas (for overlay drawing)
- Webcam.js (for live recording)

### Backend
- Node.js + Express
- `child_process` to run Python scripts

### Python (Analysis Engine)
- `mediapipe` for pose detection
- `opencv-python` for video frame processing
- `math`, `json`, `sys` for geometry and comms

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/realfy-posture-app.git
cd realfy-posture-app
```

---

### 2. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

### 3. Backend Setup (Node.js + Python)

```bash
cd backend
npm install
```

#### Create a virtual environment (recommended)

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

Add this to `requirements.txt`:
```
mediapipe
opencv-python
```

---

### 4. Environment Variables

Add `.env` in `/backend` if needed (optional):
```env
PORT=5000
FRONTEND_URL= https://localhost:5173
```

---

### 5. Start Backend

```bash
cd backend
node index.js
```

---

## 📤 API Usage

### POST `/analyze`

- **Body**: `multipart/form-data` with video file
- **Response**:
```json
{
  "status": "success",
  "bad_postures": [
    {
      "frame": 15,
      "issue": "Knee over toe",
      "x": 360,
      "y": 540
    }
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

## 👤 Developer Info

Built by [**Amarjeet Baraik**](https://amarjeetbaraik.dev)

📫 Contact Me:  
[🌐 Portfolio](https://amarjeetbaraik.dev)  
[🐙 GitHub](https://github.com/amarjeetbaraik)  
[💼 LinkedIn](https://linkedin.com/in/amarjeetbaraik)  
📧 amarjeetbaraikweb@gmail.com  
📷 [Instagram](https://instagram.com/amarjeet.baraik)

---

## 📃 License

MIT – Feel free to fork, improve and credit. ✨