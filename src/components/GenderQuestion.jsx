import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import girl from '../images/girl.png';
import boy from '../images/boy.png';
import './GenderQuestion.css';
import logoImage from '../images/Newlogo.png';

import { useGlobalContext } from '../GlobalContext.js';

function GenderQuestion() {
  const [selectedGender, setSelectedGender] = useState(null);
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();
 

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const addItem = () => {
    if (selectedGender) {
      globalArray[0] = selectedGender === 'Male' ? 'M' : 'F';
      console.log(globalArray)
      updateGlobalArrayAtIndex(0, globalArray[0]);
      navigate('/bq', { state: { array: globalArray } });
    }
  };

  return (
   
    <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}className='body-conatiner'>
       <div className='overlay'>
      <div className="gender-question-container" style={{ backgroundColor: 'green', padding: '20px' }}>
        <img src={logoImage} alt="Logo" className="logo-image" />

        <h2 className="gender-question-containerh1">What is your Gender?</h2>

        <div className="gender-options-container">
          <div className="gender-option">
            <img src={girl} alt="Female" className="gender-image" />
            <label className="radio-label">
              <input
                type="radio"
                value="Female"
                checked={selectedGender === 'Female'}
                onChange={handleGenderChange}
              />
              Female
            </label>
          </div>
          <div className="gender-option">
            <img src={boy} alt="Male" className="gender-image" />
            <label className="radio-label">
              <input
                type="radio"
                value="Male"
                checked={selectedGender === 'Male'}
                onChange={handleGenderChange}
              />
              Male
            </label>
          </div>
        </div>

        {selectedGender && <p>You selected: {selectedGender}</p>}

        <div className="next-button-containerg">
          <Link to="/">
            <button className="next-buttong">Back to Home</button>
          </Link>
          <Link to="/bq">
            <button className="next-buttong" onClick={addItem} disabled={!selectedGender}>Next</button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default GenderQuestion;
