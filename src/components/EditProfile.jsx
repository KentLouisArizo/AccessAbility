import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './styles/EditProfile.module.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    profileImage: '', // Placeholder for profile image URL
    dob: '',
    age: '',
    civilStatus: '',
    houseNo: '',
    street: '',
    barangay: '',
    educationalAttainment: '',
    employmentStatus: '',
    employmentCategory: '',
    occupation: '',
    email: '',
    mobileNo: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // State for storing the file object

  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage(); // Firebase Storage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'registrations', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setFormData({
              profileImage: data.profileImage || '',
              dob: data.dob || '',
              age: data.age || '',
              civilStatus: data.civilStatus || '',
              houseNo: data.houseNo || '',
              street: data.street || '',
              barangay: data.barangay || '',
              educationalAttainment: data.educationalAttainment || '',
              employmentStatus: data.employmentStatus || '',
              employmentCategory: data.employmentCategory || '',
              occupation: data.occupation || '',
              email: data.email || '',
              mobileNo: data.mobileNo || '',
            });
          } else {
            console.error('No user document found!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth, db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save file object to state
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // Set preview image (base64 URL)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        let imageUrl = formData.profileImage; // Default to existing image URL

        // If a new image is selected, upload it to Firebase Storage
        if (imageFile) {
          const storageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(storageRef, imageFile); // Upload file to Firebase Storage
          imageUrl = await getDownloadURL(storageRef); // Get the URL of the uploaded image
        }

        const userDocRef = doc(db, 'registrations', user.uid);
        const updatedData = {
          ...formData,
          profileImage: imageUrl, // Update with the new image URL
        };
        await updateDoc(userDocRef, updatedData);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Function to handle occupation selection and conditionally show text input for "Others"
  const handleOccupationChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      occupation: value,
      // If "Others" is selected, reset specificOccupation field, else leave it as is
      specificOccupation: value === 'others' ? formData.specificOccupation : '',
    });
  };

  return (
    <div className={styles.editProfileContainer}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={styles.editProfileForm}>
        {/* Profile Image */}
        <div className={styles.profileImageContainer}>
        <img
            src={previewImage || formData.profileImage || '/default-profile.png'} // Fallback image
            alt="Profile"
            className={styles.profileImage}
        />
        <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.imageUploadInput}
            id="profileImageInput" // Add an ID to the file input
        />
        <label htmlFor="profileImageInput">Upload Profile Image</label> {/* Link label to the file input */}
        </div>

        {/* Date of Birth and Age */}
        <div className={styles.formGroup}>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Civil Status */}
        <div className={styles.formGroup}>
          <label htmlFor="civilStatus">Civil Status</label>
          <select
            id="civilStatus"
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="separated">Separated</option>
            <option value="cohabitation">Cohabitation (Live-in)</option>
            <option value="widow">Widow</option>
          </select>
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label htmlFor="houseNo">House No.</label>
          <input
            type="text"
            id="houseNo"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="barangay">Barangay</label>
          <input
            type="text"
            id="barangay"
            name="barangay"
            value={formData.barangay}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Educational Attainment */}
        <div className={styles.formGroup}>
          <label htmlFor="educationalAttainment">Educational Attainment</label>
          <select
            id="educationalAttainment"
            name="educationalAttainment"
            value={formData.educationalAttainment}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="kindergarten">Kindergarten</option>
            <option value="junior high">Junior High</option>
            <option value="senior high">Senior High</option>
            <option value="college">College</option>
            <option value="vocational">Vocational</option>
            <option value="post graduate">Post Graduate</option>
          </select>
        </div>

        {/* Employment Details */}
        <div className={styles.formGroup}>
          <label htmlFor="employmentStatus">Status of Employment</label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="self-employed">Self-Employed</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="employmentCategory">Category of Employment</label>
          <select
            id="employmentCategory"
            name="employmentCategory"
            value={formData.employmentCategory}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="None">None</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className={styles.formGroup}>
      <label htmlFor="occupation">Occupation</label>
      <select
        id="occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleOccupationChange}
        required
      >
        <option value="">Select</option>
        <option value="managers">Managers</option>
        <option value="professionals">Professionals</option>
        <option value="technicians">Technicians and Associate Professionals</option>
        <option value="clerical support workers">Clerical Support Workers</option>
        <option value="skilled agricultural">Skilled Agricultural, Forestry, and Fishery Workers</option>
        <option value="craft and trade workers">Craft and Related Trade Workers</option>
        <option value="machine operators">Plant and Machine Operators and Assemblers</option>
        <option value="elementary occupations">Elementary Occupations</option>
        <option value="armed forces">Armed Forces Occupations</option>
        <option value="others">Others (Specify)</option>
      </select>

      {/* Show input field for specifying occupation if "Others" is selected */}
      {formData.occupation === 'others' && (
        <div className={styles.specificOccupationContainer}>
          <label htmlFor="specificOccupation">Please specify your occupation</label>
          <input
            type="text"
            id="specificOccupation"
            name="specificOccupation"
            value={formData.specificOccupation}
            onChange={handleInputChange}
            placeholder="Enter your occupation"
          />
        </div>
        )}
        </div>

        {/* Email and Mobile Number */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
