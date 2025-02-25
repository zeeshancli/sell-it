import { gql } from 'graphql-tag'

const typeDefs = gql`#graphql

  type User {

    _id: String
    userName: String
    email: String
    phoneNumber: String
    dateOfBirth: String
    gender: String
    city: String
    languagePreferences: String
    about: String
    
  }

  type LoginPayload {
    token: String
    isExistingUser: Boolean
  }
  
  type Query {
    getUser: User
  }

  input UpdateUserInput{

    userName: String
    email: String
    dateOfBirth: String
    gender: String
    city: String
    languagePreferences: String
    about: String

  }

  input CreateUserInput {
    userName: String
    email: String!
    phoneNumber: String
  }

  input FollowingInput {
    followingId: String!
  }

  input ReportInput {
    reportUser: String!
    message: String!
  }

  type Mutation {
    
    updateUser(input: UpdateUserInput): User

    createUser(input: CreateUserInput): User

    login(idToken: String!): LoginPayload

    following(input: FollowingInput): String

    reportUser(input: ReportInput): Boolean
  }

`;

export default typeDefs