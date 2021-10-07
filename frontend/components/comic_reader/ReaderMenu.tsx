import * as React from 'react'

import { List, ListItem, Grid } from '@mui/material'
import { ArrowUpward, ImportContacts, CompareArrows, DeleteForever, Clear } from '@mui/icons-material'
import styles from './ReaderMenu.module.css'

type Props = {
  toggleMenu: () => void
  toggleReaderType: () => void
  toggleDirection: () => void
  backToIndex: () => void
  deleteComicBook: () => void
}

const ReaderMenu = ({
  toggleMenu,
  toggleReaderType,
  toggleDirection,
  backToIndex,
  deleteComicBook,
}: Props) => (
  <div>
    <Grid
      container
      className={styles.readerMenu}
    >
      <Grid item xs={3} />
      <Grid item xs={6}>
        <List className={styles.menuList}>
          <ListItem
            button
            className={styles.menuItem}
            onClick={() => backToIndex(goBackIndexPage, goBackIndexQuery)}
          >
            <ListItem>
              <ArrowUpward className={styles.menu} />
            </ListItem>
            <span
              className={styles.listItemText}
              >
              Back to Library
            </span>
          </ListItem>
          <ListItem
            button
            onClick={toggleReaderType}
            className={styles.menuItem}
          >
            <ListItem>
              <ImportContacts className={styles.menuIcon} />
            </ListItem>
            <span
              className={styles.listItemText}
              >
              Change reader type
            </span>
          </ListItem>
          <ListItem
            button
            onClick={toggleDirection}
            className={styles.menuItem}
          >
            <ListItem>
              <CompareArrows className={styles.menu} />
            </ListItem>
            <span
              className={styles.listItemText}
              >
              Change reading direction
            </span>
          </ListItem>
          <ListItem
            button
            onClick={deleteComicBook}
            className={styles.menuItem}
          >
            <ListItem>
              <DeleteForever className={styles.menu} />
            </ListItem>
            <span
              className={styles.listItemText}
            >
              Delete this book
            </span>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} />
    </Grid>

    <div
      onClick={toggleMenu}
      className={styles.closeButton}
    >
      <Clear className={styles.closeButton} />
    </div>
  </div>
)

export default ReaderMenu
