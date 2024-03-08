module.exports = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  semi: true,
  vueIndentScriptAndStyle: true,

  // Import order plugin
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-packagejson'],
  importOrderCaseInsensitive: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    // Node modules
    '<THIRD_PARTY_MODULES>',

    // Resn libraries
    '^@optcgdb/(.*)$',

    // Local imports
    '^.[.]{0,1}/(?!.*.(scss|css|sass)$).*$',

    // Stlyes
    '.(scss|sass|css)$',
  ],
};
