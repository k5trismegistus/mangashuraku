import { mkdir, PathLike } from 'fs';

type Resolve = (path: string) => void
type Reject = (err: NodeJS.ErrnoException) => void

export const mkdirPromise = (path: PathLike, mode?: string | number) => {
  return new Promise((resolve: Resolve, reject: Reject) => {
    mkdir(path, mode, (err) => {
      if (err) {
        reject(err)
      } else {
        const pathstring = typeof path === 'string' ? path : path.toString()
        resolve(pathstring)
      }
    })
  })
}
