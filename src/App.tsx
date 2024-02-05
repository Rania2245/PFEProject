import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './LogIn/LogIn';

function App() {


  return (
    <div className="app">
      <Routes>
         <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
