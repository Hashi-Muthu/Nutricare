import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BloodSugarLevelQuestion.css';
import logoImage from '../images/Newlogo.png';

import { useGlobalContext } from '../GlobalContext';
import { Container, Typography, Radio, FormControlLabel, Button, Grid, Box, Paper} from '@mui/material';

function BloodSugarLevelQuestion() {
  const [selectedSugarLevel, setSelectedSugarLevel] = useState(null);
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();

  const handleSugarLevelChange = (event) => {
    setSelectedSugarLevel(event.target.value);
  };

  const updateAndNavigate = () => {
    if (selectedSugarLevel) {
      switch (selectedSugarLevel) {
        case 'Below 70 mg/dL':
          globalArray[2] = 'D1';
          break;
        case 'Between 70 and 99 mg/dL':
          globalArray[2] = 'D2';
          break;
        case 'Between 100 and 199 mg/dL':
          globalArray[2] = 'D3';
          break;
        case 'Between 200 and 399 mg/dL':
          globalArray[2] = 'D4';
          break;
        case '400 mg/dL or higher':
          globalArray[2] = 'D5';
          break;
        case 'Other':
          globalArray[2] = 'D6'; // Or any other identifier for "Other"
          break;
        default:
          globalArray[2] = '';
      }
      updateGlobalArrayAtIndex(2, globalArray[2]);
      navigate('/bpq', { state: { array: globalArray } });
    }
  }
  
  const ChangeResponse = () => {
    navigate('/gq', { state: { array: globalArray } });
  };

  
  return (
    <Container maxWidth="md"  style={{ marginTop: '80px' ,marginLeft:'780px'}}>
      <Grid container justifyContent="center" alignItems="center" >
        

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '100px', backgroundColor: ' #1fa130',height:'680px',width:'700px',fontSize:'40px',color:'white',borderRadius:'80px' }}>
          <Typography variant="h4">What is your Blood Sugar Level Range?</Typography>
          
            
            <div className="sugar-level-options">
              <div className="sugar-level-row">
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedSugarLevel === 'Below 70 mg/dL'}
                      onChange={() => handleSugarLevelChange({ target: { value: 'Below 70 mg/dL' } })}
                      style={{color:'white'}}
                    />
                  }
                  label="Below 70 mg/dL"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedSugarLevel === 'Between 100 and 199 mg/dL'}
                      onChange={() => handleSugarLevelChange({ target: { value: 'Between 100 and 199 mg/dL' } })}
                      style={{color:'white'}}
                    />
                  }
                  label="Between 100 and 199 mg/dL"
                  style={{marginLeft:'60px'}}
                />
              </div>
              <div className="sugar-level-row">
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedSugarLevel === 'Between 70 and 99 mg/dL'}
                      onChange={() => handleSugarLevelChange({ target: { value: 'Between 70 and 99 mg/dL' } })}
                      style={{color:'white'}}
                    />
                  }
                  label="Between 70 and 99 mg/dL"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedSugarLevel === 'Between 200 and 399 mg/dL'}
                      onChange={() => handleSugarLevelChange({ target: { value: 'Between 200 and 399 mg/dL' } })}
                      style={{color:'white'}}
                    />
                  }
                  label="Between 200 and 399 mg/dL"
                />
              </div>
           
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedSugarLevel === '400 mg/dL or higher'}
                      onChange={() => handleSugarLevelChange({ target: { value: '400 mg/dL or higher' } })}
                      style={{color:'white'}}
                    />
                  }
                  label="400 mg/dL or higher"
                  style={{marginLeft:'140px'}}
                />
               
              </div>
            
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: '280px'}}>
          <div className="logo-image" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logoImage} alt="Logo" style={{ height:'180px',width:'350px'}} />
          </div>
        </Grid>

        <Grid item xs={12} style={{ marginTop: '10px' ,marginLeft:'-160px'}}>
          <Box display="flex" justifyContent="center" style={{ marginTop: '10px' ,marginLeft:'-40px'}} >
          <div className="next-button-containerg">
              <Button
                variant="contained"
                color="success"
                className="next-button"
                onClick={ChangeResponse}
                style={{ marginRight: '12px' }} 
              >
                Change Response
              </Button>
              <Button
                variant="contained"
                color="success"
                className="next-button"
                onClick={updateAndNavigate}
                disabled={!selectedSugarLevel}
                style={{ marginLeft: '45px' }} 
              >
                Next
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BloodSugarLevelQuestion;
