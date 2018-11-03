import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import styles from './QuickBar.css'

const ThumbnailBasePath = `http://${process.env.MINIO_ENDPOINT}/mangashuraku-thumbnail`

interface Props {
  thumbnails: Array<string>
  leftToRight: boolean
  currentPageNumber: number
  jumpPage: (pageNumber: number) => void
}

class QuickBar extends React.Component<Props> {
  jumpFirstPage() {
    const quickBarDOM = ReactDOM.findDOMNode(this.refs.quickBarRef) as HTMLElement
    const pos = this.props.leftToRight ? 0 : quickBarDOM.scrollWidth
    quickBarDOM.scrollLeft = pos
  }

  jumpCurrentpage() {
    const quickBarDOM = ReactDOM.findDOMNode(this.refs.quickBarRef) as HTMLElement
    const pos = this.props.leftToRight ?
      (this.props.currentPageNumber * 256 + 128) - (quickBarDOM.clientWidth / 2) :
      quickBarDOM.scrollWidth - (this.props.currentPageNumber * 256 + 128) - (quickBarDOM.clientWidth / 2)
    quickBarDOM.scrollLeft = pos
  }

  jumpLastPage() {
    const quickBarDOM = ReactDOM.findDOMNode(this.refs.quickBarRef) as HTMLElement
    const pos = this.props.leftToRight ? quickBarDOM.scrollWidth : 0
    quickBarDOM.scrollLeft = pos
  }

  render() {
    const {
      thumbnails,
      leftToRight,
      currentPageNumber,
      jumpPage
    } = this.props

    return (
      <div className={styles.quickBar}>
        <div
          style={{ flexDirection: (leftToRight ? 'row' : 'row-reverse')}}
          className={styles.controlls}
        >
          <Button onClick={() => this.jumpFirstPage()}>
            Jump to First Page
          </Button>
          <Button onClick={() => this.jumpCurrentpage()}>
            Jump to current Page
          </Button>
          <Button onClick={() => this.jumpLastPage()}>
            Jump to Last Page
          </Button>
        </div>
        <div
          style={{ flexDirection: (leftToRight ? 'row' : 'row-reverse')}}
          ref={'quickBarRef'}
          className={styles.pages}
        >
          {thumbnails.map((thumbnailPath, index) => (
            <div
              key={thumbnailPath}
              onClick={(e) => jumpPage(index)}
              className={styles.thumbnailContainer}
            >
              <img
                src={`${ThumbnailBasePath}/${thumbnailPath}`}
                className={index === currentPageNumber ? styles.currentPage : ''}
              />
              <div className={styles.pageNumber}>
                <span>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default QuickBar
