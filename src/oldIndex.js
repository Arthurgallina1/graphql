const { ApolloServer, gql } = require("apollo-server");

// Toda request é POST
// Toda request bate no mesmo end point (/graphql)

// Query -> Obter dados (GET do rest);
// Mutation -> manipular dados (post/put/delete);

//Scalar Types -> Tipos primitivos: Strng, Int, Boolean, Float e ID;
//ID do gql é a PK
//types são as Entidades (Users, products) e tipar os atributos

// ! no final torna o atributo obrigatório (se não pode retornar null)

// É possível fazer aninhamento de tipos

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        active: Boolean!
    }
    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }
    type Query {
        hello: String
        users: [User]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`;

const users = [
    {
        _id: String(Math.random()),
        name: "Arthur",
        email: "art@teste.com",
        active: true,
    },
    {
        _id: String(Math.random()),
        name: "Arthur 2",
        email: "art2@teste.com",
        active: false,
    },
    {
        _id: String(Math.random()),
        name: "Arthur 3",
        email: "art3@teste.com",
        active: true,
    },
];
//Resolvers faz o mapeamento 1 pra 1 entre resolvers e schemas
const resolvers = {
    Query: {
        hello: () => "Hello world",
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email === args.email);
        },
        users: () => users,
    },

    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true,
            };

            users.push(newUser);
            return newUser;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log("server started at " + url));
