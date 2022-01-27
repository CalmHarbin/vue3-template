module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'plugin:prettier/recommended'],
    settings: {
        // 解决vite+airbnb导致eslint报错import/no-unresolved，和使用别名报错
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // vue组件名必须使用多个单词，关闭该规则
        'vue/multi-word-component-names': 0,
        // vue3可以有多个根组件
        'vue/no-multiple-template-root': 0,
        // 解决vite+airbnb导致eslint报错import/extensions
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['vite.config.ts'] }]
    }
}
