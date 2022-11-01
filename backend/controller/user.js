/** @format */

import user from '../db/model/user.js';
import bcrypt from 'bcrypt';

import sendMail from '../helper/sendMail.js';

export default {
  registration: async (req, res) => {
    const subject = "otp for user registration"
    const { name, email, password } = req.body;
    try {
      if (!name) {
        return res.send('name is missing please enter name');
      }
      if (!email) {
        return res.send('email is missing please enter email');
      }
      if (!password) {
        return res.send('Password is missing please enter Password');
      }
      const alreadyUser = await user.findOne({ email });
      if (alreadyUser) {
        return res.send('with this email user already exist');
      }
      const otp= Math.floor(100000 + Math.random() * 900000)
      const userData = new user({
        name,
        email,
        otp,
        password,
      });
      const userCreated = userData.save();
      sendMail(
        userData.email,
        userData.otp,
        subject,
      );
      return res.send({
        message: 'user created successfully',
        user: userCreated,
      });
    } catch (error) {
      return res.send({
        success: false,
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email) {
        return res.send('email is missing please enter email');
      }
      if (!password) {
        return res.send('Password is missing please enter Password');
      }
      const userLogin = await user.findOne({ email });
      if (!userLogin) {
        return res.send('no user found');
      }

      const passwordCheck = await bcrypt.compare(password, userLogin.password);
      console.log(passwordCheck);
      if (!passwordCheck) {
        return res.send('you enter wrong password');
      }
      res.send({
        message: 'login successfully',
        user: userLogin,
      });
    } catch (error) {
      return res.send({
        success: false,
        error: error.message,
      });
    }
  },
};
