const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
 {
  id :{
   type : String,
   required : [true , 'Please Provide User Id'],
   unique:true,
  }
 }
)

module.exports = mongoose.model('User',UserSchema)