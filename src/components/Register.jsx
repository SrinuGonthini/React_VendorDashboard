import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/data"
const Register = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const history = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('/register',{user:username,email,pwd:password})
            alert("Account Created")
            history('/login')
        }catch(err){
            if(err.response?.status === 409){
                alert("Email already exist")
            }else{
                alert("Registration Failed")
            }
            
        }
    }
    return(
        <div className="main">
             <form className="RegForm" onSubmit={handleRegister}>
                <h2>Create your Account</h2>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    id="username"
                    autoFocus
                    placeholder="Enter username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required 
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                />
                <h3>Already have an account <Link to='/login'><span>signin</span></Link></h3>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register