const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

module.exports = CategoryType;