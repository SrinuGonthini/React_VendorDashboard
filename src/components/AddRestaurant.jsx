import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/data";
import { useEffect, useState } from "react";

const AddRestaurant = () => {
    const {id} = useParams();
    const [restaurantName,setRestaurantName] = useState('')
    const [area,setArea] = useState('')
    const [city,setCity] = useState('')
    const [category,setCategory] = useState([])
    const [region,setRegion] = useState([])
    const [offer,setOffer] = useState('')
    const [image,setImage] = useState(null)
    const [existImage,setExistImage] = useState('')
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('accessToken')

    useEffect(()=>{
        if(id){
            const fetchRest = async () => {
                try{
                    const res = await axios.get(`/restaurant/${id}`,{
                        headers : {Authorization : `Bearer ${accessToken}`}
                    })
                    const data = res.data.restaurant
                    setRestaurantName(data.restaurantName || '')
                    setArea(data.area || '')
                    setCity(data.city || '')
                    setCategory(data.category || [])
                    setRegion(data.region || [])
                    setOffer(data.offer || '')
                    setExistImage(data.image || '')
                }catch(err){
                    console.log(err)
                }
        }
        fetchRest()
        }
    },[id,accessToken])

    const handleCheckCategory = (e) => {
       const value = e.target.value;
       if(category.includes(value)){
        setCategory(category.filter(item=>item!== value))
       }else{
        setCategory([...category,value])
       }
    }

    const handleCheckRegion = (e) => {
        const value = e.target.value;
        if(region.includes(value)){
            setRegion(region.filter(item => item!==value))
        }else{
            setRegion([...region,value])
        }
    }

    const handleImage = (e) => {
        const selectedImage = e.target.files[0]
        setImage(selectedImage)
    }

    const handleAddRestaurant = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('restaurantName',restaurantName)
        formData.append('area',area)
        formData.append('city',city)
        category.forEach((value)=>formData.append('category',value))
        region.forEach((value)=>formData.append('region',value))
        formData.append('offer',offer)
        if(image) formData.append('image',image);
        try{
            let res;
            if(id){
                 res = await axios.put(`/restaurant/edit/${id}`,formData,{
                    headers : {Authorization : `Bearer ${accessToken}`}
                })
                alert("Restaurant Update Successfully")
                navigate(`/restaurant/${res.data.restaurant._id}`)   
            }else{
                res = await axios.post('/restaurant/add',formData,{
                headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                const VenId = localStorage.getItem('vendorId')
                alert("Restaurant added Successfully")
                setRestaurantName('')
                setArea('')
                setCity('')
                setCategory([])
                setRegion([])
                setOffer('')
                setImage(null)
                navigate(`/restaurant/vendor/${VenId}`)
            } 
        }catch(err){
            console.log(err.message)
            alert("Failed to add")
        }
    }

    return(
        <div className="Main">
            <form className="ResForm" onSubmit={handleAddRestaurant}>
                <h2>{id ? "Edit Restaurant" : "Add Restaurant"}</h2>
                <label htmlFor="restaurantName">Restaurant Name</label>
                <input 
                    id="restaurantName"
                    type="text"
                    autoFocus
                    required
                    placeholder="Enter Restaurant Name"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                />
                <label htmlFor="area">Area</label>
                <input 
                    id="area"
                    type="text"
                    required
                    placeholder="Enter area" 
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
                <label htmlFor="city">City</label>
                <input 
                    id="city"
                    type="text"
                    required
                    placeholder="Enter city" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="category">Category</label>
                <div className="categoryCheck">
                    <label htmlFor="veg">Veg</label>
                    <input 
                        id="cat-veg"
                        type="checkbox"
                        value='veg'
                        checked = {category.includes('veg')}
                        onChange={handleCheckCategory}
                    />
                    <label htmlFor="non-veg">Non-veg</label>
                    <input 
                        id="cat-non-veg"
                        type="checkbox"
                        value={'non-veg'}
                        checked = {category.includes('non-veg')}
                        onChange={handleCheckCategory}
                    />
                </div>
                <label htmlFor="region">Region</label>
                <div className="regionCheck">
                    <label htmlFor="South-Indian">South-Indian</label>
                    <input
                        id="reg-South-Indian" 
                        type="checkbox"
                        value={'South-Indian'}
                        checked={region.includes('South-Indian')}
                        onChange={handleCheckRegion}
                    />
                    <label htmlFor="North-Indian">North-Indian</label>
                    <input 
                        id="reg-North-Indian"
                        type="checkbox"
                        value={'North-Indian'}
                        checked={region.includes('North-Indian')}
                        onChange={handleCheckRegion}
                    />
                    <label htmlFor="chinese">Chinese</label>
                    <input 
                        id="reg-chinese"
                        type="checkbox"
                        value={'Chinese'}
                        checked = {region.includes('Chinese')}
                        onChange={handleCheckRegion}
                    />
                    <label htmlFor="Bakery">Bakery</label>
                    <input 
                        id="reg-Bakery"
                        type="checkbox"
                        value={'Bakery'}
                        checked = {region.includes('Bakery')}
                        onChange={handleCheckRegion}
                    />
                </div>
                <label htmlFor="offer">Offer</label>
                <input 
                    id="offer"
                    type="text"
                    placeholder="Enter Offer"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                />
                <label htmlFor="image"></label>
                {id && existImage && !image && (
                    <img src={existImage}
                    alt = "Current"
                    style={{ width: '150px', height: 'auto', marginBottom: "10px"}}
                    />
                )}
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        style={{ width: "150px", height: "auto", marginBottom: "10px" }}
                    />
                )}
                <input 
                    id="image"
                    type="file"
                    onChange={handleImage} 
                />
                <button type="submit">{id ? "Update" : "Submit"}</button>
            </form>
        </div>
    )
}

export default AddRestaurant