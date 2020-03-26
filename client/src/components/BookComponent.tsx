import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import edit from "../assets/edit.svg";
import remove from "../assets/remove.svg";
import back from "../assets/back.svg";

import "./Books.scss";
import { Book } from "../models/BookModel";
import { getBookById, deleteBook, GET_BOOKS } from "../GraphQL";

interface Props {}

export const BookComponent: React.FC<Props> = () => {
  const history = useHistory();
  const { isn } = useParams();

  const { loading, error, data } = useQuery(getBookById(`${isn}`));
  const [
    removeBook,
    { loading: removeLoading, error: removeError }
  ] = useMutation(deleteBook(`${isn}`), {
    update(cache, { data: { allBooks } }) {
      const data: any = cache.readQuery({ query: GET_BOOKS });
      cache.writeQuery({
        query: GET_BOOKS,
        data: { allBooks: data.allBooks.filter((bk: Book) => bk.isn !== isn) }
      });
    }
  });

  const handleRemoveClick = () => {
    removeBook({ variables: { id: `${book.isn}` } });
    if (!removeLoading && !removeError) {
      history.goBack();
    }
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>error while fetching book details</div>;

  const book: Book = data.book;
  return (
    <>
      <div className="navigate back" onClick={() => history.goBack()}>
        <img
          src={back}
          width="25"
          height="45"
          alt="back"
          style={{ marginLeft: "20px", paddingTop: "10px", cursor: "pointer" }}
        />
      </div>
      <div className="book-details">
        <div className="book-spotlight">
          <div className="book-text">
            <h1>{book.title}</h1>
            <h3>
              by{" "}
              {React.Children.toArray(
                book.authors.map(
                  (author, i) =>
                    `${author}${i + 1 !== book.authors.length ? ", " : ""}`
                )
              )}
            </h3>
          </div>
          <img
            src={book.imageUrl}
            alt={book.title}
            style={{ width: "200px" }}
          />
        </div>

        <hr />
        <div className="preview-controls">
          {removeError && <div>Could not remove book</div>}
          {removeLoading && <div>...</div>}
          {!removeLoading && (
            <>
              <img
                src={remove}
                width="25"
                height="45"
                alt="remove"
                onClick={handleRemoveClick}
              />
              <img
                src={edit}
                width="25"
                height="45"
                alt="edit"
                onClick={() => {}}
              />
            </>
          )}
        </div>
        <h5>{book.description}</h5>
      </div>
    </>
  );
};
