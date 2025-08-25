import axios from "../api/data";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const ViewRestaurants = () => {
    const venId = localStorage.getItem('vendorId')
    const [restaurant,setRestaurant] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    useEffect(()=>{
            const fetchRestaurants = async () => {
                try{
                    const res = await axios.get(`/restaurant/vendor/${venId}`,
                        {headers : {Authorization : `Bearer ${accessToken}`}}
                    )
                    setRestaurant(Array.isArray(res.data.restaurant) ? res.data.restaurant : []);
                }catch(err){
                    console.log(err)
                }
            }
            if(venId){
                fetchRestaurants();
            }
        },[venId,accessToken])
        const handledeleteRes = async (id) => {
            try{
                const res = await axios.delete(`/restaurant/${id}`,{
                    headers : {Authorization : `Bearer ${accessToken}`}
                })
                setRestaurant(prev=>prev.filter(item=>item._id !== id))
            }catch(err){
                console.log(err);
            }
        }
    return(
        <div className="One">
        <ul className="View">
            {restaurant.map((rest) => (
            <li className="Restaurants" key={rest._id}>
                <div className="Ressimg">
                    {rest.image && (
                    <img
                        src={`https://backend-node-js-foodie.onrender.com/uploads/${rest.image}`}
                        alt={rest.restaurantName}
                        style={{ width: '200px', height: 'auto' }}
                    />
                    )}
                <div className="Resdetails">
                    <h4>Restaurant Name: <span>{rest.restaurantName}</span></h4>
                    <p><b>Area: </b>{rest.area}</p>
                    <p><b>Category: </b>{rest.category.join(', ')}</p>
                </div>
                </div>
                <div className="But">
                    <Link to={`/restaurant/${rest._id}`}>View Details</Link>
                    <button onClick={()=>handledeleteRes(rest._id)}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
            
        </div>
    )
}

export default ViewRestaurants