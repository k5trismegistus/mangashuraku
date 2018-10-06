require('dotenv').config()

import { readdir, statSync, mkdir, PathLike, unlink } from 'fs'
import { join, basename, extname } from 'path'
import { mkdirPromise } from '../utils/mkdirPromise'
import { uploadImage, uploadThumbnail } from '../utils/minioClient'
import { serialPromises } from '../utils/serialPromises'
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
  const workDir = join(tmpDir, ctx.originalFilename)
  ctx.tmpDir = workDir
  return new Promise((resolve, reject) => {

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
      const thumbnailPaths: Array<string> = []

      const promises = ctx.pages.map((page) => (
        () => (
          new Promise((res, rej) => {
            const filename = basename(page)
            genThumbnail(page, tmpDir, 320)
              .then(() => {
                thumbnailPaths.push(join(tmpDir, filename))
                res()
              })
          })
        )
      ))

      promises.reduce((m, p) => m.then(p), Promise.resolve({}))
        .then(() => {
          ctx.thumbnails = thumbnailPaths.sort()
          resolve(ctx)
        })
        .catch(reject)
    })
  })
}

const uploadImages = (ctx: ImportContext): Promise<ImportContext> => {
  return new Promise((resolve, reject) => {

    const promises = ctx.pages.map((pagePath) => {
      const key = `${ctx.archiveUUID}/${basename(pagePath)}`
      return uploadImage(key, pagePath)
    })

    serialPromises(promises)
    .then(() => resolve(ctx))
    .catch(reject)
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
        title: '',
        authorIds: [],
        organizationIds: [],
        genreIds: [],
        pages: ctx.uploadedPageKeys,
        thumbnails: ctx.uploadedThumbnailKeys,
        cover: ctx.uploadedPageKeys[0],
        coverThumbnail: ctx.uploadedThumbnailKeys[0],
        createdAt: new Date
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

  return () => {
    return new Promise((resolve, reject) => {
      extract(ctx)
        .then(uploadImages)
        .then(createThumbnails)
        .then(uploadThumbnails)
        .then(registerToDb)
        .then(cleanUp)
        .then((ctx: ImportContext) => console.log(`finished: ${basename(zipFilePath)}`))
        .then(() => resolve())
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
}

// Import task body
readdir('import/', (err, files) => {
  if (err) { throw err }

  const zipList = files
    .filter((file) => (
      file.endsWith('.zip') && statSync(join('import', file)).isFile()
    ))

  zipList.map((zipFile) => importArchive(join(importDir, zipFile)))
      .reduce((m, p) => (m.then(p)), Promise.resolve({}))
      .then(() => console.log('Finished'))
})
