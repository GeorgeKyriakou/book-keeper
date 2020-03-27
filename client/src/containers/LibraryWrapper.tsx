import React from "react";
import './Library.scss'
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from "../GraphQL";
import { BooksList } from "../components/Books/BooksList";
import { ActionBar } from "../components/Layout/ActionBar";

interface Props {}

export const LibraryWrapper: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (error) {
    return <div>Something went wrong while fetching data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="library-wrapper">
      <BooksList books={data.allBooks} />
      <ActionBar/>
    </div>
  );
};
