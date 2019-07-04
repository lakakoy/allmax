module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    semi: 0,
  },
  globals: {
    document: true,
    window: true,
  },
  plugins: ['flowtype'],
}
