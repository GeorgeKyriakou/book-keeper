import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
// import { GET_BOOK_BY_ID } from "../GraphQL";
import { Book } from "../models/BookModel";
import gql from "graphql-tag";

interface Props {}

export const BookComponent: React.FC<Props> = () => {
  const history = useHistory();
  const { isn } = useParams();
//   const GET_BOOK_BY_ID = gql`
//   {
//       book(isn: "${isn}") {
//         isn
//         title
//         publisher
//         authors
//         publishDate
//       }
//     }`;


const GET_BOOK_BY_ID = gql`
  query book($isn: String!) {
    book(isn: $isn) {
      isn
      title
      publisher
      authors
      publishDate
    }
  }
`;
  const { loading, error, data } = useQuery(
    GET_BOOK_BY_ID,
    {variables: {isn}}
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>error while fetching book details</div>;

  const book: Book = data.book;
  return (
    <>
      <div className="navigate back" onClick={() => history.goBack()}>
        back
      </div>
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
    </>
  );
};
