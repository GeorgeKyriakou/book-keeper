import React, { useEffect, useState } from "react";

import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import back from "../../assets/back.svg";
import { useHistory, useParams } from "react-router";
import { Book } from "../../models/BookModel";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getBookById, deleteBook, GET_BOOKS } from "../../GraphQL";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Checkbox,
  Button,
  TextareaAutosize
} from "@material-ui/core";

interface Props {}

export const BookEditor: React.FC<Props> = () => {
  const history = useHistory();
  const { isn } = useParams();

  const handleOnBackClick = () => {
    if (isn) {
      history.push(`/book/details/${isn}`);
    } else {
      history.push(`/books`);
    }
  };

  const handleRemoveClick = () => {
    removeBook({ variables: { id: `${book.isn}` } });
    if (!removeLoading && !removeError) {
      history.goBack();
    }
  };

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

  const { loading, error, data } = useQuery(getBookById(`${isn}`));
  let bookInit: Book = {
    isn: "",
    title: "title",
    publisher: "publisher",
    authors: ["author"],
    publishDate: "",
    imageUrl: "",
    description: ""
  };
  const [book, setBook] = useState(bookInit);

  useEffect(() => {
    if (data && data.book) {
      setBook(data.book);
    }
  }, [data]);

  const BookEditSchema = Yup.object().shape({
    isn: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    publisher: Yup.string().required("Required"),
    authors: Yup.array()
      .of(Yup.string())
      .required("Required"),
    publishDate: Yup.string().required("Required"),
    imageUrl: Yup.string().required("Required"),
    description: Yup.string().required("Required")
  });
  return (
    <>
      <div className="navigate back" onClick={handleOnBackClick}>
        <img
          src={back}
          width="25"
          height="45"
          alt="back"
          style={{ marginLeft: "20px", paddingTop: "10px", cursor: "pointer" }}
        />
      </div>

      <div className="book-details">
        <Formik
          enableReinitialize={true}
          initialValues={book}
          validationSchema={BookEditSchema}
          onSubmit={(data, { setSubmitting }) => {
            if (data) {
              setSubmitting(true);
              console.log(data);
              setSubmitting(false);
              history.push(`/books`);
            }
          }}
        >
          {({ values, isSubmitting, setFieldValue, errors, touched }) => (
            <Form>
              <Field
                placeholder="title"
                name="title"
                type="input"
                as={TextField}
                fullWidth
                margin="normal"
                helperText={touched.title && errors.title}
                error={touched.title && !!errors.title}
              />

              <div className="book-spotlight">
                <div className="book-text">
                  <h3>
                    by{" "}
                    <Field
                      placeholder="authors"
                      name="authors"
                      type="input"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      helperText={touched.authors && errors.authors}
                      error={touched.authors && !!errors.authors}
                    />
                  </h3>
                </div>
                <img
                  className="img-edit"
                  src={book.imageUrl}
                  alt={book.title}
                  style={{ width: "200px" }}
                />
              </div>
              <hr />
              <div className="preview-controls">
                {isn && (
                  <img
                    src={remove}
                    width="25"
                    height="45"
                    alt="remove"
                    onClick={handleRemoveClick}
                  />
                )}
              </div>
              <Field
                placeholder="description"
                name="description"
                type="input"
                style={{width: "100%"}}
                as={TextareaAutosize}
                rows="5" cols="40"
                margin="normal"
                helperText={touched.description && errors.description}
                error={touched.description && !!errors.description}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
