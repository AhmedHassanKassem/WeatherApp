import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router ,   Routes, Route, Navigate } from 'react-router-dom'; // Import Router, Route, Switch
import { Toaster } from 'react-hot-toast';
import Navbar from './App/Components/Navbar/Navbar';
import Login from './App/Components/Login/Login';
import Register from './App/Components/Register/Register';
import Home from './App/Components/Home/Home';
import MapInfo from './App/Components/MapInfo/MapInfo';
import { useAuth } from './App/Components/PageGuard/AuthContext';



function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
    <Navbar />
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" exact element={currentUser ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={currentUser ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/mapInfo" element={currentUser ? <MapInfo /> : <Navigate to="/login" replace />}  /> 
    </Routes>
  </div>
  
  );
}

export default App;
