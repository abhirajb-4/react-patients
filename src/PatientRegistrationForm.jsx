import React, { useState, useEffect } from 'react';
import { addPatient } from './patientService';
import './App.css'; // Import CSS file

// Patient registration form component
const PatientRegistrationForm = ({ onRegister }) => {
    const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
    lastVisit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const errors = {};
    if(!formData.name) errors.name = 'Name is required';
    if(!formData.age) errors.age = 'Age is required';
    if(!formData.gender) errors.gender = 'Gender is required';
    if(!formData.condition) errors.condition = 'Condition is required';
    if(!formData.lastVisit) errors.lastVisit = 'Last Visit is required';
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidDate = (dateString) => {
//    validate date 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()){
      return;
    }
    if(onRegister)
      onRegister(formData);
    await addPatient(formData);
    setFormData({
      name: '',
      age: '',
      gender: '',
      condition: '',
      lastVisit: '',
    });
    setErrors({});

  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Name"/>
      {errors.name && <div>{errors.name}</div>}

      <input type="text" name="age" onChange={handleChange} value={formData.age} placeholder="Age"/>
      {errors.age && <div>{errors.age}</div>}

      <select name="gender" onChange={handleChange} value={formData.gender}>
      <option value="Select Gender">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      </select>
      
      {errors.gender && <div>{errors.gender}</div>}

      <input type="text" name="condition" onChange={handleChange} value={formData.condition} placeholder="Condition"/>
      {errors.condition && <div>{errors.condition}</div>}

      <input type="text" name="lastVisit" onChange={handleChange} value={formData.lastVisit} placeholder="Last Visit (YYYY-MM-DD)"/>
      {errors.lastVisit && <div>{errors.lastVisit}</div>}

      <input type="submit" value="Register Patient"/>
    </form>
    {/* create patient form */}
  </div>

  );
};
export default PatientRegistrationForm;
