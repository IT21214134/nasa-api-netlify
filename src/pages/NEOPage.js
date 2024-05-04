import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Css/NEOPage.css'; // Import CSS file for advanced styles
import Accordion from 'react-bootstrap/Accordion';

//const API_KEY = process.env.REACT_APP_API_KEY;

function NEOPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [neoData, setNEOData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=R3z2ePRigITkSnBcxpDwCDI3x7zbV5mSP4VQZddy`);
      const neoData = response.data;
      setNEOData(neoData);
      setError('');
    } catch (error) {
      console.error('Error fetching NEO data:', error);
      setError('Error fetching NEO data. Please try again later.');
    }
  };

  return (
    <div className="neo-page" style={{backgroundColor:'#2b2b2b'}}>
      <Header />
      <div className="neo-page-header" style={{color:'white'}}>
        <h1 style={{fontWeight:'100'}}>Near Earth Object (NEO) Tracker</h1>
        <form className='mt-4' onSubmit={handleSubmit}>
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className='mt-5' htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className='d-flex justify-content-center align-items-center mt-4'>
            <button className="btn btn-light  " style={{color:'black'}} type="submit">Search</button>
          </div>
          
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      {neoData && (
        <div className="neo-data container">
          {/* <h2>NEO Data</h2> */}
          <Accordion defaultActiveKey="0" flush>
            {Object.keys(neoData.near_earth_objects).map((date, index) => (
              <Accordion.Item eventKey={index.toString()} key={date} className="neo-accordion-item">
                <Accordion.Header>Date: {date}</Accordion.Header>
                <Accordion.Body>
                  <div className="neo-grid">
                    {neoData.near_earth_objects[date].map((neo) => (
                      <div key={neo.id} className="neo-grid-item">
                        <h4>Name: {neo.name}</h4>
                        <p style={{ color: 'black' }}>Diameter (meters): {neo.estimated_diameter.meters.estimated_diameter_max}</p>
                        <p style={{ color: 'black' }}>Close Approach Date: {neo.close_approach_data[0].close_approach_date}</p>
                        <p style={{ color: 'black' }}>Miss Distance (kilometers): {neo.close_approach_data[0].miss_distance.kilometers}</p>
                        {/* Add more information as needed */}
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default NEOPage;
