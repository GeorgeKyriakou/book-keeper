package com.kyriakou.graphql.resource;

import com.kyriakou.graphql.requests.GraphQLRequest;
import com.kyriakou.graphql.service.GraphQLService;
import graphql.ExecutionResult;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/graphql")
@RestController
public class BookResource {


    @Autowired
    GraphQLService graphQLService;

    @PostMapping
    public ResponseEntity<Object> getAllBooks(@RequestBody GraphQLRequest request){
        ExecutionResult execute = graphQLService.getGraphQL().execute(request.getQuery());
        return new ResponseEntity<Object>(execute, HttpStatus.OK);
    }
}
