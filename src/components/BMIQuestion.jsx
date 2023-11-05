import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BMIQuestion.css';
import { useGlobalContext } from '../GlobalContext';

function BMIQuestion() {
  const [selectedBMI, setSelectedBMI] = useState(null);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmiResult, setBMIResult] = useState(null);
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);

  const handleBMIChange = (event) => {
    setSelectedBMI(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    setBMIResult(bmi);

    if (bmi < 18.5) {
      setSelectedBMI('Below 18.5');
    } else if (bmi >= 18.5 && bmi < 25) {
      setSelectedBMI('Between 18.5 and 24.9');
    } else if (bmi >= 25 && bmi < 30) {
      setSelectedBMI('Between 25 and 29.9');
    } else if (bmi >= 30 && bmi < 35) {
      setSelectedBMI('Between 30 and 34.9');
    } else {
      setSelectedBMI('35 or higher');
    }
    console.log(selectedBMI)
  };

  const updateAndNavigate = () => {
    if (selectedBMI) {
      if (globalArray && globalArray.length >= 0) {
        switch (selectedBMI) {
          case 'Below 18.5':
            globalArray[1] = 'W1';
            break;
          case 'Between 18.5 and 24.9':
            globalArray[1] = 'W2';
            break;
          case 'Between 25 and 29.9':
            globalArray[1] = 'W3';
            break;
          case 'Between 30 and 34.9':
            globalArray[1] = 'W4';
            break;
          case '35 or higher':
            globalArray[1] = 'W5';
            break;
          default:
            globalArray[1] = '';
        }
        
        updateGlobalArrayAtIndex(1, globalArray[1]);
        console.log(globalArray)
        navigate('/bsq', { state: { array: globalArray } });
      } else {
        setShowWarning(true);
      }
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="body-containerb" >
      <div className="overlay">
        <div className="bmi-question-container">
          
          <div className="bmi-question-column">
         
            <div className="bmi-calculation-section">
              <h2 className=''>BMI Calculator</h2>
              <div className="input-group">
                <label>Height (in cm):</label>
                <input type="number" onChange={handleHeightChange} value={height} />
              </div>
              <div className="input-group">
                <label>Weight (in kg):</label>
                <input type="number" onChange={handleWeightChange} value={weight} />
              </div>
              <button className="calculate-button" onClick={calculateBMI}>
                Calculate BMI
              </button>
              {bmiResult && <p className="bmi-result">Your BMI: {bmiResult.toFixed(2)}</p>}
              {showWarning && (
                <p className="warning">Please select your BMI range before proceeding.</p>
              )}
            </div>
          </div>

          <div className="bmi-options-column">
           
              <h3>Your BMI range</h3>
              <span>You can use the BMI calculator if you don't know your BMI</span>
              <div className="gender-options">
  <label
    className={`gender-option ${selectedBMI === "Below 18.5" ? 'selected' : ''}`}
    onClick={() => handleBMIChange({ target: { value: "Below 18.5" } })}
  >
    Below 18.5
  </label>
  <label
    className={`gender-option ${selectedBMI === "Between 18.5 and 24.9" ? 'selected' : ''}`}
    onClick={() => handleBMIChange({ target: { value: "Between 18.5 and 24.9" } })}
  >
    Between 18.5 and 24.9
  </label>
  <label
    className={`gender-option ${selectedBMI === "Between 25 and 29.9" ? 'selected' : ''}`}
    onClick={() => handleBMIChange({ target: { value: "Between 25 and 29.9" } })}
  >
    Between 25 and 29.9
  </label>
  <label
    className={`gender-option ${selectedBMI === "Between 30 and 34.9" ? 'selected' : ''}`}
    onClick={() => handleBMIChange({ target: { value: "Between 30 and 34.9" } })}
  >
    Between 30 and 34.9
  </label>
  <label
    className={`gender-option ${selectedBMI === "35 or higher" ? 'selected' : ''}`}
    onClick={() => handleBMIChange({ target: { value: "35 or higher" } })}
  >
    35 or higher
  </label>
</div>
           
          </div>
        </div>

        <div className="next-button-containerg">
          <a href="/gq" >
            <button className="next-buttong">Change responses</button>
            
          </a>
          
          <Link to="/bsq">
            <button className="next-buttong" onClick={updateAndNavigate} disabled={!selectedBMI}>

              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BMIQuestion;
