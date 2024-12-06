import { Router } from 'express';
import { AddCompanies, getSelectedData } from '../Controllers/userConttroller.js';
import verifyJWT, { handleBase64Images } from '../Utils/MIddelware.js';
import { AddTenants, EditTenatns, getTenantDetails, ListTenents, signOutTenants } from '../Controllers/TenatesController.js';
import { getdocument } from '../Controllers/DocumentsConroller.js';

const tenents = Router();

tenents.post('/addtenants', verifyJWT, handleBase64Images(), AddTenants);
tenents.get('/getSelectedData', verifyJWT, getSelectedData);
tenents.get('/ListTenents', verifyJWT, ListTenents);
tenents.get('/edittenatns', verifyJWT, EditTenatns);
tenents.get('/getdocument', verifyJWT, getdocument);
tenents.get('/gettenantdetails', verifyJWT, getTenantDetails);
tenents.post('/signouttenants', verifyJWT, signOutTenants);

export default tenents;