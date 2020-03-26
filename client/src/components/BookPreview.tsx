import React from "react";
import { Book } from "../models/BookModel";

interface Props {
  book: Book;
}

export const BookPreview: React.FC<Props> = ({ book }) => {
  return (
    <div className="book-preview">
      <img src={book.imageUrl} alt={book.title} className="img-preview"/>
      <div className="info-preview">
        <h3>{book.title}</h3>
        <p>
          {React.Children.toArray(
            book.authors.map(
              (author, i) =>
                `${author}${i + 1 !== book.authors.length ? ", " : ""}`
            )
          )}
        </p>
        <hr/>
      </div>
    </div>
  );
};
