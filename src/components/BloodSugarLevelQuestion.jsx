import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BloodSugarLevelQuestion.css';
import logoImage from '../images/Newlogo.png';
import home from '../images/Home.png';

import { useGlobalContext } from '../GlobalContext';

function BloodSugarLevelQuestion() {
  const [selectedSugarLevel, setSelectedSugarLevel] = useState(null);
  const { globalArray,updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();

  const handleSugarLevelChange = (event) => {
    setSelectedSugarLevel(event.target.value);
  };

  const updateAndNavigate = () => {
    if (selectedSugarLevel) {
      
      console.log('Updated Global Array:', globalArray);
      switch (selectedSugarLevel) {
        case 'Below 70 mg/dL':
          globalArray[2] = 'D1';
          break;
        case 'Between 70 and 99 mg/dL':
          globalArray[2] = 'D2';
          break;
        case 'Between 100 and 199 mg/dL':
          globalArray[2] = 'D3';
          break;
        case 'Between 200 and 399 mg/dL':
          globalArray[2] = 'D4';
          break;
        case '400 mg/dL or higher':
          globalArray[2] = 'D5';
          break;
        default:
          globalArray[2] = '';
      }
      // Update the global context with the selected response
      updateGlobalArrayAtIndex(2,  globalArray[2]);
      console.log('Updated Global Array:', globalArray);
      navigate('/bpq', { state: { array: globalArray} });
    }
  }

  return (
    <div>
      <div className="blood-sugar-question-container">
        <h1>What is your Blood Sugar Level?</h1>
        <h3>Select the range which your blood sugar belongs</h3>
        <div className="home-button">
          <a href="/">
            <img src={home} alt="Home" />
          </a>
        </div>
        <div className="sugar-level-options-container"> {/* Add a container for options */}
          <div className="sugar-level-options">
            <div className="sugar-level-row">
              <label className={`sugar-level-option ${selectedSugarLevel === "Below 70 mg/dL" ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="Below 70 mg/dL"
                  checked={selectedSugarLevel === "Below 70 mg/dL"}
                  onChange={handleSugarLevelChange}
                />
                Below 70 mg/dL
              </label>
              <label className={`sugar-level-option ${selectedSugarLevel === "Between 100 and 199 mg/dL" ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="Between 100 and 199 mg/dL"
                  checked={selectedSugarLevel === "Between 100 and 199 mg/dL"}
                  onChange={handleSugarLevelChange}
                />
                Between 100 and 199 mg/dL
              </label>
              
            </div>
            <div className="sugar-level-row">
              <label className={`sugar-level-option ${selectedSugarLevel === "Between 70 and 99 mg/dL" ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="Between 70 and 99 mg/dL"
                  checked={selectedSugarLevel === "Between 70 and 99 mg/dL"}
                  onChange={handleSugarLevelChange}
                />
                Between 70 and 99 mg/dL
              </label>
              <label className={`sugar-level-option ${selectedSugarLevel === "Between 200 and 399 mg/dL" ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="Between 200 and 399 mg/dL"
                  checked={selectedSugarLevel === "Between 200 and 399 mg/dL"}
                  onChange={handleSugarLevelChange}
                />
                Between 200 and 399 mg/dL
              </label>
            </div>
            <div className="centered-sugar-level-row">
              <label className={`sugar-level-option ${selectedSugarLevel === "400 mg/dL or higher" ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="400 mg/dL or higher"
                  checked={selectedSugarLevel === "400 mg/dL or higher"}
                  onChange={handleSugarLevelChange}
                />
                400 mg/dL or higher
              </label>
            </div>
          </div>
        </div>
        <br /><br /><br /><br />
        <div className="navigation-buttons1">
          <a href="/gq" className="navigation-button">Change Response</a>
          <Link to="/bpq">
            <button className="next-button" onClick={updateAndNavigate} disabled={!selectedSugarLevel}>Next</button>
          </Link>
        </div>
      </div>
      <img src={logoImage} alt="Logo" className="logo-image" />
    </div>
  );
}

export default BloodSugarLevelQuestion;
