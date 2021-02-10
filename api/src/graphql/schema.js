import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import { getUsers } from './queries/users.query.gql'

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    getUsers
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({})
})

const schemaGraphQL = new GraphQLSchema({
  query: query
  //mutation: mutation
})

export default schemaGraphQL