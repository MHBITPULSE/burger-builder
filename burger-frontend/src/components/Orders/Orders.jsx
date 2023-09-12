import React, { useEffect } from 'react'

import { fetchOrders, selectOrders, selectOrderLoading, selectOrderErr } from '../../redux/burgerSlice'
import { useDispatch, useSelector } from 'react-redux'
import Order from './Order/Order';
import Spinner from '../spinner/Spinner';

const Orders = () => {
      const orders = useSelector(selectOrders);
      const orderLoading = useSelector(selectOrderLoading)
      const orderErr = useSelector(selectOrderErr)
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(fetchOrders())
      }, [])
      useEffect(() => {
            console.log(orders)
      }, [orderLoading])
      let orderList = null;

      if (orderErr) {
            orderList = <p className='p-2 m-2 border-2 border-neutral-800 rounded-lg'>Sorry! Failed to Load Orders</p>
      } else {
            if (orders.length === 0) {
                  orderList = <p className='p-2 m-2 border-2 border-neutral-800 rounded-lg'>You have no  Orders</p>
            } else {
                  orderList = orders.map((order, index) => <Order order={order} key={index} />)
            }

      }



      return (
            <div>{orderLoading ? <Spinner /> : orderList}</div>
      )
}

export default Orders