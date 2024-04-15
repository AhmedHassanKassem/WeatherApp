import React, { useState, useTransition } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Login = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const navigate = useNavigate();
  const [t , setTranslate] = useTranslation()
  
 
 
  const handleSubmit = async (e)=>{
   try {
  await   signInWithEmailAndPassword(auth , email , password)
  toast.success(t('Successfully Logged in' ), {duration : 3000 , position : 'top-right'})
    navigate('/home')
     } 
   catch (err) {
      toast.error(t('This email or password is invalid') , {duration : 3000 , position : 'top-right'})
    }
 }

 
  return (
    <div className="container">
      <div className="col-lg-12">
        <div className="row d-flex justify-content-center p-3">
         
          <div id="LogCard" className="card col-md-5 shadow-lg p-4 m-3 mt-5">
            <div className="p-2">
              <p>{t('Login')}</p>
            </div>    
            <label for="exampleFormControlInput1" class="form-label">
                {t('Email')} :
              </label>
            <div className="p-2 d-flex justify-content-center">
            <input
                type="text"
                name="email"
                value={email}
                class="form-control mb-3 "
                id="exampleFormControlInput1"
                placeholder={t('Email')}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <label for="exampleFormControlInput1" class="form-label">
                {t('Password')} : 
              </label>
            <div className="p-2  d-flex justify-content-center">
            
              <input
                class="form-control mb-3"
                type="password"
                placeholder={t("Password")}
                aria-label="default input example"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div  className="p-2 d-flex justify-content-center ">
              <button id="btnLogin" type="button" class="btn btn" onClick={(e)=> handleSubmit(e)}>
                {t('Login')}
              </button>
            </div>
            <div  className="m-3">
             <div className="d-flex justify-content-center ">{t("Or Login With")} :</div>
              <div className="d-flex justify-content-center ">
              <button  type="button" class="btn btn">
                <img id="btnG" src='../G.png' alt="" className="m-2" />

                {t('Google')}
              </button><button  type="button" class="btn btn">
              <img id="btnG" src='../F.png' alt="" className="m-2" />
                {t('Facebook')}
              </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
