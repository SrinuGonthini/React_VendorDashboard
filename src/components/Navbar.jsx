import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = ( {isLogin,setIsLogin} ) => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('vendorId')
        localStorage.removeItem('restaurantId')
        setIsLogin(false);
        navigate('/login');
    }
    return(
        <>
            <nav className="Navbar">
                <h3>Vendor_Dashboard</h3>
                <ul>
                { !isLogin ? (
                    <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </>
                    ) : (
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                    ) 
                } 
                </ul>
            </nav>
        </>
    )
}

export default Navbar