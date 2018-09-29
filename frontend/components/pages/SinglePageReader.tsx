import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { Book } from '../../models'

import { BookPage } from '../reader/BookPage';

import IconButton from '@material-ui/core/IconButton'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import styles from './SinglePageReader.css'

const PageBasePath = 'http://localhost:9000/mangashuraku'

interface Props {
  book: Book
  currentPageNumber: number
  singlePageBack: () => void
  singlePageForward: () => void
  jumpPage: () => void
}

interface State {
  prevPage: JSX.Element
  currentPage: JSX.Element
  nextPage: JSX.Element
  currentPageNumber: number
}

export class SinglePageReader extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state)

    const prevPage = (props.currentPageNumber > 0) ?
      <BookPage
        imgSrc={`${PageBasePath}/${props.book.pages[props.currentPageNumber - 1]}`}
      /> :
      null

    const currentPage = <BookPage
      imgSrc={`${PageBasePath}/${props.book.pages[props.currentPageNumber]}`}
    />

    const nextPage = (props.currentPageNumber < props.book.pages.length - 1) ?
      <BookPage
        imgSrc={`${PageBasePath}/${props.book.pages[props.currentPageNumber + 1]}`}
      /> :
      null

    const currentPageNumber = props.currentPageNumber

    this.state = {
      prevPage,
      currentPage,
      nextPage,
      currentPageNumber
    }
  }

  static getDerivedStateFromProps(nextProps: Props, currentState: State) {
    // Forward page
    if (nextProps.currentPageNumber - currentState.currentPageNumber === 1) {
      const nextPage = (nextProps.currentPageNumber < nextProps.book.pages.length - 1) ?
        <BookPage
          imgSrc={`${PageBasePath}/${nextProps.book.pages[nextProps.currentPageNumber + 1]}`}
        /> :
        null

      return {
        prevPage: currentState.currentPage,
        currentPage: currentState.nextPage,
        nextPage: nextPage,
        currentPageNumber: nextProps.currentPageNumber,
      }
    }

    // Back page
    if (nextProps.currentPageNumber - currentState.currentPageNumber === -1) {
      const prevPage = (nextProps.currentPageNumber > 0) ?
        <BookPage
          imgSrc={`${PageBasePath}/${nextProps.book.pages[nextProps.currentPageNumber - 1]}`}
        /> :
        null

      return {
        prevPage: prevPage,
        currentPage: currentState.prevPage,
        nextPage: currentState.currentPage,
        currentPageNumber: nextProps.currentPageNumber,
      }
    }

    // Jump page

    const prevPage = (nextProps.currentPageNumber > 0) ?
      <BookPage
        imgSrc={`${PageBasePath}/${nextProps.book.pages[nextProps.currentPageNumber - 1]}`}
      /> :
      null

    const currentPage = <BookPage
      imgSrc={`${PageBasePath}/${nextProps.book.pages[nextProps.currentPageNumber]}`}
    />

    const nextPage = (nextProps.currentPageNumber < nextProps.book.pages.length - 1) ?
      <BookPage
        imgSrc={`${PageBasePath}/${nextProps.book.pages[nextProps.currentPageNumber + 1]}`}
      /> :
      null

    return {
      prevPage: prevPage,
      currentPage: currentPage,
      nextPage: nextPage,
      currentPageNumber: nextProps.currentPageNumber,
    }
  }

  render() {
    return (
      <div>
        <div>
          <NavigateBeforeIcon
            onClick={this.props.singlePageBack}
            className={styles.backButton}
            />
        </div>
        <div>
          <NavigateNextIcon
            onClick={this.props.singlePageForward}
            className={styles.forwardButton}
          />
        </div>
        {this.state.currentPage}

        <div style={{ display: 'none' }}>
          {this.state.prevPage}
          {this.state.nextPage}
        </div>>
      </div>
    )
  }
}
