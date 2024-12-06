import AWS from 'aws-sdk'
import fs from 'fs';
import { config } from 'dotenv';
import { s3 } from './s3.js';

config()


export const getPreSignedUrl = async (s3Key) => {
    try {
        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: s3Key,
        });
        return signedUrl;
    } catch (error) {
        throw new Error('Failed to generate pre-signed URL');
    }
};


export const uploadImageToS3 = async (file, folder) => {
    if (!file) return
    const s3Key = `uploads/${folder}/${Date.now()}-${file.originalname}`;
    const s3Response = await s3
        .upload({
            Bucket: process.env.AWS_S3_BUCKET, 
            Key: s3Key,
            Body: fs.createReadStream(file.path),
            ContentType: file.mimetype,
        })
        .promise();

    return {
        filename: file.originalname,
        path: s3Response.Location,
        s3Key: s3Key,
        type: file.mimetype.startsWith('image/') ? 'image' : 'file',
    }
}