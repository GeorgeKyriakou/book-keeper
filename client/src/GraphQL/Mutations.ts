import gql from "graphql-tag";

export const CREATE_NEW_BOOK = gql`
  mutation createBook(
    $isn: String!
    $title: String!
    $publisher: String!
    $authors: [String]!
    $publishDate: String!
  ) {
    createBook(
      isn: $isn
      title: $title
      publisher: $publisher
      authors: $authors
      publishDate: $publishDate
    ) {
      isn
      title
      publisher
      authors
      publishDate
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook(
    $isn: String!
    $title: String!
    $publisher: String!
    $authors: [String]!
    $publishDate: String!
  ) {
    updateBook(
      isn: $isn
      title: $title
      publisher: $publisher
      authors: $authors
      publishDate: $publishDate
    ) {
      isn
      title
      publisher
      authors
      publishDate
    }
  }
`;

export const deleteBook = (isn: string) => gql`
 mutation {
  deleteBook(isn: "${isn}")
 }
`;
