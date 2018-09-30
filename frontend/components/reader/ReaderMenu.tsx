import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ClearIcon from '@material-ui/icons/Clear'
import styles from './ReaderMenu.css'
import { Grid } from '@material-ui/core';

interface Props {
  toggleMenu: () => void
  toggleReaderType: () => void
  toggleDirection: () => void
}

const ReaderMenu = ({
  toggleMenu,
  toggleReaderType,
  toggleDirection,
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
            onClick={toggleReaderType}
            className={styles.menuItem}
          >
            <ListItemIcon>
              <ImportContactsIcon className={styles.menuIcon} />
            </ListItemIcon>
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
            <ListItemIcon>
              <CompareArrowsIcon className={styles.menuIcon} />
            </ListItemIcon>
            <span
              className={styles.listItemText}
              >
              Change reading direction
            </span>
          </ListItem>
          <ListItem
            button
            onClick={() => console.log('not yet')}
            className={styles.menuItem}
          >
            <ListItemIcon>
              <DeleteForeverIcon className={styles.menuIcon} />
            </ListItemIcon>
            <span
              className={styles.listItemText}
            >
              Delete this book
            </span>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} />>
    </Grid>

    <div
      onClick={toggleMenu}
      className={styles.closeButton}
    >
      <ClearIcon className={styles.closeButtonIcon} />
    </div>
  </div>
)

export default ReaderMenu
