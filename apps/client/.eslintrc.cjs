module.exports = {
  extends: ["../../.eslintrc.cjs"],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./",
      },
    },
  },
};
