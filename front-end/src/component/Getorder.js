import React, { useEffect, useState } from "react";
//import { Link } from 'react-router-dom'
const OrderList = () => {
    const [user, setuser] = useState([]);

    useEffect(() => {
        getOrder()
    },[])

    const getOrder = async () => {
        let result = await fetch('http://localhost:3000/url/get-order', {
            headers: {
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setuser(result)
    }

    const searchHandle = async (event) => {

        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:3000/url/get-order/${key}`,
                {
                    headers: {
                        authorization: `${JSON.parse(localStorage.getItem('token'))}`
                    }
                })
            result = await result.json()
            if (result) {
                setuser(result)
            }
        } else {
            getOrder()
        }
    }

    return(
        <div className="product-list">
            <h3>order List</h3>
            <input type="text" className="search-product-box" placeholder="Search Product"
                onChange={searchHandle} />
             </div>
    )
}

export default OrderList