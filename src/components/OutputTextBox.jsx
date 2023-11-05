import React from 'react';

function OutputTextBox({ updatedArray, receivedMessage }) {
  return (
    <div className="output-text-box">
      <h2>Updated Global Array:</h2>
      <ul>
        {updatedArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {receivedMessage && ( // Only display if receivedMessage is not empty
        <div>
          <h2>Received Message:</h2>
          <p>{receivedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default OutputTextBox;
