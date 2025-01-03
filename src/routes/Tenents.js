import { Router } from 'express';
import { AddCompanies, getSelectedData } from '../Controllers/userConttroller.js';
import verifyJWT, { handleBase64Images } from '../Utils/MIddelware.js';
import { AddTenants, checkForNINO, EditTenatns, getTenantDetails, ListTenents, signOutTenantList, signOutTenants, UpdateAssessment } from '../Controllers/TenatesController.js';
import { getdocument } from '../Controllers/DocumentsConroller.js';

const tenents = Router();

// tenents.post('/addtenants', verifyJWT, handleBase64Images(), AddTenants);
tenents.post('/addtenants', verifyJWT, AddTenants);
tenents.post('/signouttenants', verifyJWT, signOutTenants);
tenents.post('/update-assessment', verifyJWT, UpdateAssessment);

tenents.get('/getSelectedData', verifyJWT, getSelectedData);
tenents.get('/ListTenents', verifyJWT, ListTenents);
tenents.get('/signouttenantlist', verifyJWT, signOutTenantList);
tenents.get('/edittenatns', verifyJWT, EditTenatns);
tenents.get('/getdocument', verifyJWT, getdocument);
tenents.get('/gettenantdetails', verifyJWT, getTenantDetails);
tenents.get('/check-nino', verifyJWT, checkForNINO);

export default tenents;