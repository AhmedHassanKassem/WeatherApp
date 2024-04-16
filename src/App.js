import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter  } from 'react-router-dom'; // Import Router, Route, Switch
import { Toaster } from 'react-hot-toast';
import Navbar from './App/Components/Navbar/Navbar';
import Login from './App/Components/Login/Login';
import Register from './App/Components/Register/Register';
import Home from './App/Components/Home/Home';
import MapInfo from './App/Components/MapInfo/MapInfo';
import { useAuth, AuthProvider } from './App/Components/PageGuard/AuthContext';

import store from './App/Components/Project-Redux/store';
import { Provider } from 'react-redux';



function App() {
  // const { currentUser } = useAuth();
  return (
  
    <div className="App">  
    <BrowserRouter>
    <Provider store={store}>
    
    <Navbar />
    <Toaster position="top-right" />
    <Routes>
      {/* <Route path="/WeatherApp" exact element={currentUser ? <Home /> : <Navigate to="/WeatherApp/login" replace />} />
      <Route path="/WeatherApp/login" exact element={currentUser ? <Navigate to="/WeatherApp/home" replace /> : <Login />} />
      <Route path="/WeatherApp/register" exact element={<Register/>}/>
      <Route path="/WeatherApp/home" exact element={currentUser ? <Home /> : <Navigate to="/WeatherApp/login" replace />} />
      <Route path="/WeatherApp/mapInfo" exact element={currentUser ? <MapInfo /> : <Navigate to="/WeatherApp/login" replace />}  />  */}

      <Route path="/WeatherApp" exact element={<Home/>} />
      <Route path="/WeatherApp/login" exact element={<Home/>} />
      <Route path="/WeatherApp/register" exact element={<Register/>}/>
      <Route path="/WeatherApp/home" exact element={<Home/>}/>
      <Route path="/WeatherApp/mapInfo" exact element={<Home/>}  /> 
    </Routes>

  </Provider>
  </BrowserRouter>
  </div>
  
  );
}

export default App;
