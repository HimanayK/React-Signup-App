import React, { useState } from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'



const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            toast.error("fill the credentials");
        } else {
          const response = await fetch(
            "https://686fb14391e85fac42a2226e.mockapi.io/api/users"
          );
          const data = await response.json();
          const result = data.find((user) => user.myEmail == email && user.myPassword == password);
          if (result) {
           toast.success("Login successful")
            // Save user data in localStorage
            localStorage.setItem("user", JSON.stringify(result));  //✅ This will allow Dashboard.jsx to get the user info from localStorage.
            navigate("/dashboard");
          } else {
            toast.error("Invalid credentials");
          }
        }
    }

  return (
    <div className='main-container'>
    <div className='login-container'>
        <div className='header'>
            <div className='text'>Login</div>
            <div className='underline'></div>
        </div>
        <form onSubmit={handleLogin}>
            <div className='inputs'>
            <div className='input'>
                <div className='icon'><FontAwesomeIcon icon={faEnvelope} /></div>
                <input type="email" placeholder='Email Id' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} />
            </div>
                
            <div className='input'>
                 <div className='icon'><FontAwesomeIcon icon={faLock} /></div>
                <input type="password" placeholder='Password' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} />
            </div>
        </div>
                <div className='dont-have-account'>
          <p>
            Don't have an account? <span onClick={()=>navigate('/')}>Sign Up here!</span>
          </p>
        </div>
        <div className="submit-container">
            <button className='submit'>Login</button>
        </div>
        </form>
    </div>
    </div>
  )
}

export default Login