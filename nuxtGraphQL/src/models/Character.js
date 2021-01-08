const mongoose = require('mongoose')
const Joi = require('joi')

const schema = new mongoose.Schema({
  name: String,
  status: String,
  image: String,
  gender: String
})

const Character = mongoose.model('Character', schema)

const validateCharacter = (character) => {
  return Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    status: Joi.string().required(),
    gender: Joi.string().allow(''),
    image: Joi.string().allow('')
  }).validate(character)
}

module.exports = {Character, validateCharacter}