import * as React from 'react'
import { Book } from '../../models'

import {
  QuickBar,
  ReaderMenu,
} from '../reader'
import { getBookPageComponent } from '../../helpers'

import styles from './SinglePageReader.css'

interface Props {
  book: Book
  currentPageNumber: number
  leftToRight: boolean
  showingQuickBar: boolean
  showingMenu: boolean
  singlePageBack: () => void
  singlePageForward: () => void
  jumpPage: () => void
  toggleQuickBar: () => void
  toggleMenu: () => void
  toggleReaderType: () => void
  toggleDirection: () => void
}

interface State {
  prevPage: JSX.Element
  currentPage: JSX.Element
  nextPage: JSX.Element
  currentPageNumber: number
}

export class SinglePageReader extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state)

    const prevPage = getBookPageComponent(props.book, props.currentPageNumber - 1)
    const currentPage = getBookPageComponent(props.book, props.currentPageNumber)
    const nextPage = getBookPageComponent(props.book, props.currentPageNumber + 1)

    const currentPageNumber = props.currentPageNumber

    this.state = {
      prevPage,
      currentPage,
      nextPage,
      currentPageNumber
    }
  }

  static getDerivedStateFromProps(nextProps: Props, currentState: State) {
    // Forward page
    if (nextProps.currentPageNumber - currentState.currentPageNumber === 1) {
      const nextPage = getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 1)

      return {
        prevPage: currentState.currentPage,
        currentPage: currentState.nextPage,
        nextPage: nextPage,
        currentPageNumber: nextProps.currentPageNumber,
      }
    }

    // Back page
    if (nextProps.currentPageNumber - currentState.currentPageNumber === -1) {
      const prevPage = getBookPageComponent(nextProps.book, nextProps.currentPageNumber - 1)

      return {
        prevPage: prevPage,
        currentPage: currentState.prevPage,
        nextPage: currentState.currentPage,
        currentPageNumber: nextProps.currentPageNumber,
      }
    }

    // Jump page
    const prevPage = getBookPageComponent(nextProps.book, nextProps.currentPageNumber - 1)
    const currentPage = getBookPageComponent(nextProps.book, nextProps.currentPageNumber)
    const nextPage = getBookPageComponent(nextProps.book, nextProps.currentPageNumber + 1)

    return {
      prevPage: prevPage,
      currentPage: currentPage,
      nextPage: nextPage,
      currentPageNumber: nextProps.currentPageNumber,
    }
  }

  render() {
    const leftAction = this.props.leftToRight ?
      this.props.singlePageBack :
      this.props.singlePageForward

    const rightAction = this.props.leftToRight ?
      this.props.singlePageForward :
      this.props.singlePageBack

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
        {this.state.currentPage}

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
          {this.state.prevPage}
          {this.state.nextPage}
        </div>
      </div>
    )
  }
}
