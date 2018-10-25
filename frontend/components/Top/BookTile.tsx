import * as React from 'react'
import { BookSummary } from '../../models';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import styles from './BookTile.css'

const ThumbnailBasePath = `http://${process.env.MINIO_ENDPOINT}/mangashuraku-thumbnail`

interface Props {
  book: BookSummary,
}

const BookTile = ({
  book,
}: Props) => (
  <Card className={styles.card}>
     <CardActionArea>
        <CardMedia
          className={styles.cover}
          image={`${ThumbnailBasePath}/${book.coverThumbnail}`}
          title="cover"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {book.title}
          </Typography>
          <Typography component="p">
            {book.originalName}
          </Typography>
        </CardContent>
      </CardActionArea>
  </Card>
)

export default BookTile
