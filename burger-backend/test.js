const Joi = require('joi')

const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
});

const user = {
      email: "sgmail.com",
      password: "1234"
}

const { error } = schema.validate(user)
console.log(error.details[0].message)