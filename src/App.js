import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate  } from 'react-router-dom'; // Import Router, Route, Switch
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
      <Route path="/WeatherApp" exact Component={currentUser ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/WeatherApp/login" exact Component={currentUser ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/WeatherApp//register" exact Component={<Register/>}/>
      <Route path="/WeatherApp/home" exact Component={currentUser ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/WeatherApp/mapInfo" exact Component={currentUser ? <MapInfo /> : <Navigate to="/login" replace />}  /> 
    </Routes>
  </div>
  
  );
}

export default App;
