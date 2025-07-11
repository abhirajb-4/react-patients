// App.js
import React, { useState } from 'react';
import PatientRegistrationForm from './PatientRegistrationForm';
import { PatientInformation } from './PatientInformation';
import { addPatient } from './patientService.js';   // <- optional, see handleRegister
import './App.css';

const App = () => {
  // The ID the user wants to look up
  const [patientID, setPatientID] = useState('');

  // Keep form input in sync with state
  const handleIDChange = (e) => setPatientID(e.target.value);

  // Callback for PatientRegistrationForm
  const handleRegister = async (patientData) => {
    try {
      // Persist to backend (or skip this if your tests mock addPatient)
      await addPatient(patientData);
      alert('Patient registered successfully!');
    } catch (err) {
      console.error('Failed to register patient', err);
      alert('Registration failed—see console for details.');
    }
  };

  return (
    <div className="app-container">
      <h1>Patient Management</h1>

      {/* Patient registration form */}
      <PatientRegistrationForm onRegister={handleRegister} />

      <hr />

      {/* Patient ID lookup */}
      <div className="lookup-container">
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientID}
          onChange={handleIDChange}
        />
      </div>

      {/* Patient information (renders once patientID isn’t empty) */}
      <PatientInformation patientID={patientID.trim()} />
    </div>
  );
};

export default App;
