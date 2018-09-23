import * as React from 'react'
import { BookSummary } from '../../models';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const ThumbnailBasePath = 'http://localhost:9000/mangashuraku-thumbnail'

interface Props {
  book: BookSummary,
  classes: any
}

const styles = {
  card: {
    width: 320,
  },
  cover: {
    height: 480,
    width: 320
  },
}

const BookTile = ({
  book,
  classes
}: Props) => (
  <Card className={classes.card}>
     <CardActionArea>
        <CardMedia
          className={classes.cover}
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

export default withStyles(styles)(BookTile)
