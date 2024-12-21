import { Router } from 'express';
import verifyJWT from '../Utils/MIddelware.js';
import { AddNewTemplate, DeleteRsl, getallRSL, getAllRslTemplates, getAllSuggetion, getRSL, getrsldetails, getTemplateDetails, RegisterNewRSL, setrslforagent } from '../Controllers/RSLcontroller.js';
import { uploadAndProcessFiles } from '../Utils/uploadimage.js';

const rslRoutes = Router()

rslRoutes.post('/register-rsl', verifyJWT, uploadAndProcessFiles('rsllogos'), RegisterNewRSL)
rslRoutes.post('/addnewtemplate', verifyJWT, AddNewTemplate)
rslRoutes.post('/setrslforagent', verifyJWT, setrslforagent)

rslRoutes.get('/getrsl-list', verifyJWT, getallRSL)
rslRoutes.get('/getallRsl', verifyJWT, getRSL)
rslRoutes.get('/get-rsl-details', verifyJWT, getrsldetails)
rslRoutes.get('/getallsuggetion', verifyJWT, getAllSuggetion)
rslRoutes.get('/getallrsltemplates', verifyJWT, getAllRslTemplates)
rslRoutes.get('/gettemplatedetails', verifyJWT, getTemplateDetails)
rslRoutes.get('/deletersl', verifyJWT, DeleteRsl)



export default rslRoutes