const express = require('express')

const router = express.Router();

const authorize = require('../middlewares/authorize')

const { createCartItem, getCartItem, updateCartItem, deleteCartItem } = require('../controllers/cart.controllers');

router.post('/', authorize, createCartItem);

router.get('/', authorize, getCartItem);

router.put('/', authorize, updateCartItem);

router.delete('/:id', authorize, deleteCartItem);

module.exports = router