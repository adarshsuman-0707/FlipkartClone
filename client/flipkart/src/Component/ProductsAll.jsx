import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../StyleSheet/productsall.css'
import { Link, useNavigate } from 'react-router-dom'

import { Trash2, RefreshCcw } from 'lucide-react'
const ProductsAll = () => {
    let [response, setResponse] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/products");
                setResponse(data);
            } catch (e) {
                // setError(e);
                console.error(e, " not found ");
            } finally {
                // setLoading(false);
            }
        };

        fetchData();

        // Cleanup function (if needed)
        return () => {
            // Any cleanup can be done here
        };
    }, []);
    async function deletes(id) {
        console.log(id);
        try {
            let res = await axios.delete(`http://localhost:3000/api/products/${id}`);
            alert("Deleted successfully")
        }
        catch (e) {
            console.log(e);
        }

    }
 let navigate = useNavigate();
     async function update(id) {
        
   
        console.log(id, "update krne ke liye");
      
            //  let upd= await axios.update
        await  navigate("/update/product",{ state: { updateId :[id]} })
        
       
    }

    return (
        <>
            <div className='container'>
                <div className='dataContainer'>
                    <br /><br />

                    <div><h1 className='headingPro'>USER PRODUCT</h1></div>
                    <br />
                    {response.map(item => (
                        <> <div id="inner">
                            <div><img src={item.image} alt="image" id="imgProduct" /></div>
                            <div className='showData'>
                                <p id="para" style={{ textOverflow: "ellipsis" }}>
                                    <span className='headingProd'>   Product name : </span><span id="datainfo"> {item.name}</span>
                                    <br />
                                    <span className='headingProd'>    product brand : </span> <span id="datainfo">{item.brand}</span>
                                    <br />
                                    <span className='headingProd'> product price : </span> <span id="datainfo">{item.price}</span>
                                    <br />
                                    <span className='headingProd'> product category :</span> <span id="datainfo">{item.category}</span>
                                    <br />
                                    <span className='headingProd'> product description : </span>< span id="datainfo">{item.description}</span>
                                    <br />
                                    <br />

                                    <span className='update'>
                                        <label id='updbtn'onClick={()=>{update(item._id)}} ><RefreshCcw height={19} /> update</label>
                                        <Link id="delbtn" onClick={() => { deletes(item._id) }}><Trash2 height={19} />delete</Link>
                                    </span>
                                </p>
                            </div>
                            <div>

                            </div>
                        </div>
                            <br /></>

                    ))}


                </div>
            </div>


            {/* {toggle?(<div className='ShowDialogBox'>
<h1>Update product </h1>
            
            </div>):(<></>) */}

        </>
    )
}

export default ProductsAll