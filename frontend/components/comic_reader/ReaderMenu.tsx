import * as React from 'react'

import { List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material'
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
            onClick={() => backToIndex()}
          >
            <ListItemIcon>
              <ArrowUpward className={styles.menuIcon} />
            </ListItemIcon>
            <ListItemText
              className={styles.listItemText}
              >
              Back to Library
            </ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={toggleReaderType}
            className={styles.menuItem}
          >
            <ListItemIcon>
              <ImportContacts className={styles.menuIcon} />
            </ListItemIcon>
            <ListItemText
              className={styles.listItemText}
              >
              Change reader type
            </ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={toggleDirection}
            className={styles.menuItem}
          >
            <ListItemIcon>
              <CompareArrows className={styles.menuIcon} />
            </ListItemIcon>
            <ListItemText
              className={styles.listItemText}
              >
              Change reading direction
            </ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={deleteComicBook}
            className={styles.menuItem}
          >
            <ListItemIcon>
              <DeleteForever className={styles.menuIcon} />
            </ListItemIcon>
            <ListItemText
              className={styles.listItemText}
            >
              Delete this book
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} />
    </Grid>

    <div
      onClick={toggleMenu}
      className={styles.closeButton}
    >
      <Clear className={styles.closeButtonIcon} />
    </div>
  </div>
)

export default ReaderMenu
