import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Registration.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import upicon from '../imgs/upload.png';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [occupation, setOccupation] = useState('');
  const [showOtherOccupationInput, setShowOtherOccupationInput] = useState(false); 
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
    setCurrentStep(8);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  //test for occupationchange
  const handleOccupationChange = (event) => {
    const selectedOccupation = event.target.value;
    setOccupation(selectedOccupation);
    if (selectedOccupation === 'others') {
      setShowOtherOccupationInput(true);
    } else {
      setShowOtherOccupationInput(false);
    }
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
            <h2>Step 3: Disability Information & Upload Document</h2>
            <div className={styles.formGroup}>
              <label htmlFor="disabilityType">Type of Disability:</label>
              <select id="disabilityType" name="disabilityType">
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
              <select id="disabilityCause" name="disabilityCause">
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
              <select id="bloodType" name="bloodType">
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
            <h2>Step 4: Employment Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="educationAttainment">Education Attainment:</label>
              <select id="educationAttainment" name="educationAttainment">
                <option value="none">None</option>
                <option value="kinder">Kindergarten</option>
                <option value="elementary">Elementary</option>
                <option value="juniorhigh">Junior High School</option>
                <option value="seniorhigh">Senior High School</option>
                <option value="college">College</option>
                <option value="vocational">Vocational</option>
                <option value="postgrad">Post Graduate</option>
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
                <option value="none">None</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="occupation">Occupation:</label>
              <select id="occupation" name="occupation" onChange={handleOccupationChange} value={occupation}>
                <option value="none">None</option>
                <option value="manager">Manager</option>
                <option value="professional">Professional</option>
                <option value="technician">Technician and Associate Professionals</option>
                <option value="clerical">Clerical Support Workers</option>
                <option value="service">Service and Sales Workers</option>
                <option value="agricultural">Skilled Agricultural, Forestry and Fishery Workers</option>
                <option value="craft">Craft and Related Trade Workers</option>
                <option value="plant">Plant and Machine Operators and Assemblers</option>
                <option value="elementary">Elementary Occupations</option>
                <option value="armed">Armed Forces Occupations</option>
                <option value="others">Others, Specify:</option>
              </select>
              {showOtherOccupationInput && (
                <input
                  type="text"
                  id="otherOccupation"
                  name="otherOccupation"
                  placeholder="Enter your occupation"
                  className={styles.otherOccupationInput}
                />
              )}
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
              <label htmlFor="fatherName">Father's Name:</label>
              <input type="text" id="fatherName" name="fatherName" placeholder="Enter father's name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fatherOccupation">Father's Occupation:</label>
              <input type="text" id="fatherOccupation" name="fatherOccupation" placeholder="Enter father's occupation" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="motherName">Mother's Name:</label>
              <input type="text" id="motherName" name="motherName" placeholder="Enter mother's name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="motherOccupation">Mother's Occupation:</label>
              <input type="text" id="motherOccupation" name="motherOccupation" placeholder="Enter mother's occupation" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="guardianName">Guardian's Name:</label>
              <input type="text" id="guardianName" name="guardianName" placeholder="Enter guardian's name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="guardianOccupation">Guardian's Occupation:</label>
              <input type="text" id="guardianOccupation" name="guardianOccupation" placeholder="Enter guardian's occupation" />
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
              <label htmlFor="emergencyContactName">Emergency Contact Name:</label>
              <input type="text" id="emergencyContactName" name="emergencyContactName" placeholder="Enter emergency contact name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="emergencyContactNumber">Emergency Contact Number:</label>
              <input type="text" id="emergencyContactNumber" name="emergencyContactNumber" placeholder="Enter emergency contact number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="emergencyContactRelationship">Relationship:</label>
              <input type="text" id="emergencyContactRelationship" name="emergencyContactRelationship" placeholder="Enter relationship with emergency contact" />
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 7 && (
          <div>
            <h2>Step 7: Additional Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="psnNumber">PSN Number:</label>
              <input type="text" id="psnNumber" name="psnNumber" placeholder="Enter your PSN number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pagIbigNumber">PAG-IBIG Number:</label>
              <input type="text" id="pagIbigNumber" name="pagIbigNumber" placeholder="Enter your PAG-IBIG number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sssNumber">SSS Number:</label>
              <input type="text" id="sssNumber" name="sssNumber" placeholder="Enter your SSS number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="gsisNumber">GSIS Number:</label>
              <input type="text" id="gsisNumber" name="gsisNumber" placeholder="Enter your GSIS number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="philhealthNumber">PhilHealth Number:</label>
              <input type="text" id="philhealthNumber" name="philhealthNumber" placeholder="Enter your PhilHealth number" />
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
              <button type="button" className={styles.rightButton} onClick={handleNextStep}>Submit</button>
            </div>
          </div>
        )}
        {currentStep === 8 && (
          <div>
            <h1>Registration Successful!</h1>
            <p>Registration has been successfully submitted!</p>
            <p>Status: Registration Complete</p>
            <p>Please wait for approval.</p>
            <p>If there is no confirmation within 3 days call us 09955328417</p>
            <a href='/'>Home</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;