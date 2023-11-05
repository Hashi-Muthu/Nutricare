import React, { useState } from 'react';
import './RecommendationPage.css';
import { useGlobalContext } from '../GlobalContext';
import OutputTextBox from './OutputTextBox.jsx';

import logo from '../images/Newlogo.png';
import jsPDF from 'jspdf';

function RecommendationPage() {
  const { globalArray } = useGlobalContext();
  const [receivedMessage, setReceivedMessage] = useState('');

  const sendMessage = async () => {
    try {
      const response = await fetch('http://localhost:8000/send-and-receive-message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'User', text: globalArray.join(',') }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Message sent and received successfully:', data.message);

        setReceivedMessage(data.message);
      } else {
        console.error('Failed to send the message');
      }
    } catch (error) {
      console.error('Error sending the message:', error);
    }
  };

  const convertToPDFAndDownload = () => {
    const doc = new jsPDF({
      orientation: 'portrait', // A4 is portrait orientation
      unit: 'mm',
      format: 'a4',
      lineHeight: 1.4,
    });

    // Set font size and color
    doc.setFontSize(12);
    doc.setTextColor(128, 0, 128); // Purple color

    // Add an image to the PDF
    const imgData = logo; // Replace with the actual image data
    doc.addImage(imgData, 'PNG', 10, 10, 40, 40); // Adjust coordinates and dimensions as needed

    // Split the received message into lines to fit within the A4 size
    const textLines = doc.splitTextToSize(receivedMessage, 180); // Adjust the width as needed

    // Add the received message to the PDF
    doc.text(10, 60, textLines); // Adjust coordinates as needed

    // Save the PDF with a specified filename
    doc.save('recommendation.pdf');
  };

  return (
    <div className="recommendation-page">
      <img src={logo} alt="Logo" className="logo" />
      <h1 style={{ color: 'white' }} className="rh">
        Click on the button below the text box to get your personalized recommendations
      </h1>
      
      <OutputTextBox updatedArray={globalArray} receivedMessage={receivedMessage} />
      <div>
        <button className="message-button" onClick={sendMessage}>
          Get My Personalized Recommendation
        </button>
        <button className="message-button" onClick={convertToPDFAndDownload}>
          Download as PDF
        </button>
      </div>
      <div className="navigation-buttonsr1">
        <a href="/gq" className="navigation-buttonr">
          Change The Personal Data
        </a>
      </div>
      <div className="navigation-buttonsr2">
        <a href="/np" className="navigation-buttonr">
          Learn More About the Food I Want to Eat
        </a>
      </div>
    </div>
  );
}

export default RecommendationPage;
