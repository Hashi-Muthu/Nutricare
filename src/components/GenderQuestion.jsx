import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import girl from '../images/girl.png';
import boy from '../images/boy.png';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import createTheme and ThemeProvider
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
      console.log(globalArray);
      updateGlobalArrayAtIndex(0, globalArray[0]);
      navigate('/bq', { state: { array: globalArray } });
    }
  }

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#fff',
      },
      success: {
        light: '#4caf50',
        main: '#2e7d32',
        dark: '#1b5e20',
      },
    },
  });

  const Gh = () => {
    navigate('/');
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Container
        style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className='body-container'
      >
        <div className='overlay'>
          <div className="gender-question-container" style={{  padding: '20px' }}>
            <img src={logoImage} alt="Logo" className="logo-image" />
            <Typography variant="h4" className="gender-question-containerh1">What is your Gender?</Typography>

            <Grid container spacing={8}>
              <Grid item xs={6}>
                <div className="gender-option">
                  <img src={girl} alt="Female" className="gender-image" />
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="gender-option">
                  <img src={boy} alt="Male" className="gender-image" />
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </div>
              </Grid>
            </Grid>

            {selectedGender && <p>You selected: {selectedGender}</p>}

            <div className="next-button-containerg">
              <Button
                variant="contained"
                color="success"
                className="next-button"
                onClick={Gh}
              >
                Back to Home
              </Button>
              <Button
                variant="contained"
                color="success"
                className="next-button"
                onClick={addItem}
                disabled={!selectedGender}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default GenderQuestion;
