import { Router } from "express";
import { __dirname } from '../../index.js'
import verifyJWT from "../Utils/MIddelware.js";
import { s3 } from "../Utils/s3.js";
import { getPreSignedUrl } from "../Utils/s3Config.js";
const common = Router();

common.get('/download/demo-file', verifyJWT, async (req, res) => {
    
    try {
        let key = "uploads/files/1737618290142-format-demo.xlsx"
        const signedUrl = await getPreSignedUrl(key)
        res.json({ url: signedUrl });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add or update tenant',
            error: error.message || 'Internal server error',
        });
    }

})

export default common;