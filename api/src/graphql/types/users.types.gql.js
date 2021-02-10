import {
  GraphQLString as String,
  GraphQLInt as Number,
  GraphQLBoolean as Boolean,
  GraphQLObjectType as Object
} from 'graphql'

const UsersType = new Object({
  name: 'UsersType',
  fields: {
    id: { type: Number },
    email: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    is_verified: { type: Boolean },
    is_premium: { type: Boolean },
    picture: { type: String },
    is_oauth: { type: Boolean }
  }
})

export default UsersType