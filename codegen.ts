import { CodegenConfig } from '@graphql-codegen/cli';
// import { GRAPH_QL_SERVER } from '@env';
// TODO: move this to env

const GRAPH_QL_SERVER = 'https://flyby-router-demo.herokuapp.com';

const config: CodegenConfig = {
  schema: GRAPH_QL_SERVER,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: { gqlTagName: 'gql' },
    },
  },
  ignoreNoDocuments: true,
};
export default config;
