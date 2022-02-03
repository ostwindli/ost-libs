import babel from '@rollup/plugin-babel';
export default {
  input: 'index.js',
  output: {
    file: 'index.cjs.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      extensions: ['.js', '.ts'],
    }),
  ],
};
