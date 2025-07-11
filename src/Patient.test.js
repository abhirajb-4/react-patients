import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatientRegistrationForm from './PatientRegistrationForm.jsx';
import { PatientInformation } from './PatientInformation.jsx';
import { addPatient,getPatients } from './patientService.js';
// Mock the function responsible for adding a new patient
// jest.mock('./PatientService', () => ({
//   addPatient: jest.fn(),
//   getPatientById: jest.fn(),
 
// }));
 
describe('PatientRegistrationForm', () => {
  test('displays error messages for empty fields', async () => {
    const { getByText, getByPlaceholderText } = render(<PatientRegistrationForm />);
 
    fireEvent.click(getByText('Register Patient'));
 
    await waitFor(() => {
      expect(getByText('Name is required')).toBeInTheDocument();
      expect(getByText('Age is required')).toBeInTheDocument();
      expect(getByText('Gender is required')).toBeInTheDocument();
      expect(getByText('Condition is required')).toBeInTheDocument();
      expect(getByText('Last Visit is required')).toBeInTheDocument();
    });
  });
  test('registers a new patient and clears the form data', async () => {
    const onRegisterMock = jest.fn(); // Mock the onRegister function
    const { getByPlaceholderText, getByText,getByDisplayValue } = render(<PatientRegistrationForm onRegister={onRegisterMock} />);
 
    // Fill out the form fields
    userEvent.type(getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(getByPlaceholderText('Age'), '30');
    const genderCombobox = getByDisplayValue('Select Gender');
    userEvent.selectOptions(genderCombobox, 'Male');
    userEvent.type(getByPlaceholderText('Condition'), 'Hypertension');
    userEvent.type(getByPlaceholderText('Last Visit (YYYY-MM-DD)'), '2022-01-15');
 
    // Submit the form
    fireEvent.click(getByText('Register Patient'));
 
    // Wait for the registration process to complete
    await waitFor(() => {
      // Check if the onRegister function is called with correct data
      expect(onRegisterMock).toHaveBeenCalledWith({
        name: 'John Doe',
        age: '30',
        gender: 'Male',
        condition: 'Hypertension',
        lastVisit: '2022-01-15',
      });
    });
  });
});
 
jest.mock('./patientService.js'); // Mock the PatientService module
 
describe('PatientInformation', () => {
  test('displays patient information when patient is found', async () => {
    // Mock patient data
    const patients = [
      {
        patientID: 'P001',
        name: 'John Doe',
        age: '30',
        gender: 'Male',
        condition: 'Hypertension',
        lastVisit: '2022-01-15',
      },
    ];
 
    // Mock the getPatients function to return the patients data
    getPatients.mockResolvedValue(patients);
 
    // Render the component with a specific patientID
    const { getByText } = render(<PatientInformation patientID="P001" />);
 
    // Wait for patient information to be displayed
    await waitFor(() => {
      // Ensure patient information is displayed correctly
      expect(getByText('Patient ID: P001')).toBeInTheDocument();
      expect(getByText('Name: John Doe')).toBeInTheDocument();
      expect(getByText('Age: 30')).toBeInTheDocument();
      expect(getByText('Gender: Male')).toBeInTheDocument();
      expect(getByText('Condition: Hypertension')).toBeInTheDocument();
      expect(getByText('Last Visit: 2022-01-15')).toBeInTheDocument();
    });
  });
 
 
});