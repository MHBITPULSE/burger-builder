import React from 'react'

const Order = ({ order }) => {

      const ingredientSummary = order.ingredients.map((item, index) => {
            return (
                  <span key={index} className='p-2 m-2 border-2 border-neutral-800 rounded-lg'>{item.amount} x <span className='uppercase'>{item.type}</span></span>
            )
      })
      return (
            <div className='p-2 m-2 border-2 border-neutral-800 shadow-md rounded-lg'>
                  <p>Order Number: {order.id}</p>
                  <p>Delivery Address: {order.customer.deliveryAddress}</p>
                  <hr />
                  {ingredientSummary}
                  <hr />
                  <p>Total: {order.price}</p>

            </div>
      )
}

export default Order