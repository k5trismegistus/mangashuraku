import { ObjectId, FindOneOptions } from 'mongodb'

export interface IBookParameter {
  archiveUUID: string
  originalName: string
  title: string
  authorIds: ObjectId[]
  organizationIds: ObjectId[]
  genreIds: ObjectId[]
  pages: string[]
  thumbnails: string[]
  cover: string
  coverThumbnail: string
  createdAt: Date
}

export interface IBook extends IBookParameter {
    id: ObjectId
}

export class Book implements IBook {
  id: ObjectId
  archiveUUID: string
  originalName: string
  title: string
  authorIds: ObjectId[]
  organizationIds: ObjectId[]
  genreIds: ObjectId[]
  pages: string[]
  thumbnails: string[]
  cover: string
  coverThumbnail: string
  createdAt: Date

  constructor(params: Book) {
    this.id = params.id
  }
}

export const BookIndexFields: FindOneOptions = {
  projection: {
    // _id: 1,
    // archiveUUID: 1,
    // originalName: 1,
    // title: 1,
    // authorIds: 1,
    // organizationIds: 1,
    // genreId: 1,
    pages: 0,
    thumbnails: 0,
    // cover: 1,
    // coverThumbnail: 1,
    // createdAt: 1
  }
}
