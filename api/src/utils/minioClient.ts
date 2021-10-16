import { S3 } from 'aws-sdk'
import { PathLike, readFile } from 'fs'

const IMAGE_BUCKET = process.env.MINIO_PAGE_BUCKET
const THUMBNAIL_BUCKET = process.env.MINIO_THUMBNAIL_BUCKET
const BUCKETS = [IMAGE_BUCKET, THUMBNAIL_BUCKET]

const minioClient = new S3({
  endpoint: process.env.MINIO_ENDPOINT,
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  s3ForcePathStyle: true,
  sslEnabled: false,
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

      minioClient.putObject(
        {
          Bucket: IMAGE_BUCKET,
          Key: key,
          Body: data,
        },
        (err, etag) => {
          if (err) {
            console.log(err)
            return reject(err)
          }
          resolve(etag)
        }
      )
    })
  })
}

const deleteImage = (key: string) => {
  return new Promise((resolve, reject) => {
    minioClient.deleteObject(
      {
        Bucket: IMAGE_BUCKET,
        Key: key,
      },
      (err, data) => {
        if (err) reject(err)
        resolve(data)
      }
    )
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

      minioClient.putObject(
        {
          Bucket: THUMBNAIL_BUCKET,
          Key: key,
          Body: data,
        },
        (err, etag) => {
          if (err) {
            console.log(err)
            return reject(err)
          }
          resolve(etag)
        }
      )
    })
  })
}

const deleteThumbnail = (key: string) => {
  return new Promise((resolve, reject) => {
    minioClient.deleteObject(
      {
        Bucket: THUMBNAIL_BUCKET,
        Key: key,
      },
      (err, data) => {
        if (err) reject(err)
        resolve(data)
      }
    )
  })
}

export { uploadImage, deleteImage, uploadThumbnail, deleteThumbnail }
