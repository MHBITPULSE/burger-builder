import React from 'react'
import BreadTop from '../../../assets/images/top.png'
import BreadBottom from '../../../assets/images/bottom.png'
import Salad from '../../../assets/images/salad.png'
import Meat from '../../../assets/images/meat.png'
import Cheese from '../../../assets/images/cheese.png'

const Ingredient = ({ type }) => {
      let ingredient = null;

      switch (type) {
            case 'bread-bottom':
                  ingredient = <div><img src={BreadBottom} alt="Bottom Bread" className='w-full' /></div>
                  break;
            case 'bread-top':
                  ingredient = <div><img src={BreadTop} alt="Top Bread" className='w-full' /></div>
                  break;
            case 'meat':
                  ingredient = <div><img src={Meat} alt="Meat" className='w-full' /></div>
                  break;
            case 'salad':
                  ingredient = <div><img src={Salad} alt="Salad" className='w-full' /></div>
                  break;
            case 'cheese':
                  ingredient = <div><img src={Cheese} alt="Cheese" className='w-full' /></div>
                  break;
            default:
                  break;
      }
      return (
            <div className='text-center m-[5px] w-[80%]'>
                  {ingredient}
            </div>
      )
}

export default Ingredient