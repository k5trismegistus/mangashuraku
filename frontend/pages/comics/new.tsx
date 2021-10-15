import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { apiClient } from '../../utils/apiClient'

import styles from './new.module.css'

type Props ={

}

const RegisterComicBook = ({}: Props) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const bookFile = acceptedFiles[0]

      await apiClient.createBook(bookFile)
    },
    []
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()}></input>
        {
          isDragActive ?
            <p>Drop file here</p> :
            <p>Start</p>
        }

      </div>
    </div>
  )
}

export default RegisterComicBook