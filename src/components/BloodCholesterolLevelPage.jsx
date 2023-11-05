import React, { useState } from 'react';
import './BloodCholesterolLevelPage.css';
import logoImage from '../images/Newlogo.png';
import c from '../images/c.png';
import { useGlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';

function BloodCholesterolLevelPage() {
  const [selectedCholesterolLevel, setSelectedCholesterolLevel] = useState(null);
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();

  const handleCholesterolLevelChange = (event) => {
    setSelectedCholesterolLevel(event.target.value);
  };

  const updateAndNavigate = () => {
    if (globalArray && globalArray.length >= 0 && selectedCholesterolLevel) {
      const updatedArray = [...globalArray];
      console.log('Updated Global Array:',updatedArray);
      
      switch (selectedCholesterolLevel) {
        case 'Normal range: 0-200 mg/dL':
          globalArray[4] = 'C1';
          break;
        case 'Borderline high: 200-240 mg/dL':
          globalArray[4] = 'C2';
          break;
        case 'High: 240-300 mg/dL':
          globalArray[4] = 'C3';
          break;
        case 'Very high: 300-500 mg/dL':
          globalArray[4] = 'C4';
          break;
        case 'Extremely high: above 500 mg/dL':
          globalArray[4] = 'C5';
          break;
        default:
          globalArray[4] = '';
      }
      
      // Update the global context with the updated array
      updateGlobalArrayAtIndex(4,globalArray[4]);
      console.log('Updated Global Array:', globalArray);
      // Navigate to the next page with the updated array
      navigate('/al', { state: { array: globalArray } });
    }
  }

  return (
    <div>
      <div className="centered-container">
        <div className="blood-cholesterol-level-container">
          <div className="container-content">
            <h1>What is your Blood Cholesterol Level?</h1>
            <h3>Select the range which your blood cholesterol level belongs</h3>

            <div className="cholesterol-level-options">
              <label
                className={`cholesterol-level-option ${
                  selectedCholesterolLevel === 'Normal range: 0-200 mg/dL' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  value="Normal range: 0-200 mg/dL"
                  checked={selectedCholesterolLevel === 'Normal range: 0-200 mg/dL'}
                  onChange={handleCholesterolLevelChange}
                />
                Normal range: 0-200 mg/dL
              </label>
              <label
                className={`cholesterol-level-option ${
                  selectedCholesterolLevel === 'Borderline high: 200-240 mg/dL' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  value="Borderline high: 200-240 mg/dL"
                  checked={selectedCholesterolLevel === 'Borderline high: 200-240 mg/dL'}
                  onChange={handleCholesterolLevelChange}
                />
                Borderline high: 200-240 mg/dL
              </label>
              <label
                className={`cholesterol-level-option ${
                  selectedCholesterolLevel === 'High: 240-300 mg/dL' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  value="High: 240-300 mg/dL"
                  checked={selectedCholesterolLevel === 'High: 240-300 mg/dL'}
                  onChange={handleCholesterolLevelChange}
                />
                High: 240-300 mg/dL
              </label>
              <label
                className={`cholesterol-level-option ${
                  selectedCholesterolLevel === 'Very high: 300-500 mg/dL' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  value="Very high: 300-500 mg/dL"
                  checked={selectedCholesterolLevel === 'Very high: 300-500 mg/dL'}
                  onChange={handleCholesterolLevelChange}
                />
                Very high: 300-500 mg/dL
              </label>
              <label
                className={`cholesterol-level-option ${
                  selectedCholesterolLevel === 'Extremely high: above 500 mg/dL' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  value="Extremely high: above 500 mg/dL"
                  checked={selectedCholesterolLevel === 'Extremely high: above 500 mg/dL'}
                  onChange={handleCholesterolLevelChange}
                />
                Extremely high: above 500 mg/dL
              </label>
              
            </div>
            <div className="navigation-buttons">
              <a href="/gq" className="navigation-button">
                Change Responses
              </a>
              <button
                className="next-button"
                onClick={updateAndNavigate}
                disabled={!selectedCholesterolLevel}
              >
                Next
              </button>
            </div>
            {selectedCholesterolLevel && (
              <p>You selected: {selectedCholesterolLevel}</p>
            )}

            
          </div>
          <div><img src={c} alt="Logo" className="c-image" /></div>
        </div>
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
      
      
    </div>
  );
}

export default BloodCholesterolLevelPage;
