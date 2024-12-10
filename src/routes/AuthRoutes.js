
import { Router } from 'express';
import { fetchUserDetails, login, registerUser } from '../Controllers/Authconttroller.js';
import verifyJWT from '../Utils/MIddelware.js';

const authrouter = Router();

authrouter.post('/login', login);
authrouter.post('/register', registerUser);
authrouter.get('/fetchuserdata',verifyJWT, fetchUserDetails);

export default authrouter;