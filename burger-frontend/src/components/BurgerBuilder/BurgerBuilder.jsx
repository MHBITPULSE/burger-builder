import React, { useState } from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Summary from './Summary/Summary'
const BurgerBuilder = () => {
      const [ingredients, setIngredients] = useState(
            [
                  { type: "salad", amount: 0, unitPrice: 20 },
                  { type: "cheese", amount: 0, unitPrice: 40 },
                  { type: "meat", amount: 0, unitPrice: 90 },
            ])
      const [totalPrice, setTotalPrice] = useState(80);
      const [modalOpen, setModalOpen] = useState(false);
      const [purchasable, setPurchasable] = useState(false)
      const addItem = (type) => {
            let ingredient = [...ingredients]
            for (let item of ingredient) {
                  if (item.type === type) {
                        item.amount++
                        setTotalPrice(totalPrice + item.unitPrice)
                        setPurchasable(true)
                  }
            }
            setIngredients(ingredient)
      }

      const removeItem = (type) => {
            let ingredient = [...ingredients]
            let totalIngredientAmount = 0
            for (let item of ingredient) {
                  if ((item.type === type)) {
                        if (item.amount === 0) return;
                        item.amount--
                        setTotalPrice(totalPrice - item.unitPrice)
                  }
                  totalIngredientAmount = totalIngredientAmount + item.amount
            }
            if (totalIngredientAmount === 0) setPurchasable(false)
            setIngredients(ingredient)
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
                              <Button color='success' onClick={() => setModalOpen(!modalOpen)}>Continue to Checkout</Button>
                              <Button color='secondary' onClick={() => setModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                  </Modal>
            </div>
      )
}

export default BurgerBuilder