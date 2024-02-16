import React, { useState } from 'react'
import { signInUser, signupUser } from '../features/AuthFeature';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

const Auth = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [auth, setAuth] = useState("signin");

    const {loading,error} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const authenticate = async() => {
        if (auth === "signin") {
            dispatch(signInUser({email:userEmail,password:userPassword}))
        } else {
            try {
                const resultAction = await dispatch(signupUser({email:userEmail,password:userPassword}));
                const { payload } = unwrapResult(resultAction);
                if (!payload.error) {
                    setUserEmail('');
                    setUserPassword('');
                    setAuth('signin');
                }
            } catch (err) {
                console.error('Failed to signup: ', err);
            }
        }
    }
  return (
    <div>
        {loading && 
         <div className="progress">
         <div className="indeterminate"></div>
     </div>
     }
      <h1>Please {auth}</h1>
      {error && <h5>{error}</h5>}
      <input 
      type='email'
      value={userEmail}
      onChange={(e)=>setUserEmail(e.target.value)}
      />
      <input 
      type='password'
      value={userPassword}
      onChange={(e)=>setUserPassword(e.target.value)}
      />
      <button 
      className='btn'
      onClick={authenticate}
      >{auth}</button>
      {
        auth === "signin" ?
        <h6 onClick={()=>(setAuth("signup"))}>Dont have an account</h6>:
        <h6 onClick={()=>setAuth("signin")}>Already have an account</h6>
      }
    </div>
  )
}

export default Auth
