import * as React from 'react'
import { BookSummary } from '../../models';

interface Props {
  books: Array<BookSummary>
}

export const Top = ({
  books
}: Props) => (
  <div>
    {
      books.map(book => (
        <li>
          {book.originalName}
        </li>
      ))
    }
  </div>
)
