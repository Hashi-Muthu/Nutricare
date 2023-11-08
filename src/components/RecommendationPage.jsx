import React, { useState } from 'react';
import { useGlobalContext } from '../GlobalContext';
import logo from '../images/Newlogo.png';
import jsPDF from 'jspdf';
import signature from '../images/signature.png';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './RecommendationPage.css';

function RecommendationPage() {
  const { globalArray } = useGlobalContext();
  const [receivedMessage, setReceivedMessage] = useState('');
  /*const [isPDFButtonDisabled, setPDFButtonDisabled] = useState(true);*/
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
    convertToPDFAndDownload();
  };

  const convertToPDFAndDownload = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      lineHeight: 1.4,
    });

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const imgData = logo;
    doc.addImage(imgData, 'PNG',10, -10, 80, 60);

    const textLines = doc.splitTextToSize(receivedMessage, 180);

    doc.text(10, 60, textLines);

    const signatureY = 250;
    const dottedLineY = signatureY + 20;
    const doctorNameY = dottedLineY + 10;
    const currentDateY = doctorNameY + 10;
    const signatureImg = signature;
    doc.addImage(signatureImg, 'PNG', 10, signatureY, 40, 20);

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, dottedLineY, 50, dottedLineY);

    const doctorName = 'Dr.Nipuni Waidyarathna';
    const currentDate = new Date().toLocaleString();
    doc.text(10, doctorNameY, doctorName);
    doc.text(10, currentDateY, currentDate);

    doc.save('recommendation.pdf');
  };

  return (
    <div className="recommendation-page">
      <div className="content">
        <div className="centered">
          <Typography variant="h3" style={{ color: 'black' ,marginBottom:'60px'}}>
            Click on the button below to get your personalized recommendations
          </Typography>
        </div>

        <div className="centered">
          <Button variant="contained" color="primary" onClick={sendMessage} style={{marginTop:'40px',background:'white',color:'black'}}>
            Get My Personalized Diet Prescription
          </Button>
          
        </div>

        <div className="centered">
          <a href="/gq" className="navigation-buttonr" style={{marginTop:'40px',background:'white',color:'black'}}>
            CHANGE PERSONAL DATA
          </a>
        </div>
        <div className="centered">
          <a href="/np" className="navigation-buttonr" style={{marginTop:'40px',background:'white',color:'black'}}>
            LEARN MORE ABOUT NUTRIENTS
          </a>
        </div>
        <div className="centered" >
        <img src={logo} alt="Logo" style={{marginTop:'80px'}}/>
        </div>
        
      </div>
    </div>
  );
}

export default RecommendationPage;
