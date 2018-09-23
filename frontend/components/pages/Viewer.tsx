import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { Book } from '../../models';

import BookTile from '../Top/BookTile'
import GridListTile from '@material-ui/core/GridListTile'

const PageBasePath = 'http://localhost:9000/mangashuraku'

interface Props {
  book: Book
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

export const Viewer = ({
  book
}: Props) => (
  <div>
    <Grid container>
      {
        (() => {
          console.log(book)
          return book && book.pages ?
            book.pages.map(page => (
              <img src={`${PageBasePath}/${page}`} />
            )) :
            null
        })()
      }
    </Grid>
  </div>
)
