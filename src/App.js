import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { addPatient,getPatients } from './patientService';
import PatientRegistrationForm from './PatientRegistrationForm';
import { PatientInformation } from './PatientInformation';
const App = () => {
  const [patientID, setPatientID] = useState('');
  const generatePatientID = (patients) => {
    if (patients.length === 0) {
      return 'P001'; // If no patients exist yet, start with P001
    }
  
    const lastPatient = patients[patients.length - 1];
    const lastPatientID = lastPatient.patientID ? parseInt(lastPatient.patientID.slice(1)) : 0; // Extract the numeric part if patientID exists, otherwise start with 0
    const newID = 'P' + String(lastPatientID + 1).padStart(3, '0'); // Generate new patient ID
    return newID;
  };
  // Function to register a new patient
  const registerPatient = async (newPatient) => {
    try {
      const patients = await getPatients();
      console.log(patients);
      const newPatientID = generatePatientID(patients);
     
      const { id, ...patientDataWithoutID } = newPatient;
      const patientWithID = { ...patientDataWithoutID, patientID: newPatientID };
      const addedPatient = await addPatient(patientWithID);
      return addedPatient;
    } catch (error) {
      console.error('Error registering patient:', error);
      throw error;
    }
  };

  return (
    <div>
      <h1>Patient Management Platform</h1>
      <h2>Patient Registration</h2>
      <PatientRegistrationForm onRegister={registerPatient} />
      <h2>Retrieve Patient Information</h2>
      <input
        type="text"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
        placeholder="Enter Patient ID"
      />
      <PatientInformation patientID={patientID} />
    </div>
  );
};

export default App;
