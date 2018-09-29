import * as React from 'react'
import { connect } from 'react-redux'

import {
  fetchBook
} from '../reducers/bookReducer'
import {
  updateCurrentPageNumber
} from '../reducers/readerReducer'

import { Book } from '../models';
import { RootStore } from '../reducers';

import { SinglePageReader } from '../components/pages/SinglePageReader'

type Props = {
  match: any
  book: Book
  isFetching: Boolean
  currentPageNumber: number
  fetchBook: (id: string) => void
  singlePageBack: () => void
  singlePageForward: () => void
  jumpPage: () => void
}

const mapStateToProps = (state: RootStore) => ({
  book: state.currentBook.book,
  isFetching: state.currentBook.isFetching,
  currentPageNumber: state.reader.currentPageNumber
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchBook(id: string) {
    dispatch(fetchBook(id))
  }
})

const mergeProps = (state, { dispatch, ...dispatchProps }, ownProps: Props) => ({
  ...state,
  ...dispatchProps,
  ...ownProps,
  singlePageBack() {
    if (state.currentPageNumber === 0) { return }
    dispatch(updateCurrentPageNumber(state.currentPageNumber - 1))
  },
  singlePageForward() {
    if (state.currentPageNumber === state.book.pages.length - 1) { return }
    dispatch(updateCurrentPageNumber(state.currentPageNumber + 1))
  },
  jumpPage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber > state.currentPageNumber - 1) { return }
    dispatch(updateCurrentPageNumber(pageNumber))
  }
})

class ReaderContainer extends React.Component<Props, {}> {
  constructor(params) {
    super(params)
    Object.assign(this, params)
  }

  componentWillMount() {
    console.log(this.props.match)
    const bookId = this.props.match.params.bookId
    this.props.fetchBook(bookId)
  }

  render() {
    if (!this.props.book) {
      return null
    }

    const reader = true ?
      <SinglePageReader
        book={this.props.book}
        currentPageNumber={this.props.currentPageNumber}
        singlePageBack={this.props.singlePageBack}
        singlePageForward={this.props.singlePageForward}
        jumpPage={this.props.jumpPage}
      /> :
      null // @TODO Only single page reader for now...


    return (
      <div>
        {reader}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReaderContainer)
