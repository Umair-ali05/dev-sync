/** @format */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  otp:{
    type:Number,
  },
  isActive:{
    type:Boolean,
    default:false,
  },
  password: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const userModel = mongoose.model('user', userSchema);
export default userModel;
