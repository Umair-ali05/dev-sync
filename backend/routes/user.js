/** @format */

import express from 'express';
import user from '../controller/user.js';

const route = express.Router();

route.post('/register', user.registration);
route.post('/login', user.login);

export default route;
