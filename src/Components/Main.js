import PropTypes from 'prop-types';

import Carousel from 'react-bootstrap/Carousel';

function Main({data, loading}) {
  return (
    <Carousel data-bs-theme="light">
      <Carousel.Item>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <img
          className="d-block w-100"
          src={data.url}
          alt={data.title}
          style={{ height: '750px' }} // Adjust the height value as needed
        />
        <Carousel.Caption className='caption' style={{ marginTop: '-80px' }}>
          <h1>{data.title}</h1>
          <h3>{data.date}</h3>
          <p>{data.explanation}</p>
        </Carousel.Caption>
        </div>
      ) : (
        <p>No data available</p>
      )}
        
      </Carousel.Item>
      <Carousel.Item>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <img
          className="d-block w-100"
          src={data.url}
          alt={data.title}
          style={{ height: '750px' }} // Adjust the height value as needed
        />
        <Carousel.Caption className='caption' style={{ marginTop: '-80px' }}>
          <h1>{data.title}</h1>
          <h3>{data.date}</h3>
          <p>{data.explanation}</p>
        </Carousel.Caption>
        </div>
      ) : (
        <p>No data available</p>
      )}
        
      </Carousel.Item>
      <Carousel.Item>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <img
          className="d-block w-100"
          src={data.url}
          alt={data.title}
          style={{ height: '750px' }} // Adjust the height value as needed
        />
        <Carousel.Caption className='caption' style={{ marginTop: '-80px' }}>
          <h1>{data.title}</h1>
          <h3>{data.date}</h3>
          <p>{data.explanation}</p>
        </Carousel.Caption>
        </div>
      ) : (
        <p>No data available</p>
      )}
        
      </Carousel.Item>
    </Carousel>
  );
}

export default Main;


// function Main({ data, loading }) {
//   return (
//     <main>
//       <h2>Astronomy Picture of the Day</h2>
      // {loading ? (
      //   <p>Loading...</p>
      // ) : data ? (
      //   <div>
      //     <h3>{data.title}</h3>
      //     <p>{data.date}</p>
      //     <img src={data.url} alt={data.title} />
      //     <p>{data.explanation}</p>
      //   </div>
      // ) : (
      //   <p>No data available</p>
      // )}
//     </main>
//   );
// }

Main.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
};

// export default Main;






