package com.kyriakou.graphql.service.datafetcher;

import org.springframework.beans.factory.annotation.Autowired;
import com.kyriakou.graphql.model.Book;
import com.kyriakou.graphql.repository.BookRepository;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public class AllBooksDataFetcher implements DataFetcher<List<Book>> {
    BookRepository bookRepository;

    @Autowired
    public AllBooksDataFetcher(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> get(DataFetchingEnvironment dataFetchingEnvironment) {
        return bookRepository.findAll();
    }
}