import React, { useState } from 'react';
import './FoodPreferencePage.css';
import vegetarianImage from '../images/vegetarian.png';
import veganImage from '../images/vegan.png';
import nonVegImage from '../images/non-veg.png';
import halalImage from '../images/halal.png';
import paleoImage from '../images/paleo.png';

import { useGlobalContext } from '../GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

function FoodPreferencePage() {
  const [selectedFoodPreference, setSelectedFoodPreference] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState('');
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();
  const foodOptions = [
    {
      value: 'F1',
      image: vegetarianImage,
      title: 'Vegetarian',
      content: 'Vegetarianism involves abstaining from consuming meat, fish, and poultry...',
    },
    {
      value: 'F2',
      image: veganImage,
      title: 'Vegan',
      content: 'Veganism takes vegetarianism a step further by excluding all animal products...',
    },
    {
      value: 'F3',
      image: nonVegImage,
      title: 'Non-Veg',
      content: 'Non-vegetarian diets include the consumption of meat, fish, poultry, and seafood...',
    },
    {
      value: 'F4',
      image: halalImage,
      title: 'Halal',
      content: 'Halal refers to foods that are permissible and lawful according to Islamic dietary laws...',
    },
    {
      value: 'F5',
      image: paleoImage,
      title: 'Paleo',
      content: 'The Paleo diet is inspired by the dietary patterns of our ancient ancestors from the Paleolithic era...',
    },
  ];

  const handleFoodPreferenceChange = (foodPreference) => {
    setSelectedFoodPreference(foodPreference);
  };

  const openDescription = (content) => {
    setDescriptionContent(content);
    setShowDescription(true);
  };

  const closeDescription = () => {
    setShowDescription(false);
    setDescriptionContent('');
  };

  const updateAndNavigate = async () => {
    if (globalArray && globalArray.length >= 0 && selectedFoodPreference) {
      const updatedArray = [...globalArray];
      console.log('Updated Global Array:', updatedArray);
      globalArray[6] = selectedFoodPreference;

      // Update the global context with the updated array
      updateGlobalArrayAtIndex(6, selectedFoodPreference);
      console.log('Updated Global Array:', globalArray);

      // Navigate to the next page with the updated array
      navigate('/r', { state: { array: globalArray } });
    }
  };

  return (
    <div className="food-preference-page-container">
      <h1 style={{ color: 'white' }}>Choose Your Food Preference</h1>
        <span className="italic-14">
          Click the label to select an option and hover over the image to get more information.
        </span>
     
      <div className="options-container">
        {foodOptions.map((option) => (
          <div key={option.value} className="option-container">

<img
                src={option.image}
                alt={option.title}
                className="option-image"
                onMouseEnter={() => openDescription(option.content)}
                
              /><br/>
            <label
              className={`option-label ${selectedFoodPreference === option.value ? 'selected' : ''}`}
              onClick={() => handleFoodPreferenceChange(option.value)}
            >
              {option.title}
            </label>
            <br></br>
           
          </div>
        ))}
        <div>
        
      </div>
      </div>
      <div className="navigation-buttons">
        <a href="/al" className="navigation-button">
          Change Responses
        </a>
        <Link to="/r">
          <button className="submit-button" onClick={updateAndNavigate} disabled={!selectedFoodPreference}>
            Submit
          </button>
        </Link>
      </div>
      {showDescription && (
        <div className="description-overlay">
          <div className="description-box">
            <button className="close-button" onClick={closeDescription}>
              X
            </button>
            <p>{descriptionContent}</p>
          </div>
        </div>
      )}
     

     
    </div>
  );
}

export default FoodPreferencePage;
