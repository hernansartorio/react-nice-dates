import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs'
    },
    {
      file: 'build/index.esm.js',
      format: 'esm'
    },
    {
      file: 'build/index.umd.js',
      format: 'umd',
      name: 'ReactNiceDates',
      globals: {
        'date-fns': 'DateFns',
        react: 'React',
        'prop-types': 'PropTypes'
      }
    }
  ],
  plugins: [
    resolve(),
    eslint({
      exclude: '**/*.scss'
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false
    }),
    commonjs()
  ],
  external: ['date-fns', 'prop-types', 'react']
}
