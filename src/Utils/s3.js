import {config} from 'dotenv';
// import AWS from 'aws-sdk'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

config()

var accessKeyId = process.env.AWS_ACCESS_KEY_ID;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
var region = process.env.AWS_DEFAULT_REGION;
export const s3 = new S3Client({ region: region });