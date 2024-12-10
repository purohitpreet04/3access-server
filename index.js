import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import { DbConnnection } from "./src/DB/DB.js";
import authrouter from "./src/routes/AuthRoutes.js";
import staffrouter from "./src/routes/StaffRoutes.js";
import propertyroute from "./src/routes/PropertyRoutes.js";
import userroute from "./src/routes/UserRoutes.js";
import tenents from "./src/routes/Tenents.js";
import deshrouter from "./src/routes/DeshboardRoutes.js";
import { uploadAndProcessFiles } from "./src/Utils/uploadimage.js";
import verifyJWT, { handleBase64Images } from "./src/Utils/MIddelware.js";
import sendMail from "./src/Utils/email.service.js";
import path from 'path'
import { initCronJobs } from "./src/Utils/CronJob.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
config()
const app = express()
app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authrouter)
app.use('/api/user', userroute)
app.use('/api/staff', staffrouter)
app.use('/api/property', propertyroute)
app.use('/api/tenents', tenents)
app.use('/api/desh', deshrouter)

app.post('/api/upload', verifyJWT, uploadAndProcessFiles(), (req, res) => {
    const fileUrls = req.uploadedFiles.map(file => ({
        type: file.type,
        name: file.filename,
        path: `/uploads/${file.type}/${file.filename}`
    }));

    res.json({
        success: true,
        message: 'Files uploaded successfully',
        files: fileUrls
    });
});
app.post('/api/base64', /* verifyJWT, */handleBase64Images() , (req, res) => {
    // const fileUrls = req.uploadedFiles.map(file => ({
    //     type: file.type,
    //     name: file.filename,
    //     path: `/uploads/${file.type}/${file.filename}`
    // }));

    res.json({
        success: true,
        data :req.body,
        message: 'Files uploaded successfully',
    });
});



app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error',
    });
});
initCronJobs()
DbConnnection()
app.listen(process.env.PORT, () => {
    console.log('server is running...')
})