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
  backToIndex: () => void
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
  showingMenu: state.reader.showingMenu
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
  backToIndex() {
    dispatch(push('/'))
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
    if (state.currentPageNumber === 0) { return }
    dispatch(updateCurrentPageNumber(state.currentPageNumber - 1))
  },
  singlePageForward() {
    if (state.currentPageNumber === state.book.pages.length - 1) { return }
    dispatch(updateCurrentPageNumber(state.currentPageNumber + 1))
  },
  doublePageBack() {
    if (state.currentPageNumber === 0) { return }
    dispatch(updateCurrentPageNumber(state.currentPageNumber - 2))
  },
  doublePageForward() {
    if (state.currentPageNumber === state.book.pages.length - 1) { return }
    dispatch(updateCurrentPageNumber(state.currentPageNumber + 2))
  },
  jumpPage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber > state.book.pages.length - 1) { return }
    dispatch(updateCurrentPageNumber(pageNumber))
  },
  deleteBook() {
    dispatch(deleteBook(state.book._id))
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
