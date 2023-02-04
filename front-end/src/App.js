
import './App.css';
import Getorder from './component/Getorder'
import Signup from './component/SignUp';
import Login from'./component/Login';
import Nav from './component/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
       <BrowserRouter>
      <Nav />
    <Routes>
     
    <Route path="/" element={<Getorder/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login />}/>
    </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
