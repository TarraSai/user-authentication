import './App.css';
import {useState} from 'react'
import Register from './componets/Register';
import Login from './componets/Logins';
import Home from './componets/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const[data,setData]=useState({})
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={data && data._id ? <Home data={data} /> : <Login setData={setData} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setData={setData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
