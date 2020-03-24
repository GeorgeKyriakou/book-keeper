package com.kyriakou.graphql.requests;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GraphQLRequest {

    private String operationName;
    private Object variables;
    private String query;

}