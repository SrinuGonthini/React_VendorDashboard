import { Link, useParams } from "react-router-dom"
import axios from "../api/data"
import { useEffect, useState } from "react"

const OneRestaurant = () => {
    const [restaurant,setRestaurant] = useState(null)
    const {id} = useParams();
    const accessToken = localStorage.getItem('accessToken')

    useEffect(()=>{
            const fetchRestaurant = async () => {
            try{
                const res = await axios.get(`/restaurant/${id}`,
                    {headers : {Authorization : `Bearer ${accessToken}`}}
                )
                setRestaurant(res.data.restaurant)
            }catch(err){
                console.log(err)
            }
        }
        if(id){
            fetchRestaurant();
        }
    },[id,accessToken,location.search])
    return(
        <div className="main">
            <div className="Restaurant">
                <div className="Resimg">
                    { restaurant?.image && (
                    <img
                    src = {restaurant.image}
                    alt = {restaurant.restaurantName}
                    />
                )}
                </div>
                <div className="Resdetails">
                    <h1>Restaurant Details</h1>
                    <h2>Restaurant Name: <span>{restaurant?.restaurantName}</span></h2>
                    <h3>Area: <span>{restaurant?.area}</span></h3>
                    <h3>City: <span>{restaurant?.city}</span></h3>
                    <p><b>Category: </b>{restaurant?.category.join(', ')}</p>
                    <p><b>Region: </b>{restaurant?.region.join(', ')}</p>
                    <p><b>Offer: </b>{restaurant?.offer}</p>
                    <div className="Products">
                        <Link to={`/products/all/${restaurant?._id}`}>View Products</Link>
                        <Link to={`/restaurant/edit/${restaurant?._id}`}>Edit Restaurant</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneRestaurant