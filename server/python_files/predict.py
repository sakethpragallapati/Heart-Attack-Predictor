import numpy as np
import joblib
import json
import sys

lby = joblib.load("./pklFiles/lby.pkl")
scx = joblib.load("./pklFiles/scx.pkl")
model = joblib.load("./pklFiles/model.pkl")

backend_data = json.load(sys.stdin)

numerical_keys = ["Age", "heartRate", "SBP", "DBP", "bloodSugar", "ckmg", "Troponin"]
x_numerical = np.array([backend_data[k] for k in numerical_keys], dtype=float).reshape(1, -1)

x_numerical_scaled = scx.transform(x_numerical)
x_categorical = np.array([[float(backend_data["Gender"])]])

x = np.concatenate((x_categorical, x_numerical_scaled), axis=1)

prediction = lby.inverse_transform(model.predict(x))
print(prediction[0], end="", flush=True)