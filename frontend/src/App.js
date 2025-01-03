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


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadPage from "./pages/UploadPage";
// import Welcome from "./pages/Welcome";

const App = () => {
    return (
        <Router>
            <Routes>
   
        <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/upload" element={<UploadPage/>} />
            {/* <UploadPage /> */}
            {/* <Route path="/welcome" element={<Welcome />} />
       */}
        </Routes>
        </Router>
    );
};

export default App;
