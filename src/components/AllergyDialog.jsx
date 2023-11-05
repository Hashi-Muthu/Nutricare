import React, { useState } from 'react';
import './AllergyDialog.css'; // Import your CSS file

function AllergyDialog({ onClose, onSubmit }) {
  const [allergies, setAllergies] = useState('');

  const handleInputChange = (event) => {
    setAllergies(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(allergies);
    onClose();
    
  };

  return (
    <div className="allergy-dialog-container">
      <div className="allergy-dialog">
        <h2>Food Allergies</h2>
        <p>Enter the food(s) you are allergic to (separated by commas):</p>
        <textarea
          rows="4"
          value={allergies}
          onChange={handleInputChange}
        /><br />
        <div className="button-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button><br/>
          <button className="submit-button" onClick={onClose}> close</button>
        </div>
      </div>
    </div>
  );
}

export default AllergyDialog;
