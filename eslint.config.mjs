// eslint.config.mjs

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['**/*.{js,mjs,cjs,ts}']},
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-restricted-syntax': [
                'error', {
                    selector: 'CallExpression[callee.object.name="console"]',
                    message: 'Don\'t use console -- use the configured logger instead',
                },
                'error', {
                    selector: ':not(BinaryExpression:matches([operator="!=="], [operator="==="])) > Literal[value="null"]',
                    message: 'Usage of "null" is deprecated except when received from legacy APIs. Use "undefined" instead',
                },
            ],
        },
    },
]
