import { defineConfig } from 'dumi';
// import nodeExternals from 'webpack-node-externals';

export default defineConfig({
  title: 'react-common',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  hash: true,
  dva: {
    immer: true,
    hmr: false,
  },
  esbuild: {},
  history: {
    type: 'hash',
  },
});
