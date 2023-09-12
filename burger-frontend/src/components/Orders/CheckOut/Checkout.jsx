import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import { selectIngredients, selectTotalPrice } from '../../../redux/burgerSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Spinner from '../../spinner/Spinner'
import { resetIngredient } from '../../../redux/burgerSlice'


const Checkout = (props) => {
      const ingredients = useSelector(selectIngredients)
      const totalPrice = useSelector(selectTotalPrice)
      const dispatch = useDispatch();

      const [isLoading, setIsLoading] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [modalMsg, setModalMsg] = useState("")
      const navigate = useNavigate()
      const [values, setValues] = useState({
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
      })


      const goBack = () => {
            console.log("Go Back")
            navigate(-1)
      }

      const inputChangeHandle = (e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
      }
      const submitHandle = (e) => {
            setIsLoading(true)
            const order = {
                  ingredients: ingredients,
                  customer: values,
                  price: totalPrice,
                  ordertime: new Date()
            }

            axios.post('https://burger-builder-9fc26-default-rtdb.firebaseio.com/orders.json', order)
                  .then(response => {
                        if (response.status === 200) {
                              setIsLoading(false)
                              setIsModalOpen(true)
                              setModalMsg("Order Placed Successfully")
                              dispatch(resetIngredient())
                        }
                        else {
                              setIsLoading(false)
                              setIsModalOpen(true)
                              setModalMsg("Something Went Wrong")
                        }
                  })
                  .catch(err => {
                        console.log(err)
                        setIsLoading(false)
                        setIsModalOpen(true)
                        setModalMsg("Something Went Wrong")
                  })
            console.log(order)
      }

      let form = (
            <div>
                  <h4>Payment {totalPrice} BDT</h4>
                  <form className='p-4 border-2 border-spacing-2 border-gray-400 shadow-lg rounded-md'>
                        <textarea name="deliveryAddress" value={values.deliveryAddress} className='form-control' placeholder='Your Address' cols="30" rows="10" onChange={inputChangeHandle}></textarea>
                        <br />
                        <input type="text" name="phone" className="form-control" value={values.phone} placeholder='Your Phone No.' onChange={inputChangeHandle} />
                        <select name="paymentType" className="form-control" value={values.paymentType} onChange={inputChangeHandle}>
                              <option value="Cash On Delivery">Cash On Delivery</option>
                              <option value="Bkash">Bkash</option>
                        </select>
                        <br />
                        <Button className='bg-rose-500 mr-auto' onClick={submitHandle}>Place Order</Button>
                        <Button className='bg-rose-500 ml-1' onClick={goBack}>Cancel</Button>
                  </form>
            </div>
      )
      return (

            <div>
                  {isLoading ? <Spinner /> : form}
                  <Modal isOpen={isModalOpen} onClick={goBack}>
                        <ModalBody>
                              <p>{modalMsg}</p>
                        </ModalBody>
                  </Modal>
            </div>
      )
}

export default Checkout