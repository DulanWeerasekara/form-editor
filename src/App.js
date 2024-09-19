import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1); // Controls the steps of the form
  const [email, setEmail] = useState(''); // State for email input
  const [emailError, setEmailError] = useState(''); // State for email error message

  // Email validation regex pattern
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Move from the welcome screen to the email form
  const handleStartClick = () => {
    setStep(2);
  };

  // Handle input change for the email field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Validate and submit the form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Check if the email is valid
    if (validateEmail(email)) {
      setEmailError('');
      alert('Email is valid!');
      // You can proceed with further actions here
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  // Handle key press events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStartClick();
    }
  };

  // Add an event listener for key presses when on the welcome screen
  useEffect(() => {
    if (step === 1) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [step]);

  return (
    <div className="app">
      {/* Step 1: Welcome Screen */}
      {step === 1 && (
        <div className="welcome-screen">
          <h1>Welcome to Our Form</h1>
          <h2>This is a description of the form.</h2>
          <p>Press Enter or click the button to proceed.</p>
          <button className="start-button" onClick={handleStartClick}>
            Start
          </button>
        </div>
      )}

      {/* Step 2: Email Input Screen */}
      {step === 2 && (
        <div className="email-screen">
          <h2>Enter Your Email</h2>
          <h3></h3>This will be used to contact you for the next step
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="email-input"
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
