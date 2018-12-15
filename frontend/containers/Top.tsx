import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

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
  fetchBookList(page, query) {
    dispatch(fetchBookList(page, query))
  },
  onChangePage(page: number, query: string) {
    console.log(page)
    dispatch(push(`${window.location.pathname}?page=${page}`))
    dispatch(fetchBookList(page, query))
  },
})

type Props = {
  books: Array<BookSummary>
  total: number
  page: number
  query: string
  fetchBookList: (page: number, query: string) => void
  onChangePage: (page: number, query: string) => void
}

class TopContainer extends React.Component<Props, {}> {
  constructor(params) {
    super(params)
    Object.assign(this, params)
  }

  componentWillMount() {
    // const params = new URLSearchParams(window.location.search);
    const params = {}
    var query = window.location.search
    query.slice(1).split('&').forEach((q) => {
      params[q.split('=')[0]] = q.split('=')[1]
    })  
    const page = params['page'] ? parseInt(params.page) : 0
    console.log(window.location)
    this.props.onChangePage(page, '')
  }
  

  render() {
    return (<Top
      books={this.props.books}
      total={this.props.total}
      query={this.props.query}
      page={this.props.page}
      fetchBookList={this.props.fetchBookList}
      onChangePage={this.props.onChangePage}
    />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer)
