import Navbar from "../components/Navbar"
import { useState,useEffect } from "react"
import axios from "../api/data"

const Home  = () => {
    const [user,setUser] = useState(null)
    const VenId = localStorage.getItem('vendorId')
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const res = await axios.get(`vendors/${VenId}`)
                setUser(res.data.vendor)
            }catch(err){
                console.log(err)
            }
        }
        if(VenId){
            fetchUser();
        }
    },[])
    return(
         <div className="main">
            <div className="page">
                <h1>Welcome to Your Vendor Dashboard</h1>
                <p><strong>User: </strong>{user?.username}</p>
                <p><strong>Email: </strong>{user?.email}</p>
                <p><strong>Restaurants: </strong>{user?.restaurant.length}</p>
                 <p>
                    This platform is built to help you manage your restaurant business more efficiently.
                    As a vendor, you have access to tools that let you easily control your restaurant listings and product menus.
                </p>
                 
                    <ul>
                    <p>
                        Use the sidebar to:</p>
                    <li>Add new restaurants and set their details like location, category, and offers</li>
                    <li>Upload and manage food products for each restaurant</li>
                </ul>
                <p>
                    Keep your listings up to date to attract more customers and maintain a great user experience.
                    Everything you need to manage your business is just a few clicks away.
                </p>
            </div>
        </div>
    )
}

export default Home