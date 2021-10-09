const ComicBookPageBucket = `http://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}/mangashuraku`
const ComicBookThumbnailBucket = `http://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}/mangashuraku-thumbnail`

export const getComicBookThumbnailUrl = (thumbnailPath) => {
  return `${ComicBookThumbnailBucket}/${thumbnailPath}`
}

export const getComicBookPagelUrl = (pagePath) => {
  return `${ComicBookPageBucket}/${pagePath}`
}

