import * as React from 'react'
import { connect } from 'react-redux'

import {
  fetchBookList
} from '../reducers/booksReducer'

import { Top } from '../components/pages/Top'
import { BookSummary } from '../models';
import { RootStore } from '../reducers';

const mapStateToProps = (state: RootStore) => ({
  books: state.books.books,
  isFetching: state.books.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchBookList() {
    dispatch(fetchBookList())
  }
})

type Props = {
  books: Array<BookSummary>
  fetchBookList: () => void
}

class TopContainer extends React.Component<Props, {}> {
  constructor(params) {
    super(params)
    Object.assign(this, params)
  }

  componentWillMount() {
    this.props.fetchBookList()
  }

  render() {
    return (<Top
      books={this.props.books}
    />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer)
