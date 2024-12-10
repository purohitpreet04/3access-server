
import { Router } from 'express';
import verifyJWT from '../Utils/MIddelware.js';
import { GetallProperty } from '../Controllers/DeshboardController.js';

const deshrouter = Router();

deshrouter.get('/getallproperty',verifyJWT, GetallProperty);


export default deshrouter;