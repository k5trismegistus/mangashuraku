import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { Book } from '../../models';

import { BookPage } from '../reader/BookPage';

import styles from './SinglePageReader.css'

const PageBasePath = 'http://localhost:9000/mangashuraku'

interface Props {
  book: Book
  currentPageNumber: number
}

export class SinglePageReader extends React.Component<Props> {
  private prevPage: JSX.Element
  private currentPage: JSX.Element
  private nextPage: JSX.Element

  render() {
    const {
      book,
      currentPageNumber
    } = this.props

    this.currentPage = <BookPage
      imgSrc={`${PageBasePath}/${book.pages[currentPageNumber]}`}
    />

    return (<div>
      {this.currentPage}
    </div>)
  }
}

export const Reader = ({
  book,
  currentPageNumber,
}: Props) => (
  <div>
    <Grid container className={styles.container}>
      <BookPage
        imgSrc={`${PageBasePath}/${book.pages[currentPageNumber]}`}
      />
    </Grid>
  </div>
)
