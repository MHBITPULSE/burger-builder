const jwt = require('jsonwebtoken')
const Joi = require('joi')


const { Schema, model } = require('mongoose')

const userSchema = Schema({
      name: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 255
      },
      password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
      }
});

userSchema.methods.generateJWT = function () {
      const token = jwt.sign(
            { _id: this._id, email: this.email, name: this.name },
            process.env.JWT_SECRET_KEY,
            {
                  expiresIn: "3h"
            })
      return token;
};

const validateuser = user => {
      const schema = Joi.object({
            name: Joi.string().min(3).max(255).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
      });

      return schema.validate(user)
}



module.exports.User = model('User', userSchema)
module.exports.validate = validateuser