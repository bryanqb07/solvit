const fs = require('fs');
const AWS = require('aws-sdk');
const keys = require('./keys');

// Enter copied or downloaded access id and secret here
const ID = keys.AWSID;
const SECRET = keys.AWSKey;

// Enter the name of the bucket that you have created here
const BUCKET_NAME = keys.AWSBucketName;

// Initializing S3 Interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});
 
const uploadFile = (fileName) => {
    // read content from the file
    const fileContent = fs.readFileSync(fileName);

    // setting up s3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'testFence.png', // file name you want to save as
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`)
    });
};