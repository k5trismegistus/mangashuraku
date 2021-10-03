import * as React from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ClearIcon from '@material-ui/icons/Clear'
import styles from './Editor.css'
import { Grid } from '@material-ui/core';

interface Props {
}

const Editor = ({
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
            onClick={backToIndex}
          >
            <ListItemIcon>
              <ArrowUpwardIcon className={styles.menuIcon} />
            </ListItemIcon>
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
            onClick={deleteBook}
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
      onClick={toggleEditor}
      className={styles.closeButton}
    >
      <ClearIcon className={styles.closeButtonIcon} />
    </div>
  </div>
)

export default Editor
