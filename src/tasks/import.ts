require('dotenv').config()

import { readdir, statSync, mkdir, PathLike, unlink } from 'fs'
import { join, basename, extname } from 'path'
import { mkdirPromise } from '../utils/mkdirPromise'
import { uploadImage, uploadThumbnail } from '../utils/minioClient'
import { genThumbnail } from '../utils/genThumbnail'
import { File } from 'decompress'
import { ImportContext } from '../models/importContext'
import * as decompress from 'decompress'
import * as rimraf from 'rimraf'
import * as uuid from 'uuid'
import { insertBook } from '../repository/books_repository';
import { connectDb } from '../repository/base_repository';
import { Db } from 'mongodb';

const importDir = 'import'
const tmpDir = 'tmp'

const extract = (ctx: ImportContext): Promise<ImportContext> => {
  return new Promise((resolve, reject) => {
    const workDir = join(tmpDir, ctx.originalFilename)
    ctx.tmpDir = workDir

    mkdirPromise(workDir)
      .then((tmpDirPath: string) => {
        decompress(ctx.originalFilepath, tmpDirPath, {
          filter: ((file) => (
            (extname(file.path) === '.jpg' || extname(file.path) === '.png'))
              && (file.path.indexOf('MACOSX') === -1)
          )
        }).then((files) => {
          ctx.pages = Array.from(files)
                           .map((file: File) => join(workDir, file.path))
                           .sort()

          resolve(ctx)
        })
      }).catch((err) => reject(err))
  })
}

const createThumbnails = (ctx: ImportContext): Promise<ImportContext> => {
  return new Promise((resolve, reject) => {
    mkdirPromise(join(ctx.tmpDir, 'thumbnail')).then((tmpDir: string) => {
      Promise.all(
        ctx.pages.map((page) => {
          return new Promise((res, rej) => {
            const filename = basename(page)
            genThumbnail(page, tmpDir, 320)
              .then(() =>res(join(tmpDir, filename)))
          })
        })
      ).then((thumbnailPaths: Array<string>) => {
        ctx.thumbnails = thumbnailPaths.sort()
        resolve(ctx)
      })
       .catch(reject)
    })
  })
}

const uploadImages = (ctx: ImportContext): Promise<ImportContext> => {
  return new Promise((resolve, reject) => {
    ctx.pages.forEach((pagePath) => {
      const key = `${ctx.archiveUUID}/${basename(pagePath)}`

      uploadImage(key, pagePath)
        .then((etag) => resolve(ctx))
        .catch(reject)
    })
  })
}

const uploadThumbnails = (ctx: ImportContext): Promise<ImportContext> => {
  return new Promise((resolve, reject) => {
    ctx.thumbnails.forEach((thumbnailPath) => {
      const key = `${ctx.archiveUUID}/${basename(thumbnailPath)}`

      uploadThumbnail(key, thumbnailPath)
        .then((etag) => resolve(ctx))
        .catch(reject)
    })
  })
}

const registerToDb = (ctx: ImportContext): Promise<ImportContext> => {
  return new Promise((resolve, reject) => {
    connectDb().then((db: Db) => {
      insertBook(db, {
        archiveUUID: ctx.archiveUUID,
        originalName: ctx.originalFilename,
        pages: ctx.uploadedPageKeys,
        thumbnails: ctx.uploadedThumbnailKeys
      }).then(() => resolve(ctx))
    })
  })
}

const cleanUp = (ctx: ImportContext): Promise<ImportContext> => {
  return new Promise((resolve, reject) => {
    rimraf(ctx.tmpDir, (err) => {
      if (err) return reject(err)
      resolve(ctx)
    })
  })
}

const importArchive = (zipFilePath) => {
  const ctx = new ImportContext

  ctx.originalFilepath = zipFilePath
  ctx.archiveUUID  = uuid.v4()

  extract(ctx)
    .then(uploadImages)
    .then(createThumbnails)
    .then(uploadThumbnails)
    .then(registerToDb)
    .then(cleanUp)
    .then((ctx: ImportContext) => console.log(`finished: ${basename(zipFilePath)}`))
    .catch((err) => {
      console.log(err)
    })
}

// Import task body
readdir('import/', (err, files) => {
  if (err) { throw err }

  const zipList = files
    .filter((file) => (
      file.endsWith('.zip') && statSync(join('import', file)).isFile()
    ))

  zipList.forEach((zipFile) => importArchive(join(importDir, zipFile)))
})
