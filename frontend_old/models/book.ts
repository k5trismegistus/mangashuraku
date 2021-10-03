export class Book {
  _id: string
  archiveUUID: string
  originalName: string
  title: string
  authorIds: Array<string>
  organizationIds: Array<string>
  genreId: Array<string>
  pages: Array<string>
  thumbnails: Array<string>
  cover: string
  coverThumbnail: string
  createdAt: Date

  constructor(init?: Partial<Book>) {
    Object.assign(this, init)
  }
}

