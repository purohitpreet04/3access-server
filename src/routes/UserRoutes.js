
import { Router } from 'express';
import { AddCompanies, getSelectedData, checkUserHasStaffOrAgent, AddEmail, getEmails, GetEmailLogs, GeneratePdfController, fetchUserDetails, AgentDetails, hanndleAgentStatus, handleExcelFileuload, handleAgentStatus } from '../Controllers/userConttroller.js';
import verifyJWT from '../Utils/MIddelware.js';
import { getUserLogs } from '../Controllers/ActivityController.js';
import { upload } from '../Utils/uploadimage.js';

const userroute = Router();

userroute.post('/addcompanies', verifyJWT, AddCompanies);
userroute.post('/addemail', verifyJWT, AddEmail);
userroute.post('/upload-Excel', verifyJWT, upload, handleExcelFileuload);
userroute.get('/email-notification', verifyJWT, handleAgentStatus);
userroute.get('/getSelectedData', verifyJWT, getSelectedData);
userroute.get('/emails', verifyJWT, getEmails);
userroute.get('/checkhasstaff', verifyJWT, checkUserHasStaffOrAgent);
userroute.get('/getemaillogs', verifyJWT, GetEmailLogs);
userroute.get('/generate-pdf', verifyJWT, GeneratePdfController);
userroute.get('/getuserlogs', verifyJWT, getUserLogs);
userroute.get('/fetchuserdetails', verifyJWT, fetchUserDetails);
userroute.get('/agentdetials', verifyJWT, AgentDetails);
userroute.get('/updatestatus', verifyJWT, hanndleAgentStatus);

export default userroute;