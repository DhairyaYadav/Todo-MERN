import React, { useEffect } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Todo from './Components/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from './features/AuthFeature';

function App() {

  const {token} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(addToken())
  },[])

  return (
   <div className='App'>
   <h1>Redux template app</h1>
  
   {token ? <Todo /> :  <Auth />}
   
   </div>
  );
}

export default App;
