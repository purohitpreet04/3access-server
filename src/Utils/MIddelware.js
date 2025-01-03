import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadImageToS3 } from './s3Config.js';
import { s3 } from './s3.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
config()
function verifyJWT(req, res, next) {
    const token = req.headers['authorization']
    const userId = req.headers['user']
    // console.log('userId', userId)
    try {
        if (token) {
            // console.log(token)
            let tkStr = token.split(' ')[1]
            let decode = jwt.verify(tkStr, process.env.JWT_SECRET)
            // console.log(decode, req)
            if (userId == decode.id) {
                next()
            } else {
                return res.status(409).send({ message: "Token not Appropriate" })
            }
        } else {
            return res.status(409).send({ message: "Token not Available" })
        }
    } catch (error) {
        // console.log(error)
        res.status(409).send({ message: 'Token has been expired....please logout' })
    }
}

export default verifyJWT




export const handleBase64Images = () => {
    return async (req, res, next) => {

        for (let key in req.body) {
            const value = req.body[key];


            if (typeof value === 'string' && value.startsWith('data:image/png;base64,')) {
                try {
                    const base64Data = value.replace(/^data:image\/png;base64,/, '');
                    const fileName = `${Date.now()}-${key}.png`;
                    const buffer = Buffer.from(base64Data, 'base64');
                    const params = {
                        Bucket: process.env.AWS_S3_BUCKET, // Your S3 bucket name
                        Key: `uploads/signatures/${fileName}`, // S3 object key
                        Body: buffer,
                        ContentType: 'image/png', // MIME type of the image
                    }
                    await s3.send(new PutObjectCommand(params));
                    req.body[key] = `uploads/signatures/${fileName}`
                } catch (err) {
                    return res.status(500).json({ error: "Failed to process image" });
                }
            }
        }
        // Proceed to the next middleware or route handler
        next();
    }

};

