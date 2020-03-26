package com.kyriakou.graphql.service.datafetcher;

import com.kyriakou.graphql.model.Book;
import com.kyriakou.graphql.repository.BookRepository;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookCreator implements DataFetcher<Book> {
    BookRepository bookRepository;

    @Autowired //constructor injector
    public BookCreator(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    @Override
    public Book get(DataFetchingEnvironment dataFetchingEnvironment) {
        String isn = dataFetchingEnvironment.getArgument("isn");
        String title = dataFetchingEnvironment.getArgument("title");
        String publisher = dataFetchingEnvironment.getArgument("publisher");
        String imageUrl = dataFetchingEnvironment.getArgument("imageUrl");
        List<String> list = dataFetchingEnvironment.getArgument("authors");
        String[] authors = list.toArray(new String[0]);
        String publishDate = dataFetchingEnvironment.getArgument("publishDate");
        Book newBook = new Book(
                isn,
                title,
                publisher,
                authors,
                publishDate,
                imageUrl
        );

        bookRepository.save(newBook);
        return newBook;
    }
}



