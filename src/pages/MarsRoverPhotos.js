import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Css/MarsRoverPhotos.css';
import CameraDetailsModal from '../Components/CameraDetailsModal';

//const API_KEY = process.env.REACT_APP_API_KEY;


function MarsRoverPhotos() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showCameraDetails, setShowCameraDetails] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=R3z2ePRigITkSnBcxpDwCDI3x7zbV5mSP4VQZddy`);
      const data = await response.json();
      setPhotos(data.photos); // Set all photos
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowCameraDetails = (photo) => {
    setSelectedPhoto(photo); // Set the selected photo
    setShowCameraDetails(true);
  };

  const handleCloseCameraDetails = () => {
    setShowCameraDetails(false);
  };

  return (
    <div className="MarsRoverPhotos" style={{backgroundColor:'#171715'}}>
      <Header />
      <div className="section">
        <h1 style={{color:'white', fontWeight:'100'}}>NASA Curiosity Rover Photos</h1>
        <div className="photos-grid">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            photos.map((photo) => (
              <div key={photo.id} className="photo" onClick={() => handleShowCameraDetails(photo)}>
                <img src={photo.img_src} alt={photo.id} />
                <div className="photo-details">
                  <p><strong>Rover:</strong> {photo.rover.name}</p>
                  <p><strong>Earth Date:</strong> {photo.earth_date}</p>
                  <p><strong>Camera:</strong> {photo.camera.full_name}</p>
                  <p><strong>Status:</strong> {photo.rover.status}</p>
                  <p><strong>Landing Date:</strong> {photo.rover.landing_date}</p>
                  <p><strong>Launch Date:</strong> {photo.rover.launch_date}</p>
                  <p><strong>Total Photos:</strong> {photo.rover.total_photos}</p>
                  <div className='d-flex justify-content-center align-items-center'>
                  <button className="show-button" onClick={() => handleShowCameraDetails(photo)}>Show Camera Details</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <CameraDetailsModal isOpen={showCameraDetails} onClose={handleCloseCameraDetails} cameras={selectedPhoto ? selectedPhoto.rover.cameras : []} />
      </div>
      <Footer />
    </div>
  );
}

export default MarsRoverPhotos;
