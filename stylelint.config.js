module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-rational-order',
        'stylelint-config-prettier'
    ],
    ignoreFiles: ['**/*.js', '**/*.ts', 'dist/*', 'node_modules/*'],
    rules: {
        'selector-class-pattern': null
    }
}