import {config} from 'dotenv';
import AWS from 'aws-sdk'

config()

var accessKeyId = process.env.AWS_ACCESS_KEY_ID;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
var region = process.env.AWS_DEFAULT_REGION;


export const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region:region,
});