import { readdir, statSync, mkdir } from 'fs'
import { join, extname } from 'path'
import { mkdirPromise } from '../utils/mkdirPromise'
import { uploadImage } from '../utils/minioClient'
const decompress = require('decompress')

import { File } from 'decompress'

const tmpPath = 'tmp'

const extract = (filename) => {
  mkdirPromise(join(tmpPath, filename))
    .then((path) => {
      decompress(join('import', filename), path, {
        filter: ((file) => (
          (extname(file.path) === '.jpg' || extname(file.path) === '.png'))
            && (file.path.indexOf('MACOSX') === -1)
        )
      }).then((files) => {
        Array.from(files).forEach((file: File) => {
          uploadImage(file.path, file.data)
        })
      })
    })
    .catch((err) => console.log(err))

}

readdir('import/', (err, files) => {
  if (err) { throw err }

  const zipList = files
    .filter((file) => (
      file.endsWith('.zip') && statSync(join('import', file)).isFile()
    ))
    .map((filename) => extract(filename))
})
