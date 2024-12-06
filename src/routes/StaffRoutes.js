
import { Router } from 'express';
import verifyJWT from '../Utils/MIddelware.js';
import { AddNewStaff, DeleteStaff, GetManegingAgentandcompany, ListStaff } from '../Controllers/StaffController.js';

const staffrouter = Router();

staffrouter.post('/addnewstaff', verifyJWT, AddNewStaff)
staffrouter.get('/liststaff', verifyJWT, ListStaff)
staffrouter.get('/deleteStaff', verifyJWT, DeleteStaff)
staffrouter.get('/getmanegingagent', verifyJWT, GetManegingAgentandcompany)

export default staffrouter;