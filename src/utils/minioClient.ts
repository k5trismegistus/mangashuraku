import { S3 } from 'aws-sdk';
import { PathLike, readFile } from 'fs';

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

const uploadImage = (key: string, filepath: PathLike) => {
  return new Promise((resolve, reject) => {
    readFile(filepath, (err, data) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      minioClient.putObject({
        Bucket: IMAGE_BUCKET,
        Key: key,
        Body: data
      }, (err, etag) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        resolve(etag)
      })
    })
  })
}

// Looks almost same as #uploadImage, but it may be changed in future...
const uploadThumbnail = (key: string, filepath: PathLike) => {
  return new Promise((resolve, reject) => {
    readFile(filepath, (err, data) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      minioClient.putObject({
        Bucket: THUMBNAIL_BUCKET,
        Key: key,
        Body: data
      }, (err, etag) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        resolve(etag)
      })
    })
  })
}

export { uploadImage, uploadThumbnail }
