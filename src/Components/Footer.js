import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#bab9b6' }}>
      <MDBContainer className='p-4'>
        <section className=''>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol lg='3'>
              <div className='ratio ratio-16x9'>
                <iframe
                  className='shadow-1-strong rounded'
                  src='https://www.youtube.com/embed/E9oKEJ1pXPw'
                  title='YouTube video'
                  allowFullScreen
                  data-gtm-yt-inspected-2340190_699='true'
                  id='388567449'
                ></iframe>
              </div>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' target="_blank" href='https://data.nasa.gov/'>
        data.nasa.gov
        </a>
      </div>
    </MDBFooter>
  );
}