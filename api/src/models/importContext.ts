import * as decompress from 'decompress'
import { File } from 'decompress'
import { join, basename, extname } from 'path'
import * as uuid from 'uuid'
import { genThumbnail } from '../utils/genThumbnail'
import { uploadImage, uploadThumbnail } from '../utils/minioClient'
import { mkdirPromise } from '../utils/mkdirPromise'


const TEMP_DIR = '/app/tmp'


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
    try {
      await mkdirPromise(this.workDir)
      await mkdirPromise(this.pagesDir)
      const files = await decompress(this.tempFilePath, this.pagesDir, {
        filter: file =>
          (extname(file.path) === '.jpg' || extname(file.path) === '.png') &&
          file.path.indexOf('MACOSX') === -1,
      })
      this.pages = Array.from(files)
        .map((file: File) => join(this.pagesDir, file.path))
        .sort()
    } catch(e) {
      console.error(e)
      throw e
    }

  }

  private async createThumbnails(): Promise<void> {
    try {
      const thumbnailsDirPath = await mkdirPromise(this.thumbnailsDir)
      let thumbnailPaths: Array<string> = []

      const promises = this.pages.map((page): Promise<string> =>
        new Promise(async (resolve, reject) => {
          const filename = basename(page)
          await genThumbnail(page, this.thumbnailsDir, 320).then(() => {

            resolve(join(thumbnailsDirPath, filename))
          })
        })
      )

      thumbnailPaths = await Promise.all(promises)
      this.thumbnails = thumbnailPaths.sort()
    } catch(e) {
      console.error(e)
      throw e
    }
  }

  private async uploadImages(): Promise<void> {
    try {
      const promises = this.pages.map(pagePath => {
        const key = `${this.archiveUUID}/${basename(pagePath)}`
        return uploadImage(key, pagePath)
      })

      await Promise.all(promises)
    } catch(e) {
      console.error(e)
      throw e
    }
  }

  private async uploadThumbnails(): Promise<void> {
    try {
      const promises = this.thumbnails.map(thumbnailPath => {
        const key = `${this.archiveUUID}/${basename(thumbnailPath)}`
        uploadThumbnail(key, thumbnailPath)
      })
    } catch(e) {
      console.error(e)
      throw e
    }
  }

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
    await this.extract()
    await this.createThumbnails()
    await this.uploadImages()
    await this.uploadThumbnails()

    console.log(this)
  }

  get workDir() {
    return join(TEMP_DIR, this.archiveUUID)
  }

  get pagesDir() {
    return join(this.workDir, 'originals')
  }

  get thumbnailsDir() {
    return join(this.workDir, 'thumbnails')
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
