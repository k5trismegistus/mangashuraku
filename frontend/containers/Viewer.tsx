import * as React from 'react'
import { connect } from 'react-redux'

import {
  fetchBook
} from '../reducers/bookReducer'

import { Book } from '../models';
import { RootStore } from '../reducers';

import { Viewer } from '../components/pages/Viewer'

const mapStateToProps = (state: RootStore) => ({
  book: state.currentBook.book,
  isFetching: state.books.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchBook(id: string) {
    dispatch(fetchBook(id))
  }
})

type Props = {
  match: any
  book: Book
  fetchBook: (id: string) => void
}

class ViewerContainer extends React.Component<Props, {}> {
  constructor(params) {
    super(params)
    Object.assign(this, params)
  }

  componentWillMount() {
    const bookId = this.props.match.params.bookId
    this.props.fetchBook(bookId)
  }

  render() {
    return (<Viewer
      book={this.props.book}
    />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerContainer)
