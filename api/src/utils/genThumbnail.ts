import * as imagemagick from 'imagemagick'
import { PathLike } from 'fs'
import { basename, join } from 'path'

export const genThumbnail = (
  originalPath: string,
  dstDir: string,
  width: number
) => {
  return new Promise((resolve, reject) => {
    const filename = basename(originalPath)

    imagemagick.resize(
      {
        srcPath: originalPath,
        dstPath: join(dstDir, filename),
        width: width,
      },
      (err: Error, result: any) => {
        if (err) return reject(err)
        resolve()
      }
    )
  })
}
