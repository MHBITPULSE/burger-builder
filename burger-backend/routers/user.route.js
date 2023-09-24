const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const { User, validate } = require('../models/user')


const router = express.Router()

const newUser = async (req, res) => {

      const { error } = validate(req.body)
      if (error) return res.status(400).send(error.details[0].message)
      console.log(req.body)

      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).send("User already registered!")

      user = new User(_.pick(req.body, ['name', 'email', 'password']))

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt)

      const token = user.generateJWT();
      const result = await user.save();

      return res.status(201).send({
            token: token,
            user: _.pick(result, ['_id', 'email'])
      })


}

const authUser = async (req, res) => {
      console.log(req.body)
      let user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(400).send("Invalid Email or Password")

      const validUser = await bcrypt.compare(req.body.password, user.password)
      if (!validUser) return res.status(400).send("Invalid Email or Password")

      const token = user.generateJWT();
      const result = await user.save();
      return res.status(200).send({
            token: token,
            user: _.pick(result, ['_id', 'email'])
      })
}

router.post('/', newUser)

router.post('/auth', authUser)


module.exports = router