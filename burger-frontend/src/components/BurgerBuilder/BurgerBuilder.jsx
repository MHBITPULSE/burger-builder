import React, { useState } from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls'

const BurgerBuilder = () => {
      const [ingredients, setIngredients] = useState(
            [
                  { type: "salad", amount: 0, unitPrice: 20 },
                  { type: "cheese", amount: 0, unitPrice: 40 },
                  { type: "meat", amount: 0, unitPrice: 90 },
            ])
      const [totalPrice, setTotalPrice] = useState(80)
      const addItem = (type) => {
            let ingredient = [...ingredients]
            for (let item of ingredient) {
                  if (item.type === type) {
                        item.amount++
                        setTotalPrice(totalPrice + item.unitPrice)
                  }
            }
            setIngredients(ingredient)
      }

      const removeItem = (type) => {
            let ingredient = [...ingredients]
            for (let item of ingredient) {
                  if ((item.type === type)) {
                        if (item.amount === 0) return;
                        item.amount--
                        setTotalPrice(totalPrice - item.unitPrice)
                  }
            }
            setIngredients(ingredient)
      }
      return (
            <div className='flex sm:flex-col flex-row'>
                  <Burger ingredients={ingredients} />
                  <Controls addItem={addItem} removeItem={removeItem} totalPrice={totalPrice} />
            </div>
      )
}

export default BurgerBuilder