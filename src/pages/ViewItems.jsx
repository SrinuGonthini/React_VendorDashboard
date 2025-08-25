import axios from "../api/data"
import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"

const ViewItems = () => {
    const [product,setProduct] = useState([])
    const {id:resId} = useParams()
    const accessToken = localStorage.getItem('accessToken')

    useEffect(()=>{
        const fetchRestaurantProducts = async () => {
            try{
                const res = await axios.get(`/products/all/${resId}`,{
                    headers : {Authorization : `Bearer ${accessToken}`}
                })
                setProduct(res.data.products || [])
            }catch(err){
                console.log(err)
            }
        }
        if(resId){
            fetchRestaurantProducts()
        }
    },[resId,accessToken])
    const handledeletePro = (id) => {
        try{
            const res = axios.delete(`/products/product/${id}`,{
                headers : {Authorization : `Bearer ${accessToken}`}
            })
            setProduct(prev => prev.filter(prods => prods._id!==id))
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
            <div className="One">
                <ul className="Prods">
                    {product.map((item) => (
                    <li className="Pros" key = {item._id}>
                        {item.image && (
                            <img
                            src = {`http://localhost:3500/uploads/${item.image}`}
                            alt = {item.productName} />
                        )}
                        <div className="Prodetails">
                            <p><strong>Item: </strong>{item.productName}</p>
                            <p><strong>Price: </strong>{item.price}</p>
                            <p><strong>Category: </strong>{item.category ? 'Veg':'Non-veg'}</p>
                            <p><strong>BestSeller: </strong>{item.bestseller ? 'Yes' : 'No'}</p>
                            <div className="Buts">
                                <Link to={`/products/product/${item._id}`}>View</Link>
                                <button onClick={() => handledeletePro(item._id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                    ) 
                )} 
                <div className="Add">
                    <Link to={`/products/${resId}`}>Add Product</Link>
                </div>     
                </ul>
            </div>
        </>
    )
}

export default ViewItems