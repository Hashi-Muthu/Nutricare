import React, { useState } from 'react';
import { useGlobalContext } from '../GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';

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
      console.log('Updated Global Array:', updatedArray);

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
      updateGlobalArrayAtIndex(4, globalArray[4]);
      console.log('Updated Global Array:', globalArray);
      // Navigate to the next page with the updated array
      navigate('/al', { state: { array: globalArray } });
    }
  }

  return (
    <Container >
      <Grid container justifyContent="center" alignItems="center" style={{ borderRadius:'18px',backgroundColor: 'green', minHeight: '50vh',marginTop:'140px',marginBottom:'20px' ,color:'white'}}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
            What is your Blood Cholesterol Level?
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2} justifyContent="center" alignItems="center" >
          <FormControlLabel
            value="Normal range: 0-200 mg/dL"
            control={
              <Radio
                checked={selectedCholesterolLevel === 'Normal range: 0-200 mg/dL'}
                onChange={handleCholesterolLevelChange}
                value="Normal range: 0-200 mg/dL"
                style={{ transform: 'scale(1.5)',color:'white' }}
              />
            }
            label="Normal range: 0-200 mg/dL"
          />
          <FormControlLabel
            value="Borderline high: 200-240 mg/dL"
            control={
              <Radio
                checked={selectedCholesterolLevel === 'Borderline high: 200-240 mg/dL'}
                onChange={handleCholesterolLevelChange}
                value="Borderline high: 200-240 mg/dL"
                style={{ transform: 'scale(1.5)',color:'white' }}
              />
            }
            label="Borderline high: 200-240 mg/dL"
          />
          <FormControlLabel
            value="High: 240-300 mg/dL"
            control={
              <Radio
                checked={selectedCholesterolLevel === 'High: 240-300 mg/dL'}
                onChange={handleCholesterolLevelChange}
                value="High: 240-300 mg/dL"
                style={{ transform: 'scale(1.5)',color:'white'  }}
              />
            }
            label="High: 240-300 mg/dL"
          />
          <FormControlLabel
            value="Very high: 300-500 mg/dL"
            control={
              <Radio
                checked={selectedCholesterolLevel === 'Very high: 300-500 mg/dL'}
                onChange={handleCholesterolLevelChange}
                value="Very high: 300-500 mg/dL"
                style={{ transform: 'scale(1.5)',color:'white'  }}
              />
            }
            label="Very high: 300-500 mg/dL"
          />
          <FormControlLabel
            value="Extremely high: above 500 mg/dL"
            control={
              <Radio
                checked={selectedCholesterolLevel === 'Extremely high: above 500 mg/dL'}
                onChange={handleCholesterolLevelChange}
                value="Extremely high: above 500 mg/dL"
                style={{ transform: 'scale(1.5)',color:'white'  }}
              />
            }
            label="Extremely high: above 500 mg/dL"
          />
        </Grid>
        <Grid item xs={12}>
          {selectedCholesterolLevel && (
            <Typography variant="body1">You selected: {selectedCholesterolLevel}</Typography>
          )}
        </Grid>
        
        
      </Grid>
      <Grid item xs={6} style={{ marginBottom: '20px',marginLeft:'410px' }}>
      <Button
            component={Link}
            to="/gq"
            variant="contained"
            color="primary"
            style={{ backgroundColor: 'green',marginRight:'10px' }}
          >
            Change Responses
            
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={updateAndNavigate}
            disabled={!selectedCholesterolLevel}
            style={{ backgroundColor: 'green' }}
          >
            Next
          </Button>
    
       
          
          </Grid>
    </Container>
  );
}

export default BloodCholesterolLevelPage;
