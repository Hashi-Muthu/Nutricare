import React, { useState } from 'react';
import './NutritionPage.css'; // Import your CSS file
import logoImage from '../images/Newlogo.png';
import AllergyDialog from './AllergyDialog';
import OutputF from './OutputF';
import axios from 'axios';

function NutritionPage() {
  const [isAllergyDialogOpen, setAllergyDialogOpen] = useState(false);
  const [selectedNutrition, setSelectedNutrition] = useState('');
  const [submittedAllergies, setSubmittedAllergies] = useState('');

  const handleNutritionButtonClick = (nutrition) => {
    setSelectedNutrition(nutrition);
    setAllergyDialogOpen(true);
  };

  const closeAllergyDialog = () => {
    setAllergyDialogOpen(false);
  };

  const handleSubmitAllergies = (allergies) => {
    // Handle submitted allergies
    console.log('Submitted allergies:', allergies);

    // Send selectedNutrition and submittedAllergies to FastAPI backend
    axios
      .post('http://localhost:8000/send-message/', {
        user: 'User1', // You can replace this with an actual user identifier
        text: `Selected Nutrition: ${selectedNutrition}, Submitted Allergies: ${allergies}`,
      })
      .then((response) => {
        console.log('API Response:', response.data.message);
        // Display the response in OutputF
        setSubmittedAllergies(response.data.message);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };

  return (
    <div className="nutrition-page">
      <header>
        <h1 style={{ color: 'white' }}>Click on the Nutrition You Want to Get Food Recommendations</h1>
      </header>
      <main>
        <div className="center-buttons">
          <button className="nutrition-button" onClick={() => handleNutritionButtonClick('Carbohydrates')}>
            Food with Carbohydrates
          </button>
          <button className="nutrition-button" onClick={() => handleNutritionButtonClick('Proteins')}>
            Food with Proteins
          </button>
          <button className="nutrition-button" onClick={() => handleNutritionButtonClick('Fats')}>
            Food with Fats
          </button>
          <button className="nutrition-button" onClick={() => handleNutritionButtonClick('Minerals')}>
            Food with Minerals
          </button>
          <button className="nutrition-button" onClick={() => handleNutritionButtonClick('Vitamins')}>
            Food with Vitamins
          </button>
          <button className="nutrition-button" onClick={() => handleNutritionButtonClick('Iron')}>
            Food with Iron
          </button>
        </div>
        <div className="back-links">
          <a href="/"><button className="button">Back to Home</button></a>
          <a href="/r"><button className="button">Back to Nutrition Guidelines</button></a>
        </div>
        {isAllergyDialogOpen && (
          <AllergyDialog onClose={closeAllergyDialog} onSubmit={handleSubmitAllergies} />
        )}
        <OutputF text={submittedAllergies} />
      </main>
      <footer>
        <img src={logoImage} alt="Footer" className="footer-image" />
      </footer>
    </div>
  );
}

export default NutritionPage;
