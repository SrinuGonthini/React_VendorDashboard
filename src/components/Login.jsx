import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/data"
const Login = ({setIsLogin}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('/login',{email,pwd:password})
            const accessToken = res.data.accessToken
            localStorage.setItem('accessToken',accessToken)
            const venId = res?.data?.result?.id
            localStorage.setItem('vendorId',venId)
            const resId = res?.data?.restaurant?._id
            if(resId && res.data.restaurant){
                localStorage.setItem('restaurantId',resId)
            }else{
                console.log('Need to Add Restaurant')
            }
            setIsLogin(true)
            navigate('/home')
        }catch(err){
            alert("login Failed")
            console.log(err.message)
        }
    }
    return(
        <div className="main">
            <form className="LogForm" onSubmit={handleLogin}>
                <h2>Log in to your Account</h2>
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    autoFocus
                    placeholder="Enter email"
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <h3>Don't have an account <Link to='/register'><span>signup</span></Link></h3>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login