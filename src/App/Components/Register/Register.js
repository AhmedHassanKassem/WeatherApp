import React, { useState } from 'react'
import './Register.css'
import {  auth } from '../../../Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [t] = useTranslation()
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
  
    try {
    await createUserWithEmailAndPassword(auth , email , password)
     toast.success(t("Registered Successfully"))
      navigate('/login')
    } catch (err) {
      if(err){
        toast.error(t("This email or password is invalid"))
      }
      
    }
  }
  return (
    <div className="container">
      <div className="col-lg-12">
        <div className="row d-flex justify-content-center p-3">
          <div id='RegCard' className="card col-md-5 shadow-lg p-4 m-3 mt-5">
            <div className="p-2">
              <p>{t('Register with us')}</p>
            </div>    
            <label for="exampleFormControlInput1" class="form-label">
                {t('Email')} : 
              </label>
            <div className="p-2 d-flex justify-content-center">
          
              <input
                type="email"
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
              <button id="btnLogin" type="button" class="btn btn" onClick={(e)=> handleSubmit(e.target.value)}>
                {t('Register')}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register