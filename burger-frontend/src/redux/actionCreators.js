import * as actiontypes from './actionTypes'

export const addIngredient = type => {
      return {
            type: actiontypes.ADD_INGREDIENT,
            payload: type
      }
}

export const removeIngredient = type => {
      return {
            type: actiontypes.REMOVE_INGREDIENT,
            payload: type
      }
}

export const updatePurchasable = () => {
      return {
            type: actiontypes.UPDATE_PURCHASABLE,
      }
}