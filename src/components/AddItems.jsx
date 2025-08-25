import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "../api/data"
import { useEffect, useState } from "react"

const AddItems = () => {
    const [productName,setProductName] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('true')
    const [bestseller,setBestSeller] = useState('false')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState(null)
    const [existImage,setExistImage] = useState('');
    const {id} = useParams()
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = location.pathname.includes("/edit")

    useEffect(() => {
        const fetchProduct = async () => {
            if(isEditMode){
                try{
                    const res = await axios.get(`/products/product/${id}`,{
                        headers : {Authorization : `Bearer ${accessToken}`}
                    })
                    const data = res.data.product
                    setProductName(data.productName||'')
                    setPrice(data.price || '')
                    setCategory(data.category ? 'true' : 'false')
                    setBestSeller(data.bestseller ? 'true' : 'false')
                    setDescription(data.description || '')
                    setExistImage(data.image || '')
                }catch(err){
                    console.log(err)
                }
            }
        }
        fetchProduct();
    },[id,accessToken,isEditMode])

    const handleImage = (e) => {
        const selectedImage = e.target.files[0]
        setImage(selectedImage)
    }
    const handleAddProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('productName',productName)
        formData.append('price',price)
        formData.append('category',category === "true")
        formData.append('bestseller',bestseller === "true")
        formData.append('description',description)
        if (image) formData.append('image',image);
        try{
            let res;
            if(isEditMode){
                res = await axios.put(`products/edit/${id}`,formData,{
                    headers : {Authorization : `Bearer ${accessToken}`}
                })
                alert(`${productName} update successfully`)
                navigate(`/products/product/${id}`)
            }else{
                    res = await axios.post(`products/${id}` ,formData ,{
                    headers : {Authorization : `Bearer ${accessToken}`}
                })
                alert(`${productName} successfully added`)
                navigate(`/products/all/${id}`)
                setProductName('')
                setPrice('')
                setCategory('true')
                setBestSeller('false')
                setDescription('')
                setImage(null)
            }
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="Main">
            <form className="ResForm" onSubmit={handleAddProduct}>
                <h2>{isEditMode ? "Edit Item" : "Add Item"}</h2>
                <label htmlFor="itemName">Item Name</label>
                <input
                    id="itemName" 
                    type="text"
                    autoFocus
                    required
                    placeholder="Enter Item Name" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <label htmlFor="price">Price</label>
                <input 
                    id="price"
                    type="text"
                    required
                    placeholder="Enter price" 
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                />
                 <label htmlFor="category">Category</label>
                <div className="categoryCheck">
                    <label htmlFor="veg">Veg</label>
                    <input 
                        id="cate-veg"
                        type="radio"
                        value="true"
                        checked = {category === "true"}
                        onChange={() => setCategory("true")}
                    />
                    <label htmlFor="non-veg">Non-veg</label>
                    <input 
                        id="cate-non-veg"
                        type="radio"
                        value="false"
                        checked = {category === "false"}
                        onChange={()=>setCategory("false")}
                    />
                </div>
                <label htmlFor="bestseller">BestSeller</label>
                <div className="categoryCheck">
                    <label htmlFor="true">Yes</label>
                    <input 
                        type="radio"
                        id="best-true"
                        value="true"
                        checked = {bestseller === "true"}
                        onChange={()=>setBestSeller("true")}
                    />
                    <label htmlFor="false">No</label>
                    <input 
                        id="best-false"
                        type="radio"
                        value="false"
                        checked = {bestseller === "false"}
                        onChange={()=>setBestSeller("false")}
                    />
                </div>
                <label htmlFor="description">description</label>
                <textarea 
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)} 
                />
                <label htmlFor="image"></label>
                {isEditMode && existImage && !image &&(
                    <img src={`http://localhost:3500/uploads/${existImage}`}
                    alt = "Current"
                    style={{width : "150px" , height:"auto" }}
                    />
                )
                }
                <input 
                    type="file"
                    id="image" 
                    onChange={handleImage}
                />
                <button type="submit">{isEditMode ? "Edit" : "Submit"}</button>
            </form>
        </div>
    )
}

export default AddItems