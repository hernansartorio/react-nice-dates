const standard = require('@neutrinojs/standardjs')
const reactComponents = require('@neutrinojs/react-components')
const styles = require('@neutrinojs/style-loader')
const jest = require('@neutrinojs/jest')

module.exports = {
  options: {
    root: __dirname
  },
  use: [
    standard({
      eslint: {
        baseConfig: {
          rules: {
            'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }]
          }
        }
      }
    }),
    reactComponents(),
    styles({
      test: /\.(css|sass|scss)$/,
      modulesTest: /\.module\.(css|sass|scss)$/,
      ruleId: 'sass',
      loaders: [
        {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        },
        {
          loader: 'sass-loader',
          useId: 'sass'
        }
      ]
    }),
    jest()
  ]
}
