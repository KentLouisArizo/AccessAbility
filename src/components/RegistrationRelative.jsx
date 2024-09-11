import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styles/Registration.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import upicon from '../imgs/upload.png';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    uniqueId: '',
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    age: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    dob: '',
    sex: '',
    civilStatus: '',
    barangay: '',
    municipality: '',
    province: '',
    disabilityType: '',
    disabilityCause: '',
    bloodType: '',
    //relativeDocument1: null,
    //relativeDocument2: null,
  });
  const navigate = useNavigate();

  //unique ID
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      uniqueId: `RELATIVE-${uuidv4()}`, 
    }));
  }, []);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      handleSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
  
    try {
      await addDoc(collection(db, 'registrations'), formData);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <div className={styles.container}>
      <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
      <div className={styles.formContainer}>
        {currentStep === 1 && (
          <div>
            <h2>Step 1: Personal Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="middleName">Middle Name:</label>
              <input type="text" id="middleName" name="middleName" placeholder="Enter your middle name" value={formData.middleName}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="suffix">Suffix:</label>
              <input type="text" id="suffix" name="suffix" placeholder="Enter suffix (e.g., Jr., Sr.)" value={formData.suffix}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" placeholder="Enter your age" value={formData.age}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mobileNo">Mobile No:</label>
              <input type="text" id="mobileNo" name="mobileNo" placeholder="Enter your mobile number" value={formData.mobileNo}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword}  onChange={handleChange} />
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handleLoginRedirect}>Already have an account?</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2>Step 2: Personal Details</h2>
            <div className={styles.formGroup}>
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob" value={formData.dob}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sex">Sex:</label>
              <select id="sex" name="sex" value={formData.sex}  onChange={handleChange} >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="civilStatus">Civil Status:</label>
              <select id="civilStatus" name="civilStatus" value={formData.civilStatus}  onChange={handleChange} >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="barangay">Barangay:</label>
              <input type="text" id="barangay" name="barangay" placeholder="Enter your barangay" value={formData.barangay}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="municipality">Municipality:</label>
              <input type="text" id="municipality" name="municipality" placeholder="Enter your municipality" value={formData.municipality}  onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="province">Province:</label>
              <input type="text" id="province" name="province" placeholder="Enter your province" value={formData.province}  onChange={handleChange} />
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2>Step 3: Disability Information & Upload Document</h2>
            <div className={styles.formGroup}>
              <label htmlFor="disabilityType">Type of Disability:</label>
              <select id="disabilityType" name="disabilityType" value={formData.disabilityType}  onChange={handleChange} >
                <option value="deaf">Deaf or Hard of Hearing</option>
                <option value="intellectual">Intellectual Disability</option>
                <option value="learning">Learning Disability</option>
                <option value="mental">Mental Disability</option>
                <option value="physical">Physical Disability(orthopedic)</option>
                <option value="psychosocial">Psychosocial Disability</option>
                <option value="speech">Speech and Language Impairment</option>
                <option value="visual">Visual Disability</option>
                <option value="cancer">Cancer(RA11215)</option>
                <option value="disease">Rare Disease(RA10747)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="disabilityCause">Cause of Disability:</label>
              <select id="disabilityCause" name="disabilityCause" value={formData.disabilityCause}  onChange={handleChange} >
                <optgroup label="Congenital/Inborn" value="congenital">
                  <option value="adhd">ADHD</option>
                  <option value="cerebral">Cerebral Palsy</option>
                  <option value="down">Down Syndrome</option>
                </optgroup>
                <optgroup label="Acquired" value="acquired">
                  <option value="chronic">Chronic Illness</option>
                  <option value="cerebral">Cerebral Palsy</option>
                  <option value="injury">Injury</option>
                </optgroup>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bloodType">Blood Type:</label>
              <select id="bloodType" name="bloodType" value={formData.bloodType}  onChange={handleChange} >
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="ab">AB</option>
                <option value="o">O</option>
              </select>
            </div>
            <div className={styles.uploadSection}>
              <div className={styles.uploadContainer}>
                <div className={styles.uploadItem}>
                  <img src={upicon} alt="Upload 1x1 Icon" className={styles.icon} />
                  <button className={styles.uploadButton}>Upload 1x1</button>
                </div>
                <div className={styles.uploadItem}>
                  <img src={upicon} alt="Upload Whole Body Icon" className={styles.icon} />
                  <button className={styles.uploadButton}>Upload Whole Body</button>
                </div>
                <div className={styles.uploadItem}>
                  <img src={upicon} alt="Upload Medical Record Icon" className={styles.icon} />
                  <button className={styles.uploadButton}>Upload Medical Record</button>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 4 && (
            <div>
                <h2>Step 4: Verify Relationship to PWD</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="relativeDocument1">Upload Birth Certificate:</label>
                    <input type="file" id="relativeDocument1" name="relativeDocument1" onChange={handleFileChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="relativeDocument2">Upload National ID:</label>
                    <input type="file" id="relativeDocument2" name="relativeDocument2" onChange={handleFileChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="otherDocument">Upload Other Document (if any):</label>
                    <input type="file" id="otherDocument" name="otherDocument" onChange={handleFileChange} />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
                    <button type="button" className={styles.rightButton} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Registration;