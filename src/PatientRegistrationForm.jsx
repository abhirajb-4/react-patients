import React, { useState } from 'react';
import { addPatient } from './patientService.js';
import './App.css';
 
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
 
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };
 
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.age) errors.age = "Age is required";
    if (!formData.gender || formData.gender === "Select Gender") errors.gender = "Gender is required";
    if (!formData.condition) errors.condition = "Condition is required";
    if (!formData.lastVisit || !isValidDate(formData.lastVisit)) errors.lastVisit = "Last Visit is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
 
    await addPatient(formData);
    if (onRegister) onRegister(formData);
 
    // Clear form
    setFormData({
      name: '',
      age: '',
      gender: 'Select Gender',
      condition: '',
      lastVisit: '',
    });
  };
 
  return (
<div>
<form onSubmit={handleSubmit}>
<input name="name" value={formData.name} placeholder="Name" onChange={handleChange} />
        {errors.name && <div>{errors.name}</div>}
 
        <input name="age" value={formData.age} placeholder="Age" onChange={handleChange} />
        {errors.age && <div>{errors.age}</div>}
 
        <select name="gender" value={formData.gender} onChange={handleChange}>
<option value="Select Gender">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
</select>
        {errors.gender && <div>{errors.gender}</div>}
 
        <input name="condition" value={formData.condition} placeholder="Condition" onChange={handleChange} />
        {errors.condition && <div>{errors.condition}</div>}
 
        <input name="lastVisit" value={formData.lastVisit} placeholder="Last Visit (YYYY-MM-DD)" onChange={handleChange} />
        {errors.lastVisit && <div>{errors.lastVisit}</div>}
 
        <button type="submit">Register Patient</button>
</form>
</div>
  );
};
 
export default PatientRegistrationForm;