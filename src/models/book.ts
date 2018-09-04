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

  constructor(params: Book) {
    this.id = params.id
  }
}
