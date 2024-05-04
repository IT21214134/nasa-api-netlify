// import { useEffect, useState } from 'react';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Main from './Components/Main';
// import { fetchAstronomyData} from './util/Mars';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import NEOPage from './pages/NEOPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MarsRoverPhotos from './pages/MarsRoverPhotos';
import Login from "./pages/Login";
import { selectUsers } from "./slice/userSlice";
import {useSelector} from 'react-redux';

function App() {

  const user = useSelector(selectUsers);

  return (
    <div>
      {user.currentUser ?
      <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/neopage' element={<NEOPage/>}/>
          <Route path='/marsroverphotos' element={<MarsRoverPhotos/>}/>
        </Routes>
      </Router> :
      <Login/>
      }
   
      
    </div>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
