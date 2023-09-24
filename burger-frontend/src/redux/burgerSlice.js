import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const INGREDIENT_PRICES = {
      salad: 20,
      cheese: 40,
      meat: 90
}

export const burgerSlice = createSlice({
      name: "burger",
      initialState: {
            ingredients: [
                  { type: "salad", amount: 0 },
                  { type: "cheese", amount: 0 },
                  { type: "meat", amount: 0 },
            ],
            totalPrice: 80,
            purchasable: false,
            orders: [],
            orderLoading: true,
            orderErr: false
      },
      reducers: {
            addIngredient: (state, action) => {
                  console.log(action)
                  const ingredients = [...state.ingredients]
                  console.log(state.ingredients)
                  for (let item of ingredients) {

                        if (item.type === action.payload) item.amount++
                  }
                  state.totalPrice += INGREDIENT_PRICES[action.payload]
                  state.ingredients = ingredients
            },
            removeIngredient: (state, action) => {
                  const ingredients = [...state.ingredients]
                  for (let item of ingredients) {
                        if (item.type === action.payload) {
                              if (item.amount === 0) return state;
                              item.amount--
                        }
                  }
                  state.totalPrice -= INGREDIENT_PRICES[action.payload]
                  state.ingredients = ingredients

            },
            resetIngredient: (state, action) => {
                  state.ingredients = [
                        { type: "salad", amount: 0 },
                        { type: "cheese", amount: 0 },
                        { type: "meat", amount: 0 },
                  ];

                  state.totalPrice = 80;
                  state.purchasable = false;
            },
            updatePurchasable: (state, action) => {
                  const sum = state.ingredients.reduce((sum, eliment) => {
                        return sum + eliment.amount;
                  }, 0);
                  state.purchasable = sum > 0

            },
            loadOrders: (state, action) => {

                  let orders = [];
                  for (let key in action.payload) {
                        orders.push({
                              ...action.payload[key],
                              id: key
                        })
                  }
                  state.orders = orders;
                  state.orderLoading = false;
                  state.orderErr = false
            },
            orderLoadFailed: (state) => {
                  state.orderLoading = false
                  state.orderErr = true
            }
      }
})

export const { addIngredient, removeIngredient, resetIngredient, updatePurchasable, loadOrders, orderLoadFailed } = burgerSlice.actions;

export const fetchOrders = (token, userId) => async (dispatch) => {

      // const queryParams = '&orderBy="userId"&equalTo="' + userId + '"'

      // await axios.get('https://burger-builder-9fc26-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
      //       .then(response => dispatch(loadOrders(response.data)))
      //       .catch(err => dispatch(orderLoadFailed()))

      await axios.get('http://localhost:3001/api/order/', {
            headers: {
                  Authorization: `Bearer ${token}`
            }
      })
            .then(response => dispatch(loadOrders(response.data)))
            .catch(err => dispatch(orderLoadFailed()))

}

export const selectIngredients = (state) => state.burger.ingredients
export const selectTotalPrice = (state) => state.burger.totalPrice

export const selectPurchasable = (state) => state.burger.purchasable

export const selectOrders = (state) => state.burger.orders
export const selectOrderLoading = (state) => state.burger.orderLoading
export const selectOrderErr = (state) => state.burger.orderErr

export default burgerSlice.reducer