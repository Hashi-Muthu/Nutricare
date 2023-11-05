import React, { useState } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [satisfactionLevel, setSatisfactionLevel] = useState('satisfied');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/submit-feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, feedback, satisfactionLevel }),
      });

      if (response.ok) {
        setSubmitted(true);
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const containerStyle = {
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const selectStyle = {
    padding: '8px',
    marginBottom: '20px',
  };

  const textareaStyle = {
    height: '150px',
    padding: '8px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const disabledButtonStyle = {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  };

  const h2Style = {
    color: '#007BFF',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle}>
      <h2 style={h2Style}>Feedback Form</h2>
      {submitted ? (
        <div>
          <h3>Thank you for your feedback, {name}!</h3>
        </div>
      ) : (
        <form style={formStyle} onSubmit={handleSubmit}>
          <label style={labelStyle}>Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label style={labelStyle}>Satisfaction Level:</label>
          <select
            style={selectStyle}
            value={satisfactionLevel}
            onChange={(e) => setSatisfactionLevel(e.target.value)}
          >
            <option value="satisfied">Satisfied</option>
            <option value="neutral">Neutral</option>
            <option value="unsatisfied">Unsatisfied</option>
          </select>
          <label style={labelStyle}>Feedback Description:</label>
          <textarea
            style={textareaStyle}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            style={submitting ? disabledButtonStyle : buttonStyle}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
