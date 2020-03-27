package com.kyriakou.graphql.service;

import com.kyriakou.graphql.model.Book;
import com.kyriakou.graphql.repository.BookRepository;
import com.kyriakou.graphql.service.datafetcher.*;
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
    private BookCreator bookCreateDataFetcher;
    private BookDelete bookDeleteDataFetcher;
    private BookEdit bookEditDataFetcher;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    public GraphQLService(AllBooksDataFetcher allBooksDataFetcher, BookDataFetcher bookDataFetcher, BookCreator bookCreator, BookDelete bookDelete,BookEdit bookEdit) {
        this.allBooksDataFetcher = allBooksDataFetcher;
        this.bookDataFetcher = bookDataFetcher;
        this.bookCreateDataFetcher = bookCreator;
        this.bookDeleteDataFetcher = bookDelete;
        this.bookEditDataFetcher = bookEdit;
    }

    @PostConstruct
    public void loadSchema() throws IOException {
        loadDataIntoHSQL();

        File schemaFile = resource.getFile();
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemaFile);
        RuntimeWiring wiring = buildRuntimeWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
        graphQL = GraphQL.newGraphQL(schema).build();
    }

    private void loadDataIntoHSQL() {
        Stream.of(
                new Book(
                        "123",
                        "5 Ingredients: Quick and easy food",
                        "Flatiron Books",
                        new String[]{
                                "Jamie Oliver"
                        },
                        "January 8, 2019",
                        "https://images-na.ssl-images-amazon.com/images/I/81fK1lepPdL.jpg",
                        "Suspendisse eget pharetra dolor. Morbi ut mauris erat. Maecenas maximus congue neque, nec rhoncus mi luctus nec. Nullam ullamcorper nisi neque."
                ),
                new Book(
                        "124",
                        "Becoming",
                        "Penguin",
                        new String[]{
                                "Michelle Obama"
                        },
                        "November 13, 2018",
                        "https://images-na.ssl-images-amazon.com/images/I/41w%2Bk8pPngL.jpg",
                        "Nullam laoreet mauris sed neque fringilla semper. In molestie posuere enim id commodo. "

                ),
                new Book(
                        "125",
                        "Before We Were Yours: A Novel",
                        "Ballantine Books",
                        new String[]{
                                "Lisa Wingate, Wingate Lisa"
                        },
                        "June 6, 2017",
                        "https://images-na.ssl-images-amazon.com/images/I/513yA7tojNL.jpg",
                        "In molestie posuere enim id commodo. Etiam a ex porta, sodales leo et, sodales est. Nulla facilisi!"
                )
        ).forEach(book -> bookRepository.save(book));
    }

    private RuntimeWiring buildRuntimeWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type("Query", typeWiring -> typeWiring
                        .dataFetcher("allBooks", allBooksDataFetcher)
                        .dataFetcher("book", bookDataFetcher))
                .type("Mutation", typeWiring -> typeWiring
                        .dataFetcher("createBook", bookCreateDataFetcher)
                        .dataFetcher("deleteBook", bookDeleteDataFetcher)
                        .dataFetcher("updateBook", bookEditDataFetcher)
                )
                .build();

    }

    public GraphQL getGraphQL() {
        return graphQL;
    }
}
