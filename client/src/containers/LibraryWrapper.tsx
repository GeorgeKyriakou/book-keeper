import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from "../GraphQL";
import { BooksList } from "../components/BooksList";

interface Props {}

export const LibraryWrapper: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (error) {
    return <div>Something went wrong while fetching data</div>;
  }

  if (loading) {
   return <div>Loading...</div>;
  }
  
  return <BooksList books={data.allBooks}/>;
};
