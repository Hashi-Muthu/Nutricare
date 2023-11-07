import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../GlobalContext';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import logoImage from '../images/Newlogo.png';

const windowStyle = {
  backgroundColor: 'green', // Set the window background color to green
};

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
    <div style={windowStyle}>

      <Container style={{backgroundSize:'Cover', padding: '120px'}}>
        
        <div style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '20px', borderRadius: '10px', marginBottom: '40px',marginTop: '40px'  }}>
        <Typography variant="h4" align="center">
          Identify  your blood pressure level range here
        </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Blood pressure level</TableCell>
                <TableCell>Hypotension</TableCell>
                <TableCell>Normal Blood Pressure</TableCell>
                <TableCell>Mild Hyperglycemia</TableCell>
                <TableCell>Moderate Hyperglycemia</TableCell>
                <TableCell>Severe Hyperglycemia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>systolic blood pressure Range</TableCell>
                <TableCell>Less than 90</TableCell>
                <TableCell>Less than 120</TableCell>
                <TableCell>120-129</TableCell>
                <TableCell>130-139</TableCell>
                <TableCell>140 mm Hg or higher</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>diastolic blood pressure Range</TableCell>
                <TableCell>Less than 60</TableCell>
                <TableCell>Less than 80</TableCell>
                <TableCell>Less than 80</TableCell>
                <TableCell>80-89</TableCell>
                <TableCell>90 mm Hg or higher</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Response Symbol</TableCell>
                <TableCell>P1</TableCell>
                <TableCell>P2</TableCell>
                <TableCell>P3</TableCell>
                <TableCell>P4</TableCell>
                <TableCell>P5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div style={{ backgroundColor: 'rgb(255,255,255)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Select a response:</Typography>
            </Grid>
            <Grid item xs={12}>
              <Radio
                value="P1"
                checked={selectedBloodPressure === "P1"}
                onChange={handleBloodPressureChange}
              />
              P1
            </Grid>
            <Grid item xs={12}>
              <Radio
                value="P2"
                checked={selectedBloodPressure === "P2"}
                onChange={handleBloodPressureChange}
              />
              P2
            </Grid>
            <Grid item xs={12}>
              <Radio
                value="P3"
                checked={selectedBloodPressure === "P3"}
                onChange={handleBloodPressureChange}
              />
              P3
            </Grid>
            <Grid item xs={12}>
              <Radio
                value="P4"
                checked={selectedBloodPressure === "P4"}
                onChange={handleBloodPressureChange}
              />
              P4
            </Grid>
            <Grid item xs={12}>
              <Radio
                value="P5"
                checked={selectedBloodPressure === "P5"}
                onChange={handleBloodPressureChange}
              />
              P5
            </Grid>
          </Grid>
        </div>
        {selectedBloodPressure && (
          <Typography variant="body1" style={{marginTop:'10px'}}>You selected: {selectedBloodPressure} </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6} style={{marginLeft:'310px',marginTop:'10px'}}>
            <Link to="/gq" style={{marginRight:'10px'}}>
              <Button variant="contained" color="primary"  style={{ backgroundColor: 'White',color:'Black' }}>
                Change Response
              </Button>
            </Link>
  
        
            <Button
              variant="contained"
              color="primary"
              onClick={updateAndNavigate}
              disabled={!selectedBloodPressure}
              style={{ backgroundColor: 'White',color:'Black' }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <img src={logoImage} alt="Logo" style={{ width: '100px' }} />
      </Container>
    </div>
  );
}

export default BloodPressureLevelPage;
