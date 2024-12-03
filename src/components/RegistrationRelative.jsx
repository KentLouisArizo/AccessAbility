import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import Firebase auth functions
import Select from 'react-select';
import styles from './styles/Registration.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import vector from '../imgs/Vector.png';
import upicon from '../imgs/upload.png';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [formData, setFormData] = useState({
    uniqueID: '',
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
    sex: 'male',
    civilStatus: 'single',
    barangay: '',
    municipality: '',
    province: '',
    disabilityType: [],
    disabilityCause: 'ADHD',
    bloodType: 'A',
    isVerified: false,
  });

  const [files, setFiles] = useState({
    profileImage: null,
    wholeBodyImage: null,
    medicalRecord: null,
    documentUpload: null, // For document upload in step 4
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      uniqueID: `RELATIVE-${uuidv4()}`, 
    }));
  }, []);

  const barangays = [
    'Abuno', 'Acmac', 'Bagong Silang', 'Bonbonon', 'Bunawan', 'Buru-un', 'Dalipuga', 'Del Carmen', 'Digkilaan', 'Ditucalan', 
    'Dulag', 'Hinaplanon', 'Hindang', 'Kabacsanan', 'Kalilangan', 'Kiwalan', 'Lanipao', 'Luinab', 'Mahayahay', 'Mainit', 
    'Mandulog', 'Maria Cristina', 'Palao', 'Panoroganan', 'Población', 'Puga-an', 'Rogongon', 'San Miguel', 'San Roque', 
    'Santiago', 'Saray-Tibanga (Saray)', 'Santa Elena (Tominobo-Ilaya)', 'Santa Filomena', 'Santo Rosario', 'Suarez', 'Tambacan', 
    'Tibanga (Canaway)', 'Tipanoy', 'Tomas Cabili', 'Tubod', 'Ubaldo Laya', 'Upper Hinaplanon', 'Upper Tominobo', 'Villaverde'
  ];

  const disabilityTypes = [
    { value: 'deaf', label: 'Deaf or Hard of Hearing' },
    { value: 'intellectual', label: 'Intellectual Disability' },
    { value: 'learning', label: 'Learning Disability' },
    { value: 'mental', label: 'Mental Disability' },
    { value: 'physical', label: 'Physical Disability (Orthopedic)' },
    { value: 'psychosocial', label: 'Psychosocial Disability' },
    { value: 'speech', label: 'Speech and Language Impairment' },
    { value: 'visual', label: 'Visual Disability' },
    { value: 'cancer', label: 'Cancer (RA11215)' },
    { value: 'disease', label: 'Rare Disease (RA10747)' },
  ];

  const handleDisabilityChange = (selectedOptions) => {
    // Handle the multi-select of disabilities
    const disabilityValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prevData => ({ ...prevData, disabilityType: disabilityValues }));
  };

  const barangayOptions = barangays.map(barangay => ({
    value: barangay,
    label: barangay
  }));

  const handleBarangayChange = (selectedOption) => {
    const selectedBarangay = selectedOption.value;
  
    // Update the form data with the selected barangay
    handleChange({ target: { name: 'barangay', value: selectedBarangay } });
  
    // Automatically update municipality and province based on the barangay selected
    if (selectedBarangay) {
      setFormData((prevData) => ({
        ...prevData,
        municipality: 'Iligan',   // Automatically set Municipality to Iligan
        province: 'Lanao del Norte'  // Automatically set Province to Lanao del Norte
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const handleDocumentChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedDocument(selectedOption);
    setShowOtherInput(selectedOption === 'others'); 
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(); 
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const uploadFile = async (file, fileName) => {
    if (!file) return null; // Ensure file exists
    const fileRef = ref(storage, `uploads/${fileName}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault(); 
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: `${formData.firstName} ${formData.lastName}` });

      const profileImageUrl = await uploadFile(files.profileImage, `profile-${uuidv4()}`);
      const wholeBodyImageUrl = await uploadFile(files.wholeBodyImage, `wholeBody-${uuidv4()}`);
      const medicalRecordUrl = await uploadFile(files.medicalRecord, `medicalRecord-${uuidv4()}`);
      const documentUploadUrl = await uploadFile(files.documentUpload, `document-${uuidv4()}`);

      const completeData = {
        ...formData,
        profileImageUrl,
        wholeBodyImageUrl,
        medicalRecordUrl,
        documentUploadUrl,
      };

      await addDoc(collection(db, 'registrations'), completeData);
      alert('Registration successful! Your account is currently disabled. Please contact the admin to enable your account.');
      navigate('/'); 
    } catch (error) {
      console.error('Error during registration: ', error);
      alert('An error occurred during registration. Please try again.'); // User-friendly error message
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    // If the current month is before the birth month, or it's the same month but before the birthday
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Reduce the age by 1
    }
  
    // Update the formData with the calculated age
    setFormData((prevData) => ({
      ...prevData,
      age: age,
    }));
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

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.centeredContainer}`}>
        <div className={styles.logoContainer}>
          <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
          <img src={vector} alt="Vector" className={styles.logoonce} />
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.stepContent}>
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
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={(e) => {
                      handleChange(e); // Keep the handleChange for form handling
                      calculateAge(e.target.value); // Calculate the age when DOB is changed
                    }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="sex">Sex:</label>
                  <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="civilStatus">Civil Status:</label>
                  <select id="civilStatus" name="civilStatus" value={formData.civilStatus} onChange={handleChange}>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="barangay">Barangay:</label>
                  <Select
                    id="barangay"
                    name="barangay"
                    options={barangayOptions}
                    value={formData.barangay ? { value: formData.barangay, label: formData.barangay } : null}
                    onChange={handleBarangayChange}  // Using the custom handler
                    placeholder="Search Barangay"
                    isSearchable
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="municipality">Municipality:</label>
                  <input
                    type="text"
                    id="municipality"
                    name="municipality"
                    placeholder="Enter your municipality"
                    value={formData.municipality || 'Iligan'}  // Automatically set to Iligan if not set
                    onChange={handleChange}
                    disabled  // Disabling the input so it is auto-filled
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="province">Province:</label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    placeholder="Enter your province"
                    value={formData.province || 'Lanao del Norte'}  // Automatically set to Lanao del Norte if not set
                    onChange={handleChange}
                    disabled  // Disabling the input so it is auto-filled
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>
                    Back
                  </button>
                  <button type="button" className={styles.rightButton} onClick={handleNextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
        {currentStep === 3 && (
              <div>
                <h2>Step 3: Disability Information & Upload Document</h2>
                <div className={styles.formGroup}>
                      <label htmlFor="disabilityType">Type of Disability:</label>
                      <Select
                        id="disabilityType"
                        name="disabilityType"
                        options={disabilityTypes}
                        value={formData.disabilityType.map(disability => ({
                          value: disability,
                          label: disabilityTypes.find(type => type.value === disability).label
                        }))}
                        onChange={handleDisabilityChange}
                        isMulti
                        placeholder="Select Disability Types"
                        className={styles.selectContainer}
                      />
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
                      <img src={upicon} alt="Upload Profile Icon" className={styles.icon} />
                      <input type="file" name="profileImage" onChange={handleFileChange} />
                      <p className={styles.uploadText}>Upload 1x1 Profile Picture</p>
                    </div>
                    <div className={styles.uploadItem}>
                      <img src={upicon} alt="Upload Whole Body Icon" className={styles.icon} />
                      <input type="file" name="wholeBodyImage" onChange={handleFileChange} />
                      <p className={styles.uploadText}>Upload Whole Body Image</p>
                    </div>
                    <div className={styles.uploadItem}>
                      <img src={upicon} alt="Upload Medical Record Icon" className={styles.icon} />
                      <input type="file" name="medicalRecord" onChange={handleFileChange} />
                      <p className={styles.uploadText}>Upload Medical Record</p>
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
                <label htmlFor="relationshipDoc">Select Document to Upload:</label>
                  <select id="relationshipDoc" name="relationshipDoc" value={selectedDocument} onChange={handleDocumentChange}>
                    <option value="">--Select--</option>
                    <option value="birthCertificate">Birth Certificate</option>
                    <option value="marriageCertificate">Marriage Certificate</option>
                    <option value="adoptionPapers">Adoption Papers</option>
                    <option value="nationalID">National ID</option>
                    <option value="familyTree">Family Register/Family Tree Document</option>
                    <option value="healthInsurance">Health Insurance Document</option>
                    <option value="others">Others, specify</option>
                  </select>
                </div>

                {selectedDocument && selectedDocument !== 'others' && (
                  <div className={styles.formGroup}>
                    <label htmlFor="documentUpload">Upload {selectedDocument.replace(/([A-Z])/g, ' $1')}:</label>                      <input type="file" id="documentUpload" name="documentUpload" onChange={handleFileChange} />
                  </div>
                )}

                {showOtherInput && (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="otherDocumentUpload">Upload Document:</label>
                      <input type="file" id="otherDocumentUpload" name="documentUpload" onChange={handleFileChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="otherDocumentDetails">Specify Document:</label>
                      <input type="text" id="otherDocumentDetails" name="otherDocumentDetails" placeholder="Specify the document" onChange={handleChange} />
                    </div>
                  </>
                  )}
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.leftButton} onClick={handlePreviousStep}>Back</button>
              <button type="button" className={styles.rightButton} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;