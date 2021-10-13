import { deleteImage, deleteThumbnail } from '../utils/minioClient'

export type BookParams = {
  _id?: string
  archiveUUID: string
  originalName: string
  pages: string[]
  thumbnails: string[]
  cover: string
  coverThumbnail: string
  createdAt?: Date
}
export class Book {
  _id: string
  archiveUUID: string
  originalName: string
  pages: string[]
  thumbnails: string[]
  cover: string
  coverThumbnail: string
  createdAt: Date

  constructor(params: BookParams) {
    Object.assign(this, params)
  }

  deleteImageFiles() {
    this.pages.map(pageKey => {
      deleteImage(pageKey)
    })

    this.thumbnails.map(thumbnailKey => {
      deleteThumbnail(thumbnailKey)
    })
  }
}
