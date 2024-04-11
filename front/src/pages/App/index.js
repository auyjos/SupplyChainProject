
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from '../MainLayout';
import AuthenticationLayout from '../AuthenticationLayout';

const App = () => {

  const [session, setSession ] = useState(false)

  useEffect(() => {
    if(window.localStorage.getItem('isAuthenticated')){
        setSession(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          { session && <Route path='/*' element={<MainLayout />} /> }
          { !session && <Route path='/*' element={<AuthenticationLayout session={session} setSession={setSession} />} /> }
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
