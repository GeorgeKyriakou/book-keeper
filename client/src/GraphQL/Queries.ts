import gql from "graphql-tag";

export const GET_BOOKS = gql`
  {
    allBooks {
      isn
      title
      authors
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
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

