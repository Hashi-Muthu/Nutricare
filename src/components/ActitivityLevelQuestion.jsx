import React, { useState } from 'react';
import { useGlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const activityLevels = [
  {
    symbol: 'A1',
    level: 'Sedentary',
    description: 'Little to no physical activity beyond that associated with daily living',
  },
  {
    symbol: 'A2',
    level: 'Low activity',
    description: 'Engages in light physical activity for at least 30 minutes per day (e.g. walking, gardening, yoga)',
  },
  {
    symbol: 'A3',
    level: 'Moderate activity',
    description: 'Engages in moderate physical activity for at least 30 minutes per day (e.g. brisk walking, cycling, swimming)',
  },
  {
    symbol: 'A4',
    level: 'High activity',
    description: 'Engages in vigorous physical activity for at least 20-30 minutes per day (e.g. running, high-intensity interval training, sports)',
  },
  {
    symbol: 'A5',
    level: 'Elite athlete',
    description: 'Engages in very high levels of physical activity specific to their sport or activity',
  },
];

function ActivityLevelPage() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { globalArray, updateGlobalArrayAtIndex } = useGlobalContext();
  const navigate = useNavigate();

  const handleActivitySelect = (activitySymbol) => {
    setSelectedActivity(activitySymbol);
  };

  const updateAndNavigate = () => {
    if (selectedActivity) {
      globalArray[5] = selectedActivity;
      updateGlobalArrayAtIndex(5, selectedActivity);
      navigate('/fp', { state: { array: globalArray } });
    }
  }

  const Changeresponse = () => {
    navigate('/');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="overlay">
        <div className="options-container">
          <Grid container spacing={12} style={{ marginBottom: '0px', backgroundColor: 'white', marginTop: '40px' }}>
            <Grid item xs={12} sm={6} style={{ marginLeft: '2px' }}>
              <div className="activity-options-column">
                <Typography variant="h4" style={{ marginTop: '2px' }}>How Much Active Are You?</Typography>
                <Typography variant="h6" style={{ marginTop: '2px' }}>Select your activity level:</Typography>
                <div className="white-container">
                  <ul className="activity-list" style={{ width: '180%', marginBottom: '120px' }}>
                    {activityLevels.map((activity) => (
                      <li
                        key={activity.symbol}
                        className={ `activity-option ${selectedActivity === activity.symbol ? 'selected' : ''}` }
                        onClick={() => handleActivitySelect(activity.symbol)}
                        style={{ marginTop: '2px' }}
                      >
                        
                        <div  >
                        <span className="activity-symbol" >{activity.symbol}</span>
                          <Typography variant="h5">{activity.level}</Typography>
                          <Typography variant="body1">{activity.description}</Typography>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="next-button-containerg" style={{ marginTop: '580px' }}>
          <Button
            onClick={Changeresponse}
            variant="contained"
            style={{ color: 'white', marginLeft: '-184px', marginRight: '4px', background: 'green' }}
          >
            Change responses
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="next-buttong"
            onClick={updateAndNavigate}
            style={{ background: selectedActivity ? 'green' : 'gray', color: 'white' }}
            disabled={!selectedActivity}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ActivityLevelPage;
