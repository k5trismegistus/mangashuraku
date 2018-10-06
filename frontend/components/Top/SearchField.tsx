import * as React from 'react'
import {
  Button,
  TextField
} from '@material-ui/core/'

import styles from './SearchField.css'
import { fetchBookList } from '../../reducers/booksReducer';

type Props = {
  query: string
  fetchBookList: (page: number, query: string) => void
}

type State = {
  query: string
}

class SearchField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { query: props.query }
  }

  onChangeQuery(e) {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <TextField
          id="search"
          label="Search"
          value={this.state.query}
          onChange={(e) => this.onChangeQuery(e)}
          margin="normal"
          className={styles.searchInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.fetchBookList(0, this.state.query)}
        >
          GO
        </Button>
      </div>
    )
  }
}

export default SearchField
