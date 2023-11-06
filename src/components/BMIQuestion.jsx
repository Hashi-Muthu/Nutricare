import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './BMIQuestion.css';
import { useGlobalContext } from '../GlobalContext';
import FormControlLabel from '@mui/material/FormControlLabel';

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
    console.log(selectedBMI);
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
        console.log(globalArray);
        navigate('/bsq', { state: { array: globalArray } });
      } else {
        setShowWarning(true);
      }
    }
  };
  const Changeresponse = () => {
    navigate('/');
  }
  return (
    <div style={{ minHeight: '100vh', display: 'column', justifyContent: 'center', alignItems: 'center' }} className="body-containerb">
      <div className="overlay">
        <Container maxWidth="md" style={{ marginBottom: '0px' }} >
       
          <div className="bmi-question-container" style={{ marginBottom: '10px' }} >
          
            <Grid container spacing={12}>
              
              <Grid item xs={12} sm={6} style={{ marginLeft: '2px' }} >
                <div className="bmi-options-column">
                <Typography variant="h4" style={{marginTop: '20px' }}>What is your BMI Range?</Typography>
          <Typography variant="h6" style={{marginTop: '10px' }}>Use the calculator if you don't know the BMI</Typography>
                  
                  <div className="gender-options">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedBMI === 'Below 18.5'}
                          onChange={() => handleBMIChange({ target: { value: 'Below 18.5' } })}
                        />
                      }
                      label="Below 18.5"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedBMI === 'Between 18.5 and 24.9'}
                          onChange={() =>
                            handleBMIChange({ target: { value: 'Between 18.5 and 24.9' } })
                          }
                        />
                      }
                      label="Between 18.5 and 24.9"
                      style={{marginLeft:'60px'}}
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedBMI === 'Between 25 and 29.9'}
                          onChange={() =>
                            handleBMIChange({ target: { value: 'Between 25 and 29.9' } })
                          }
                        />
                      }
                      label="Between 25 and 29.9"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedBMI === 'Between 30 and 34.9'}
                          onChange={() =>
                            handleBMIChange({ target: { value: 'Between 30 and 34.9' } })
                          }
                        />
                      }
                      label="Between 30 and 34.9"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedBMI === '35 or higher'}
                          onChange={() => handleBMIChange({ target: { value: '35 or higher' } })}
                        />
                      }
                      label="35 or higher"
                      style={{marginLeft:'140px'}}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginBottom: '12px' }} > 
  <div className="bmi-options-column">
    <Typography variant="h4" style={{ marginBottom: '10px' }}>BMI Calculator</Typography>
    <TextField
      fullWidth
      label="Height (in cm)"
      type="number"
      value={height}
      onChange={handleHeightChange}
      style={{ marginBottom: '10px' }} 
    />
    <TextField
      fullWidth
      label="Weight (in kg)"
      type="number"
      value={weight}
      onChange={handleWeightChange}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={calculateBMI}
      style={{ background: 'Green', color: 'White' }}
    >
      Calculate BMI
    </Button>
    {bmiResult && (
      <Typography variant="body1" className="bmi-result">
        Your BMI: {bmiResult.toFixed(2)}
      </Typography>
    )}
    {showWarning && (
      <Typography variant="body1" className="warning">
        Please select your BMI range before proceeding.
      </Typography>
    )}
  </div>
</Grid>

            </Grid>
          </div>
        </Container>

        <div className="next-button-containerg">
         
            <Button onClick={Changeresponse} variant="contained" color="primary"   style={{ background: 'White', color: 'black' ,marginLeft: '-154px',marginRight:'4px'} }>
              Change responses
            </Button>
         

         
            <Button
              variant="contained"
              color="primary"
              className="next-buttong"
              onClick={updateAndNavigate}
              
              style={{ background: 'White', color: 'black' }}
              disabled={!selectedBMI}
            >
              Next
            </Button>
         
        </div>
      </div>
    </div>
  );
}

export default BMIQuestion;
