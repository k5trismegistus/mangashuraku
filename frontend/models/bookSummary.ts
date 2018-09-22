export class BookSummary {
    _id: string
    archiveUUID: string
    originalName: string
    title: string
    authorIds: Array<string>
    organizationIds: Array<string>
    genreId: Array<string>
    cover: string
    coverThumbnail: string
    createdAt: Date

  constructor(init?: Partial<BookSummary>) {
    Object.assign(this, init)
  }
}

