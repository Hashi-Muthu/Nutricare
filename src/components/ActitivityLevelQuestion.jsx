import React, { useState } from 'react';
import './ActivityLevelPage.css'; // Import the CSS file for styling
import { useGlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';



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

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const updateAndNavigate = () => {
    if (selectedActivity) {
      globalArray[5] = selectedActivity;

      // Update the global context with the selected response
      updateGlobalArrayAtIndex(5, selectedActivity);

      // Navigate to the next page with the updated array
      navigate('/fp', { state: { array: globalArray } });
    }
  };

  return (
    <div className="activity-page-container">
      <div className="activity-list-container">
        <h2>How Much Active Are You?</h2>
        <ul className="activity-list">
          {activityLevels.map((activity) => (
            <li
              key={activity.symbol}
              className={`activity-option ${selectedActivity === activity.symbol ? 'selected' : ''}`}
            >
              <span className="activity-symbol">{activity.symbol}</span>
              <div>
                <h2>{activity.level}</h2>
                <p>{activity.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="options-container">
      <h2>Select your Option here</h2><br/>
        <div className="options-rowb">
          {activityLevels.map((activity) => (
            <label
              key={activity.symbol}
              className={`option ${selectedActivity === activity.symbol ? 'selected' : ''}`}
            >
              <input
                type="radio"
                value={activity.symbol}
                checked={selectedActivity === activity.symbol}
                onChange={handleActivityChange}
              />
              {activity.symbol}
            </label>
          ))}
        </div>

        {selectedActivity && <p>You selected: {selectedActivity}</p>}
        <br/>
        <div className="navigation-buttons">
          <a href="/gq" className="navigation-button">
            Change Responses
          </a>
          <button
            className="next-button"
            onClick={updateAndNavigate}
            disabled={!selectedActivity}
          >
            Next
          </button>
        </div>
      </div>

      <div className="home-button">
        
      </div>
    </div>
  );
}

export default ActivityLevelPage;
