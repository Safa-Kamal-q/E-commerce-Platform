import express from 'express';
const app = express();
import AWS from 'aws-sdk';
// Configure AWS SDK with your credentials
AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();
// Create an S3 bucket
const createBucketParams = {
    Bucket: 'bucket-e-commerce',
};
s3.createBucket(createBucketParams, (err, data) => {
    if (err) {
        console.error('Error creating S3 bucket:', err);
    }
    else {
        console.log('S3 bucket created:', data);
        // Upload a file to the S3 bucket
        const uploadParams = {
            Bucket: 'YOUR_BUCKET_NAME',
            Key: 'YOUR_FILE_KEY',
            Body: 'YOUR_LOCAL_FILE_PATH', // Replace with the path to your local file
        };
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                console.error('Error uploading file to S3:', err);
            }
            else {
                console.log('File uploaded to S3:', data);
                // Delete the file from the S3 bucket
                const deleteParams = {
                    Bucket: 'YOUR_BUCKET_NAME',
                    Key: 'YOUR_FILE_KEY',
                };
                s3.deleteObject(deleteParams, (err, data) => {
                    if (err) {
                        console.error('Error deleting file from S3:', err);
                    }
                    else {
                        console.log('File deleted from S3:', data);
                    }
                });
            }
        });
    }
});
//# sourceMappingURL=fileupload.js.map