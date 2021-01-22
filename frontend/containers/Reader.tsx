import * as React from 'react'
import { connect } from 'react-redux'

import {
  fetchBook,
  deleteBook,
} from '../reducers/bookReducer'
import {
  updateCurrentPageNumber,
  toggleReaderType,
  toggleQuickBar,
  toggleMenu,
  toggleDirection,
  clearState,
} from '../reducers/readerReducer'
import { push } from 'connected-react-router'
import * as querystring from 'querystring'

import { Book } from '../models';
import { RootStore } from '../reducers';

import { SinglePageReader } from '../components/pages/SinglePageReader'
import { DoublePageReader } from '../components/pages/DoublePageReader'
import { ReaderMenu } from '../components/reader'

type Props = {
  match: any
  book: Book
  isFetching: boolean
  currentPageNumber: number
  leftToRight: boolean
  singleReader: boolean
  showingQuickBar: boolean
  showingMenu: boolean
  fetchBook: (id: string) => void
  singlePageBack: () => void
  singlePageForward: () => void
  doublePageBack: () => void
  doublePageForward: () => void
  jumpPage: () => void
  toggleReaderType: () => void
  toggleQuickBar: () => void
  toggleMenu: () => void
  toggleDirection: () => void
  backToIndex: (page: number, query: string) => void
  clearReaderState: () => void
  deleteBook: () => void
}

const mapStateToProps = (state: RootStore) => ({
  book: state.currentBook.book,
  isFetching: state.currentBook.isFetching,
  currentPageNumber: state.reader.currentPageNumber,
  leftToRight: state.reader.leftToRight,
  singleReader: state.reader.singlePage,
  showingQuickBar: state.reader.showingQuickBar,
  showingMenu: state.reader.showingMenu,
  goBackIndexPage: state.books.page,
  goBackIndexQuery: state.books.query,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchBook(id: string) {
    dispatch(fetchBook(id))
  },
  toggleMenu() {
    dispatch(toggleMenu())
  },
  toggleReaderType() {
    dispatch(toggleReaderType())
  },
  toggleQuickBar() {
    dispatch(toggleQuickBar())
  },
  toggleDirection() {
    dispatch(toggleDirection())
  },
  backToIndex(page: number, query: string) {
    const queryParams = {}
    if (page > 0) queryParams['page'] = page
    if (query) queryParams['q'] = query

    const queryString = querystring.stringify(queryParams)
    dispatch(push(`/?${queryString}`))
  },
  clearReaderState() {
    dispatch(clearState())
  },
})

const mergeProps = (state, { dispatch, ...dispatchProps }, ownProps: Props) => ({
  ...state,
  ...dispatchProps,
  ...ownProps,
  singlePageBack() {
    if (state.currentPageNumber === 1) { return }
    const newPageNumber = state.currentPageNumber - 1
    dispatch(push(`${window.location.pathname}?page=${newPageNumber}`))
    dispatch(updateCurrentPageNumber(newPageNumber))
  },
  singlePageForward() {
    if (state.currentPageNumber === state.book.pages.length) { return }
    const newPageNumber = state.currentPageNumber + 1
    dispatch(push(`${window.location.pathname}?page=${newPageNumber}`))
    dispatch(updateCurrentPageNumber(newPageNumber))
  },
  doublePageBack() {
    if (state.currentPageNumber === 1) { return }
    const newPageNumber = (state.currentPageNumber === 2) ?
      (state.updateCurrentPageNumber - 1) :
      (state.updateCurrentPageNumber - 2)
    dispatch(push(`${window.location.pathname}?page=${newPageNumber}`))
    dispatch(updateCurrentPageNumber(newPageNumber))
  },
  doublePageForward() {
    if (state.currentPageNumber === state.book.pages.length) { return }
    const newPageNumber = (state.currentPageNumber === (state.book.pages.length - 1)) ?
      (state.updateCurrentPageNumber + 1) :
      (state.updateCurrentPageNumber + 2)
    dispatch(push(`${window.location.pathname}?page=${newPageNumber}`))
    dispatch(updateCurrentPageNumber(newPageNumber))
  },
  jumpPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > state.book.pages.length) { return }
    dispatch(push(`${window.location.pathname}?page=${pageNumber}`))
    dispatch(updateCurrentPageNumber(pageNumber))
  },
  deleteBook() {
    dispatch(deleteBook(state.book._id))
    dispatch(push('/'))
  }
})

class ReaderContainer extends React.Component<Props, {}> {
  constructor(params) {
    super(params)
    Object.assign(this, params)
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId
    this.props.fetchBook(bookId)
  }

  componentWillUnmount() {
    this.props.clearReaderState()
  }

  render() {
    if (!this.props.book) {
      return null
    }

    const reader = this.props.singleReader ?
      <SinglePageReader
        book={this.props.book}
        currentPageNumber={this.props.currentPageNumber}
        leftToRight={this.props.leftToRight}
        showingQuickBar={this.props.showingQuickBar}
        showingMenu={this.props.showingMenu}
        singlePageBack={this.props.singlePageBack}
        singlePageForward={this.props.singlePageForward}
        jumpPage={this.props.jumpPage}
        toggleQuickBar={this.props.toggleQuickBar}
        toggleMenu={this.props.toggleMenu}
      /> :
      <DoublePageReader
        book={this.props.book}
        currentPageNumber={this.props.currentPageNumber}
        leftToRight={this.props.leftToRight}
        showingQuickBar={this.props.showingQuickBar}
        showingMenu={this.props.showingMenu}
        singlePageBack={this.props.singlePageBack}
        singlePageForward={this.props.singlePageForward}
        doublePageBack={this.props.doublePageBack}
        doublePageForward={this.props.doublePageForward}
        jumpPage={this.props.jumpPage}
        toggleQuickBar={this.props.toggleQuickBar}
        toggleMenu={this.props.toggleMenu}
      />

    return (
      <div>
        {reader}

        {
          this.props.showingMenu ?
            <ReaderMenu
              goBackIndexPage={this.props.goBackIndexPage}
              goBackIndexQuery={this.props.goBackIndexQuery}
              toggleMenu={this.props.toggleMenu}
              toggleReaderType={this.props.toggleReaderType}
              toggleDirection={this.props.toggleDirection}
              backToIndex={this.props.backToIndex}
              deleteBook={this.props.deleteBook}
            /> :
            null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReaderContainer)
