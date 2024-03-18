module.exports = {
  extends: ["../../.eslintrc.cjs"],
  env: {
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
