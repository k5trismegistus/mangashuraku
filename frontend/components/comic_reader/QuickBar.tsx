import { useRef } from 'react'
import Button from '@mui/material/Button'
import styles from './QuickBar.module.css'

const ThumbnailBasePath = `http://192.168.11.12:8000/mangashuraku-thumbnail`

type Props = {
  thumbnails: Array<string>
  leftToRight: boolean
  currentPageNumber: number
  changePage: (newPageNumber: number) => void
}

const QuickBar = ({thumbnails, leftToRight, currentPageNumber, changePage}: Props) => {
  const quickBarRef = useRef(null)

  const jumpFirstPage = () => {
    console.log(quickBarRef.current.scrollWidth)
    console.log(quickBarRef.current.scrollLeft)
    const pos = leftToRight ? -1 * quickBarRef.current.scrollWidth : 0
    quickBarRef.current.scrollLeft = pos
  }

  const jumpCurrentpage =() => {
    const pos = leftToRight ?
    (quickBarRef.current.clientWidth / 2) - quickBarRef.current.scrollWidth + (currentPageNumber * 256 + 128) :
      (quickBarRef.current.clientWidth / 2) - (currentPageNumber * 256)
    quickBarRef.current.scrollLeft = pos
  }

  const jumpLastPage =() => {
    const pos = leftToRight ?  0 : -1 * quickBarRef.current.scrollWidth
    quickBarRef.current.scrollLeft = pos
  }

  return (
    <div className={styles.quickBar}>
      <div
        style={{ flexDirection: (leftToRight ? 'row' : 'row-reverse')}}
        className={styles.controlls}
      >
        <Button onClick={() => { console.log(quickBarRef.current.scrollLeft)} }>
          Show
        </Button>
        <Button onClick={() => jumpFirstPage()}>
          Jump to First Page
        </Button>
        <Button onClick={() => jumpCurrentpage()}>
          Jump to current Page
        </Button>
        <Button onClick={() => jumpLastPage()}>
          Jump to Last Page
        </Button>
      </div>
      <div
        style={{ flexDirection: (leftToRight ? 'row' : 'row-reverse')}}
        ref={quickBarRef}
        className={styles.pages}
      >
        {thumbnails.map((thumbnailPath, index) => (
          <div
            key={thumbnailPath}
            // The page number to display starts from 1
            // The index of first element of list of Javascript is 0
            onClick={(e) => changePage(index + 1)}
            className={styles.thumbnailContainer}
          >
            <img
              src={`${ThumbnailBasePath}/${thumbnailPath}`}
              className={index === currentPageNumber - 1 ? styles.currentPage : styles.otherPage}
            />
            <div className={styles.pageNumber}>
              {/* The page number to display starts from 1 */}
              {/* The index of first element of list of Javascript is 0 */}
              <span>{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickBar
