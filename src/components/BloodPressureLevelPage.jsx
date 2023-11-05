import React, { useState } from 'react';
import './BloodPressureLevelPage.css'; // Import the CSS file for styling
import home from '../images/Home.png';
import logoImage from '../images/Newlogo.png';
import { useGlobalContext } from '../GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

function BloodPressureLevelPage() {
  const [selectedBloodPressure, setSelectedBloodPressure] = useState(null);
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();

  const handleBloodPressureChange = (event) => {
    setSelectedBloodPressure(event.target.value);
  };

  const updateAndNavigate = () => {
    if (globalArray && globalArray.length >= 0 && selectedBloodPressure) {
      const updatedArray = [...globalArray];
      console.log('Updated Global Array:', updatedArray);
      globalArray[3] = selectedBloodPressure;

      // Update the global context with the updated array
      updateGlobalArrayAtIndex(3, selectedBloodPressure);
      console.log('Updated Global Array:', globalArray);
      // Navigate to the next page with the updated array
      navigate('/bcq', { state: { array: globalArray } });
    }
  };

  return (
    <div>
      <div className="home-button">
        <a href="/">
          <img src={home} alt="Home" />
        </a>
      </div>
      <div className="blood-pressure-level-container">
        <h1>Specify your blood pressure level range here</h1>
        <div className="table-container">
          <table className="blood-pressure-table">
            <thead>
              <tr>
                <th>Blood pressure level</th>
                <th>Hypotension</th>
                <th>Normal Blood Pressure</th>
                <th>Mild Hyperglycemia</th>
                <th>Moderate Hyperglycemia</th>
                <th>Severe Hyperglycemia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>systolic blood pressure Range</td>
                <td>Less than 90</td>
                <td>Less than 120</td>
                <td>120-129</td>
                <td>130-139</td>
                <td>140 mm Hg or higher</td>
              </tr>
              <tr>
                <td>diastolic blood pressure Range</td>
                <td>Less than 60</td>
                <td>Less than 80</td>
                <td>Less than 80</td>
                <td>80-89</td>
                <td>90 mm Hg or higher</td>
              </tr>
              <tr>
                <td>Response Symbol</td>
                <td>P1</td>
                <td>P2</td>
                <td>P3</td>
                <td>P4</td>
                <td>P5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="options-containers">
          <div className="options-rows">
            <label
              className={`option ${selectedBloodPressure === "P1" ? 'selected' : ''}`}
            >
              <input
                type="radio"
                value="P1"
                checked={selectedBloodPressure === "P1"}
                onChange={handleBloodPressureChange}
              />
              P1
            </label>
            <label
              className={`option ${selectedBloodPressure === "P2" ? 'selected' : ''}`}
            >
              <input
                type="radio"
                value="P2"
                checked={selectedBloodPressure === "P2"}
                onChange={handleBloodPressureChange}
              />
              P2
            </label>
            <label
              className={`option ${selectedBloodPressure === "P3" ? 'selected' : ''}`}
            >
              <input
                type="radio"
                value="P3"
                checked={selectedBloodPressure === "P3"}
                onChange={handleBloodPressureChange}
              />
              P3
            </label>
            <label
              className={`option ${selectedBloodPressure === "P4" ? 'selected' : ''}`}
            >
              <input
                type="radio"
                value="P4"
                checked={selectedBloodPressure === "P4"}
                onChange={handleBloodPressureChange}
              />
              P4
            </label>
            <label
              className={`option ${selectedBloodPressure === "P5" ? 'selected' : ''}`}
            >
              <input
                type="radio"
                value="P5"
                checked={selectedBloodPressure === "P5"}
                onChange={handleBloodPressureChange}
              />
              P5
            </label>
          </div>
        </div>
        {selectedBloodPressure && (
          <p>You selected: {selectedBloodPressure}</p>
        )}
        <div className="navigation-buttons4">
          <a href="/gq" className="navigation-button2">
            Change Response
          </a>
          <Link to="/bcq">
            <button
              className="next-button"
              onClick={updateAndNavigate}
              disabled={!selectedBloodPressure}
            >
              Next
            </button>
          </Link>
        </div>
        <img
          src={logoImage}
          alt="Logo"
          className="logo-image"
        />{" "}
        {/* Add the logo image */}
      </div>
    </div>
  );
}

export default BloodPressureLevelPage;
