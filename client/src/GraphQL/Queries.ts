import gql from "graphql-tag";

export const GET_BOOKS = gql`
  {
    allBooks {
      isn,
      title,
      authors,
      imageUrl
    }
  }
`;

export const getBookById = (isn: string) => gql`
 {
  book(isn: "${isn}") {
      isn,
      title,
      publisher,
      authors,
      publishDate,
      imageUrl,
      description
    }
 }
`;
