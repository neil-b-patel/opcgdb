module.exports = {
  extends: ['../../.eslintrc.cjs'],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './',
      },
    },
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.vue'],
        },
        'import/resolver': {
          node: true,
          typescript: {
            project: './',
          },
          vue: true,
        },
        'import/extensions': ['error', 'ignorePackages', { vue: 'always' }],
        'import/ignore': ['.vue'],
      },
      // Global variables that can be used in nuxt without being imported
      globals: {
        $fetch: 'readonly',
        abortNavigation: 'readonly',
        addRouteMiddleware: 'readonly',
        clearError: 'readonly',
        clearNuxtData: 'readonly',
        clearNuxtState: 'readonly',
        createError: 'readonly',
        defineNuxtComponent: 'readonly',
        defineNuxtRouteMiddleware: 'readonly',
        definePageMeta: 'readonly',
        navigateTo: 'readonly',
        onBeforeRouteLeave: 'readonly',
        onBeforeRouteUpdate: 'readonly',
        onNuxtReady: 'readonly',
        prefetchComponents: 'readonly',
        preloadComponents: 'readonly',
        preloadRouteComponents: 'readonly',
        refreshNuxtData: 'readonly',
        reloadNuxtApp: 'readonly',
        setPageLayout: 'readonly',
        setResponseStatus: 'readonly',
        showError: 'readonly',
        updateAppConfig: 'readonly',
      },
      plugins: ['vue', 'import', '@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:vue/base',
        'prettier',
      ],
      rules: {
        'vue/no-multiple-template-root': 0,
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};
