const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        imageUrl: String!
        content: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }
        
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }
    
    input UserInput {
        emails: String!
        name: String!
        password: String!
    }
    
    type RootMutation {
        createUser(userInput: UserInput): User
    }
    schema {
        mutation: RootMutation
        
    }
`);