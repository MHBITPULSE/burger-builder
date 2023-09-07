import React, { useState } from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls'

const BurgerBuilder = () => {
      const [ingredients, setIngredients] = useState(
            [
                  { type: "salad", amount: 0 },
                  { type: "cheese", amount: 0 },
                  { type: "meat", amount: 0 },
            ])
      return (
            <div className='flex flex-col'>
                  <Burger ingredients={ingredients} />
                  <Controls />
            </div>
      )
}

export default BurgerBuilder