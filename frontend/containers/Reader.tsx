import * as React from 'react'
import { connect } from 'react-redux'

import {
  fetchBook
} from '../reducers/bookReducer'
import {
  updateCurrentPageNumber,
  toggleReaderType,
  toggleQuickBar,
  toggleMenu,
  toggleDirection,
} from '../reducers/readerReducer'

import { Book } from '../models';
import { RootStore } from '../reducers';

import { SinglePageReader } from '../components/pages/SinglePageReader'
import { DoublePageReader } from '../components/pages/DoublePageReader'

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
})

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
        toggleReaderType={this.props.toggleReaderType}
        toggleDirection={this.props.toggleDirection}
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
        toggleReaderType={this.props.toggleReaderType}
        toggleDirection={this.props.toggleDirection}
      />

    return (
      <div>
        {reader}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReaderContainer)
