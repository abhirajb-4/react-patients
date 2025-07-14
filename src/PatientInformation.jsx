import React, { useState, useEffect } from 'react';
import { getPatients } from './patientService';
import './App.css'; // Import CSS file

export const PatientInformation = ({ patientID }) => {
  const [patient, setPatient] = useState(null);


  useEffect(() => {
    const fetchPatients = async () => {
      const patients = await getPatients();
      console.log(patients);
      const p1 = patients.find((p) => p.patientID === patientID);
      if (p1) {
        setPatient(p1);
      }
    }
    fetchPatients();
  }, [patientID]);

  // Function to retrieve patient information based on patient ID
  // use react hook to fetch patient information on ID change
  // fetch all patients and find patient by patient ID


  return (
    <div className="patient-info-container">
      {patient && (
        <div>
          <p>Patient ID: {patient.patientID}</p>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <p>Condition: {patient.condition}</p>
          <p>Last Visit: {patient.lastVisit}</p>
        </div>
      )}
    </div>
  );
};
