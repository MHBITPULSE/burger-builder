import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControl = ({ label, type, addItem, removeItem }) => {
    return (
        <div className='flex'>
            <div className='mr-auto ml-5 font-bold text-xl'>{label}</div>
            <button className='btn btn-danger btn-sm m-1' onClick={() => removeItem(type)}>Less</button>
            <button className='btn btn-success  btn-sm m-1' onClick={() => addItem(type)}>More</button>
        </div>
    )
}

const Controls = ({ addItem, removeItem, totalPrice, openModal, purchasable }) => {
    return (
        <div className='container ml-md-5 text-center'>
            <Card className='mt-6 mb-6 text-center'>
                <CardHeader className='text-white bg-black'>
                    <h4>Add Ingredient</h4>
                </CardHeader>
                <CardBody>
                    {controls.map((item, index) => {
                        return <BuildControl label={item.label} type={item.type} key={index} addItem={addItem} removeItem={removeItem} />
                    })}
                </CardBody>
                <CardFooter><h5>Price:  {totalPrice} BDT</h5></CardFooter>
                <Button disabled={!purchasable} onClick={openModal}>Order Now</Button>
            </Card>
        </div>
    )
}

export default Controls