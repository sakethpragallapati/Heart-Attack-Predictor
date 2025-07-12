# Heart Attack Predictor

This project is a **Heart Attack Prediction Web Application** built using:
- **React.js** for the frontend (`client/` directory)
- **Node.js + Express.js** for the backend (`server/server.js`)
- **Python** for data analysis and prediction (`server/python_files/`)
- **Machine Learning Models** serialized as `.pkl` files

---

## 🧠 Machine Learning Model (Python Part)

We trained a model using a heart disease dataset with features such as:
- Age
- Gender
- Heart Rate
- Systolic and Diastolic Blood Pressure (SBP, DBP)
- Blood Sugar
- CPK-MB (ckmg)
- Troponin levels

### Model Training
The model is trained using Random Forest via model.py. Preprocessing steps like scaling and label encoding are also applied. The model achieves an accuracy of 98.1%.

### Files
- `model.pkl`: Trained machine learning model.
- `scx.pkl`: Scaler object used for feature scaling.
- `lby.pkl`: Label encoder or output transformer.

### Prediction API
The `predict.py` script loads the `.pkl` files and takes JSON input to return predictions, which are then invoked by the Node.js server using `child_process.spawn()`.

---

## 🌐 Live Web Demo

You can try the deployed application live at:

👉 **[Live Demo Link](https://heart-attack-predictor-sakethpragallapati.onrender.com)**

---

## 🗂️ Project Structure

```
Heart-Attack-Predictor/
├── client/             # React frontend
│   └── src/
│       └── components/HeartAttackPredictor.jsx
├── server/             # Node.js backend
│   ├── server.js
│   └── python_files/
│       ├── model.py
│       ├── predict.py
│       ├── pklFiles/
│       │   ├── model.pkl
│       │   ├── scx.pkl
│       │   └── lby.pkl
└── README.md           # You are here!
```

---

## 📦 Technologies Used

- **React** (frontend UI)
- **Node.js + Express** (backend routing)
- **Python** (ML and prediction)
- **Render.com** (deployment)
- **Scikit-learn** (ML model)
- **Joblib** (for saving and loading the .pkl files)

---

## 🛠️ Deployment (Render.com)

Two services are deployed:
1. **Backend (Node.js)** — runs the Python prediction script `(predict.py)` using `child_process.spawn()`
2. **Frontend (React)** — built using `npm run build` and served via static deployment

---

## ✅ Sample Input for Prediction (JSON)

```
POST https://heart-attack-predictor-ozvc.onrender.com/predict

{
  "Age": 21,
  "Gender": 1,
  "heartRate": 94,
  "SBP": 98,
  "DBP": 46,
  "bloodSugar": 296,
  "ckmg": 6.75,
  "Troponin": 1.06
}
```

---

© 2025 Saketh Pragallapati
