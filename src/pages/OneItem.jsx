import { useParams,Link } from "react-router-dom";
import axios from "../api/data";
import { useEffect, useState } from "react"

const OneItem = () => {
    const [product,setProduct] = useState([]);
    const {id:productId} = useParams()
    useEffect(() => {
        const fetchProduct =async () => {
            const accessToken = localStorage.getItem('accessToken')
            try{
                const res = await axios.get(`/products/product/${productId}`,{
                    headers : {Authorization : `Bearer ${accessToken}`}
                })
                setProduct(res.data.product)
            }catch(err){
                console.log(err)
            }
        }
        if(productId){
            fetchProduct();
        }
    },[])
    return(
        <div className="One">
            <div className="Restaurant">
                <div className="Resimg">
                    { product?.image && (
                    <img
                    src = {`http://localhost:3500/uploads/${product.image}`}
                    alt = {product.productName}
                    />
                )}
                </div>
                <div className="Resdetails">
                    <h1>Product Details</h1>
                    <h2>Item Name: <span>{product?.productName}</span></h2>
                    <h3>Price: <span>{product?.price}</span></h3>
                    <p><b>Category: </b>{product?.category ? "Veg" :  "Non-veg"}</p>
                    <p><b>BestSeller: </b>{product?.bestseller ? "Yes" : "No"}</p>
                    <p><b>Description: </b>{product?.description}</p>
                    <div className="Products">
                        <Link to={`/products/edit/${product?._id}`}>Edit Product</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneItem