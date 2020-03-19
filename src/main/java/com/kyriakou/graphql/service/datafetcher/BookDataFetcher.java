package com.kyriakou.graphql.service.datafetcher;

import com.kyriakou.graphql.model.Book;
import com.kyriakou.graphql.repository.BookRepository;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class BookDataFetcher implements DataFetcher<Book> {
    BookRepository bookRepository;

    @Autowired //constructor injector
    public BookDataFetcher(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book get(DataFetchingEnvironment dataFetchingEnvironment){
        String isn = dataFetchingEnvironment.getArgument("id");
        Optional<Book> book = bookRepository.findByIsn(isn);
        return book.orElse(null);
    }
}
