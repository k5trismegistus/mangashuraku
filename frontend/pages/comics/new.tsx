import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ComicBook } from '../../types'

import { apiClient } from '../../utils/apiClient'
import { getComicBookThumbnailUrl } from '../../utils/urlBuilder'

import styles from './new.module.css'

type Props ={

}

const RegisterComicBook = ({}: Props) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploaded, setUploaded] = useState([])
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true)
      const bookFile = acceptedFiles[0]

      const book = await apiClient.createBook(bookFile)
      setUploaded([book, ...uploaded])
      setIsUploading(false)
    },
    []
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className={styles.container}>
      <h1>Upload new books</h1>


      <div {...getRootProps()} className={isUploading ? styles.hiddenDropArea : styles.dropArea}>
        <input {...getInputProps()}></input>
        {
          isDragActive ?
            <p>Drop file here</p> :
            <p>Start</p>
        }
      </div>

      <div className={isUploading ? styles.waitMessageArea : styles.hiddenWaitMessageArea}>
        <p>Uploading...</p>
      </div>

      <div>
        <h2>Uploaded books</h2>
        {
          (() => (
            uploaded.map((comicBook: ComicBook) => (
              <div key={comicBook._id}>
                <h3>{comicBook.originalName}</h3>
                <img src={getComicBookThumbnailUrl(comicBook.coverThumbnail)} />
              </div>
            ))
          ))()
        }
      </div>
    </div>
  )
}

export default RegisterComicBook