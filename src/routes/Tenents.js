import { Router } from 'express';
import { AddCompanies, getSelectedData } from '../Controllers/userConttroller.js';
import verifyJWT, { handleBase64Images } from '../Utils/MIddelware.js';
import { AddTenants, approveStatus, checkForNINO, EditTenatns, ExportNotActiveTenants, getTenantDetails, getTenantsAllDetails, HandleDeleteExportedData, HandleSendEmailToAgent, importExistingTenant, ListTenents, PendingTenentsList, signOutTenantList, signOutTenants, UpdateAssessment } from '../Controllers/TenatesController.js';
import { getdocument } from '../Controllers/DocumentsConroller.js';
import { upload } from '../Utils/uploadimage.js';

const tenents = Router();

// tenents.post('/addtenants', verifyJWT, handleBase64Images(), AddTenants);
tenents.post('/addtenants', verifyJWT, AddTenants);
tenents.post('/signouttenants', verifyJWT, signOutTenants);
tenents.post('/update-assessment', verifyJWT, UpdateAssessment);
tenents.post('/import-tenants', verifyJWT, upload, importExistingTenant);
tenents.post('/exportnotactivetenants', verifyJWT, ExportNotActiveTenants);
tenents.post('/delete-exported-data', verifyJWT, HandleDeleteExportedData);



tenents.get('/getSelectedData', verifyJWT, getSelectedData);
tenents.get('/sendemailtoagent', verifyJWT, HandleSendEmailToAgent);
tenents.get('/ListTenents', verifyJWT, ListTenents);
tenents.get('/pending-tenants', verifyJWT, PendingTenentsList);
tenents.get('/change-tenants-status', verifyJWT, approveStatus);
tenents.get('/signouttenantlist', verifyJWT, signOutTenantList);
tenents.get('/edittenatns', verifyJWT, EditTenatns);
tenents.get('/getdocument', verifyJWT, getdocument);
tenents.get('/gettenantdetails', verifyJWT, getTenantDetails);
tenents.get('/get-all-details', verifyJWT, getTenantsAllDetails);
tenents.get('/check-nino', verifyJWT, checkForNINO);

export default tenents;