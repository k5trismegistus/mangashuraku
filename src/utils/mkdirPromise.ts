import { mkdir, PathLike, writeFileSync } from 'fs';

type Resolve = (path: PathLike) => void
type Reject = (err: NodeJS.ErrnoException) => void

export const mkdirPromise = (path: PathLike, mode?: string | number) => {
  return new Promise((resolve: Resolve, reject: Reject) => {
    mkdir(path, mode, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(path)
      }
    })
  })
}
