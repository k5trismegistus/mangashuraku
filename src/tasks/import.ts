import { readdir, statSync, mkdir } from 'fs'
import { join, extname } from 'path'
import { mkdirPromise } from '../utils/mkdirPromise'
const decompress = require('decompress')

const tmpPath = 'tmp'

const extract = (filename) => {

  console.log(filename)
  mkdirPromise(join(tmpPath, filename))
    .then((path) => {
      console.log(path)
      decompress(join('import', filename), path, {
        filter: ((file) => extname(file.path) === '.jpg' || extname(file.path) === '.png')
      })
        .then((files) => console.log(files))
        .catch((err) => console.log(err))
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

  setTimeout(() => {}, 10000)
})
