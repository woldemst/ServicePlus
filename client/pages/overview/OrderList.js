import { useEffect, useState } from 'react';
import axios from 'axios';

import OrderItem from './OrderItem'

const OrderList = () => {
    const [fetchedOrders, setFetchedOrders] = useState([])


    useEffect(()=>{})

    return (
        <>

            <OrderItem />
        </>
    )
}


export default OrderList;