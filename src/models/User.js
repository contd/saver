const mogoose = require('mongoose')
const hasRolesAndClaims = require('gatemanjs').hasRolesAndClaims(mogoose)

var UserSchema =  mongoose.Schema({
  name: String,
  email: String
})

UserSchema.loadClass(hasRolesAndClaims)
module.exports = mongoose.model('User',UserSchema)