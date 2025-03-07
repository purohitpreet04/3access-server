
import { Router } from 'express';
import { login, registerUser, VerifyByLink, verifyOtp } from '../Controllers/Authconttroller.js';
import verifyJWT from '../Utils/MIddelware.js';

const authrouter = Router();

authrouter.post('/login', login);
authrouter.post('/register', registerUser);
authrouter.post('/verify-otp', verifyOtp);
authrouter.get('/verify-user', VerifyByLink);
// authrouter.get('/fetchuserdata',verifyJWT, fetchUserDetails);

export default authrouter;