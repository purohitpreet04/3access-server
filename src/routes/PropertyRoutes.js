import { Router } from 'express';
import verifyJWT from '../Utils/MIddelware.js';
import { AddnewProperty, CheckRoomAvebility, deleteProperty, getAllComapny, getAllProperty, getAllpropertyforTenants, getPropertyDetails } from '../Controllers/PropertyController.js';

const propertyroute = Router();

propertyroute.post('/addnewproperty', verifyJWT, AddnewProperty);
propertyroute.get('/getallcompany', verifyJWT, getAllComapny);
propertyroute.get('/getallproperty', verifyJWT, getAllProperty);
propertyroute.get('/getpropertydetails', verifyJWT, getPropertyDetails);
propertyroute.get('/deleteProperty', verifyJWT, deleteProperty);
propertyroute.get('/getallpropertyfortenants', verifyJWT, getAllpropertyforTenants);
propertyroute.get('/checkroomavebility', verifyJWT, CheckRoomAvebility);


export default propertyroute;