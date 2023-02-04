
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [mobile, setMobile] = React.useState('');
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
   
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate("/")
        } 
    })
    const  handleLogin = async () => {
        console.warn(mobile, password)
        let result = await fetch('http://localhost:4000/url/login-user', {
            method: 'post',
            body: JSON.stringify({ mobile, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/')
        } 
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder="Enter Mobile number"
                onChange={(e) => setMobile(e.target.value)} value={mobile} />
            <input type="password" className="inputBox" placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appbutton" type="button">Login</button>

        </div>
    )
}



export default Login