import { useEffect, useState } from 'react';
import axios from 'axios';



import OrderItem from './OrderItem'

const OrderList = () => {
    const [fetchedOrders, setFetchedOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/orders/all')
                setFetchedOrders(response.data)

            } catch (err) {
                console.log("Error fetching orders", err);
            }
        }
        fetchOrders()
    }, [])




    return (

        <>

            {fetchedOrders.map(order => (
                <OrderItem key={order._id} order={order} />

            ))}

        </>

    )
}


export default OrderList;