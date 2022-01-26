module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'airbnb-base',
        // 'airbnb-typescript/base',
        'plugin:prettier/recommended'
    ],
    // settings: { 'import/resolver': { typescript: {} } },
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
        // project: './tsconfig.json'
        // extraFileExtensions: ['.vue']
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // vue组件名必须使用多个单词，关闭该规则
        'vue/multi-word-component-names': 0,
        // vue3可以有多个根组件
        'vue/no-multiple-template-root': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ]
    }
}
