import * as React from 'react'
import { Book } from '../../models'

import {
  QuickBar,
  ReaderMenu,
} from '../reader'
import { getBookPageComponent } from '../../helpers'

import styles from './DoublePageReader.css'

interface Props {
  book: Book
  currentPageNumber: number
  leftToRight: boolean
  showingQuickBar: boolean
  showingMenu: boolean
  singlePageBack: () => void
  singlePageForward: () => void
  doublePageBack: () => void
  doublePageForward: () => void
  jumpPage: () => void
  toggleQuickBar: () => void
  toggleMenu: () => void
  toggleReaderType: () => void
  toggleDirection: () => void
}

interface State {
  prevPageFormer: JSX.Element
  prevPageLater: JSX.Element
  currentPageFormer: JSX.Element
  currentPageLater: JSX.Element
  nextPageFormer: JSX.Element
  nextPageLater: JSX.Element
  currentPageNumber: number
}

export class DoublePageReader extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state)

    const {
      book,
      currentPageNumber
    } = this.props

    const prevPageFormer = getBookPageComponent(book, currentPageNumber - 2)
    const prevPageLater = getBookPageComponent(book, currentPageNumber - 1)
    const currentPageFormer = getBookPageComponent(book, currentPageNumber)
    const currentPageLater = getBookPageComponent(book, currentPageNumber + 1)
    const nextPageFormer = getBookPageComponent(book, currentPageNumber + 2)
    const nextPageLater = getBookPageComponent(book, currentPageNumber + 3)

    this.state = {
      prevPageFormer,
      prevPageLater,
      currentPageFormer,
      currentPageLater,
      nextPageFormer,
      nextPageLater,
      currentPageNumber
    }
  }



  static getDerivedStateFromProps(nextProps: Props, currentState: State) {
    // Forward page double
    if (nextProps.currentPageNumber - currentState.currentPageNumber === 2) {
      return {
        prevPageFormer: currentState.currentPageFormer,
        prevPageLater: currentState.currentPageLater,
        currentPageFormer: currentState.nextPageFormer,
        currentPageLater: currentState.nextPageLater,
        nextPageFormer: getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 2),
        nextPageLater: getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 3),
        currentPageNumber: nextProps.currentPageNumber,
      }
    }

    // Back page double
    if (nextProps.currentPageNumber - currentState.currentPageNumber === -2) {
      return {
        prevPageFormer: getBookPageComponent(nextProps.book, nextProps.currentPageNumber - 2),
        prevPageLater: getBookPageComponent(nextProps.book, nextProps.currentPageNumber - 1),
        currentPageFormer: currentState.prevPageFormer,
        currentPageLater: currentState.prevPageLater,
        nextPageFormer: currentState.currentPageFormer,
        nextPageLater: currentState.currentPageLater,
        currentPageNumber: nextProps.currentPageNumber,
      }
    }
    // Forward page single
    if (nextProps.currentPageNumber - currentState.currentPageNumber === 2) {
      return {
        prevPageFormer: currentState.prevPageLater,
        prevPageLater: currentState.currentPageFormer,
        currentPageFormer: currentState.currentPageLater,
        currentPageLater: currentState.nextPageFormer,
        nextPageFormer: currentState.nextPageLater,
        nextPageLater: getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 3),
        currentPageNumber: nextProps.currentPageNumber,
      }
    }

    // Back page single
    if (nextProps.currentPageNumber - currentState.currentPageNumber === -2) {
      return {
        prevPageFormer: getBookPageComponent(nextProps.book, nextProps.currentPageNumber - 1),
        prevPageLater: currentState.prevPageFormer,
        currentPageFormer: currentState.prevPageLater,
        currentPageLater: currentState.currentPageFormer,
        nextPageFormer: currentState.currentPageLater,
        nextPageLater: currentState.nextPageFormer,
        currentPageNumber: nextProps.currentPageNumber,
      }
    }

    // Jump page
    return {
      prevPageFormer: getBookPageComponent(nextProps.book, nextProps.currentPageNumber - 2),
      prevPageLater: getBookPageComponent(nextProps.book, nextProps.currentPageNumber - 1),
      currentPageFormer: getBookPageComponent(nextProps.book, nextProps.currentPageNumber),
      currentPageLater: getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 1),
      nextPageFormer: getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 2),
      nextPageLater: getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 3),
      currentPageNumber: nextProps.currentPageNumber,
    }
  }

  render() {
    const leftAction = this.props.leftToRight ?
      this.props.doublePageBack :
      this.props.doublePageForward

    const rightAction = this.props.leftToRight ?
      this.props.doublePageForward :
      this.props.doublePageBack

    return (
      <div>
        <div
          onClick={this.props.toggleMenu}
          className={styles.topButton}
        />
        <div
          onClick={leftAction}
          className={styles.leftButton}
        />
        <div
          onClick={this.props.toggleQuickBar}
          className={styles.centerButton}
        />
        <div
          onClick={rightAction}
          className={styles.rightButton}
        />
        <div
          className={styles.pagesContainer}
          style={{ flexDirection: (this.props.leftToRight ? 'row' : 'row-reverse')}}
        >
          {this.state.currentPageFormer}
          {this.state.currentPageLater}
        </div>

        <div
          className={styles.quickBar}
          style={this.props.showingQuickBar ? null: {display: 'none'}}
        >
          <QuickBar
            thumbnails={this.props.book.thumbnails}
            leftToRight={this.props.leftToRight}
            currentPageNumber={this.props.currentPageNumber}
            jumpPage={this.props.jumpPage}
          />
        </div>

        <div
          className={styles.readerMenu}
          style={this.props.showingMenu ? null: {display: 'none'}}
        >
          <ReaderMenu
            toggleMenu={this.props.toggleMenu}
            toggleReaderType={this.props.toggleReaderType}
            toggleDirection={this.props.toggleDirection}
          />
        </div>

        {/* prefetch */}
        <div style={{ display: 'none' }}>
          {this.state.prevPageFormer}
          {this.state.prevPageLater}
          {this.state.nextPageFormer}
          {this.state.nextPageLater}
        </div>
      </div>
    )
  }
}
