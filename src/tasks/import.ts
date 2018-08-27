import { readdir, statSync, mkdir, PathLike, unlink } from 'fs'
import { join, basename, extname } from 'path'
import { mkdirPromise } from '../utils/mkdirPromise'
import { uploadImage } from '../utils/minioClient'

const decompress = require('decompress')
const rimraf = require('rimraf')

import { ImportContext } from '../models/importContext'

const uuid = require('uuid')

import { File } from 'decompress'

const importDir = 'import'
const tmpDir = 'tmp'

const extract = (ctx: ImportContext) => {
  return new Promise((resolve, reject) => {
    const workDir = join(tmpDir, ctx.originalFilename)
    ctx.tmpDir = workDir

    mkdirPromise(workDir)
      .then((tmpDirPath) => {
        decompress(ctx.originalFilepath, tmpDirPath, {
          filter: ((file) => (
            (extname(file.path) === '.jpg' || extname(file.path) === '.png'))
              && (file.path.indexOf('MACOSX') === -1)
          )
        }).then((files) => {
          ctx.pages = Array.from(files)
                           .map((file: File) => join(workDir, file.path))
                           .sort()
          console.log(ctx)

          resolve(ctx)
        })
      }).catch((err) => reject(err))
  })
}

const uploadImages = (ctx: ImportContext) => {
  return new Promise((resolve, reject) => {
    ctx.pages.forEach((pagePath) => {
      const key = `${ctx.archiveUUID}/${basename(pagePath)}`

      uploadImage(key, pagePath)
        .then((etag) => resolve(ctx))
        .catch(reject)
    })
  })
}

const cleanUp = (ctx: ImportContext) => {
  return new Promise((resolve, reject) => {
    rimraf(ctx.tmpDir, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(ctx)
      }
    })
  })
}

const importArchive = (zipFilePath) => {
  const ctx = new ImportContext

  ctx.originalFilepath = zipFilePath
  ctx.archiveUUID  = uuid.v4()

  extract(ctx)
    .then(uploadImages)
    .then(cleanUp)
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
