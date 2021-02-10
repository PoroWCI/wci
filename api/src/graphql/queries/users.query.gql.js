import {
  GraphQLList as List,
  GraphQLString as String,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean
} from 'graphql'

import UsersType from '../types/users.types.gql'

export const getUsers = {
  type: List(UsersType),
  description: 'Get all users',
  resolve: async (parent, args, context, info) => {
    console.log(context)
    return null
  }
}