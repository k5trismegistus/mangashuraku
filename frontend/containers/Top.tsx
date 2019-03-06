import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as querystring from 'querystring'

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
  fetchBookList(page: number, query: string) {
    const queryParams = {}
    if (page > 0) queryParams['page'] = page
    if (query) queryParams['q'] = query

    const queryString = querystring.stringify(queryParams)

    dispatch(push(`${window.location.pathname}?${queryString}`))
    dispatch(fetchBookList(page, query))
  },
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
    // const params = new URLSearchParams(window.location.search);
    const params = {}
    const query = window.location.search
    query.slice(1).split('&').forEach((q) => {
      params[q.split('=')[0]] = q.split('=')[1]
    })
    const searchQuery = params['q'] ? params['q'] : ''
    const page = params['page'] ? parseInt(params['page']) : 0
    this.props.fetchBookList(page, searchQuery)
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
