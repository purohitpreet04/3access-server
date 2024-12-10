
import { Router } from 'express';
import { AddCompanies, getSelectedData, checkUserHasStaffOrAgent, AddEmail, getEmails, GetEmailLogs, GeneratePdfController, fetchUserDetails } from '../Controllers/userConttroller.js';
import verifyJWT from '../Utils/MIddelware.js';
import { getUserLogs } from '../Controllers/ActivityController.js';

const userroute = Router();

userroute.post('/addcompanies', verifyJWT, AddCompanies);
userroute.post('/addemail', verifyJWT, AddEmail);
userroute.get('/getSelectedData', verifyJWT, getSelectedData);
userroute.get('/emails', verifyJWT, getEmails);
userroute.get('/checkhasstaff', verifyJWT, checkUserHasStaffOrAgent);
userroute.get('/getemaillogs', verifyJWT, GetEmailLogs);
userroute.get('/generate-pdf', verifyJWT, GeneratePdfController);
userroute.get('/getuserlogs', verifyJWT, getUserLogs);
userroute.get('/fetchuserdetails', verifyJWT, fetchUserDetails);


export default userroute;