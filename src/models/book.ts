import { ObjectId } from 'mongodb'

export interface IBookParameter {
  archiveUUID: string
  originalName: string
  title?: string
  authorIds?: ObjectId[]
  organizationIds?: ObjectId[]
  genreId?: ObjectId[]
  pages: string[]
  thumbnails: string[]
  cover: string
  coverThumbnail: string
}

export interface IBook extends IBookParameter {
    id: ObjectId
}

export class Book implements IBook {
  id: ObjectId
  archiveUUID: string
  originalName: string
  title?: string
  authorIds?: ObjectId[]
  organizationIds?: ObjectId[]
  genreId?: ObjectId[]
  pages: string[]
  thumbnails: string[]
  cover: string
  coverThumbnail: string

  constructor(params: Book) {
    this.id = params.id
  }
}
