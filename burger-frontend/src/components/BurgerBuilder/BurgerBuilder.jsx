import React, { useEffect, useState } from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Summary from './Summary/Summary'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addIngredient, removeIngredient, selectIngredients, selectPurchasable, selectTotalPrice, updatePurchasable } from '../../redux/burgerSlice'


//import { store } from '../../redux/store'

const mapStateToProps = state => {
      return {
            ingredients: state.ingredients,
            totalPrice: state.totalPrice,
            purchasable: state.purchasable
      }
}

const mapDispatchToProps = dispatch => {
      return {
            addIngredient: (type) => dispatch(addIngredient(type)),
            removeIngredient: (type) => dispatch(removeIngredient(type)),
            updatePurchasable: () => dispatch(updatePurchasable())
      }
}

const BurgerBuilder = (props) => {
      const navigate = useNavigate();

      const ingredients = useSelector(selectIngredients);
      console.log(ingredients)
      const totalPrice = useSelector(selectTotalPrice);
      const purchasable = useSelector(selectPurchasable)
      console.log(totalPrice)


      const dispatch = useDispatch();

      const [modalOpen, setModalOpen] = useState(false);
      //const [purchasable, setPurchasable] = useState(false)

      useEffect(() => {
            //console.log(store.getState())
      }, [])

      const addItem = (type) => {
            dispatch(addIngredient(type))
            dispatch(updatePurchasable())
      }

      const removeItem = (type) => {
            dispatch(removeIngredient(type))
            dispatch(updatePurchasable())
      }
      return (
            <div>
                  <div className='flex sm:flex-col flex-row'>
                        <Burger ingredients={ingredients} />
                        <Controls addItem={addItem} removeItem={removeItem} totalPrice={totalPrice} openModal={() => setModalOpen(true)} purchasable={purchasable} />
                  </div>
                  <Modal isOpen={modalOpen}>
                        <ModalHeader>Your Order Summery</ModalHeader>
                        <ModalBody>
                              <Summary ingredients={ingredients} />
                              <h5>Total Price: {totalPrice.toFixed(0)} BDT</h5>
                        </ModalBody>
                        <ModalFooter>
                              <Button color='success' onClick={() => navigate('/checkout')}>Continue to Checkout</Button>
                              <Button color='secondary' onClick={() => setModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                  </Modal>
            </div>
      )
}

export default BurgerBuilder;