
import { Router } from 'express';
import { AddCompanies, getSelectedData, checkUserHasStaffOrAgent, AddEmail, getEmails, GetEmailLogs } from '../Controllers/userConttroller.js';
import verifyJWT from '../Utils/MIddelware.js';

const userroute = Router();

userroute.post('/addcompanies', verifyJWT, AddCompanies);
userroute.post('/addemail', verifyJWT, AddEmail);
userroute.get('/getSelectedData', verifyJWT, getSelectedData);
userroute.get('/emails', verifyJWT, getEmails);
userroute.get('/checkhasstaff', verifyJWT, checkUserHasStaffOrAgent);
userroute.get('/getemaillogs', verifyJWT, GetEmailLogs);

export default userroute;