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
  total: state.books.total,
  page: state.books.page,
  query: state.books.query,
  isFetching: state.books.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchBookList(query, page) {
    dispatch(fetchBookList(query, page))
  }
})

type Props = {
  books: Array<BookSummary>
  total: number
  page: number
  query: string
  fetchBookList: (page: number, query: string) => void
}

class TopContainer extends React.Component<Props, {}> {
  constructor(params) {
    super(params)
    Object.assign(this, params)
  }

  componentWillMount() {
    this.props.fetchBookList(0, '')
  }

  render() {
    return (<Top
      books={this.props.books}
      total={this.props.total}
      query={this.props.query}
      page={this.props.page}
      fetchBookList={this.props.fetchBookList}
    />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer)
