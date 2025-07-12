const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://heart-attack-predictor-sakethpragallapati.onrender.com"
}));
app.use(express.json())

app.post("/predict",(req,res)=>{
    const {Age,Gender,heartRate,SBP,DBP,bloodSugar,ckmg,Troponin} = req.body
    
    const pythonPath = "python3";
    const python = spawn(pythonPath, ["predict.py"], {
        cwd: path.resolve(__dirname, "python_files")
    });

    python.stdin.write(JSON.stringify({Age,Gender,heartRate,SBP,DBP,bloodSugar,ckmg,Troponin}));
    python.stdin.end();

    result = "";
    python.stdout.on('data',(data)=>{
        result += data.toString();
    });
    python.stderr.on('data', (err) => {
        if (!errorSent) {
            res.status(500).send(`Something is wrong. Please try again... ${err.toString()}`);
        }
    });
    python.on('close', (code) => {
        if (code !== 0) {
            res.status(500).send(`Something is wrong. Please try again. Exit code: ${code}`);
        }else {
            res.send({ prediction: result });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is Running on PORT: ${PORT}`);
});
