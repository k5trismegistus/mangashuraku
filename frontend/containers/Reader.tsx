import * as React from 'react'
import { connect } from 'react-redux'

import {
  fetchBook
} from '../reducers/bookReducer'

import { Book } from '../models';
import { RootStore } from '../reducers';

import { Reader } from '../components/pages/Reader'

const mapStateToProps = (state: RootStore) => ({
  book: state.currentBook.book,
  isFetching: state.currentBook.isFetching,
  currentPageNumber: state.reader.currentPageNumber
})

const mapDispatchToProps = (dispatch) => ({
  fetchBook(id: string) {
    dispatch(fetchBook(id))
  }
})

type Props = {
  match: any
  book: Book
  isFetching: Boolean
  currentPageNumber: number
  fetchBook: (id: string) => void
}

class ReaderContainer extends React.Component<Props, {}> {
  constructor(params) {
    super(params)
    Object.assign(this, params)
  }

  componentWillMount() {
    const bookId = this.props.match.params.bookId
    this.props.fetchBook(bookId)
  }

  render() {
    return this.props.book ?
      <Reader
        book={this.props.book}
        currentPageNumber={this.props.currentPageNumber}
      /> :
      null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderContainer)
