import * as decompress from 'decompress'
import { File } from 'decompress'
import { join, basename, extname } from 'path'
import * as uuid from 'uuid'
import { mkdirPromise } from '../utils/mkdirPromise'


const tmpDir = '/app/tmp'


export class ImportContext {
  importState: 'initialized'
  archiveUUID: string
  filename: string
  tempFilePath: string
  pages: Array<string>
  thumbnails: Array<string>
  tmpDir: string

  constructor({ filename, tempFilePath }) {
    this.importState = 'initialized'
    this.archiveUUID = uuid.v4()
    this.filename = filename
    this.tempFilePath = tempFilePath
  }


  private async extract(): Promise<void> {
    await mkdirPromise(this.workDir)
    console.log(this.tempFilePath)
    const files = await decompress(this.tempFilePath, this.workDir, {
      filter: file =>
        (extname(file.path) === '.jpg' || extname(file.path) === '.png') &&
        file.path.indexOf('MACOSX') === -1,
    })
    this.pages = Array.from(files)
      .map((file: File) => join(this.workDir, file.path))
      .sort()

  }

  // private async createThumbnails(): Promise<ImportContext> {
  //   return new Promise((resolve, reject) => {
  //     mkdirPromise(join(this.tmpDir, 'thumbnail')).then((tmpDir: string) => {
  //       const thumbnailPaths: Array<string> = []

  //       const promises = this.pages.map(page => () =>
  //         new Promise((res, rej) => {
  //           const filename = basename(page)
  //           genThumbnail(page, tmpDir, 320).then(() => {
  //             thumbnailPaths.push(join(tmpDir, filename))
  //             res()
  //           })
  //         })
  //       )

  //       promises
  //         .reduce((m, p) => m.then(p), Promise.resolve({}))
  //         .then(() => {
  //           this.thumbnails = thumbnailPaths.sort()
  //           resolve(ctx)
  //         })
  //         .catch(reject)
  //     })
  //   })
  // }

  // private async uploadImages(): Promise<ImportContext> {
  //   return new Promise((resolve, reject) => {
  //     const promises = this.pages.map(pagePath => {
  //       const key = `${this.archiveUUID}/${basename(pagePath)}`
  //       return uploadImage(key, pagePath)
  //     })

  //     serialPromises(promises)
  //       .then(() => resolve(ctx))
  //       .catch(reject)
  //   })
  // }

  // private async uploadThumbnails(): Promise<ImportContext> {
  //   return new Promise((resolve, reject) => {
  //     this.thumbnails.forEach(thumbnailPath => {
  //       const key = `${this.archiveUUID}/${basename(thumbnailPath)}`

  //       uploadThumbnail(key, thumbnailPath)
  //         .then(etag => resolve(ctx))
  //         .catch(reject)
  //     })
  //   })
  // }

  // private async registerToDb(): Promise<ImportContext> {
  //   return new Promise((resolve, reject) => {
  //     insertBook({
  //       archiveUUID: this.archiveUUID,
  //       originalName: this.originalFilename,
  //       title: '',
  //       authorIds: [],
  //       organizationIds: [],
  //       genreIds: [],
  //       pages: this.uploadedPageKeys,
  //       thumbnails: this.uploadedThumbnailKeys,
  //       cover: this.uploadedPageKeys[0],
  //       coverThumbnail: this.uploadedThumbnailKeys[0],
  //       createdAt: new Date(),
  //     }).then(() => resolve(ctx))
  //   })
  // }

  // private async cleanUp(): Promise<ImportContext> {
  //   return new Promise((resolve, reject) => {
  //     rimraf(this.tmpDir, err => {
  //       if (err) return reject(err)
  //       resolve(this)
  //     })
  //   })
  // }

  async import() {
    this.extract()
  }

  get workDir() {
    return join(tmpDir, this.archiveUUID)
  }

  get uploadedPageKeys() {
    return this.pages.map(page => `${this.archiveUUID}/${basename(page)}`)
  }

  get uploadedThumbnailKeys() {
    return this.thumbnails.map(
      thumbnail => `${this.archiveUUID}/${basename(thumbnail)}`
    )
  }
}
