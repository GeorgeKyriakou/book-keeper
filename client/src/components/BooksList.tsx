import React from "react";
import "./Books.scss";
import { Book } from "../models/BookModel";
import { useHistory } from "react-router-dom";
import {BookPreview} from './BookPreview'

interface Props {
  books: Book[];
}

export const BooksList: React.FC<Props> = ({ books }) => {
  const history = useHistory();
  const onTitleClick = (isn: String) => {
    history.push(`book/details/${isn}`);
  };

  return (
      <div>
        {React.Children.toArray(
          books.map(book => (
            <div
              className="book-list-item"
              onClick={() => onTitleClick(book.isn)}
            >
                <BookPreview book={book}></BookPreview>
            </div>
          ))
        )}
      </div>
  );
};
