import * as rimraf from 'rimraf'
import * as fs from 'fs'

export const removeDirectory = (path: string): Promise<void> => {
  return new Promise((resolve, reject) => {

    rimraf(path, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

export const removeFile = (path: string): Promise<void> => {
  return new Promise((resolve, reject) => {

    fs.unlink(path, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}