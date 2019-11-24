const graphql = require("graphql");
const { GraphQLString, GraphQLInputObjectType } = graphql;

const FileType = new GraphQLInputObjectType({
    name: "FileType",
    fields: () => ({
        filename: { type: GraphQLString },
        mimetype: { type: GraphQLString },
        encoding: { type: GraphQLString }
    })
});

module.exports = FileType;