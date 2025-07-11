import React, { useState, useEffect } from 'react';
import { getPatients } from './patientService.js';
import './App.css';
 
export const PatientInformation = ({ patientID }) => {
  const [patient, setPatient] = useState(null);
 
  useEffect(() => {
    const fetchPatient = async () => {
      const patients = await getPatients();
      const found = patients.find((p) => p.patientID === patientID);
      if (found) setPatient(found);
    };
    fetchPatient();
  }, [patientID]);
 
  return (
<div >
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