package com.kyriakou.graphql.service.datafetcher;

import com.kyriakou.graphql.repository.BookRepository;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookDelete implements DataFetcher<Boolean> {
    BookRepository bookRepository;

    @Autowired //constructor injector
    public BookDelete(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Boolean get(DataFetchingEnvironment dataFetchingEnvironment) {
        String isn = dataFetchingEnvironment.getArgument("isn");
        if(bookRepository.existsById(isn)){
            bookRepository.deleteById(isn);
            return true;
        }
        return false;
    }
}