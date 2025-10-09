
import './App.css'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
function App() {




  return (


    <BrowserRouter>


      <Routes>
         <Route path="/login" element={<Signin />} />
       <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Dashboard/>} />


      </Routes>
    </BrowserRouter>

 



 
    
  )
}

export default App
