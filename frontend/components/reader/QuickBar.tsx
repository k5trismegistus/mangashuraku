import * as React from 'react'
import { Book } from '../../models'
import styles from './QuickBar.css'

const ThumbnailBasePath = 'http://localhost:9000/mangashuraku-thumbnail'

interface Props {
  thumbnails: Array<string>
  leftToRight: boolean
  currentPageNumber: number
  jumpPage: (pageNumber: number) => void
}

const QuickBar = ({
  thumbnails,
  leftToRight,
  currentPageNumber,
  jumpPage
}: Props) => (
  <div className={styles.quickBarContainer}>
    <div
      className={styles.quickBar}
      style={{ flexDirection: (leftToRight ? 'row' : 'row-reverse')}}
    >
      {thumbnails.map((thumbnailPath, index) => (
        <div
          key={thumbnailPath}
          onClick={(e) => jumpPage(index)}
          className={styles.thumbnailContainer}
          >
          <img src={`${ThumbnailBasePath}/${thumbnailPath}`} />
          <div className={styles.pageNumber}>
            <span>{index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default QuickBar
