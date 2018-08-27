import { basename } from 'path'

interface IImportContext {
  originalFilepath: string
  archiveUUID: string
  pages: Array<string>
  thumbnails: Array<string>
  tmpDir: string
}

export class ImportContext implements IImportContext {
  originalFilepath: string
  archiveUUID: string
  pages: Array<string>
  thumbnails: Array<string>
  tmpDir: string

  get originalFilename() {
    return basename(this.originalFilepath)
  }
}
