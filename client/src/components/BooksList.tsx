import React from "react";
import "./Books.css";
import { Book } from "../models/BookModel";
import { useHistory } from "react-router-dom";

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
            <h1
              className="book-list-item"
              onClick={() => onTitleClick(book.isn)}
            >
              {book.title}
            </h1>
          ))
        )}
      </div>
  );
};
