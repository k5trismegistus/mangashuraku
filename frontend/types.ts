type ComicBook = {
  _id: string
  originalName: string,
  title: string,
  pages: string[]
  thumbnails: string[]
  cover: string
  coverThumbnail: string
}

type ComicBookList = {
  count: number
  comicBooks: ComicBook[]
}

export type {
  ComicBook,
  ComicBookList,
}