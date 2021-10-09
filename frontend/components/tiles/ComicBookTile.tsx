import * as React from 'react'
import { ComicBook } from '../../types';
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from '@mui/material'

import styles from './ComicBookTile.module.css'

const ThumbnailBasePath = `http://${process.env.MINIO_ENDPOINT}/mangashuraku-thumbnail`

type Props = {
  comicBook: ComicBook
}

const ComicBookTile = ({
  comicBook,
}: Props) => (
  <Card className={styles.card}>
     <CardActionArea>
        <CardMedia
          className={styles.cover}
          image={`${ThumbnailBasePath}/${comicBook.coverThumbnail}`}
          title="cover"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {comicBook.title}
          </Typography>
          <Typography component="p">
            {comicBook.originalName}
          </Typography>
        </CardContent>
      </CardActionArea>
  </Card>
)

export default ComicBookTile
