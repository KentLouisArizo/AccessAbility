import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Assuming firebase is initialized here
import { collection, getDocs, query } from 'firebase/firestore';

const RenderBookletUpdate = () => {
  const [bookletData, setBookletData] = useState([]);

  useEffect(() => {
    const fetchBookletData = async () => {
      try {
        const q = query(collection(db, 'requestbookletupdate'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookletData(data);
      } catch (error) {
        console.error("Error fetching booklet data:", error);
      }
    };

    fetchBookletData();
  }, []);

  return (
    <div>
      <h2>Booklet Update Requests</h2>
      <div>
        {bookletData.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          bookletData.map((request) => (
            <div key={request.id} style={{ marginBottom: '20px' }}>
              <h3>Request ID: {request.id}</h3>
              <p>Status: {request.status}</p>
              <p>Requested by User ID: {request.userId}</p>
              <p>
                {request.imageURL && (
                  <div>
                    <img
                      src={request.imageURL}
                      alt="Requested Update"
                      style={{ width: '800px', height: 'auto' }} // Increased width
                    />
                  </div>
                )}
              </p>
              <p>
                Timestamp: {new Date(request.timestamp?.seconds * 1000).toLocaleString()}
              </p>
              <p>Is Read: {request.isRead ? 'Yes' : 'No'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RenderBookletUpdate;
