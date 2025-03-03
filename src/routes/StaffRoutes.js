
import { Router } from 'express';
import verifyJWT from '../Utils/MIddelware.js';
import { AddNewStaff, ArchiveStaff, DeleteStaff, GetManegingAgentandcompany, ListStaff, Restorestaff, transferWork } from '../Controllers/StaffController.js';

const staffrouter = Router();

staffrouter.post('/addnewstaff', verifyJWT, AddNewStaff)
staffrouter.post('/transferWork', verifyJWT, transferWork)

staffrouter.get('/archivestaff', verifyJWT, ArchiveStaff)
staffrouter.get('/restore-staff', verifyJWT, Restorestaff)
staffrouter.get('/liststaff', verifyJWT, ListStaff)
staffrouter.get('/deleteStaff', verifyJWT, DeleteStaff)
staffrouter.get('/getmanegingagent', verifyJWT, GetManegingAgentandcompany)

export default staffrouter;