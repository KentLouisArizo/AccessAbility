import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Registration.module.css';
import PDAOlogo from '../imgs/PDAOlogo.jpg';
import upicon from '../imgs/upload.png';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 8) {
      handleSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setCurrentStep(9);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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
              <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="middleName">Middle Name:</label>
              <input type="text" id="middleName" name="middleName" placeholder="Enter your middle name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="suffix">Suffix:</label>
              <input type="text" id="suffix" name="suffix" placeholder="Enter suffix (e.g., Jr., Sr.)" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" placeholder="Enter your age" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mobileNo">Mobile No:</label>
              <input type="text" id="mobileNo" name="mobileNo" placeholder="Enter your mobile number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" />
            </div>
            <div className={styles.buttonContainer}>
              <a href="/login" className={styles.leftButton}>Already have an account?</a>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2>Step 2: Personal Details</h2>
            <div className={styles.formGroup}>
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sex">Sex:</label>
              <select id="sex" name="sex">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="civilStatus">Civil Status:</label>
              <select id="civilStatus" name="civilStatus">
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="barangay">Barangay:</label>
              <input type="text" id="barangay" name="barangay" placeholder="Enter your barangay" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="municipality">Municipality:</label>
              <input type="text" id="municipality" name="municipality" placeholder="Enter your municipality" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="province">Province:</label>
              <input type="text" id="province" name="province" placeholder="Enter your province" />
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2>Step 3: Disability Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="disabilityType">Type of Disability:</label>
              <select id="disabilityType" name="disabilityType">
                <option value="physical">Physical</option>
                <option value="visual">Visual</option>
                <option value="hearing">Hearing</option>
                <option value="intellectual">Intellectual</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="disabilityCause">Cause of Disability:</label>
              <select id="disabilityCause" name="disabilityCause">
                <option value="congenital">Congenital</option>
                <option value="acquired">Acquired</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bloodType">Blood Type:</label>
              <select id="bloodType" name="bloodType">
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="ab">AB</option>
                <option value="o">O</option>
              </select>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h2>Step 4: Employment Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="educationAttainment">Education Attainment:</label>
              <select id="educationAttainment" name="educationAttainment">
                <option value="elementary">Elementary</option>
                <option value="highschool">High School</option>
                <option value="college">College</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="employmentStatus">Employment Status:</label>
              <select id="employmentStatus" name="employmentStatus">
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="selfEmployed">Self-Employed</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="employmentCategory">Employment Category:</label>
              <select id="employmentCategory" name="employmentCategory">
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="nonProfit">Non-Profit</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="typeOfEmployment">Type of Employment:</label>
              <select id="typeOfEmployment" name="typeOfEmployment">
                <option value="fullTime">Full-Time</option>
                <option value="partTime">Part-Time</option>
                <option value="contractual">Contractual</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="occupation">Occupation:</label>
              <select id="occupation" name="occupation">
                <option value="none">None</option>
                <option value="clerical">Clerical</option>
                <option value="technical">Technical</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div>
            <h2>Step 5: Parents and Guardian Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="fathersLastName">Father's Last Name:</label>
              <input type="text" id="fathersLastName" name="fathersLastName" placeholder="Enter father's last name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fathersFirstName">Father's First Name:</label>
              <input type="text" id="fathersFirstName" name="fathersFirstName" placeholder="Enter father's first name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fathersMiddleName">Father's Middle Name:</label>
              <input type="text" id="fathersMiddleName" name="fathersMiddleName" placeholder="Enter father's middle name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mothersLastName">Mother's Last Name:</label>
              <input type="text" id="mothersLastName" name="mothersLastName" placeholder="Enter mother's last name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mothersFirstName">Mother's First Name:</label>
              <input type="text" id="mothersFirstName" name="mothersFirstName" placeholder="Enter mother's first name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mothersMiddleName">Mother's Middle Name:</label>
              <input type="text" id="mothersMiddleName" name="mothersMiddleName" placeholder="Enter mother's middle name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="guardiansLastName">Guardian's Last Name:</label>
              <input type="text" id="guardiansLastName" name="guardiansLastName" placeholder="Enter guardian's last name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="guardiansFirstName">Guardian's First Name:</label>
              <input type="text" id="guardiansFirstName" name="guardiansFirstName" placeholder="Enter guardian's first name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="guardiansMiddleName">Guardian's Middle Name:</label>
              <input type="text" id="guardiansMiddleName" name="guardiansMiddleName" placeholder="Enter guardian's middle name" />
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 6 && (
          <div>
            <h2>Step 6: Emergency Contact</h2>
            <div className={styles.formGroup}>
              <label htmlFor="contactName">Contact Name:</label>
              <input type="text" id="contactName" name="contactName" placeholder="Enter contact's name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactNumber">Contact Number:</label>
              <input type="text" id="contactNumber" name="contactNumber" placeholder="Enter contact's mobile number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="landlineNumber">Landline Number:</label>
              <input type="text" id="landlineNumber" name="landlineNumber" placeholder="Enter contact's landline number" />
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 7 && (
          <div className={styles.uploadSection}>
            <h2>Step 7: Document Upload</h2>
            <div className={styles.uploadContainer}>
              <div className={styles.uploadItem}>
                <img src={upicon} alt="Upload 1x1 Icon" className={styles.icon} />
                <button className={styles.uploadButton}>Upload 1x1</button>
              </div>
              <div className={styles.uploadItem}>
                <img src={upicon} alt="Upload Whole Body Icon" className={styles.icon} />
                <button className={styles.uploadButton}>Upload Whole Body</button>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 8 && (
          <div>
            <h2>Step 8: Additional Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="psnNumber">PSN Number:</label>
              <input type="text" id="psnNumber" name="psnNumber" placeholder="Enter PSN number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pagIbigNumber">PAG-IBIG Number:</label>
              <input type="text" id="pagIbigNumber" name="pagIbigNumber" placeholder="Enter PAG-IBIG number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sssNumber">SSS Number:</label>
              <input type="text" id="sssNumber" name="sssNumber" placeholder="Enter SSS number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="gsisNumber">GSIS Number:</label>
              <input type="text" id="gsisNumber" name="gsisNumber" placeholder="Enter GSIS number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="philHealthNumber">PhilHealth Number:</label>
              <input type="text" id="philHealthNumber" name="philHealthNumber" placeholder="Enter PhilHealth number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="accomplishedBy">Accomplished By:</label>
              <select id="accomplishedBy" name="accomplishedBy">
                <option value="self">Self</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
        {currentStep === 9 && (
          <div className={styles.successMessage}>
            <h1>Registration Successful!</h1>
            <p>Registration has been successfully submitted!</p>
            <p>Status: Registration Complete</p>
            <p>Please wait for approval.</p>
            <a href='/'>Home</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
