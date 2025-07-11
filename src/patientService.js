
import axios from 'axios';

const apiUrl  ='http://localhost:3001'
export const getPatients = async () => {
  const res = await fetch(`${apiUrl}/patients`);
  if (!res.ok) throw Error("Failed to fetch patients");
  return res.json();
};
 
// Add new patient
export const addPatient = async (newPatient) => {
  const res = await fetch(`${apiUrl}/patients`);
  const patients = await res.json();
 
  const id = `P${(patients.length + 1).toString().padStart(3, '0')}`;
  const newdata = { ...newPatient, patientID: id };
 
  return fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newdata)
  }).then((res) => res.json());
};