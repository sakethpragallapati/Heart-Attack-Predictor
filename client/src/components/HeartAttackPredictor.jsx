import React, { useState } from 'react';
import { HelpCircle, Heart, Activity, AlertCircle } from 'lucide-react';

const HeartAttackPredictor = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    heartRate: '',
    SBP: '',
    DBP: '',
    bloodSugar: '',
    ckmg: '',
    Troponin: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(null);

  const tooltips = {
    SBP: "Systolic Blood Pressure: The pressure in your arteries when your heart beats. Normal range: 90-120 mmHg",
    DBP: "Diastolic Blood Pressure: The pressure in your arteries when your heart rests between beats. Normal range: 60-80 mmHg",
    bloodSugar: "Blood Sugar Level: The amount of glucose in your blood. Normal fasting: 70-100 mg/dL",
    ckmg: "CK-MB (Creatine Kinase-MB): An enzyme released when heart muscle is damaged. Normal: <6.3 ng/mL",
    Troponin: "Troponin: A protein released when heart muscle is damaged. Normal: <0.04 ng/mL"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setPrediction(null);

    if (!formData.Age || !formData.Gender || !formData.heartRate || !formData.SBP || !formData.DBP || !formData.bloodSugar || !formData.ckmg || !formData.Troponin) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        Age: parseInt(formData.Age),
        Gender: formData.Gender === 'Male' ? 1 : 0,
        heartRate: parseFloat(formData.heartRate),
        SBP: parseFloat(formData.SBP),
        DBP: parseFloat(formData.DBP),
        bloodSugar: parseFloat(formData.bloodSugar),
        ckmg: parseFloat(formData.ckmg),
        Troponin: parseFloat(formData.Troponin)
      };

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      setPrediction(result.prediction.trim());
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Tooltip = ({ field, children }) => (
    <div className="tooltip-container">
      {children}
      <div
        className="tooltip-icon"
        onMouseEnter={() => setShowTooltip(field)}
        onMouseLeave={() => setShowTooltip(null)}
      >
        <HelpCircle size={16} />
      </div>
      {showTooltip === field && (
        <div className="tooltip-box">
          <div>
            {tooltips[field]}
            <div className="tooltip-arrow"></div>
          </div>
        </div>
      )}
    </div>
  );

  const isHighRisk = prediction?.toLowerCase().includes('positive');

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <div className="main-card">
          <div className="header">
            <div className="header-title">
              <Heart color="#ef4444" size={32} />
              <h1>Heart Attack Risk Predictor</h1>
            </div>
            <p className="header-subtitle">Enter your medical information to assess heart attack risk</p>
          </div>

          <div className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter age"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Heart Rate (BPM)</label>
                <input
                  type="number"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="60-100 BPM"
                />
              </div>

              <div className="form-group">
                <Tooltip field="SBP">
                  <label className="form-label">Systolic Blood Pressure</label>
                </Tooltip>
                <input
                  type="number"
                  name="SBP"
                  value={formData.SBP}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="mmHg"
                />
              </div>

              <div className="form-group">
                <Tooltip field="DBP">
                  <label className="form-label">Diastolic Blood Pressure</label>
                </Tooltip>
                <input
                  type="number"
                  name="DBP"
                  value={formData.DBP}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="mmHg"
                />
              </div>

              <div className="form-group">
                <Tooltip field="bloodSugar">
                  <label className="form-label">Blood Sugar Level</label>
                </Tooltip>
                <input
                  type="number"
                  name="bloodSugar"
                  value={formData.bloodSugar}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="mg/dL"
                />
              </div>

              <div className="form-group">
                <Tooltip field="ckmg">
                  <label className="form-label">CK-MB Level</label>
                </Tooltip>
                <input
                  type="number"
                  step="0.1"
                  name="ckmg"
                  value={formData.ckmg}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="ng/mL"
                />
              </div>

              <div className="form-group">
                <Tooltip field="Troponin">
                  <label className="form-label">Troponin Level</label>
                </Tooltip>
                <input
                  type="number"
                  step="0.01"
                  name="Troponin"
                  value={formData.Troponin}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="ng/mL"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <div className="btn-content">
                  <Activity className="loading-spinner" size={20} />
                  Analyzing...
                </div>
              ) : (
                'Predict Heart Attack Risk'
              )}
            </button>
          </div>

          {error && (
            <div className="alert alert-error">
              <div className="alert-content">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            </div>
          )}

          {prediction && (
            <div className={prediction.toLowerCase() === 'positive' ? 'alert-failure' : 'alert-success'}>
              <div>
                <h3 className="result-title">Prediction Result</h3>
                <div className={`result-risk ${prediction.toLowerCase() === 'positive' ? 'result-high-risk' : 'result-low-risk'}`}>
                  {prediction.toLowerCase() === 'positive' ? 'High Risk' : 'Low Risk'}
                </div>
                <p className="result-description">
                  {prediction.toLowerCase() === 'positive'
                    ? 'Please consult with a healthcare professional immediately.'
                    : 'Current indicators suggest lower risk, but continue regular check-ups.'}
                </p>
              </div>
            </div>
          )}
        
          <div className="disclaimer">
            <p>
              <strong>Disclaimer:</strong> This is a predictive tool and should not replace professional medical advice. 
              Always consult with healthcare professionals for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartAttackPredictor;