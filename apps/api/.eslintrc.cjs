module.exports = {
  extends: '../../.eslintrc.cjs',
  settings: {
    'import/resolver': {
      typescript: {
        project: './',
      },
    },
  },
};
