package com.kyriakou.graphql.service;

import com.kyriakou.graphql.model.Book;
import com.kyriakou.graphql.repository.BookRepository;
import com.kyriakou.graphql.service.datafetcher.AllBooksDataFetcher;
import com.kyriakou.graphql.service.datafetcher.BookDataFetcher;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.stream.Stream;

@Service
public class GraphQLService {

    @Value("classpath:books.graphql")
    Resource resource;
    private GraphQL graphQL;

    private AllBooksDataFetcher allBooksDataFetcher;
    private BookDataFetcher bookDataFetcher;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    public GraphQLService(AllBooksDataFetcher allBooksDataFetcher, BookDataFetcher bookDataFetcher) {
        this.allBooksDataFetcher = allBooksDataFetcher;
        this.bookDataFetcher = bookDataFetcher;
    }

    @PostConstruct
    public void loadSchema() throws IOException {
       loadDataIntoHSQL();

        File schemaFile = resource.getFile();
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemaFile);
        RuntimeWiring wiring = buildRuntimeWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry,wiring);
        graphQL = GraphQL.newGraphQL(schema).build();
    }

    private void loadDataIntoHSQL() {
        Stream.of(
                new Book(
                        "123",
                        "Cloud Computing: Concepts",
                        "Prentice Hall",
                        new String[]{
                                "Zaigham Mahmood", "Thomas Erl", "Richardo Puttini"
                        },
                        "2013"
                ),
                new Book(
                        "124",
                        "Cloud Engineering & Architecture",
                        "Orielly",
                        new String[]{
                                "Barak Obama"
                        },
                        "2018"
                ),
                new Book(
                        "125",
                        "Cooking with Brad",
                        "Penguin",
                        new String[]{
                                "Brad Smith"
                        },
                        "2012"
                )
        ).forEach(book-> bookRepository.save(book));
    }

    private RuntimeWiring buildRuntimeWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type("Query",typeWiring -> typeWiring
                            .dataFetcher("allBooks", allBooksDataFetcher)
                            .dataFetcher("book", bookDataFetcher))
                        .build();
    }

    public GraphQL getGraphQL(){
        return graphQL;
    }
}
