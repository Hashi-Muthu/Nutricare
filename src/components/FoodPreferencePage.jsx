import React, { useState } from 'react';
import './FoodPreferencePage.css';
import { useGlobalContext } from '../GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import vegetarianImage from '../images/vegetarian.png';
import veganImage from '../images/vegan.png';
import nonVegImage from '../images/non-veg.png';
import halalImage from '../images/halal.png';
import paleoImage from '../images/paleo.png';

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

function FoodPreferencePage() {
  const [selectedFoodPreference, setSelectedFoodPreference] = useState(null);
 
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();

  const handleFoodPreferenceChange = (foodPreference) => {
    setSelectedFoodPreference(foodPreference);
   
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
      <Typography variant="h4" style={{ color: 'white', marginTop: '40px' }}>Choose Your Food Preference</Typography>
      <Typography variant="body1" style={{ color: 'white', marginTop: '40px' }}>
          Click on an image to select your food preference.
        </Typography>
      <Grid container spacing={2} className="options-container" style={{ marginTop: '40px',borderRadius:'12px' }}>
        {foodOptions.map((option) => (
          <Grid item xs={6} sm={3} key={option.value}>
            <Paper
              className={`option-container ${selectedFoodPreference === option.value ? 'selected' : ''}`}
              onClick={() => handleFoodPreferenceChange(option.value)}
            >
              <Tooltip title={option.content} arrow>
                <div>
                  <img src={option.image} alt={option.title} className="option-image" />
                  <Typography variant="h6" style={{ textAlign: 'center'}}>
                    {option.title}
                  </Typography>
                </div>
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <div className="navigation-buttons" style={{marginTop:'280px'}}>
      <Link to="/gq" style={{marginRight:'10px'}}>
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            
            disabled={!selectedFoodPreference}
            style={{background:'white',color:'black'}}
          >
            Change Responses
          </Button>
        </Link>
        <Link to="/r">
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            onClick={updateAndNavigate}
            disabled={!selectedFoodPreference}
            style={{background:'white',color:'black'}}
          >
            Submit
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FoodPreferencePage;
