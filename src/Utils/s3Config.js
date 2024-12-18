import fs from 'fs';
import { config } from 'dotenv';
import { s3 } from './s3.js';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

config()



export const getPreSignedUrl = async (s3Key) => {

    if (s3Key === '') {
        return ''
    }
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: s3Key,
        });

        // Generate the signed URL
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        // console.log("Generated Signed URL:", signedUrl); // Log the URL to debug
        return signedUrl;
    } catch (error) {
        console.error("Failed to generate pre-signed URL:", error.message);
        // throw new Error("Failed to generate pre-signed URL");
    }
};

export const uploadImageToS3 = async (file, folder) => {
    if (!file) return
    const s3Key = `uploads/${folder}/${Date.now()}-${file.originalname}`;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: s3Key,
        Body: fs.createReadStream(file.path),
        ContentType: file.mimetype,
    };

    const s3Response = await s3.send(new PutObjectCommand(params));
    // try {
    //     const data = await s3Client.send(new PutObjectCommand(params));
    //     console.log('File uploaded successfully:', data);
    //   } catch (err) {
    //     console.error('Error uploading file:', err);
    //   }

    return {
        filename: file.originalname,
        path: s3Response.Location,
        s3Key: s3Key,
        type: file.mimetype.startsWith('image/') ? 'image' : 'file',
    }
}