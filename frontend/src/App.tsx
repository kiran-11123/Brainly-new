
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
         <Route path="/" element={<Signin />} />
       <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>} />


      </Routes>
    </BrowserRouter>

 



 
    
  )
}

export default App
