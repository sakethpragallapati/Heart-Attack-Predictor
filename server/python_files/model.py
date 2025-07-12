import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv('Medicaldataset.csv')
y = df.iloc[:, -1]

x_numerical = df.drop(columns=["Gender", df.columns[-1]])
x_categorical = df["Gender"].values.reshape(-1, 1)
x = np.concatenate((x_categorical, x_numerical), axis=1)

lby = LabelEncoder()
y = lby.fit_transform(y)

scx = StandardScaler()
x[:, 1:] = scx.fit_transform(x[:, 1:])

model = RandomForestClassifier(random_state=42)
model.fit(x, y)

joblib.dump(lby,"./pklFiles/lby.pkl")
joblib.dump(scx,"./pklFiles/scx.pkl")
joblib.dump(model,"./pklFiles/model.pkl")