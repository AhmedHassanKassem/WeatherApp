import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { auth } from '../../../Firebase'
import { signOut } from 'firebase/auth'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from 'i18next'
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import toast from 'react-hot-toast'
import { useAuth } from '../PageGuard/AuthContext.js'



const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [email , setEmail] = useState("")
  const { currentUser } = useAuth();
  const SignInInfo = ()=>{
    try {
      auth.onAuthStateChanged(user=>{
        if(user){
          setEmail(user.email)
          
        }
      })

    } catch (error) {
      console.log(error);
    }
  }


  const handleNavClick = () => {
    if (!currentUser) {
      toast.error('You are not logged in , please log in or register!');
    }
  };
  const SignOut = ()=>{
    try {
      signOut(auth)
      window.location.href='/login'
    } catch (error) {
      
    }
  }

  useEffect(()=>{
   
       SignInInfo()
  
   
  },[])

  return (
    <><nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link Link to={'/home'} className="nav-link d-flex"><img src='../Weather-No-Background.png' /><p className='m-2'>{t('Weather App')}</p></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={'/home'} onClick={handleNavClick} className="nav-link">{t('home')}</Link>
            </li>
            <li className="nav-item">
              <Link to={'/mapInfo'} onClick={handleNavClick}  className="nav-link">{t('MapInfo')}</Link>
            </li>
            <li className="nav-item">
              <Link to={'/register'} className="nav-link">{t('Register')}</Link>
            </li>
            <li className="nav-item">
              <Link to={'/login'} className="nav-link" hidden={email}>{t('Login')}</Link>
            </li>
            <li className="nav-item mt-2">
            <div id='langButton '>
        {i18n.language !== 'de' && <button className='btn btn p-0  d-flex' onClick={() => {
          changeLanguage('de')
        } }><span className="fi fi-de m-1"></span> Deutsch</button>}
        {i18n.language !== 'en' && <button className='btn btn p-0  d-flex' onClick={() => {
          changeLanguage('en')
        } }><span className="fi fi-gb m-1"></span>English</button>}
       
      </div>
            </li>
          </ul>
        </div>

      </div>
 <div hidden={!email}>Hello, </div>
        <div>{email} </div>

      <button id='signOutbutton' onClick={SignOut} className='btn btn' hidden={!email}><i id='signOutLogo' className="bi bi-box-arrow-right"></i></button>
    </nav>
      </> 
  )
}

export default Navbar