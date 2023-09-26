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
                <OrderItem 
                    id={order._id}
                    key={order._id} 
                    name={order.name}
                    customer={order.customer}
                    address={order.address}
                    creator={order.creator}
                    worker={order.worker}
                    date={order.date}
                    status={order.status}
                    contact={order.contact}
                    description={order.description}
                />

            ))}

        </>

    )
}


export default OrderList;