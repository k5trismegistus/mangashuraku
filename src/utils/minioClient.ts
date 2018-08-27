import { S3 } from 'aws-sdk';

const IMAGE_BUCKET = 'mangashuraku'
const THUMBNAIL_BUCKET = 'mangashuraku-thumbnail'
const BUCKETS = [IMAGE_BUCKET, THUMBNAIL_BUCKET]

const minioClient = new S3({
  endpoint: 'minio:9000',
  accessKeyId: 'AKIA_MINIO_ACCESS_KEY',
  secretAccessKey: 'minio_secret_key',
  s3ForcePathStyle: true,
  sslEnabled: false
})

// BUCKETS.forEach(bucket => {
//   minioClient.bucketExists(bucket, (err, exists) => {
//     console.log('===============')
//     console.log(err)
//     console.log('===============')

//     if (err) {
//       minioClient.makeBucket(bucket, '', (err) => {
//         if (err) return console.log('Error creating bucket.', err)
//         console.log('Bucket created successfully in "us-east-1".')
//       })
//     }
//     if (exists) {
//       return console.log('Bucket exists.')
//     }
//   })
// });

const uploadImage = (filepath, filebody) => {
  console.log(filepath)

  minioClient.putObject({
    Bucket: IMAGE_BUCKET,
    Key: filepath,
    Body: filebody
  }, (err, etag) => {
    if (err) return console.log(err)
    console.log('File uploaded successfully.')
  });
}

export { uploadImage }
