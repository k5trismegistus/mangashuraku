const ComicBookPageBucket = `http://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}/${process.env.NEXT_PUBLIC_MINIO_PAGE_BUCKET}`
const ComicBookThumbnailBucket = `http://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}/${process.env.NEXT_PUBLIC_MINIO_THUMBNAIL_BUCKET}`

export const getComicBookThumbnailUrl = (thumbnailPath) => {
  return `${ComicBookThumbnailBucket}/${thumbnailPath}`
}

export const getComicBookPagelUrl = (pagePath) => {
  return `${ComicBookPageBucket}/${pagePath}`
}

