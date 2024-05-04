import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Main from '../Components/Main';
//import { Link } from 'react-router-dom';
import { fetchAstronomyData} from '../util/Mars';
import '../Css/Home.css';



function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const astronomyData = await fetchAstronomyData();
      setData(astronomyData);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
   
      <Header />
      <Main data={data} loading={loading} />
      {/* <Link to="/neopage">Go to NEO Page</Link> */}
      <Footer />
    </div>
  );
}

export default Home;